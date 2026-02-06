import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { FaStar, FaRegComment, FaUser, FaCalendarAlt, FaFilm } from 'react-icons/fa';
import '../components/Movies.css'; // You'll need to create this CSS file

const notyf = new Notyf();

const MoviesPage = () => {
  const { user, token, isAdmin } = useUser();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!user || isAdmin) return;
    
    setIsLoading(true);
    fetch(`${apiUrl}/movies/getMovies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setMovies(data.movies);
        setIsLoading(false);
      })
      .catch(() => {
        notyf.error('Failed to load movies.');
        setIsLoading(false);
      });
  }, [user, token, isAdmin]);

  const handleCardClick = async (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    setIsLoadingComments(true);

    try {
      const res = await fetch(`${apiUrl}/movies/getComments/${movie._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) setComments(data.comments);
      else notyf.error(data.message || 'Failed to load comments');
    } catch (err) {
      notyf.error('Error loading comments.');
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`${apiUrl}/movies/addComment/${selectedMovie._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: newComment }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments(data.updatedMovie.comments);
        setNewComment('');
        notyf.success('Comment added!');
      } else {
        notyf.error(data.message || 'Failed to add comment');
      }
    } catch (err) {
      notyf.error('Error adding comment.');
    }
  };

  if (!user || isAdmin) {
    return (
      <Container className="unauthorized-container">
        <div className="unauthorized-content">
          <h3>Access Restricted</h3>
          <p>Please log in as a regular user to view our movie collection.</p>
          <Button variant="outline-primary" href="/login">Go to Login</Button>
        </div>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading movies...</p>
      </Container>
    );
  }

  return (
    <Container className="movies-container">
      <div className="page-header">
        <h1>Movie Collection</h1>
        <p className="subtitle">Browse our curated selection of films</p>
      </div>

      <Row className="movie-grid">
        {movies.map((movie) => (
          <Col key={movie._id} xl={3} lg={4} md={6} className="mb-4">
            <Card className="movie-card" onClick={() => handleCardClick(movie)}>
              <div className="movie-poster-container">
                <Card.Img
                  variant="top"
                  src={`https://dummyimage.com/300x450/2d2d2d/ffffff&text=${encodeURIComponent(movie.title)}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-overlay">
                  <Button variant="outline-light" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
              <Card.Body>
                <Card.Title className="movie-title">{movie.title}</Card.Title>
                <div className="movie-meta">
                  <span className="text-muted"><FaCalendarAlt /> {movie.year}</span>
                  <Badge bg="secondary" className="genre-badge">{movie.genre}</Badge>
                </div>
                <div className="movie-footer">
                  <span className="comments-count">
                    <FaRegComment /> {movie.comments?.length || 0}
                  </span>
                  <div className="rating">
                    <FaStar className="star-icon" />
                    <span>{(Math.random() * 3 + 2).toFixed(1)}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedMovie && (
        <Modal 
          show={showModal} 
          onHide={() => setShowModal(false)} 
          centered 
          size="lg"
          className="movie-modal"
        >
          <Modal.Header closeButton className="modal-header">
            <Modal.Title>
              {selectedMovie.title} 
              <span className="movie-year"> ({selectedMovie.year})</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <Row>
              <Col md={4}>
                <div className="movie-poster-modal">
                  <img
                    src={`https://dummyimage.com/300x450/2d2d2d/ffffff&text=${encodeURIComponent(selectedMovie.title)}`}
                    alt={selectedMovie.title}
                    className="img-fluid"
                  />
                </div>
              </Col>
              <Col md={8}>
                <div className="movie-details">
                  <div className="detail-item">
                    <FaUser className="detail-icon" />
                    <span className="detail-label">Director:</span>
                    <span>{selectedMovie.director}</span>
                  </div>
                  <div className="detail-item">
                    <FaFilm className="detail-icon" />
                    <span className="detail-label">Genre:</span>
                    <Badge bg="primary">{selectedMovie.genre}</Badge>
                  </div>
                  
                  <div className="synopsis-section">
                    <h5>Synopsis</h5>
                    <p className="movie-description">{selectedMovie.description || 'No description available.'}</p>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="comments-section">
              <h5 className="comments-header">
                <FaRegComment /> Comments
                <span className="comments-count">({comments.length})</span>
              </h5>
              
              <div className={`comments-list ${isLoadingComments ? 'loading' : ''}`}>
                {isLoadingComments ? (
                  <div className="text-center">
                    <Spinner animation="border" size="sm" />
                    <p>Loading comments...</p>
                  </div>
                ) : comments.length > 0 ? (
                  comments.map((c, index) => (
                    <div className="comment-item" key={index}>
                      <div className="comment-header">
                        <div className="user-avatar">
                          <FaUser />
                        </div>
                        <strong>{c.userId.email}</strong>
                      </div>
                      <div className="comment-content">
                        {c.comment}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-comments">
                    No comments yet. Be the first to share your thoughts!
                  </div>
                )}
              </div>
              
              <Form onSubmit={handleCommentSubmit} className="comment-form">
                <Form.Group controlId="commentTextarea">
                  <Form.Label>Add Your Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts about this movie..."
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="submit-comment-btn"
                  disabled={!newComment.trim()}
                >
                  Post Comment
                </Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default MoviesPage;