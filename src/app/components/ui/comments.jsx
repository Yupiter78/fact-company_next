import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const Comments = ({ users, comments, remove }) => {
    const [modifiedComments, setModifiedComments] = useState();

    useEffect(() => {
        if (comments) {
            const modifiedComments = comments.map((comment) => ({
                _id: comment._id,
                content: comment.content,
                date: comment.created_at,
                author: users.find((user) => user._id === comment.userId).name
            }));
            setModifiedComments(modifiedComments);
        }
    }, [comments]);

    if (!comments.length) return null;

    if (!modifiedComments) return <h3>Loading...</h3>;

    const sortedComments = modifiedComments.sort((a, b) => b.date - a.date);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {sortedComments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        remove={remove}
                    />
                ))}
            </div>
        </div>
    );
};

Comments.propTypes = {
    users: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired
};

export default Comments;
