import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../css/HeroSection.css'; 

const HeroSection = () => {
    return (
        <div className="hero-container">
            <div className="hero-overlay">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={10}>
                            <h1 className="hero-title mb-4">
                                UNIVERSITY NETWORK OF INTEREST IN TEAMS AND ENGAGEMENTS
                            </h1>
                            <p className="hero-subtitle mb-5">
                                A WEBSITE FOR STUDENT ORGANIZATIONS IN UNIVERSITY OF RIZAL SYSTEM-TAYTAY
                            </p>
                            {/* <div className="hero-btns">
                                <Button variant="primary" size="lg" className="mx-2 shadow">
                                    Get Started
                                </Button>
                                <Button variant="outline-light" size="lg" className="mx-2 shadow">
                                    Learn More
                                </Button>
                            </div> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default HeroSection;