import  { useState, useEffect, useRef } from 'react';
import { Save, Calendar, MapPin, Tag, Star } from 'lucide-react';
import * as bootstrap from 'bootstrap';

const PostFormModal = ({ token, refreshData, notyf, editingPost, setEditingPost, organizations }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'news',
        eventDate: '',
        location: '',
        organizationId: '',
        tags: '',
        isFeatured: false
    });
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef(null);

    // Sync form with editing state
    useEffect(() => {
        if (editingPost) {
            setFormData({
                title: editingPost.title || '',
                content: editingPost.content || '',
                type: editingPost.type || 'news',
                eventDate: editingPost.eventDate ? new Date(editingPost.eventDate).toISOString().split('T')[0] : '',
                location: editingPost.location || '',
                organizationId: editingPost.organization?._id || editingPost.organization || '',
                tags: editingPost.tags ? editingPost.tags.join(', ') : '',
                isFeatured: editingPost.isFeatured || false
            });
        } 
        
    }, [editingPost]);

const resetForm = () => {
    // 1. Clear the inputs
    setFormData({
        title: '', content: '', type: 'news',
        eventDate: '', location: '', organizationId: '',
        tags: '', isFeatured: false
    });
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    
    // 2. Manual DOM Cleanup (The Org Pattern)
    const modalElement = document.getElementById('postModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();

    setTimeout(() => {
        document.body.classList.remove('modal-open');
        document.body.style = '';
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(b => b.remove());

        // 3. Clear editing state last
        setEditingPost(null);
    }, 100);
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        const url = editingPost
            ? `${process.env.REACT_APP_API_BASE_URL}/posts/${editingPost._id}`
            : `${process.env.REACT_APP_API_BASE_URL}/posts`;

        try {
            const response = await fetch(url, {
                method: editingPost ? 'PATCH' : 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: data
            });

if (response.ok) {
    notyf.success(editingPost ? "Post Updated!" : "Post Published!");
    refreshData();

    const modalElement = document.getElementById('postModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
        modalInstance.hide();
    }

    // Wait for animation, then trigger our manual cleanup
    setTimeout(() => {
        resetForm(); 
    }, 400); 

} else {
                const err = await response.json();
                notyf.error(err.error || "Failed to save post");
            }
        } catch (err) {
            notyf.error("Network error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal fade" id="postModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <form className="modal-content border-0 shadow-lg rounded-4" onSubmit={handleSubmit}>
                    <div className="modal-header border-0 bg-light rounded-top-4 p-4">
                        <h5 className="modal-title fw-bold d-flex align-items-center">
                            {editingPost ? 'Edit Post' : 'Create New Post'}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={resetForm}></button>
                    </div>

                    <div className="modal-body p-4">
                        <div className="row g-3">
                            {/* Title & Type */}
                            <div className="col-md-8">
                                <label className="form-label fw-semibold">Post Title</label>
                                <input type="text" className="form-control" required value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Give it a catchy headline..." />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Post Type</label>
                                <select className="form-select" value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                    <option value="news">📰 News / Announcement</option>
                                    <option value="event">📅 Event / Activity</option>
                                </select>
                            </div>

                            {/* Content */}
                            <div className="col-12 mb-3">
                                <label className="form-label fw-semibold">Content</label>
                                <textarea className="form-control" rows="5" required value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="What's happening?"></textarea>
                            </div>

                            {/* Conditional Event Fields */}
                            {formData.type === 'event' && (
                                <div className="col-12 animate__animated animate__fadeIn">
                                    <div className="row g-3 p-3 bg-light rounded-3 border">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-uppercase">Event Date</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><Calendar size={16} /></span>
                                                <input type="datetime-local" className="form-control" value={formData.eventDate}
                                                    onChange={e => setFormData({ ...formData, eventDate: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-uppercase">Location</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><MapPin size={16} /></span>
                                                <input type="text" className="form-control" value={formData.location}
                                                    onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Zoom, Gym, Hall..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Metadata: Tags & Organization */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold"><Tag size={16} className="me-1" /> Tags</label>
                                <input type="text" className="form-control" value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })} placeholder="news, sports, seminar" />
                                <small className="text-muted">Separate with commas</small>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Hosting Organization</label>
                                <select className="form-select" value={formData.organizationId}
                                    onChange={e => setFormData({ ...formData, organizationId: e.target.value })}>
                                    <option value="">None (General Post)</option>
                                    {organizations?.map(org => (
                                        <option key={org._id} value={org._id}>{org.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Cover Image & Featured Toggle */}
                            <div className="col-md-8">
                                <label className="form-label fw-semibold">Cover Image</label>
                                <input type="file" className="form-control" accept="image/*" ref={fileInputRef}
                                    onChange={e => setImage(e.target.files[0])} />
                            </div>
                            <div className="col-md-4 d-flex align-items-end">
                                <div className="form-check form-switch mb-2">
                                    <input className="form-check-input" type="checkbox" id="featureSwitch"
                                        checked={formData.isFeatured} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} />
                                    <label className="form-check-label fw-bold text-primary" htmlFor="featureSwitch">
                                        <Star size={16} className="me-1" fill={formData.isFeatured ? "currentColor" : "none"} /> Featured
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer border-0 p-4">
                        <button type="button" className="btn btn-light rounded-pill px-4" data-bs-dismiss="modal" onClick={resetForm}>Discard</button>
                        <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={isSubmitting}>
                            {isSubmitting ? 'Posting...' : <><Save size={18} className="me-2" /> {editingPost ? 'Update Post' : 'Publish Post'}</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostFormModal;