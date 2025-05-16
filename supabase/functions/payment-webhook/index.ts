
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    logStep("Received webhook payload", requestData);

    // Log configuration details for debugging (without exposing sensitive info)
    logStep("Configuration", { 
      supabaseUrl, 
      hasServiceKey: !!supabaseServiceKey,
    });

    // Store webhook event directly in the payment_webhook_events table
    const { data: eventData, error: eventError } = await supabase
      .from("payment_webhook_events")
      .insert([{ payload: requestData }])
      .select();

    if (eventError) {
      logStep("Error storing webhook event", eventError);
      throw new Error(`Failed to store webhook event: ${eventError.message}`);
    }

    logStep("Successfully stored webhook event", { eventId: eventData?.[0]?.id });

    // If there's a purchase_id in the requestData, update the purchase record
    if (requestData.purchase_id) {
      logStep("Updating purchase record", { purchaseId: requestData.purchase_id });
      
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
    }

    // Return success response
    logStep("Returning success response");
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Webhook received and processed",
        event_id: eventData?.[0]?.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    logStep("Error processing webhook", { message: error.message });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to process webhook" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
