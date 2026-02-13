import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

const DeleteConfirmModal = ({ onDelete, itemTitle }) => {
    return (
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content border-0 shadow-lg rounded-4">
                    <div className="modal-body p-4 text-center">
                        <div className="text-danger mb-3">
                            <AlertTriangle size={48} />
                        </div>
                        <h5 className="fw-bold">Delete Post?</h5>
                        <p className="text-muted small">
                            Are you sure you want to delete <strong>"{itemTitle}"</strong>? This action cannot be undone.
                        </p>
                        
                        <div className="d-grid gap-2 mt-4">
                            <button 
                                type="button" 
                                className="btn btn-danger rounded-pill py-2 fw-bold" 
                                onClick={onDelete}
                                data-bs-dismiss="modal"
                            >
                                <Trash2 size={18} className="me-2" /> Delete Permanently
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-light rounded-pill py-2" 
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;