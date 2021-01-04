import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import FormContainer from '../components/FormContainer.js';
import { getUserDetails } from '../actions/userActions.js';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
      if (user === true || !user.name || user._id !== userId) {
          dispatch(getUserDetails(userId))
      } else {
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
      }
  }, [dispatch, user, userId]);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                onChange={(e) => setIsAdmin(e.target.checked)}
                label={'Is Admin'}
                checked={isAdmin}
              />
            </Form.Group>

            <Button type='submit' className='btn btn-dark'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
