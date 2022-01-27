import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId, updateUserData } from "../../store/users";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserId = useSelector(getCurrentUserId());
    const [colorFillUp, setColorFillUp] = useState("-fill text-primary");
    const [colorFillDown, setColorFillDown] = useState(" text-secondary");
    const handleRateUp = () => {
        setColorFillUp("-fill text-primary");
        setColorFillDown(" text-secondary");
        dispatch(updateUserData({ ...user, rate: user.rate + 1 }));
    };
    const handleRateDown = () => {
        setColorFillUp(" text-secondary");
        setColorFillDown("-fill text-primary");
        dispatch(updateUserData({ ...user, rate: user.rate - 1 }));
    };
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    // const changeColor = (color) => {
    //     return color === "primary" ? "-fill text-primary" : " text-secondary";
    // };
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUserId === user._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleClick}
                    >
                        <i className="bi bi-gear" />
                    </button>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
                        className="rounded-circle"
                        width="150"
                        alt=""
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                            {user.profession.name}
                        </p>
                        <div className="text-muted">
                            <i
                                className={`bi bi-caret-down${colorFillDown}`}
                                role="button"
                                onClick={handleRateDown}
                            />
                            <i
                                className={`bi bi-caret-up${colorFillUp}`}
                                role="button"
                                onClick={handleRateUp}
                            />
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
