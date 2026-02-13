import React, { useEffect, useState } from 'react';
import * as bootstrap from 'bootstrap';
import { Edit3, Trash2, Power, PlusCircle } from 'lucide-react';
import { fetchAdminOrgs } from '../services/orgService';
import OrgFormModal from '../components/OrgFormModal';
import '../css/toggle.css';

const AdminOrgManagement = ({ token, notyf }) => {
    const [orgs, setOrgs] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null); // Track org to edit
    const [orgToDelete, setOrgToDelete] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const data = await fetchAdminOrgs(token);
            setOrgs(data);
        } finally { setLoading(false); }
    };

    useEffect(() => { loadData(); }, [token]);

    const handleToggleStatus = async (id) => {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/organizations/status/${id}`, {
            method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) { notyf.success("Status updated"); loadData(); }
    };

    const confirmDelete = async () => {
        if (!orgToDelete) return;

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/organizations/${orgToDelete._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                notyf.success("Organization deleted successfully");

                // Close the modal manually to avoid gray screen
                const modalElement = document.getElementById('deleteModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) modalInstance.hide();

                loadData();
            }
        } catch (err) {
            notyf.error("Failed to delete organization");
        } finally {
            setOrgToDelete(null);
        }
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">Organization Management</h2>
                <button
                    className="btn btn-primary shadow-sm rounded-pill px-4"
                    onClick={() => {
                        setSelectedOrg(null);
                        const modalElement = document.getElementById('orgModal');
                        const modal = new bootstrap.Modal(modalElement);
                        modal.show();
                    }}
                >
                    <PlusCircle size={20} className="me-2" /> Add Organization
                </button>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Organization Name</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orgs.map(org => (
                                <tr key={org._id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={org.logo} width="45" height="45" className="rounded-circle me-3 border" alt="" />
                                            <span className="fw-bold">{org.name}</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="form-check form-switch d-inline-block">
                                            <input
                                                className="form-check-input custom-toggle"
                                                type="checkbox"
                                                role="switch"
                                                id={`switch-${org._id}`}
                                                checked={org.isActive}
                                                onChange={() => handleToggleStatus(org._id)}
                                                style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                                            />
                                            <label className="form-check-label ms-2 small text-muted" htmlFor={`switch-${org._id}`}>
                                                {org.isActive ? 'Active' : 'Hidden'}
                                            </label>
                                        </div>
                                    </td>
                                    <td className="text-end">
                                        <div className="btn-group border rounded-pill overflow-hidden">
                                            <button
                                                className="btn btn-light btn-sm border-0 px-3"
                                                onClick={() => {
                                                    setSelectedOrg(org); // Set data first
                                                    const modalElement = document.getElementById('orgModal');
                                                    const modal = new bootstrap.Modal(modalElement);
                                                    modal.show();
                                                }}
                                                title="Edit Organization"
                                            >
                                                <Edit3 size={16} className="text-primary" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setOrgToDelete(org);
                                                    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
                                                    modal.show();
                                                }}
                                                className="btn btn-light btn-sm border-0 px-3 border-start"
                                                title="Delete Organization"
                                            >
                                                <Trash2 size={16} className="text-danger" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reusable Modal */}
            <OrgFormModal
                token={token}
                refreshData={loadData}
                notyf={notyf}
                editingOrg={selectedOrg}
                setEditingOrg={setSelectedOrg}
            />
            {/* Delete Confirmation Modal */}
            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-body text-center p-5">
                            <div className="text-danger mb-4">
                                <Trash2 size={60} />
                            </div>
                            <h4 className="fw-bold">Are you sure?</h4>
                            <p className="text-muted">
                                Do you really want to delete <strong>{orgToDelete?.name}</strong>?
                                This action cannot be undone.
                            </p>
                            <div className="d-flex justify-content-center gap-2 mt-4">
                                <button type="button" className="btn btn-light px-4 rounded-pill" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger px-4 rounded-pill"
                                    onClick={confirmDelete}
                                >
                                    Delete Permanently
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrgManagement;