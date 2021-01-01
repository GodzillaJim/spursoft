import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'

const App = () => {
  return (
    <Router>
      <Header />
      <main className = 'py-3'>
        <Container>
          <Route path='/payment' component={PaymentScreen}/>
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path='/shipping' component={ShippingScreen}/>
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route exact path='/product/:id' component={ProductScreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route exact path='/' component={HomeScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
