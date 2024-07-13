import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {useFirebase} from "../context/Firebase";

const ListingPage = () => {
  const firebase = useFirebase();

    const [name , setName] = useState('');
    const [isbnNumber , setIsbnNumber] = useState('');
    const [price , setPrice] = useState("");
    const [coverPic , setCoverPic] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      await firebase.handleCreateNewListing(name , isbnNumber , price , coverPic);
      alert("listed successfully");
    }


  return (
    <div>
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book name</Form.Label>
          <Form.Control type="text" placeholder="Enter Book name" value={name} onChange={(e) => setName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN number</Form.Label>
          <Form.Control type="number" placeholder="ISBN number" value={isbnNumber} onChange={(e) => setIsbnNumber(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Book Cover</Form.Label>
          <Form.Control type="file" value={coverPic} onChange={(e) => setCoverPic(e.target.value)}/>
        </Form.Group>
        
        <Button variant="primary" type="submit" >
          List Book
        </Button>


      </Form>
    </div>
  )
}

export default ListingPage;