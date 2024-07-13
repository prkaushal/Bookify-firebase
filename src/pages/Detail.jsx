import React , {useEffect , useState} from 'react'
import { useParams , useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const DetailPage = () => {
    const params = useParams();
    const firebase = useFirebase();
    const navigate = useNavigate();


    const [qty, setQty] = useState(1);
    const [url, setURL] = useState(null);
    const [data, setData] = useState(null);

    console.log(params);

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()));
    }, [])

    useEffect(() => {
        if(data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then((url) => setURL(url));
        }
    }, [data]);

    const placeOrder = async () => {
      const result = await firebase.placeOrder(params.bookId, qty);
      console.log("Order Placed", result);
      alert("order successfull");
      navigate("/");
      
    };


    if(data == null) return <h1>Loading...</h1>
  return (
    <div className='container'>
    <h1>{data.name}</h1>
    <img src={url} width="50%" style={{ borderRadius: "10px" }} />
    <h1>Details</h1>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number. {data.isbn}</p>
      <h1>Owner Details</h1>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Qty</Form.Label>
      <Form.Control
        onChange={(e) => setQty(e.target.value)}
        value={qty}
        type="Number"
        placeholder="Enter Qty"
      />
    </Form.Group>
      <Button onClick={placeOrder}>Buy Now</Button>
    </div>
  )
}

export default DetailPage;