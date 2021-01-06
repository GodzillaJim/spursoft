import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
        history.push(`/search/${keyword}`)
    } else {
        history.push('/')
    }
  };
  return (
    <Form onSubmit={submitHandler} inline> 
      <Form.Group controlId='search'>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Product'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      </Form.Group>
      <Form.Group controlId='submit-search'>
      <Button type='submit' variant='outline' className='p-2'>
        <i className='fas fa-search' style={{color: 'white'}}></i>
      </Button>
      </Form.Group>
    </Form>
  );
};

export default SearchBox;
