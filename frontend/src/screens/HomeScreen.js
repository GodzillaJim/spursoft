import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import Paginate from '../components/Paginate.js';
import ProductCarousel from '../components/ProductCarousel.js'
import { listProducts } from '../actions/productActions.js';
import Meta from '../components/Meta.js'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
    <Meta />
    { !keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'></Link>}
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword = {keyword ? keyword : ''}/>
        </>
      )}
    </>
  );
};

export default HomeScreen;
