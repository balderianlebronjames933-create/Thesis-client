
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/ActiveOrganizations.css';

const ActiveOrganizations = () => {
    // Note: I've added a few more mock items to demonstrate the 5-column grid
    const organizations = [
        { id: 1, name: "University Supreme Student Government", image: "../assets/ussg.png", link: "/organizations/698e9d176f38fe7964f19c55" },
        { id: 2, name: "Kinesthetic Dance Troupe", image: "../assets/kdt.png", link: "/organizations/698ed4a9845bd36fa09d16e0" },
        { id: 3, name: "MUSICA", image: "../assets/musica.png", link: "/organizations/698ecefeb53a8450e5bf94e5" },
        { id: 4, name: "BITS", image: "../assets/bits.logo.png", link: "/organizations/699272cf4d749adabbef8c4f" },
        { id: 5, name: "NSO", image: "../assets/nso.logo.png", link: "/organizations/698ed9e43b16d40f30474022" },
        { id: 6, name: "PLUMA", image: "../assets/pluma.logo.png", link: "/organizations/698ed9213b16d40f30473fee" },
        { id: 7, name: "ROCK AND SALT", image: "../assets/rocksalt.logo.png", link: "/organizations/698eda1b3b16d40f30474028" },
        { id: 8, name: "VOICES", image: "../assets/voices.logo.png", link: "/organizations/699272754d749adabbef8c44" },
        { id: 9, name: "BEEEDS", image: "../assets/beeeds.logo.png", link: "/organizations/6997f92eb1e038318968d914" },
       
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