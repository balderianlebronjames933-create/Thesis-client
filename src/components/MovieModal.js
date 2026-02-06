import React, { useEffect, useState } from 'react';
import { Modal, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FiEdit, FiPlus, FiFilm, FiUser, FiCalendar, FiAlignLeft, FiTag } from 'react-icons/fi';

const MovieModal = ({ show, onHide, onSave, movieData, isProcessing }) => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    description: '',
    genre: ''
  });

  useEffect(() => {
    if (movieData) {
      setFormData(movieData);
    } else {
      setFormData({
        title: '',
        director: '',
        year: '',
        description: '',
        genre: ''
      });
    }
  }, [movieData]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold">
          {movieData ? (
            <>
              <FiEdit className="me-2" />
              Update Movie
            </>
          ) : (
            <>
              <FiPlus className="me-2" />
              Add New Movie
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  <FiFilm className="me-2" />
                  Title
                </Form.Label>
                <Form.Control 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter movie title"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  <FiUser className="me-2" />
                  Director
                </Form.Label>
                <Form.Control 
                  name="director" 
                  value={formData.director} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter director name"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  <FiCalendar className="me-2" />
                  Year
                </Form.Label>
                <Form.Control 
                  type="number" 
                  name="year" 
                  value={formData.year} 
                  onChange={handleChange} 
                  required 
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="Release year"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  <FiTag className="me-2" />
                  Genre
                </Form.Label>
                <Form.Control 
                  name="genre" 
                  value={formData.genre} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g., Action, Drama, Comedy"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  <FiAlignLeft className="me-2" />
                  Description
                </Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  required 
                  placeholder="Movie plot summary"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" onClick={onHide} disabled={isProcessing}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                {movieData ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              movieData ? 'Update Movie' : 'Add Movie'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MovieModal;
