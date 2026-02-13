import React from 'react';
import { Container, Button } from 'react-bootstrap';
import '../css/Home.css'; 
import HeroSection from '../components/HeroSection';
import ActiveOrganizations from '../components/ActiveOrganizations';
import NewsEvents from '../components/NewsEvents';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="home-wrapper">
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Active Organizations Section */}
            <ActiveOrganizations />

              {/* 3. News & Events Section */}
            <NewsEvents />

            {/* 4. CTA Section */}
            <section className="cta-section py-5 bg-primary text-white text-center">
                <Container>
                    <h2 className="fw-bold">Ready to make an impact?</h2>
                    <p className="mb-4">Join an organization today and enhance your university life.</p>
                    <Button variant="light" size="lg" className="rounded-pill px-5">
                        Browse All Orgs
                    </Button>
                </Container>
            </section>

            {/* 5. Footer */}
            <Footer />
        </div>
    );
};

export default Home;