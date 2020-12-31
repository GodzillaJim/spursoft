import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer.js'
import { register } from '../actions/userActions.js'

const RegisterScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(()=>{
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        }else if (password.length < 6){
            setMessage('Password must be atleast 6 characters long')
        }else{
            dispatch(register(name, email, password))
        }
        // dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{ message }</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId = 'name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' onChange = {(e) => setName(e.target.value)} value ={name} placeholder ='Enter your name'/>
                </Form.Group>
                <Form.Group controlId = 'email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' onChange = {(e) => setEmail(e.target.value)} value ={email} placeholder ='Enter email'/>
                </Form.Group>
                <Form.Group controlId = 'password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} type='password' onChange = {(e) => setPassword(e.target.value)} placeholder ='Enter password'/>
                </Form.Group>
                <Form.Group controlId = 'confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control value={ confirmPassword } type='password' onChange = {(e) => setConfirmPassword(e.target.value)} placeholder ='Confirm password'/>
                </Form.Group>
                <Button type='submit' className = 'btn btn-dark'>
                    Register
                </Button>
            </Form>
            <Row>
                <Col>
                    Have an Account ? <Link to = { redirect ? `/login?redirect=${redirect}`: '/login'}>Login Here</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
