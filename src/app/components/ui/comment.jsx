import React from "react";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";

const Comment = ({ comment, remove }) => {
    const { _id, author, date, content } = comment;
    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mb-1 d-flex align-items-center flex-wrap">
                                        <span className="me-1">{author}</span>
                                        <span className="small">
                                            | {formatDate(date)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => remove(_id)}
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                    >
                                        <i className="bi bi-x-lg" />
                                    </button>
                                </div>
                                <p className="small mb-0 pe-4">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired
};

export default Comment;
