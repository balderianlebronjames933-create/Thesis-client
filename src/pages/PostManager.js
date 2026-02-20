import  { useState, useEffect } from 'react';
import { Plus, Edit, Trash2,  Star, Search } from 'lucide-react';
import PostFormModal from '../components/PostFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import * as bootstrap from 'bootstrap';

const PostManager = ({ token, notyf, organizations }) => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [postToDelete, setPostToDelete] = useState(null);

    const fetchPosts = async () => {
        try {
            // Change the URL to include /admin
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/admin`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            notyf.error("Failed to load posts");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleToggleStatus = async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/status/${id}`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchPosts();
                notyf.success("Status updated");
            }
        } catch (err) {
            notyf.error("Update failed");
        }
    };


    const confirmDelete = async () => {
        if (!postToDelete) return;

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${postToDelete._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                notyf.success("Post and comments deleted");
                fetchPosts();
            } else {
                notyf.error("Failed to delete post");
            }
        } catch (err) {
            notyf.error("Network error");
        } finally {
            setPostToDelete(null); // Clear the selection
        }
    };

    // Filter posts based on search
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid py-4">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                {/* Header Section */}
                <div className="card-header bg-white border-0 py-4 px-4">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h4 className="fw-bold mb-0">Post Management</h4>
                            <p className="text-muted small mb-0">Control news updates and campus events</p>
                        </div>
                        <div className="col-md-5">
                            <div className="input-group bg-light rounded-pill px-3 my-2">
                                <span className="input-group-text bg-transparent border-0 text-muted">
                                    <Search size={18} />
                                </span>
                                <input
                                    type="text"
                                    className="form-control bg-transparent border-0 shadow-none"
                                    placeholder="Search by title..."
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 text-md-end my-2">
                            <button
                                className="btn btn-primary rounded-pill px-4 shadow-sm"
                                onClick={() => {
                                    setEditingPost(null);
                                    const modal = new bootstrap.Modal(document.getElementById('postModal'));
                                    modal.show();
                                }}
                            >
                                <Plus size={18} className="me-1" /> Create Post
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-primary text-muted small text-uppercase">
                            <tr>
                                <th className="ps-4">Content</th>
                                <th>Type</th>
                                <th>Tags</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.map(post => (
                                <tr key={post._id} className="border-bottom">
                                    <td className="ps-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="position-relative">
                                                <img
                                                    src={post.image || 'https://via.placeholder.com/50'}
                                                    className="rounded-3 border"
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    alt="post thumb"
                                                />
                                                {post.isFeatured && (
                                                    <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-warning p-1 shadow">
                                                        <Star size={10} fill="white" className="text-white" />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="ms-3">
                                                <div className="fw-bold text-dark mb-0">{post.title}</div>
                                                {/* ADD THIS SECTION: Display date/time for events */}
                                                {post.type === 'event' && post.eventDate ? (
                                                    <>
                                                        <div className="text-muted small">
                                                            By: {post.author?.firstName} {post.author?.lastName}
                                                        </div>
                                                        <div className="text-muted small">
                                                            Posted:  {new Date(post.createdAt).toLocaleString([], {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </div>
                                                        <div className="text-primary small fw-semibold">
                                                            Event Date: {new Date(post.eventDate).toLocaleString([], {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="text-muted small">
                                                            By: {post.author?.firstName} {post.author?.lastName}
                                                        </div>
                                                        <div className="text-muted small">
                                                            Posted on:  {new Date(post.createdAt).toLocaleString([], {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge rounded-pill px-3 py-2 ${post.type === 'event' ? 'bg-info-subtle text-info' : 'bg-primary-subtle text-primary'}`}>
                                            {post.type.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-wrap gap-1">
                                            {post.tags?.map((t, idx) => (
                                                <span key={idx} className="small text-muted border rounded px-2">#{t}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`form-check form-switch ${post.isActive ? 'text-success' : 'text-danger'}`}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={post.isActive}
                                                onChange={() => handleToggleStatus(post._id)}
                                            />
                                            <span className="small fw-bold">{post.isActive ? 'Live' : 'Hidden'}</span>
                                        </div>
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="btn-group shadow-sm rounded-3">
                                            <button
                                                className="btn btn-white btn-sm px-3 border-end"
                                                onClick={() => {
                                                    setEditingPost(post);
                                                    const modal = new bootstrap.Modal(document.getElementById('postModal'));
                                                    modal.show();
                                                }}
                                            >
                                                <Edit size={16} className="text-primary" />
                                            </button>
                                            <button
                                                className="btn btn-white btn-sm px-3"
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteModal"
                                                onClick={() => setPostToDelete(post)}
                                            >
                                                <Trash2 size={16} className="text-danger" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-5">
                            <p className="text-muted">No posts found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* THE MODAL COMPONENT */}
            <PostFormModal
                token={token}
                refreshData={fetchPosts}
                notyf={notyf}
                editingPost={editingPost}
                setEditingPost={setEditingPost}
                organizations={organizations}
            />

            <DeleteConfirmModal
                onDelete={confirmDelete}
                itemTitle={postToDelete?.title || "this post"}
            />
        </div>
    );
};

export default PostManager;