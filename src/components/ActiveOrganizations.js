import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';
import '../css/ActiveOrganizations.css';

const ActiveOrganizations = () => {
    const organizations = [
        {
            id: 1,
            name: "Central Student Councittttttttl",
            description: "The highest governing body of the student population in URS-Taytay.",
            image: "https://placehold.co/600x400?text=CSC+Logo",
            link: "/organizations/csc"
        },
        {
            id: 2,
            name: "Computer Studies Society",
            description: "Dedicated to fostering technical skills and innovation among IT students.",
            image: "https://placehold.co/600x400?text=COMPSS+Logo",
            link: "/organizations/compss"
        },
        {
            id: 3,
            name: "Junior Marketing Association",
            description: "Preparing future marketers through seminars, workshops, and networking.",
            image: "https://placehold.co/600x400?text=JMA+Logo",
            link: "/organizations/jma"
        }
    ];

    return (
        <section className="active-orgs-section py-5">
            <Container>
                <div className="section-header text-center mb-5">
                    <h2 className="fw-bold">Active Organizations</h2>
                    <p className="text-muted">Explore the diverse teams and communities within our campus.</p>
                </div>
                <Row className="g-4">
                    {organizations.map((org) => (
                        <Col key={org.id} lg={4} md={6}>
                            <Card className="org-card h-100 shadow-sm border-0">
                                <div className="org-image-wrapper">
                                    <Card.Img variant="top" src={org.image} alt={org.name} />
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold">{org.name}</Card.Title>
                                    <Card.Text className="text-secondary flex-grow-1">
                                        {org.description}
                                    </Card.Text>
                                    <Button 
                                        href={org.link} 
                                        variant="outline-primary" 
                                        className="mt-3 d-flex align-items-center justify-content-center gap-2"
                                    >
                                        Visit Page <FaExternalLinkAlt size={14} />
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default ActiveOrganizations;