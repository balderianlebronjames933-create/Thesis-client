import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/ActiveOrganizations.css';

const ActiveOrganizations = () => {
    // Note: I've added a few more mock items to demonstrate the 5-column grid
    const organizations = [
        { id: 1, name: "University Supreme Student Government", image: "../assets/fes.png", link: "/organizations/698e9d176f38fe7964f19c55" },
        { id: 2, name: "Computer Studies Society", image: "https://placehold.co/200x200?text=COMPSS", link: "/organizations/compss" },
        { id: 3, name: "Junior Marketing Association", image: "https://placehold.co/200x200?text=JMA", link: "/organizations/jma" },
        { id: 4, name: "Engineering Society", image: "https://placehold.co/200x200?text=ES", link: "/organizations/eng" },
        { id: 5, name: "Arts & Sciences Guild", image: "https://placehold.co/200x200?text=ASG", link: "/organizations/asg" },
        { id: 6, name: "Red Cross Youth", image: "https://placehold.co/200x200?text=RCY", link: "/organizations/rcy" },
        { id: 7, name: "LIT Society", image: "https://placehold.co/200x200?text=LIT", link: "/organizations/lit" },
        { id: 8, name: "Sports Council", image: "https://placehold.co/200x200?text=SC", link: "/organizations/sports" },
        { id: 9, name: "Dance Troupe", image: "https://placehold.co/200x200?text=DT", link: "/organizations/dance" },
        { id: 10, name: "Debate Society", image: "https://placehold.co/200x200?text=DS", link: "/organizations/debate" },
    ];

    return (
        <section className="active-orgs-section py-5 bg-light">
            <Container>
                <div className="section-header text-center mb-5">
                    <h2 className="fw-bold">Active Organizations</h2>
                    <p className="text-muted">Join the vibrant communities within our campus.</p>
                </div>

                {/* row-cols-2: 2 columns on mobile 
                  row-cols-lg-5: 5 columns on desktop 
                */}
                <Row className="row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
                    {organizations.map((org) => (
                        <Col key={org.id}>
                            <Link to={org.link} className="text-decoration-none">
                                <Card className="h-100 border-0 bg-transparent text-center org-hover-effect">
                                    <div className="d-flex justify-content-center mb-3">
                                        {/* Circular Holder */}
                                        <div 
                                            className="rounded-circle shadow-sm bg-black d-flex align-items-center justify-content-center overflow-hidden"
                                            style={{ width: '120px', height: '120px', transition: 'all 0.3s ease' }}
                                        >
                                            <img 
                                                src={org.image} 
                                                alt={org.name} 
                                                className="img-fluid"
                                                style={{ width: '*100%', height: '100%', objectFit: 'contain', borderRadius: '100%' }}
                                            />
                                        </div>
                                    </div>
                                    <Card.Body className="p-0">
                                        <Card.Title 
                                            className="fw-bold text-dark small text-uppercase" 
                                            style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}
                                        >
                                            {org.name}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default ActiveOrganizations;