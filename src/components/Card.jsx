import React, {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import { useFirebase } from '../context/Firebase';



const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [url , setURL] = useState(null);

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url));
    } , []);

    console.log(props);


  return (
    <Card style={{ width: '18rem' , margin : "10px" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title. this book is written by {props.displayName} and this book costs Rs. {props.price}
        </Card.Text>
        <Button variant="primary" onClick={(e) => navigate(props.link)}>View</Button>
      </Card.Body>
    </Card>
  )
}

export default BookCard;