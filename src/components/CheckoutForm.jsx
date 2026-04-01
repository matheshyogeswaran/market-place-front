import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret, onPaymentSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setLoading(false);

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        onPaymentSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
        padding: "20px", 
        border: "1px solid #6772e5", 
        borderRadius: "8px",
        background: "#fff" 
    }}>
      <h3 style={{ marginTop: 0 }}>Enter Card Details</h3>
      <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button type="submit" disabled={!stripe || loading} style={{
          backgroundColor: "#6772e5", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer"
      }}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "10px", background: "none", border: "none", color: "red", cursor: "pointer" }}>
        Cancel
      </button>
    </form>
  );
}