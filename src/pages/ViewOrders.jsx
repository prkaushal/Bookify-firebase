import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";

const ViewOrders = () => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if(firebase.isLoggedIn)
    firebase.fetchMyBooks(firebase.user.uid)?.then((books) => setBooks(books.docs));
  }, [firebase]);

  console.log("books are -" ,books);
 

  if (!firebase.isLoggedIn) return <h1>Please log In</h1>;

    return (
    <div>
    {books.map((book) => (
        <BookCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    
    </div>
  );
};

export default ViewOrders;
