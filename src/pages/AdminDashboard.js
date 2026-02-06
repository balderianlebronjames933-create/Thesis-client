import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Card, Badge, Table, Modal } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { FiPlus, FiFilm, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import MovieModal from '../components/MovieModal';
import CommentsModal from '../components/CommentsModal';
import '../components/AdminDashboard.css';

const notyf = new Notyf({
  duration: 3000,
  position: { x: 'right', y: 'top' }
});

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedMovieComments, setSelectedMovieComments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setMovies(data.movies || []);
    } catch (err) {
      notyf.error('Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMovie = async (movie) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/addMovie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(movie)
      });
      if (res.ok) {
        notyf.success('Movie added successfully');
        fetchMovies();
      } else throw new Error();
    } catch {
      notyf.error('Failed to add movie');
    } finally {
      setIsProcessing(false);
      setShowModal(false);
    }
  };

  const handleUpdateMovie = async (movie) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/updateMovie/${selectedMovie._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(movie)
      });
      if (res.ok) {
        notyf.success('Movie updated successfully');
        fetchMovies();
      } else throw new Error();
    } catch {
      notyf.error('Failed to update movie');
    } finally {
      setIsProcessing(false);
      setShowModal(false);
      setSelectedMovie(null);
    }
  };

	  const confirmDeleteMovie = (movie) => {
	    setMovieToDelete(movie);
	    setShowDeleteModal(true);
	  };

	  const handleConfirmDelete = async () => {
	    setShowDeleteModal(false);
	    if (!movieToDelete) return;

	    try {
	      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/deleteMovie/${movieToDelete._id}`, {
	        method: 'DELETE',
	        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
	      });
	      if (res.ok) {
	        notyf.success('Movie deleted successfully');
	        fetchMovies();
	      } else throw new Error();
	    } catch {
	      notyf.error('Failed to delete movie');
	    } finally {
	      setMovieToDelete(null);
	    }
	  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container fluid className="admin-dashboard py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold mb-0">Movie Management</h2>
            <Button 
              variant="primary" 
              onClick={() => setShowModal(true)}
              className="d-flex align-items-center"
            >
              <FiPlus className="me-2" />
              Add Movie
            </Button>
          </div>
          <p className="text-muted">Manage your movie catalog</p>
        </Col>
      </Row>

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading movies...</p>
        </div>
      ) : movies.length === 0 ? (
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <FiFilm size={48} className="text-muted mb-3" />
            <h5>No movies found</h5>
            <p className="text-muted">Add your first movie to get started</p>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <FiPlus className="me-2" />
              Add Movie
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Year</th>
                    <th>Genre</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie._id}>
                      <td className="fw-semibold">{movie.title}</td>
                      <td>{movie.director}</td>
                      <td>{movie.year}</td>
                      <td>
                        <Badge bg="info" className="text-capitalize">
                          {movie.genre}
                        </Badge>
                      </td>
                      <td>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 text-decoration-none"
                          onClick={() => {
                            setSelectedMovieComments(movie.comments || []);
                            setShowCommentsModal(true);
                          }}
                        >
                          {movie.comments?.length || 0} <FiEye className="ms-1" />
                        </Button>
                      </td>
                      <td>
                        <Button 
                          variant="outline-warning" 
                          size="sm" 
                          className="me-2"
                          onClick={() => {
                            setSelectedMovie(movie);
                            setShowModal(true);
                          }}
                        >
                          <FiEdit />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => confirmDeleteMovie(movie)}
                        >
                          <FiTrash2 />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}


		{/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the movie <strong>{movieToDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <MovieModal 
        show={showModal} 
        onHide={() => {
          setShowModal(false);
          setSelectedMovie(null);
        }} 
        onSave={selectedMovie ? handleUpdateMovie : handleAddMovie}
        movieData={selectedMovie}
        isProcessing={isProcessing}
      />

      <CommentsModal 
        show={showCommentsModal} 
        onHide={() => setShowCommentsModal(false)} 
        comments={selectedMovieComments}
      />
    </Container>
  );
};

export default AdminDashboard;
