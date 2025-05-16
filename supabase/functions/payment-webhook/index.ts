
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Create a Supabase client with the service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Optional: Forward data to Make.com webhook if configured
const makeWebhookUrl = Deno.env.get("MAKE_WEBHOOK_URL") || "";

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
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    logStep("Request received");
    
    // Parse request body
    const requestData = await req.json();
    logStep("Received webhook payload", requestData);

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
        // Don't throw here - we already stored the event data
        console.error("Error updating purchase record:", purchaseError);
      } else {
        logStep("Successfully updated purchase record", { purchaseId: requestData.purchase_id });
      }
    }

    // If Make.com webhook URL is configured, also forward the data there
    if (makeWebhookUrl) {
      try {
        logStep("Forwarding to Make.com webhook", { url: makeWebhookUrl });
        const makeResponse = await fetch(makeWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...requestData,
            supabase_event_id: eventData?.[0]?.id
          })
        });
        
        logStep("Make.com response status", { status: makeResponse.status });
      } catch (makeError) {
        logStep("Error forwarding to Make.com", makeError);
        // Don't throw here - we already stored the event in our database
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
