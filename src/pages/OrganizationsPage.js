import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublicOrgs, fetchAdminOrgs } from '../services/orgService';
import AddOrgModal from '../components/AddOrgModal';

const OrganizationsPage = ({ user, token, notyf }) => { // added notyf prop
    const [orgs, setOrgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAdmin = user?.isAdmin;

    useEffect(() => {
        loadData();
    }, [isAdmin, token]);

    const loadData = async () => {
        try {
            const data = isAdmin ? await fetchAdminOrgs(token) : await fetchPublicOrgs();
            setOrgs(data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // --- NEW: ADMIN ACTIONS ---
    const handleToggleStatus = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/organizations/status/${id}`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                notyf.success("Status updated successfully!");
                loadData();
            }
        } catch (err) {
            notyf.error("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this organization permanently?")) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/organizations/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    notyf.success("Organization deleted.");
                    loadData();
                }
            } catch (err) {
                notyf.error("Delete failed");
            }
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-grow text-primary" role="status"></div>
        </div>
    );

    return (
        <div className="container py-5">
            <div className="row mb-5 align-items-center">
                <div className="col">
                    <h1 className="display-5 fw-bold text-dark">
                        {isAdmin ? "Organization Management" : "University Organizations"}
                    </h1>
                    <p className="text-muted">Discover and manage the heart of our campus life.</p>
                </div>
                {isAdmin && (
                    <div className="col-auto">
                        <button 
                            className="btn btn-primary btn-lg shadow" 
                            data-bs-toggle="modal" 
                            data-bs-target="#addOrgModal"
                        >
                            <i className="bi bi-plus-circle me-2"></i>Create New
                        </button>
                    </div>
                )}
            </div>

            <div className="row g-4">
                {orgs.map((org) => (
                    <div key={org._id} className="col-sm-12 col-md-6 col-lg-4">
                        <div className={`card h-100 border-0 shadow-sm ${!org.isActive ? 'bg-light border' : ''}`}>
                            <div className="position-relative">
                                <img 
                                    src={org.logo || 'https://via.placeholder.com/400x200?text=No+Logo'} 
                                    className="card-img-top p-3 rounded-circle mx-auto" 
                                    alt={org.name}
                                    style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                                />
                                {!org.isActive && (
                                    <span className="position-absolute top-0 start-0 m-3 badge bg-danger">Hidden</span>
                                )}
                            </div>
                            
                            <div className="card-body text-center">
                                <h4 className="card-title fw-bold">{org.name}</h4>
                                <p className="card-text text-muted">
                                    {org.description?.length > 80 ? `${org.description.substring(0, 80)}...` : org.description}
                                </p>
                            </div>

                            <div className="card-footer bg-transparent border-0 pb-4 px-4">
                                {isAdmin ? (
                                    <div className="btn-group w-100 shadow-sm">
                                        <button className="btn btn-outline-dark">Edit</button>
                                        <button 
                                            onClick={() => handleToggleStatus(org._id)}
                                            className={`btn ${org.isActive ? 'btn-outline-warning' : 'btn-outline-success'}`}
                                        >
                                            {org.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(org._id)}
                                            className="btn btn-outline-danger text-danger"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : (
                                    <Link to={`/organizations/${org._id}`} className="btn btn-primary w-100 rounded-pill">
                                        View Details
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- ADDED THE MODAL COMPONENT HERE --- */}
            {isAdmin && <AddOrgModal token={token} refreshData={loadData} notyf={notyf} />}
        </div>
    );
};

export default OrganizationsPage;