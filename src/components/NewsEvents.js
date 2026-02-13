import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaNewspaper, FaArrowRight } from 'react-icons/fa';
import PostViewModal from './PostViewModal';
import '../css/NewsEvents.css';

const NewsEvents = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleShowPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  // LOGIC: Get latest 2 News
  const latestNews = posts
    .filter(post => post.type === 'news')
    .slice(0, 2);

  // LOGIC: Get latest 3 Upcoming Events (based on eventDate)
  const upcomingEvents = posts
    .filter(post => post.type === 'event' && new Date(post.eventDate) >= new Date())
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)) // Closest date first
    .slice(0, 4);

  if (loading) return <div className="text-center py-5">Loading Campus Updates...</div>;

  return (
    <section className="news-events-section py-5 bg-light">
      <Container>
        <Row className="g-5">
          {/* Latest News Column */}
          <Col lg={8}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <FaNewspaper className="me-2 text-primary" size={24} />
                <h2 className="fw-bold mb-0">Latest News</h2>
              </div>
              <Link to="/news" className="text-primary text-decoration-none fw-bold small">
                See More News <FaArrowRight size={12} className="ms-1" />
              </Link>
            </div>
            {latestNews.map(item => (
              <Card
                key={item._id}
                className="news-card mb-3 border-0 shadow-sm"
                onClick={() => handleShowPost(item)}
                style={{ cursor: 'pointer' }}
              >
                <Row className="g-0">
                  <Col md={4}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="img-fluid rounded-start h-100 object-fit-cover" />
                    ) : (
                      <div className="news-image-placeholder h-100">News Image</div>
                    )}
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Badge bg="primary" className="mb-2 text-uppercase">
                        {item.organization?.name || "General"}
                      </Badge>
                      <Card.Title className="fw-bold">{item.title}</Card.Title>
                      <Card.Text className="text-muted small">
                        {item.content.substring(0, 120)}...
                      </Card.Text>
                      <small className="text-secondary">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </small>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>

          {/* Upcoming Events Column */}
          <Col lg={4}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="me-2 text-danger" size={24} />
                <h2 className="fw-bold mb-0">Upcoming Events</h2>
              </div>
              <Link to="/news" className="text-danger text-decoration-none fw-bold small">
                See All <FaArrowRight size={12} className="ms-1" />
              </Link>
            </div>
            <div className="event-list">
              {upcomingEvents.map(event => {
                const eDate = new Date(event.eventDate);
                return (
                  <div
                    key={event._id}
                    className="event-item d-flex mb-4"
                    onClick={() => handleShowPost(event)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="event-date-box text-center">
                      <span className="d-block fw-bold text-uppercase small">
                        {eDate.toLocaleString('en-US', { month: 'short' })}
                      </span>
                      <span className="fs-4 fw-bold">
                        {eDate.getDate()}
                      </span>
                    </div>
                    <div className="ms-3">
                      <h6 className="fw-bold mb-1">{event.title}</h6>
                      <small className="text-muted d-block">
                        {eDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </small>
                      <small className="text-danger small fw-bold">
                        {event.location}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>

      <PostViewModal
        show={showModal}
        onHide={() => setShowModal(false)}
        post={selectedPost}
      />

    </section>
  );
};

export default NewsEvents;