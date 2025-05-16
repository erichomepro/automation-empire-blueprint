
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
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Optional: Forward data to Make.com webhook if configured
const makeWebhookUrl = Deno.env.get("MAKE_WEBHOOK_URL") || "";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    // Parse request body
    const requestData = await req.json();
    console.log("Received webhook payload:", requestData);

    // Store webhook event directly in the payment_webhook_events table
    const { data: eventData, error: eventError } = await supabase
      .from("payment_webhook_events")
      .insert([{ payload: requestData }])
      .select();

    if (eventError) {
      console.error("Error storing webhook event:", eventError);
      throw eventError;
    }

    console.log("Successfully stored webhook event:", eventData);

    // If there's a purchase_id in the requestData, update the purchase record
    if (requestData.purchase_id) {
      const { error: purchaseError } = await supabase
        .from("ebook_purchases")
        .update({
          payment_status: 'completed',
          make_webhook_processed: true
        })
        .eq('id', requestData.purchase_id);

      if (purchaseError) {
        console.error("Error updating purchase record:", purchaseError);
        // Continue processing even if this update fails
      } else {
        console.log("Successfully updated purchase record:", requestData.purchase_id);
      }
    }

    // If Make.com webhook URL is configured, also forward the data there
    if (makeWebhookUrl) {
      try {
        console.log("Forwarding to Make.com webhook:", makeWebhookUrl);
        const makeResponse = await fetch(makeWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...requestData,
            supabase_event_id: eventData[0].id
          })
        });
        
        console.log("Make.com response status:", makeResponse.status);
      } catch (makeError) {
        console.error("Error forwarding to Make.com:", makeError);
        // Don't throw error here, as we've already stored the event in our database
      }
    }

    // Return success response
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
    console.error("Error processing webhook:", error);
    
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
