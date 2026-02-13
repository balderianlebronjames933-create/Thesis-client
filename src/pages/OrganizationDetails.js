import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Facebook, Info, Users, Image as ImageIcon, Maximize2, ExternalLink } from 'lucide-react';
import Footer from '../components/Footer';

const OrganizationDetails = () => {
    const { id } = useParams();
    const [org, setOrg] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'structure', 'gallery'

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/organizations/${id}`)
            .then(res => res.json())
            .then(data => setOrg(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!org) return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <>
        <div className="bg-light min-vh-100">
            {/* 1. HERO SECTION (Option B) */}
            <div className="position-relative" style={{ height: '350px', overflow: 'hidden' }}>
                <div 
                    className="position-absolute w-100 h-100" 
                    style={{ 
                        backgroundImage: `url(${org.banner || 'https://via.placeholder.com/1200x400?text=Organization+Banner'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.7)'
                    }}
                />
                <div className="container h-100 position-relative d-flex align-items-end pb-4">
                    <div className="d-flex align-items-center gap-4 mb-n5 bg-white p-3 rounded-4 shadow-lg border">
                        <img 
                            src={org.logo} 
                            alt={org.name} 
                            className="rounded-3 border" 
                            style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                        />
                        <div className="pe-4">
                            <h1 className="fw-bold mb-1">{org.name}</h1>
                            {org.fbPageLink && (
                                <a href={org.fbPageLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary rounded-pill">
                                    <Facebook size={16} className="me-2" /> Visit Facebook
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. TABBED NAVIGATION */}
            <div className="container mt-5 pt-4">
                <div className="d-flex justify-content-center mb-4">
                    <div className="bg-white p-1 rounded-pill shadow-sm border d-inline-flex">
                        {['overview', 'structure', 'gallery'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`btn rounded-pill px-4 py-2 text-capitalize fw-semibold ${activeTab === tab ? 'btn-primary shadow' : 'btn-light border-0'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. DYNAMIC CONTENT AREA */}
                <div className="row justify-content-center pb-5">
                    <div className="col-lg-10">
                        {activeTab === 'overview' && (
                            <div className="card border-0 shadow-sm rounded-4 p-4 animate__animated animate__fadeIn">
                                <h4 className="fw-bold mb-4 d-flex align-items-center">
                                    <Info className="me-2 text-primary" /> About the Organization
                                </h4>
                                <p className="text-muted lh-lg" style={{ whiteSpace: 'pre-line' }}>{org.description}</p>
                            </div>
                        )}

                        {activeTab === 'structure' && (
                            <div className="card border-0 shadow-sm rounded-4 p-4 animate__animated animate__fadeIn">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="fw-bold m-0 d-flex align-items-center">
                                        <Users className="me-2 text-primary" /> Organizational Structure
                                    </h4>
                                    {org.orgChart && (
                                        <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={() => window.open(org.orgChart, '_blank')}>
                                            <Maximize2 size={16} className="me-1" /> View Fullscreen
                                        </button>
                                    )}
                                </div>
                                {org.orgChart ? (
                                    <div className="bg-light rounded-4 p-2 text-center border">
                                        <img src={org.orgChart} alt="Chart" className="img-fluid rounded-3" style={{ maxHeight: '600px' }} />
                                    </div>
                                ) : (
                                    <p className="text-center text-muted py-5">No organizational chart available.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'gallery' && (
                            <div className="animate__animated animate__fadeIn">
                                {/* MASONRY GALLERY (Using CSS columns) */}
                                <div style={{ columnCount: window.innerWidth > 768 ? 3 : 2, columnGap: '1rem' }}>
                                    {org.gallery && org.gallery.length > 0 ? org.gallery.map((img, idx) => (
                                        <div key={idx} className="mb-3 position-relative group overflow-hidden rounded-4 shadow-sm border bg-white">
                                            <img 
                                                src={img.imageUrl} 
                                                alt="Gallery" 
                                                className="img-fluid d-block" 
                                                style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                            />
                                        </div>
                                    )) : (
                                        <div className="text-center py-5 w-100"><p className="text-muted">No gallery photos yet.</p></div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
        
    );
};

export default OrganizationDetails;