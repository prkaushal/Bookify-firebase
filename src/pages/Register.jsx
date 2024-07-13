import React , {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase} from '../context/Firebase'



const Register = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();


  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  useEffect(() => {
    if(firebase.isLoggedIn) {
        // navigate to home
        navigate('/');
    }
  } , [firebase , navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('signing up a user');
    const result = await  firebase.signupUserWithEmailAndPassword(email , password);
    console.log("successful" , result);
  }
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        
        <Button variant="primary" type="submit" >
          create Account
        </Button>
      </Form>
    </div>
  );
};

export default Register;
