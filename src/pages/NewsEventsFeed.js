import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Tag, ChevronRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const NewsEventsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('all'); // all, news, event

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    const filteredPosts = filter === 'all' ? posts : posts.filter(p => p.type === filter);

    return (
        <>
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">News & Events</h2>
                <div className="btn-group bg-white shadow-sm rounded-pill p-1">
                    <button onClick={() => setFilter('all')} className={`btn rounded-pill px-4 me-2 ${filter === 'all' ? 'btn-primary' : 'btn-light'}`}>All</button>
                    <button onClick={() => setFilter('news')} className={`btn rounded-pill px-4 me-2 ${filter === 'news' ? 'btn-primary' : 'btn-light'}`}>News</button>
                    <button onClick={() => setFilter('event')} className={`btn rounded-pill px-4 ${filter === 'event' ? 'btn-primary' : 'btn-light'}`}>Events</button>
                </div>
            </div>

            <div className="row g-4">
                {filteredPosts.map(post => (
                    <div key={post._id} className="col-md-6 col-lg-4">
                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-shadow transition">
                            {/* Image Header with Badge */}
                            <div className="position-relative">
                                <img src={post.image || 'https://via.placeholder.com/400x250'} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt={post.title} />
                                <span className={`position-absolute top-0 start-0 m-3 badge rounded-pill ${post.type === 'event' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                                    {post.type === 'event' ? <Calendar size={12} /> : <Newspaper size={12} />} {post.type.toUpperCase()}
                                </span>
                            </div>

                            <div className="card-body p-4">
                                {/* Tags */}
                                <div className="mb-2">
                                    {post.tags?.map((tag, i) => (
                                        <span key={i} className="text-muted small me-2">#{tag}</span>
                                    ))}
                                </div>
                                
                                <h5 className="card-title fw-bold">{post.title}</h5>
                                <p className="text-muted small mb-3">{post.content.substring(0, 100)}...</p>

                                {post.type === 'event' && (
                                    <div className="bg-light p-2 rounded-3 mb-3">
                                        <div className="d-flex align-items-center small text-muted mb-1">
                                            <Calendar size={14} className="me-2" /> {new Date(post.eventDate).toLocaleDateString()}
                                        </div>
                                        <div className="d-flex align-items-center small text-muted">
                                            <MapPin size={14} className="me-2" /> {post.location}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="card-footer bg-white border-0 p-4 pt-0">
                                <Link to={`/posts/${post._id}`} className="btn btn-outline-dark btn-sm rounded-pill w-100">
                                    Read More <ChevronRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default NewsEventsFeed;