import  { useState, useEffect } from 'react';
import { Calendar, MapPin, ChevronRight, Newspaper } from 'lucide-react';
import Footer from '../components/Footer';
import PostViewModal from '../components/PostViewModal';
import FeaturedCarousel from '../components/FeaturedCarousel';

const NewsEventsFeed = ({ notyf }) => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('all'); // all, news, event
    const [loading, setLoading] = useState(true);

    // --- Added Modal State ---
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`)
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // --- Added Modal Logic ---
    const handleShowPost = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    const filteredPosts = filter === 'all' ? posts : posts.filter(p => p.type === filter);

    if (loading) return <div className="text-center py-5">Loading Feed...</div>;

    return (
        <>
            {/* Using your FeaturedCarousel component as is */}
            <FeaturedCarousel posts={posts} isLoading={loading} />

            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    {/* <h2 className="fw-bold">News & Events</h2> */}
                    <div className="btn-group bg-white shadow-sm rounded-pill p-1">
                        <button onClick={() => setFilter('all')} className={`btn rounded-pill px-4 me-2 ${filter === 'all' ? 'btn-primary' : 'btn-light'}`}>All</button>
                        <button onClick={() => setFilter('news')} className={`btn rounded-pill px-4 me-2 ${filter === 'news' ? 'btn-primary' : 'btn-light'}`}>News</button>
                        <button onClick={() => setFilter('event')} className={`btn rounded-pill px-4 ${filter === 'event' ? 'btn-primary' : 'btn-light'}`}>Events</button>
                    </div>
                </div>

                <div className="row g-4">
                    {filteredPosts.map(post => (
                        <div key={post._id} className="col-md-6 col-lg-3">
                            {/* --- Added onClick and cursor style to the card --- */}
                            <div
                                className="card h-100 shadow-sm rounded-4 overflow-hidden transition-all"
                                onClick={() => handleShowPost(post)}
                                style={{
                                    cursor: 'pointer',
                                    border: '1px solid rgba(0,0,0,0.08)', // Subtle border
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,0.075)'; // Reset to shadow-sm
                                }}
                            >
                                <div className="position-relative">
                                    <img src={post.image || 'https://via.placeholder.com/400x250'} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt={post.title} />
                                    <span className={`position-absolute top-0 start-0 m-3 badge rounded-pill ${post.type === 'event' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                                        {post.type === 'event' ? <Calendar size={12} /> : <Newspaper size={12} />} {post.type.toUpperCase()}
                                    </span>
                                </div>

                                <div className="card-body p-4">
                                    <div className="mb-0">
                                        {post.tags?.map((tag, i) => (
                                            <span key={i} className="small me-2 text-primary">#{tag}</span>
                                        ))}
                                    </div>

                                    <span className="text-muted" style={{ fontSize: '10px' }}>
                                        {/* Combine Date + Year + Time */}
                                        Posted on: {' '}
                                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })} • {new Date(post.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>


                                    {/* --- Organization Logo and Name --- */}
                                    {post.organization && (
                                        <div className="d-flex align-items-center mb-2">
                                            {post.organization.logo ? (
                                                <img
                                                    src={post.organization.logo}
                                                    alt="org logo"
                                                    className="rounded-circle me-2 border"
                                                    style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div
                                                    className="rounded-circle me-2 bg-light d-flex align-items-center justify-content-center border"
                                                    style={{ width: '24px', height: '24px', fontSize: '10px' }}
                                                >
                                                    {post.organization.name.charAt(0)}
                                                </div>
                                            )}
                                            <span className="text-primary small fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>
                                                {post.organization.name}
                                            </span>
                                        </div>
                                    )}

                                    <h5 className="card-title fw-bold">{post.title}</h5>
                                    <p className="text-muted small mb-2">{post.content.substring(0, 100)}...</p>

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
                                    {/* --- Changed Link to a Button that triggers the same function --- */}
                                    <button className="btn btn-outline-primary btn-sm rounded-pill w-100">
                                        Read More <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Added Modal Component --- */}
            <PostViewModal
                show={showModal}
                onHide={() => setShowModal(false)}
                post={selectedPost}
                notyf={notyf}
            />

            <Footer />
        </>
    );
};

export default NewsEventsFeed;