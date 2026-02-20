import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublicOrgs } from '../services/orgService';
import OrgHero from '../components/OrgHero';
import Footer from '../components/Footer';

const StudentOrgDirectory = () => {
    const [orgs, setOrgs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPublicOrgs().then(data => {
            setOrgs(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="spinner-grow text-primary d-block mx-auto my-5"></div>;

    return (
        <div>
            {/* 1. Hero Section at the Top */}
            <OrgHero />

            {/* 2. Organization Cards */}
            <div className="container py-5">
                <h1 className="display-5 fw-bold mb-4">University Organizations</h1>
                <div className="row g-4">
                    {orgs.map(org => (
                        <div key={org._id} className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm text-center p-3">
                                <img src={org.logo} className="rounded-circle mx-auto" style={{ width: '150px', height: '150px', objectFit: 'cover' }} alt={org.name} />
                                <div className="card-body">
                                    <h4 className="fw-bold">{org.name}</h4>
                                    <p className="text-muted small">{org.description?.substring(0, 100)}...</p>
                                    <Link to={`/organizations/${org._id}`} className="btn btn-primary rounded-pill w-100">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Footer at the Bottom */}
            <Footer />
        </div>
    );
};

export default StudentOrgDirectory;