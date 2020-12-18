import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className = 'text-center py-3 text-secondary' >
                        Copyright &copy; SpurSoft
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
