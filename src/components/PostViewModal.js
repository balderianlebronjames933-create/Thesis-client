import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaClock } from 'react-icons/fa';

const PostViewModal = ({ show, onHide, post }) => {
    if (!post) return null;

    const isEvent = post.type === 'event';
    const eventDate = post.eventDate ? new Date(post.eventDate) : null;

    return (
        <Modal show={show} onHide={onHide} size="lg" centered scrollable>
            <Modal.Header closeButton className="border-0">
                <Badge bg={isEvent ? "danger" : "primary"} className="text-uppercase">
                    {post.type}
                </Badge>
            </Modal.Header>
            <Modal.Body className="px-4 pb-4">
                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="img-fluid rounded-4 mb-4 w-100 shadow-sm"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                )}

                <h2 className="fw-bold mb-3">{post.title}</h2>

                <div className="d-flex flex-wrap gap-3 mb-4 text-muted small border-bottom pb-3">
                    {/* Author Info */}
                    <div className="d-flex align-items-center">
                        <FaUser className="me-2 text-primary" />
                        <span>{post.author?.firstName} {post.author?.lastName}</span>
                    </div>

                    {/* Posted Date */}
                    <div className="d-flex align-items-center">
                        <FaClock className="me-2 text-warning" />
                        <span>Posted on {new Date(post.createdAt).toLocaleDateString([], {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}</span>
                    </div>

                    {isEvent && eventDate && (
                        <>
                            <div className="d-flex align-items-center">
                                <FaCalendarAlt className="me-2 text-danger" />
                                <span>{eventDate.toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <FaMapMarkerAlt className="me-2 text-success" />
                                <span>{post.location || "TBA"}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="post-content px-1" style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>
                    {post.content}
                </div>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="secondary" onClick={onHide} className="rounded-pill px-4">Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PostViewModal;