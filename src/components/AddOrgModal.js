import React, { useState, useRef } from 'react';
import { Notyf } from 'notyf';

const notyf = new Notyf({ position: { x: 'right', y: 'top' } });

const AddOrgModal = ({ token, refreshData }) => {
    const [formData, setFormData] = useState({ name: '', description: '', fbPageLink: '' });
    const [logo, setLogo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Create a ref for the file input
    const fileInputRef = useRef(null);

    // Helper function to clear everything
    const resetForm = () => {
        setFormData({ name: '', description: '', fbPageLink: '' });
        setLogo(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Manually clear the file input
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('fbPageLink', formData.fbPageLink);
        if (logo) data.append('logo', logo);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/organizations`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: data
            });

            if (response.ok) {
                notyf.success("Organization Created!");
                resetForm(); // Clear the form
                refreshData();
                
                // Programmatically close the Bootstrap modal
                const modalElement = document.getElementById('addOrgModal');
                const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) modalInstance.hide();
            } else {
                notyf.error("Failed to create organization");
            }
        } catch (err) {
            console.error("Upload failed", err);
            notyf.error("Upload failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal fade" id="addOrgModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <form className="modal-content" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Organization</h5>
                        {/* Reset when X is clicked */}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={resetForm}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" className="form-control" required 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})} 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea 
                                className="form-control" rows="3" 
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Facebook Page Link</label>
                            <input 
                                type="url" className="form-control" 
                                value={formData.fbPageLink}
                                onChange={e => setFormData({...formData, fbPageLink: e.target.value})} 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Logo</label>
                            <input 
                                type="file" className="form-control" accept="image/*"
                                ref={fileInputRef}
                                onChange={e => setLogo(e.target.files[0])} 
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/* Reset when Close is clicked */}
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetForm}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Organization'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOrgModal;