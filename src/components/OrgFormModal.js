import React, { useState, useEffect, useRef } from 'react';
import { Save, X, Image as ImageIcon, Layers, Trash2 } from 'lucide-react';
import * as bootstrap from 'bootstrap';

const OrgFormModal = ({ token, refreshData, notyf, editingOrg, setEditingOrg }) => {
    const [formData, setFormData] = useState({ name: '', description: '', fbPageLink: '' });
    const [logo, setLogo] = useState(null);
    const [orgChart, setOrgChart] = useState(null); // New state
    const [galleryFiles, setGalleryFiles] = useState([]); // New state for multiple files
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null); // Stores the image ID
    const [banner, setBanner] = useState(null);
    const bannerInputRef = useRef(null);

    const fileInputRef = useRef(null);
    const chartInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    useEffect(() => {
        if (editingOrg) {
            setFormData({
                name: editingOrg.name || '',
                description: editingOrg.description || '',
                fbPageLink: editingOrg.fbPageLink || ''
            });
        } else {
            resetForm();
        }
    }, [editingOrg]);

    const resetForm = () => {
        setFormData({ name: '', description: '', fbPageLink: '' });
        setLogo(null);
        setOrgChart(null);
        setGalleryFiles([]);

        // Clear all file inputs
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (chartInputRef.current) chartInputRef.current.value = "";
        if (galleryInputRef.current) galleryInputRef.current.value = "";
        if (bannerInputRef.current) bannerInputRef.current.value = "";

        const modalElement = document.getElementById('orgModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();

        setTimeout(() => {
            document.body.classList.remove('modal-open');
            document.body.style = '';
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach(b => b.remove());
        }, 100);

        setEditingOrg(null);
        setBanner(null);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('fbPageLink', formData.fbPageLink);

        // Append Logo
        if (logo) data.append('logo', logo);

        if (banner) data.append('banner', banner);

        // Only append Org Chart and Gallery if we are EDITING
        if (editingOrg) {
            if (orgChart) data.append('orgChart', orgChart);

            if (galleryFiles.length > 0) {
                galleryFiles.forEach(file => {
                    data.append('gallery', file); // Field name must match backend uploadFields
                });
            }

        }

        const url = editingOrg
            ? `${process.env.REACT_APP_API_BASE_URL}/organizations/${editingOrg._id}`
            : `${process.env.REACT_APP_API_BASE_URL}/organizations`;

        const method = editingOrg ? 'PATCH' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: data // Fetch handles Content-Type for FormData
            });

            if (response.ok) {
                notyf.success(editingOrg ? "Organization Updated!" : "Organization Created!");
                refreshData();
                resetForm();
            } else {
                const errorData = await response.json();
                notyf.error(errorData.error || "Failed to save organization");
            }
        } catch (err) {
            notyf.error(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 1. Prepare for deletion (triggered by the small red X)
    const prepDeleteImage = (imageId) => {
        setImageToDelete(imageId);
        const confirmModal = new bootstrap.Modal(document.getElementById('imageConfirmModal'));
        confirmModal.show();
    };

    // 2. Execute deletion (triggered by the 'Delete' button in the custom modal)
    const executeImageDelete = async () => {
        if (!imageToDelete) return;

        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/organizations/${editingOrg._id}/gallery/${imageToDelete}`,
                {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (res.ok) {
                notyf.success("Image removed from gallery");

                // Update local UI state immediately
                const updatedGallery = editingOrg.gallery.filter(item => item._id !== imageToDelete);
                setEditingOrg({ ...editingOrg, gallery: updatedGallery });

                // Refresh the background list
                refreshData();

                // Close the confirmation modal
                const modalElement = document.getElementById('imageConfirmModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) modalInstance.hide();
            } else {
                const errData = await res.json();
                notyf.error(errData.error || "Failed to delete");
            }
        } catch (err) {
            notyf.error("Network error. Please try again.");
        } finally {
            setImageToDelete(null);
        }
    };

    return (
        <>
            <div className="modal fade" id="orgModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg"> {/* Made wider for more fields */}
                    <form className="modal-content border-0 shadow" onSubmit={handleSubmit}>
                        <div className="modal-header bg-light">
                            <h5 className="modal-title fw-bold">
                                {editingOrg ? `Edit ${editingOrg.name}` : 'Add New Organization'}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={resetForm}></button>
                        </div>
                        <div className="modal-body p-4">
                            <div className="row">
                                {/* Basic Info Column */}
                                <div className={editingOrg ? "col-md-6 border-end" : "col-12"}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Organization Name</label>
                                        <input type="text" className="form-control" required value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Description</label>
                                        <textarea className="form-control" rows="4" value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Facebook Page Link</label>
                                        <input type="url" className="form-control" value={formData.fbPageLink}
                                            onChange={e => setFormData({ ...formData, fbPageLink: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Logo</label>
                                        <input type="file" className="form-control" accept="image/*" ref={fileInputRef}
                                            onChange={e => setLogo(e.target.files[0])} />
                                    </div>
                                </div>

                                {/* Advanced Assets Column (Only shown when editing) */}
                                {editingOrg && (
                                    <div className="col-md-6 bg-light-subtle">
                                        <h6 className="fw-bold mb-3 d-flex align-items-center">
                                            <Layers size={18} className="me-2 text-primary" /> Visual Assets
                                        </h6>

                                        {editingOrg.gallery && editingOrg.gallery.length > 0 && (
                                            <div className="mb-4">
                                                <label className="form-label fw-semibold small text-uppercase text-muted">Current Gallery</label>
                                                <div className="d-flex flex-wrap gap-2 p-2 border rounded bg-white" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                    {editingOrg.gallery.map((img) => (
                                                        <div key={img._id} className="position-relative">
                                                            <img
                                                                src={img.imageUrl}
                                                                alt="Gallery"
                                                                className="rounded border"
                                                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => prepDeleteImage(img._id)}
                                                                className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0 d-flex align-items-center justify-content-center shadow-sm"
                                                                style={{ width: '22px', height: '22px', borderRadius: '50%', marginTop: '-5px', marginRight: '-5px' }}
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold small text-uppercase text-muted">Organizational Chart</label>
                                            <input type="file" className="form-control form-control-sm" accept="image/*" ref={chartInputRef}
                                                onChange={e => setOrgChart(e.target.files[0])} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold small text-uppercase text-muted">Gallery/Timeline Images</label>
                                            <input type="file" className="form-control form-control-sm" accept="image/*" multiple ref={galleryInputRef}
                                                onChange={e => setGalleryFiles(Array.from(e.target.files))} />
                                            <small className="text-muted d-block mt-1">
                                                {galleryFiles.length > 0 ? `${galleryFiles.length} files selected` : "Select up to 10 images"}
                                            </small>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold small text-uppercase text-muted">Cover Banner</label>
                                            <input
                                                type="file"
                                                className="form-control form-control-sm"
                                                accept="image/*"
                                                ref={bannerInputRef}
                                                onChange={e => setBanner(e.target.files[0])}
                                            />
                                            <small className="text-muted">Recommended: 1200x400px</small>
                                        </div>



                                        {/* Quick Preview Area */}
                                        <div className="mt-3 p-3 border rounded bg-white">
                                            <p className="small fw-bold mb-2">Existing Assets:</p>
                                            <div className="d-flex gap-2">
                                                {editingOrg.orgChart && <span className="badge bg-info">Chart Attached</span>}
                                                {editingOrg.gallery?.length > 0 && <span className="badge bg-secondary">{editingOrg.gallery.length} Gallery Photos</span>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer bg-light">
                            <button type="button" className="btn btn-outline-secondary rounded-pill px-4" data-bs-dismiss="modal" onClick={resetForm}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={isSubmitting}>
                                {isSubmitting ? 'Processing...' : (
                                    <><Save size={18} className="me-1" /> {editingOrg ? 'Update Changes' : 'Save Organization'}</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Custom Modal for Image Deletion Confirmation */}
            <div className="modal fade" id="imageConfirmModal" tabIndex="-1" aria-hidden="true" style={{ zIndex: 2050 }}>
                <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg">
                        <div className="modal-body text-center p-4">
                            <div className="text-danger mb-3">
                                <Trash2 size={40} />
                            </div>
                            <h6 className="fw-bold">Remove this photo?</h6>
                            <p className="text-muted small">This will permanently delete the image from the gallery.</p>
                            <div className="d-flex justify-content-center gap-2 mt-3">
                                <button type="button" className="btn btn-light btn-sm px-3 rounded-pill" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger btn-sm px-3 rounded-pill" onClick={executeImageDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrgFormModal;