import React from 'react';
import { Modal, ListGroup } from 'react-bootstrap';
import { FiMessageSquare } from 'react-icons/fi';

const CommentsModal = ({ show, onHide, comments }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold">
          <FiMessageSquare className="me-2" />
          Movie Comments
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {comments?.length > 0 ? (
          <ListGroup variant="flush">
            {comments.map((comment, index) => (
              <ListGroup.Item key={index} className="border-0 px-0 py-2">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <p><strong>{comment.userId?.email}</strong>: {comment.comment}</p>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <div className="text-center py-3">
            <FiMessageSquare size={32} className="text-muted mb-2" />
            <p>No comments yet</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CommentsModal;
