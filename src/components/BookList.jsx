import React, { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookService";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks().then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.length === 0 && <li>No books found</li>}
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} - ${book.price} <br />
            Seller: {book.sellerEmail}
          </li>
        ))}
      </ul>
    </div>
  );
}