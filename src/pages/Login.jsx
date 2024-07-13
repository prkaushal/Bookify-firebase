import React , {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase} from '../context/Firebase'



const Login = () => {
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
    console.log('logging in a user');
    const result = await  firebase.signInWithEmailAndPass(email , password);
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
          Log in
        </Button>

        <h1 className="mt-5 mb-5">or</h1>

        <Button variant="danger" onClick={firebase.signinWithGoogle}>
            signin with google
        </Button>
      </Form>
    </div>
  );
};

export default Login;
