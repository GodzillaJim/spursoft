import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import FormContainer from '../components/FormContainer.js';
import Meta from '../components/Meta.js';
import {
  listProductDetails,
  updateProduct,
} from '../actions/productActions.js';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants.js';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(false);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorUploading, setErrorUploading] = useState(null);
  const [productFile, setProductFile] = useState('');
  const [uploadingProduct, setUploadingProduct] = useState(false);
  const [errorUploadingProduct, setErrorUploadingProduct] = useState(false);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setProductFile(product.file);
      }
    }
  }, [
    dispatch,
    history,
    product._id,
    product.brand,
    product.category,
    product.countInStock,
    product.description,
    product.file,
    product.image,
    product.name,
    product.price,
    productId,
    successUpdate,
  ]);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setErrorUploading(null);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setErrorUploading(error.message);
    }
  };
  const uploadProductFileHandler = async (e) => {
    const productFile = e.target.files[0];
    const formData = new FormData();
    formData.append('product', productFile);
    setUploadingProduct(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload/file', formData, config);
      setProductFile(data);
      setErrorUploadingProduct(false);
      setUploadingProduct(false);
    } catch (error) {
      setUploadingProduct(false);
      setErrorUploadingProduct(error.message);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        file: productFile,
      })
    );
  };
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder='Enter product name'
                />
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  placeholder='Enter price'
                />
              </Form.Group>
              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => setImage(e.target.value)}
                  placeholder={'Enter image url'}
                  value={image}
                />
                <Form.File
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                />
                {uploading && <Loader />}
                {errorUploading && (
                  <Message variant='danger'>{errorUploading}</Message>
                )}
              </Form.Group>
              <Form.Group controlId='file'>
                <Form.Label>Product</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => setProductFile(e.target.value)}
                  placeholder={'Enter product file url'}
                  value={productFile}
                />
                <Form.File
                  id='product-file'
                  label='Choose File'
                  custom
                  onChange={uploadProductFileHandler}
                />
                {uploadingProduct && <Loader />}
                {errorUploadingProduct && (
                  <Message variant='danger'>{errorUploadingProduct}</Message>
                )}
              </Form.Group>
              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder={'Enter brand'}
                  value={brand}
                />
              </Form.Group>
              <Form.Group controlId='countInStock'>
                <Form.Label>Count in stock</Form.Label>
                <Form.Control
                  type='number'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  placeholder={'Enter count in stock'}
                />
              </Form.Group>
              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={'Enter category'}
                />
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={'Enter description'}
                  value={description}
                />
              </Form.Group>
              <Button type='submit' className='btn btn-dark'>
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
