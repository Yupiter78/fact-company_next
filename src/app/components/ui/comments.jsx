import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useComments } from "../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const { userId } = useParams();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const { createComment, removeComment } = useComments();
    const comments = useSelector(getComments());

    const handleSubmit = (data) => {
        createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId, })
        //     .then((data) => setComments([...comments, data]));
    };
    const handleRemoveComment = (id) => {
        removeComment(id);
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            <h3>Comments loading...</h3>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
