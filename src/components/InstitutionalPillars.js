
import { Container, Row, Col } from 'react-bootstrap';
import { Target, Eye, Star, ShieldCheck } from 'lucide-react';
import pillarsBg from '../assets/pillars-bg.jpg'; // 1. Import your background image

const InstitutionalPillars = () => {
    const pillars = [
        {
            title: "Mission",
            icon: <Target size={28} strokeWidth={1.5} />,
            content: "The University of Rizal System is committed to nurture and produce upright and competent graduates and empowered community through relevant and sustainable higher professional and technical instruction, research, extension and production services.",
            color: "from-emerald-500 to-teal-500",
            bgLight: "bg-emerald-50",
            accent: "#10b981"
        },
        {
            title: "Vision",
            icon: <Eye size={28} strokeWidth={1.5} />,
            content: "The leading University in human resource development, knowledge and technology generation and environmental stewardship.",
            color: "from-blue-500 to-indigo-500",
            bgLight: "bg-blue-50",
            accent: "#3b82f6"
        },
        {
            title: "Core Values",
            icon: <Star size={28} strokeWidth={1.5} />,
            color: "from-amber-500 to-orange-500",
            bgLight: "bg-amber-50",
            accent: "#f59e0b",
            values: [
                { letter: "R", word: "Responsiveness", desc: "Anticipating and meeting needs" },
                { letter: "I", word: "Integrity", desc: "Ethical and transparent conduct" },
                { letter: "S", word: "Service", desc: "Commitment to stakeholders" },
                { letter: "E", word: "Excellence", desc: "Continuous improvement" },
                { letter: "S", word: "Sustainability", desc: "Long-term responsible practices" }
            ]
        },
        {
            title: "Quality Policy",
            icon: <ShieldCheck size={28} strokeWidth={1.5} />,
            content: "The University of Rizal System commits to deliver excellent products and services to ensure total stakeholders’ satisfaction in instruction, research, extension, production and dynamic administrative support and to continuously improve its Quality Management System processes to satisfy all applicable requirements.",
            color: "from-rose-500 to-pink-500",
            bgLight: "bg-rose-50",
            accent: "#f43f5e"
        }
    ];

    return (
        <section 
            className="py-5 py-md-6 position-relative" 
            style={{ 
                // Apply the background image to the section
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${pillarsBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed' // Optional: parallax effect
            }}
        >
            <Container>
                {/* 2x2 Grid using Row row-cols-md-2 */}
                <Row className="row-cols-1 row-cols-md-2 g-4 g-lg-5">
                    {pillars.map((pillar, idx) => (
                        <Col key={idx}>
                            <div 
                                className="h-100 position-relative overflow-hidden rounded-4 p-2 p-xl-4 shadow-sm"
                                style={{
                                    background: 'white',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'default'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                                }}
                            >
                                {/* Top accent bar */}
                                <div className={`position-absolute top-0 start-0 w-100 bg-gradient ${pillar.color}`} style={{ height: '5px' }} />

                                <div className="d-flex align-items-center mb-4">
                                    <div 
                                        className={`d-flex align-items-center justify-content-center rounded-3 me-3 ${pillar.bgLight}`}
                                        style={{ width: '56px', height: '56px', color: pillar.accent }}
                                    >
                                        {pillar.icon}
                                    </div>
                                    <h3 className="h4 fw-bold m-0 text-dark">
                                        {pillar.title}
                                    </h3>
                                </div>

                                {pillar.values ? (
<div className="mt-3 ps-2">
        {pillar.values.map((v, i) => (
            <div key={i} className="mb-3 d-flex align-items-center justify-content-start mx-2">
                <span className="fw-bold text-dark me-3" style={{ fontSize: '1.25rem', minWidth: '20px' }}>
                    {v.letter}
                </span>
                <span className="text-muted me-3">—</span>
                <span className="fw-semibold text-secondary text-uppercase" style={{ letterSpacing: '1px', fontSize: '1rem' }}>
                    {v.word}
                </span>
            </div>
        ))}
    </div>
                                ) : (
                                    <p className="text-secondary text-center mb-0 fw-medium" style={{ lineHeight: '2', fontSize: '1rem' }}>
                                        {pillar.content}
                                    </p>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default InstitutionalPillars;