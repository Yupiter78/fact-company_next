import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../api";
import QualitiesList from "./qualities";
import CommentForm from "./comentsForm";
import Comments from "./comments";

const UserCard = ({ user }) => {
    const [users, setUsers] = useState();
    const [comments, setComments] = useState();
    const { _id, name, profession, rate, completedMeetings, qualities } = user;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
        api.comments
            .fetchCommentsForUser(_id)
            .then((data) => setComments(data));
    }, []);

    const addComment = (comment) => {
        api.comments.add(comment).then();
        api.comments
            .fetchCommentsForUser(_id)
            .then((data) => setComments(data));
    };

    const removeComment = (id) => {
        api.comments.remove(id).then();
        api.comments
            .fetchCommentsForUser(_id)
            .then((data) => setComments(data));
    };

    return (
        <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
                <div className="card mb-3">
                    <div className="card-body">
                        <Link
                            to={`/users/${_id}/edit`}
                            className="position-absolute top-0 end-0 btn btn-sm"
                        >
                            <i className="bi bi-gear" />
                        </Link>
                        <div className="d-flex flex-column align-items-center text-center position-relative">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle"
                                width="150"
                                alt=""
                            />
                            <div className="mt-3">
                                <h4>{name}</h4>
                                <p className="text-secondary mb-1">
                                    {profession.name}
                                </p>
                                <div className="text-muted">
                                    <i
                                        className="bi bi-caret-down-fill text-primary"
                                        role="button"
                                    />
                                    <i
                                        className="bi bi-caret-up text-secondary"
                                        role="button"
                                    />
                                    <span className="ms-2">{rate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body d-flex flex-column justify-content-center text-center">
                        <h5 className="card-title">
                            <span>Qualities</span>
                        </h5>
                        <p className="card-text">
                            <QualitiesList qualities={qualities} />
                        </p>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body d-flex flex-column justify-content-center text-center">
                        <h5 className="card-title">
                            <span>Completed meetings</span>
                        </h5>
                        <h1 className="display-1">{completedMeetings}</h1>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                {users ? (
                    <CommentForm id={_id} users={users} add={addComment} />
                ) : (
                    <h3>Loading...</h3>
                )}
                {users && comments ? (
                    <Comments
                        id={_id}
                        users={users}
                        comments={comments}
                        remove={removeComment}
                    />
                ) : (
                    <h3>Loading...</h3>
                )}
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;
