import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { HeaderAuth } from '../header/HeaderAuth';
import './login.css';
import { validateEmail } from '../../Helpers';

const Login: React.FC = () => {
  /* In the future we should divide email & pass in their own INPUT COMPONENTS!!! */
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailColor, setEmailColor] = useState<String>("");

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordColor, setPasswordColor] = useState<String>("");


  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    console.log(email);
  }

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
      if (!(password.length > 5)) {
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
                <Form className='text-white auth-form' onSubmit={handleLogin}>
                  <Form.Group className={`mb-4 ${emailColor}`} controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@example.com" />
                    <Form.Text style={{ display: emailError ? 'block' : 'none' }}>The email you've entered is incorrect. Please, try again.</Form.Text>
                  </Form.Group>
                  <Form.Group className={`mb-5 ${passwordColor}`} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="5+ characters" />
                  </Form.Group>
                  <Button variant="primary" className='mt-5 w-100' type="submit">
                    Sign in
                  </Button>
                  <p className='text-center mt-3 fw-normal'>Not a member?&nbsp; <span className='su-span'>SIGN UP</span></p>
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