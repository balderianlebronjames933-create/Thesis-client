
import { Modal, Button, Badge, Row, Col } from 'react-bootstrap';
import {  FaMapMarkerAlt, FaUser, FaClock } from 'react-icons/fa';
import CommentSection from './CommentSection';


const PostViewModal = ({ show, onHide, post, notyf }) => {
    if (!post) return null;

    const isEvent = post.type === 'event';


    return (
        <Modal show={show} onHide={onHide} size="xl" centered scrollable>
            <Modal.Header closeButton className="border-0 py-3 bg-primary bg-opacity-50">
                <Modal.Title className="d-flex text-white align-items-center fw-semibold">Post Details</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 bg-primary bg-opacity-10">
                <Row className="g-4">
                    {/* LEFT COLUMN: Post Details (Wider) */}
                    <Col lg={7} xl={8} className="border-end-lg">
                        {post.image && (
                            <img
                                src={post.image}
                                alt={post.title}
                                className="img-fluid rounded-4 mb-4 w-100 shadow-sm"
                                style={{ maxHeight: '450px', objectFit: 'cover' }}
                            />
                        )}

                        <h2 className="fw-bold mb-1">{post.title}</h2>

                        <div className="d-flex flex-wrap gap-3 my-2 text-muted small border-bottom pb-3">
                            <Badge bg={isEvent ? "danger" : "primary"} className="text-uppercase px-3 py-2 rounded-pill">
                                {post.type}
                            </Badge>
                            {/* Organization Info - Matching your backend populate("organization") */}
                            {post.organization && (
                                <div className="d-flex align-items-center">
                                    <span className="badge bg-light text-dark border d-flex align-items-center px-2 py-1 shadow-sm">
                                        {post.organization.logo && (
                                            <img
                                                src={post.organization.logo}
                                                alt="org logo"
                                                className="rounded-circle me-1"
                                                style={{ width: '16px', height: '16px', objectFit: 'cover' }}
                                            />
                                        )}
                                        <span className="fw-semibold text-primary">{post.organization.name}</span>
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Metadata Bar */}
                        <div className="d-flex flex-wrap gap-3 mb-2 text-muted small border-bottom pb-3">
                            <div className="d-flex align-items-center">
                                <FaUser className="me-1 text-primary" />
                                <span>{post.author?.firstName} {post.author?.lastName}</span>
                            </div>

                            <div className="d-flex align-items-center">
                                <FaClock className="me-1 text-warning" />
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>


                            {isEvent && (
                                <div className="d-flex align-items-center">
                                    <FaMapMarkerAlt className="me-1 text-success" />
                                    <span>{post.location || "TBA"}</span>
                                </div>
                            )}
                        </div>

                        <div className="post-content px-1 mb-1" style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>
                            {post.content}
                        </div>
                    </Col>

                    {/* RIGHT COLUMN: Comments (Sticky on scroll) */}
                    <Col lg={5} xl={4}>
                        <div className="sticky-top" style={{ top: '0px' }}>
                            <CommentSection postId={post._id} notyf={notyf} />
                        </div>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer className="border-0 bg-primary bg-opacity-10">
                <Button variant="secondary" onClick={onHide} className="rounded-pill px-4">Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PostViewModal;