import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import Meta from '../components/Meta.js'
import FormContainer from '../components/FormContainer.js';
import { login } from '../actions/userActions.js';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Meta title='SpurSoft | Sign In'/>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Enter email'
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
          />
        </Form.Group>
        <Button type='submit' className='btn btn-dark'>
          Sign In
        </Button>
      </Form>
      <Row>
        <Col>
          New Customer ?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register Here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
