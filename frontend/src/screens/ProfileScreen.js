import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { getUserDetails, userUpdateProfile } from '../actions/userActions.js';
import { listMyOrders } from '../actions/orderActions.js'


const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdatedProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdatedProfile;

  useEffect(() => {
    if (!userInfo || !user) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders())
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, user, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // dispatch update profile
      dispatch(userUpdateProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>USER PROFILE</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='success'>{'Profile updated successfully'}</Message>
        )}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Enter your name'
            />
          </Form.Group>
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
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={confirmPassword}
              type='password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm password'
            />
          </Form.Group>
          <Button type='submit' className='btn btn-dark'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>MY ORDERS</h2>
        {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
          <Table striped bordered hover responsive className = 'table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map( order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                    <i className='fas fa-times' style={{color: 'red'}}></i>
                  )}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                    <i className='fas fa-times' style={{color: 'red'}}></i>
                  )}</td>
                  <td>
                    <LinkContainer to = {`/order/${order._id}`}>
                      <Button className = 'btn-sm' variant='light'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
