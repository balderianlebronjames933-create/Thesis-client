import  { useState, useEffect, useCallback } from 'react';
import { Trash2, Send } from 'lucide-react';
import { useUser } from '../context/UserContext';

const CommentSection = ({ postId, notyf }) => {
    const { user, token, isAdmin } = useUser();
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    // Fetch comments
    const fetchComments = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/comments/getComments/${postId}`);
            const data = await res.json();
            if (res.ok) setComments(data);
        } catch (err) {
            console.error("Error loading comments:", err);
        }
    }, [postId]);

    useEffect(() => {
        if (postId) fetchComments();
    }, [postId, fetchComments]);

    // Add Comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!text.trim() || !token) return;

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/comments/addComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ postId, text })
            });
            if (res.ok) {
                setText("");
                fetchComments();
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };


    // Function to toggle comment visibility (Hide/Show)
 const handleToggleStatus = async (commentId, currentStatus) => {
        const newStatus = currentStatus === 'hidden' ? 'active' : 'hidden';

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/comments/updateStatus/${commentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                fetchComments();
                // Success Notification
                notyf.success(`Comment is now ${newStatus === 'hidden' ? 'hidden from public' : 'visible'}`);
            } else {
                notyf.error("Failed to update status");
            }
        } catch (err) {
            console.error("Moderation failed", err);
            notyf.error("An error occurred while moderating");
        }
    };

    const handleDelete = async (commentId, isAdminAction) => {
        const endpoint = isAdminAction ? 'adminDeleteComment' : 'deleteComment';
        if (!window.confirm("Are you sure you want to remove this comment?")) return;

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/comments/${endpoint}/${commentId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                fetchComments();
                notyf.success("Comment permanently removed");
            } else {
                notyf.error("Could not delete comment");
            }
        } catch (err) {
            console.error("Delete failed:", err);
            notyf.error("Connection error");
        }
    };

    return (
        <div className="comment-section pt-2 border-top">
            <h6 className=" fw-bold mb-2 mt-1 text-dark">Discussion ({comments.length})</h6>

            {user ? (
                <form onSubmit={handleAddComment} className="mb-4">
                    <div className="input-group shadow-sm rounded-pill overflow-hidden">
                        <input
                            type="text"
                            className="form-control border-0 px-3"
                            placeholder="Add a comment..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button className="btn btn-primary border-0 px-3" type="submit">
                            <Send size={18} />
                        </button>
                    </div>
                </form>
            ) : (

                <p className="large text-muted p-2 rounded text-center bg-primary bg-opacity-10 mx-2">
                    Please Log in to join the discussion.
                </p>

            )}

            <div className="comment-list" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {comments.map(c => {
                    const isOwner = user?.id === c.userId?._id;
                    const isHidden = c.status === 'hidden';

                    // Safety check: If a comment is hidden and current user is NOT an admin, don't show it
                    if (isHidden && !isAdmin) return null;

                    const authorName = c.userId?.isAdmin
                        ? `Admin-${c.userId?.firstName} ${c.userId?.lastName}`
                        : `${c.userId?.firstName} ${c.userId?.lastName}`;

                    return (
                        <div key={c._id} className={`d-flex mb-2 gap-2 align-items-start ${isHidden ? 'opacity-50' : ''}`}>
                            <div className={`flex-grow-1 border py-2 px-3 rounded-4 shadow-sm ${isHidden ? 'bg-light border-dashed' : 'bg-white'}`}>
                                <div className="d-flex justify-content-between align-items-center mb-0.5">
                                    <span className={`small fw-bold ${c.userId?.isAdmin ? 'text-danger' : 'text-primary'}`}>
                                        {authorName} {isHidden && <span className="badge bg-secondary ms-1">Hidden</span>}
                                    </span>
                                    <span className="text-muted" style={{ fontSize: '11px' }}>
                                        {new Date(c.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="small mb-0 text-black">{c.text}</p>
                            </div>

                            <div className="d-flex flex-column pt-1">
                                {/* Standard Delete for Owners */}
                                {isOwner && (
                                    <button onClick={() => handleDelete(c._id, false)} className="btn btn-link text-muted p-1" title="Delete">
                                        <Trash2 size={15} />
                                    </button>
                                )}

                                {/* Admin Moderation Controls */}
                                {isAdmin && !isOwner && (
                                    <>
                                        {/* <button onClick={() => handleDelete(c._id, true)} className="btn btn-link text-danger p-1" title="Force Delete">
                            <ShieldAlert size={17} />
                        </button> */}
                                        <button
                                            onClick={() => handleToggleStatus(c._id, c.status)}
                                            className={`btn btn-link p-1 ${isHidden ? 'text-success' : 'text-danger'}`}
                                            title={isHidden ? "Unhide" : "Hide"}
                                        >
                                            {/* Simple text or an eye icon could go here */}
                                            <span style={{ fontSize: '10px', fontWeight: 'bold' }}>{isHidden ? 'SHOW' : 'HIDE'}</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default CommentSection;