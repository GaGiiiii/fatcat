import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { HeaderAuth } from '../header/HeaderAuth';
import './auth.css';
import { login, validateEmail } from '../../Helpers';
import { ApiContext, CurrentUserContext, User } from '../../App';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  let currentAction = window.location.pathname;

  const history = useHistory();
  /* In the future we should divide email & pass in their own INPUT COMPONENTS!!! */
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [fullName, setFullName] = useState<String>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailColor, setEmailColor] = useState<String>("");

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordColor, setPasswordColor] = useState<String>("");

  const [fullNameError, setFullNameError] = useState<boolean>(false);
  const [fullNameColor, setFullNameColor] = useState<String>("");

  const [wrongCombination, setWrongCombination] = useState<boolean>(false);

  const api = useContext(ApiContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  function handleLogin(event: React.FormEvent) {
    console.log("A");
    event.preventDefault();
    axios.post(`${api}/login`, { email, password }).then(response => {
      console.log(response);
      let user: User = {
        id: response.data.user.id,
        fullname: response.data.user.fullname,
        email: response.data.user.email,
        token: response.data.token,
      };
      login(user); // Add User to Local Storage
      setCurrentUser!(user); // Set Global State
      history.push('/'); // Redirect
    }).catch((error) => {
      console.log(error);
      setWrongCombination(true);
    });
  }

  function handleRegister(event: React.FormEvent) {
    console.log("Register");
    event.preventDefault();
    // axios.post(`${api}/login`, { email, password }).then(response => {
    //   console.log(response);
    //   let user: User = {
    //     id: response.data.user.id,
    //     fullname: response.data.user.fullname,
    //     email: response.data.user.email,
    //     token: response.data.token,
    //   };
    //   login(user); // Add User to Local Storage
    //   setCurrentUser!(user); // Set Global State
    //   history.push('/'); // Redirect
    // }).catch((error) => {
    //   console.log(error);
    //   setWrongCombination(true);
    // });
  }

  useEffect(() => {
    if (fullName !== '') {
      if (!(fullName.length >= 3)) {
        setFullNameError(true);
        setFullNameColor("auth-error");
      } else {
        setFullNameError(false);
        setFullNameColor("auth-success");
      }
    } else {
      setFullNameError(false);
      setFullNameColor("");
    }
  }, [fullName]);

  useEffect(() => {
    if (email !== '') {
      if (!validateEmail(email)) {
        setEmailError(true);
        setEmailColor("auth-error");
      } else {
        setEmailError(false);
        setEmailColor("auth-success");
      }
    } else {
      setEmailError(false);
      setEmailColor("");
    }
  }, [email]);

  useEffect(() => {
    if (password !== '') {
      if (!(password.length >= 5)) {
        setPasswordError(true);
        setPasswordColor("auth-error");
      } else {
        setPasswordError(false);
        setPasswordColor("auth-success");
      }
    } else {
      setPasswordError(false);
      setPasswordColor("");
    }
  }, [password]);

  return (
    <Container fluid className='px0 login-container' style={{ overflowX: 'hidden' }}>
      <Row>
        <Col>
          <HeaderAuth />
          <Container className='mt-5'>
            <Row>
              <Col>
                {wrongCombination && currentAction === '/login' && <h6 className='text-center text-danger mb-4'>Wrong Combination</h6>}
                <Form className='text-white auth-form' onSubmit={currentAction === '/login' ? handleLogin : handleRegister}>
                  {currentAction === '/register' && <Form.Group className={`mb-4 ${fullNameColor}`}>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control onChange={(e) => setFullName(e.target.value)} type="text" placeholder="John Doe" />
                    <Form.Text style={{ display: fullNameError ? 'block' : 'none' }}>The name you've entered is incorrect. Please, try again.</Form.Text>
                  </Form.Group>}
                  <Form.Group className={`mb-4 ${emailColor}`} controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@example.com" />
                    <Form.Text style={{ display: emailError ? 'block' : 'none' }}>The email you've entered is incorrect. Please, try again.</Form.Text>
                  </Form.Group>
                  <Form.Group className={`mb-5 ${passwordColor}`} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="5+ characters" />
                    <Form.Text style={{ display: passwordError ? 'block' : 'none' }}>The password you've entered is incorrect. Please, try again.</Form.Text>
                  </Form.Group>
                  <Button variant="primary" className='mt-5 w-100' type="submit">
                    {currentAction === '/login' ? 'Sign in' : 'Sign up'}
                  </Button>
                  {currentAction === '/login' && <p onClick={() => history.push('/register')} className='text-center mt-3 fw-normal'>Not a member?&nbsp; <span className='su-span'>SIGN UP</span></p>}
                  {currentAction === '/register' && <>
                    <p onClick={() => history.push('/login')} className='text-center mt-3 fw-normal'>Already a member?&nbsp; <span className='su-span'>SIGN IN</span></p>
                    <p className='agree-text text-muted text-center'>By clicking Sign up, zou agree to TIME TRACK's <br /><span className='fw-bold text-decoration-underline'>Terms and Conditions</span> and <span className='fw-bold text-decoration-underline'>Privacy Policy</span></p>
                  </>
                  }
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container >
  )
}

export default Login;