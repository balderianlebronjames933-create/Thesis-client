import  { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import '../css/Home.css';
import HeroSection from '../components/HeroSection';
import ActiveOrganizations from '../components/ActiveOrganizations';
import NewsEvents from '../components/NewsEvents';
import Footer from '../components/Footer';
import FeaturedCarousel from '../components/FeaturedCarousel';
import InstitutionalPillars from '../components/InstitutionalPillars';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error("Failed to fetch");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [token]);

    return (
        <div className="home-wrapper">
            {/*  Hero Section */}
            <HeroSection />

            {/* Featured Carousel */}
            <FeaturedCarousel posts={posts} isLoading={loading} />

            {/* Active Organizations Section */}
            <ActiveOrganizations />
            <section className="cta-section py-5 bg-primary text-white text-center">
                <Container>
                    <h2 className="fw-bold">Ready to make an impact?</h2>
                    <p className="mb-4">Join an organization today and enhance your university life.</p>
                    <Button as="a" href="/organizations" variant="light" size="lg" className="rounded-pill px-5">
                        Browse All Orgs
                    </Button>
                </Container>
            </section>

            {/*  News & Events Section */}
            <NewsEvents />

            {/*  Institutional Pillars Section */}
            <InstitutionalPillars />


            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;