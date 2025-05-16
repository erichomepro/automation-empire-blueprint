
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.21.0";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Create a Supabase client with the service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Stripe with secret key
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

// Helper function for logging
const logStep = (step: string, details?: any) => {
  console.log(`[PAYMENT-WEBHOOK] ${step}${details ? ': ' + JSON.stringify(details) : ''}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    logStep("Handling OPTIONS request");
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    logStep("Method not allowed", { method: req.method });
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Method not allowed" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    logStep("Request received");
    
    // Parse request body
    const requestData = await req.json();
    logStep("Received payment payload", requestData);

    // Store payment event directly in the payment_webhook_events table
    const { data: eventData, error: eventError } = await supabase
      .from("payment_webhook_events")
      .insert([{ payload: requestData }])
      .select();

    if (eventError) {
      logStep("Error storing payment event", eventError);
      throw new Error(`Failed to store payment event: ${eventError.message}`);
    }

    logStep("Successfully stored payment event", { eventId: eventData?.[0]?.id });

    // Process Stripe event
    if (requestData.type && requestData.type === 'checkout.session.completed') {
      // This is a Stripe webhook event
      const session = requestData.data?.object;
      if (!session) {
        throw new Error("Invalid Stripe event: missing session data");
      }

      const purchaseId = session.metadata?.purchase_id || session.client_reference_id;
      if (!purchaseId) {
        throw new Error("Invalid Stripe event: missing purchase ID");
      }

      logStep("Processing Stripe checkout completion", { purchaseId, sessionId: session.id });
      
      const { error: purchaseError } = await supabase
        .from("ebook_purchases")
        .update({
          payment_status: 'completed',
          make_webhook_processed: true,
          payment_id: session.id
        })
        .eq('id', purchaseId);

      if (purchaseError) {
        logStep("Error updating purchase record", purchaseError);
        throw new Error(`Failed to update purchase record: ${purchaseError.message}`);
      } else {
        logStep("Successfully updated purchase record", { purchaseId });
      }
    } 
    // Handle direct API calls for testing/manual payment processing
    else if (requestData.purchase_id) {
      logStep("Updating purchase record via direct API call", { purchaseId: requestData.purchase_id });
      
      const { error: purchaseError } = await supabase
        .from("ebook_purchases")
        .update({
          payment_status: 'completed',
          make_webhook_processed: true
        })
        .eq('id', requestData.purchase_id);

      if (purchaseError) {
        logStep("Error updating purchase record", purchaseError);
        throw new Error(`Failed to update purchase record: ${purchaseError.message}`);
      } else {
        logStep("Successfully updated purchase record", { purchaseId: requestData.purchase_id });
      }
    } else {
      logStep("Unknown event format, storing but not processing further");
    }

    // Return success response
    logStep("Returning success response");
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment received and processed",
        event_id: eventData?.[0]?.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    logStep("Error processing payment", { message: error.message });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to process payment" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
