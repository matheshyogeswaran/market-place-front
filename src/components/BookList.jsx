import React, { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookService";
import { createOrder } from "../services/orderService";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    getAllBooks().then((data) => setBooks(data));
  }, []);

  const handleQuantityChange = (bookId, value) => {
    setQuantities({ ...quantities, [bookId]: parseInt(value) });
  };

const startCheckout = async (book) => {
    const qty = quantities[book.id] || 1;
    const token = localStorage.getItem("jwtToken"); 

    try {
      // 1. Create the Order first
      const orderResponse = await createOrder(book.id, qty);
      const orderId = orderResponse.id;

      // Debugging: Log the actual values being sent
      console.log("Sending to Payment API:", {
          orderId: orderId,
          bookId: book.id,
          quantity: qty,
          price: book.price,
          tokenExists: !!token
      });

      // 2. Call Payment Intent
      const response = await axios.post(
        `http://localhost:8083/api/payments/create-payment-intent?orderId=${orderId}`,
        {
          bookId: book.id,
          quantity: qty,
          price: book.price
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}` // Ensure there is a SPACE after Bearer
          } 
        }
      );

      setPaymentData({ 
        clientSecret: response.data.clientSecret, 
        orderId: orderId 
      });

    } catch (error) {
      console.error("Checkout initialization failed:", error.response?.data || error.message);
      alert("Unauthorized or Server Error. Check if you are logged in as a BUYER.");
    }
  };

const handleSuccessfulPayment = async () => {
   try {
        const token = localStorage.getItem("jwtToken");
        
        // 4. Update the DB status using your backend markOrderPaid method
        // URL matches: @PutMapping("/{orderId}/mark-paid")
        await axios.put(
            `http://localhost:8083/api/orders/${paymentData.orderId}/mark-paid`, 
            {}, 
            { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Payment confirmed! Your order is now PAID.");
        setPaymentData(null);
        // Optional: window.location.reload(); or redirect to orders page
    } catch (error) {
        console.error("Failed to update status:", error);
        alert("Payment succeeded, but database update failed.");
    }
};

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Book Store</h1>

      {/* Overlay Payment UI if paymentData exists */}
      {paymentData && (
        <div style={{ 
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%", 
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 
        }}>
          <div style={{ width: "400px" }}>
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                clientSecret={paymentData.clientSecret} 
                onPaymentSuccess={handleSuccessfulPayment}
                onCancel={() => setPaymentData(null)}
              />
            </Elements>
          </div>
        </div>
      )}

      {books.length === 0 && <p>Loading books...</p>}

      {books.map((book) => (
        <div key={book.id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "10px", borderRadius: "8px" }}>
          <h3>{book.title}</h3>
          <p>Author: {book.author} | Price: <strong>${book.price}</strong></p>
          
          <div style={{ marginTop: "10px" }}>
            <input
              type="number"
              min="1"
              value={quantities[book.id] || 1}
              onChange={(e) => handleQuantityChange(book.id, e.target.value)}
              style={{ width: "50px", padding: "5px", marginRight: "10px" }}
            />
            <button 
              onClick={() => startCheckout(book)}
              style={{ padding: "6px 15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}