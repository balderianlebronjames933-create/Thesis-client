import React, { useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import { Calendar, MapPin } from 'lucide-react';
import { Container } from 'react-bootstrap';

const FeaturedCarousel = ({ posts, isLoading }) => {
    const featuredPosts = posts?.filter(post => post.isFeatured && post.isActive) || [];

    useEffect(() => {
        if (!isLoading && featuredPosts.length > 0) {
            const carouselElement = document.getElementById('featuredCarousel');
            if (carouselElement) {
                // Initialize manually to ensure it starts after data load
                const carouselInstance = new bootstrap.Carousel(carouselElement, {
                    interval: 2000, // Changed to 5s for readability
                    ride: 'carousel',
                    pause: 'hover'
                });
                carouselInstance.cycle();
            }
        }
    }, [isLoading, featuredPosts.length]);

    if (isLoading) {
        return (
            <Container className="my-4">
                <div className="placeholder-glow rounded-4">
                    <div className="placeholder col-12 rounded-4" style={{ height: '400px' }}></div>
                </div>
            </Container>
        );
    }

    if (featuredPosts.length === 0) return null;

    return (
        <div className="mx-4 my-4 shadow-2xl rounded-4 overflow-hidden">
            <div
                id="featuredCarousel"
                className="carousel slide carousel-fade shadow-sm rounded-4 overflow-hidden"
                data-bs-ride="carousel"
            >
                {/* Indicators */}
                <div className="carousel-indicators">
                    {featuredPosts.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            data-bs-target="#featuredCarousel"
                            data-bs-slide-to={idx}
                            className={idx === 0 ? 'active' : ''}
                            aria-current={idx === 0 ? 'true' : 'false'}
                        ></button>
                    ))}
                </div>

                {/* Slides */}
                <div className="carousel-inner">
                    {featuredPosts.map((post, index) => (
                        <div key={post._id} className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{ height: '400px' }}>
                            <img
                                src={post.image || 'https://via.placeholder.com/1200x600?text=No+Image'}
                                className="d-block w-100 h-100"
                                alt={post.title}
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="position-absolute top-0 start-0 w-100 h-100"
                                style={{ background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8))' }}></div>

                            <div className="carousel-caption text-start pb-4 pb-md-5 px-2 px-md-0">
                                <h1 className="display-5 fs-4 fw-bold text-white">{post.title}</h1>
                                <div className="d-flex flex-column gap-1 mb-3 text-white">
                                    {post.type === 'event' && post.eventDate && (
                                        <span className="d-flex align-items-center x-small">
                                            <Calendar size={14} className="me-1" />
                                            {new Date(post.eventDate).toLocaleDateString()}
                                        </span>
                                    )}
                                    {post.location && (
                                        <span className="d-flex align-items-center small">
                                            <MapPin size={16} className="me-1" /> {post.location}
                                        </span>
                                    )}
                                </div>
                                <p className="lead text-white mb-4 text-truncate" style={{ maxWidth: '80%' }}>
                                    {post.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    );
};

export default FeaturedCarousel;