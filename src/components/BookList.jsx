import React, { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookService";
import { createOrder } from "../services/orderService";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getAllBooks().then((data) => setBooks(data));
  }, []);

  const handleQuantityChange = (bookId, value) => {
    setQuantities({
      ...quantities,
      [bookId]: value,
    });
  };

  const handleOrder = async (bookId) => {
    const quantity = quantities[bookId] || 1;

    try {
      const order = await createOrder(bookId, quantity);
      alert("Order placed successfully!");
      console.log(order);
    } catch (error) {
      console.error(error);
      alert("Order failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book List</h1>

      {books.length === 0 && <p>No books found</p>}

      {books.map((book) => (
        <div
          key={book.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{book.title}</h3>

          <p>Author: {book.author}</p>
          <p>Price: ${book.price}</p>
          <p>Seller: {book.sellerEmail}</p>

          <input
            type="number"
            min="1"
            value={quantities[book.id] || 1}
            onChange={(e) =>
              handleQuantityChange(book.id, e.target.value)
            }
            style={{ width: "60px", marginRight: "10px" }}
          />

          <button onClick={() => handleOrder(book.id)}>Order</button>
        </div>
      ))}
    </div>
  );
}