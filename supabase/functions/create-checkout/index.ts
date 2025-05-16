
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Helper function for logging
const logStep = (step: string, details?: any) => {
  console.log(`[CREATE-CHECKOUT] ${step}${details ? ': ' + JSON.stringify(details) : ''}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    logStep("Request received");
    
    // Parse request body
    const { productId, customerName, customerEmail } = await req.json();
    logStep("Request data", { productId, customerName, customerEmail });
    
    if (!productId || !customerName || !customerEmail) {
      throw new Error("Missing required fields: productId, customerName, customerEmail");
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get product details from Supabase
    const { data: product, error: productError } = await supabase
      .from("ebook_products")
      .select("*")
      .eq("id", productId)
      .maybeSingle();
    
    if (productError || !product) {
      logStep("Error fetching product", productError || "Product not found");
      throw new Error("Failed to fetch product details");
    }

    // Initialize Stripe with secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    logStep("Stripe initialized");

    // Create a pending purchase record in Supabase
    const { data: purchaseData, error: purchaseError } = await supabase
      .from("ebook_purchases")
      .insert([{
        customer_name: customerName,
        customer_email: customerEmail,
        product_id: productId,
        amount: product.price,
        payment_status: "pending"
      }])
      .select()
      .single();
    
    if (purchaseError || !purchaseData) {
      logStep("Error creating purchase record", purchaseError);
      throw new Error("Failed to create purchase record");
    }
    
    logStep("Purchase record created", { purchaseId: purchaseData.id });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              description: product.description || "Digital Product",
            },
            unit_amount: Math.round(product.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?reference=${purchaseData.id}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
      client_reference_id: purchaseData.id,
      customer_email: customerEmail,
      metadata: {
        purchase_id: purchaseData.id,
        product_id: productId,
      },
    });

    logStep("Stripe session created", { sessionId: session.id });

    // Update purchase record with Stripe session ID
    await supabase
      .from("ebook_purchases")
      .update({ payment_id: session.id })
      .eq("id", purchaseData.id);

    // Return checkout session URL
    return new Response(
      JSON.stringify({ 
        success: true,
        checkoutUrl: session.url,
        purchaseId: purchaseData.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    logStep("Error", { message: error.message });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to create checkout session" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
