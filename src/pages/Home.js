import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaSearch, FaUsers } from 'react-icons/fa';
import '../components/Home.css'; // You'll need to create this CSS file

const Home = () => {
  // Sample featured movies - replace with your actual data
  const featuredMovies = [
    { id: 1, title: "Dune: Part Two", year: 2024, genre: "Sci-Fi", rating: 4.8 },
    { id: 2, title: "The Godfather", year: 1972, genre: "Crime", rating: 4.9 },
    { id: 3, title: "Parasite", year: 2019, genre: "Thriller", rating: 4.7 }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-content">
          <h1>Discover Your Next Favorite Movie</h1>
          <p className="lead">Honest reviews from real movie lovers</p>
          <div className="search-bar">
            <input type="text" placeholder="Search for movies, reviews..." />
            <Button as={Link} to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" variant="primary">
              <FaSearch /> Search
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <Card className="feature-card">
                <div className="feature-icon">
                  <FaStar />
                </div>
                <Card.Body>
                  <h3>Expert Reviews</h3>
                  <p>In-depth analysis from our team of movie enthusiasts and critics.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card">
                <div className="feature-icon">
                  <FaUsers />
                </div>
                <Card.Body>
                  <h3>Community Ratings</h3>
                  <p>See what real viewers think with our community rating system.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card">
                <div className="feature-icon">
                  <FaPlay />
                </div>
                <Card.Body>
                  <h3>Latest Trailers</h3>
                  <p>Stay updated with the newest movie trailers and releases.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Movies Section */}
      <section className="featured-movies">
        <Container>
          <h2 className="section-title">Featured Movies</h2>
          <Row className="g-4">
            {featuredMovies.map(movie => (
              <Col key={movie.id} lg={4} md={6}>
                <Card className="movie-card">
                    <div className="movie-poster">
                      <img
                        src={"https://placehold.co/300x450?text=No+Image"}
                        alt={movie.title}
                        className="poster-img"
                      />
                      <div className="movie-rating">
                        <FaStar /> {movie.rating}
                      </div>
                      <div className="movie-overlay">
                        <Button as={Link} to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" variant="outline-light">View Review</Button>
                      </div>
                    </div>

                  <Card.Body>
                    <h3>{movie.title}</h3>
                    <div className="movie-meta">
                      <span>{movie.year}</span>
                      <span className="genre">{movie.genre}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button as={Link} to="/movies" variant="outline-primary" size="lg">
              Browse All Movies
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <h2>Join Our Community</h2>
          <p>Share your thoughts and connect with other movie lovers</p>
          <div className="cta-buttons">
            <Button as={Link} to="/register" variant="primary" size="lg">Sign Up</Button>
            <Button as={Link} to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" variant="outline-light" size="lg">Learn More</Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;