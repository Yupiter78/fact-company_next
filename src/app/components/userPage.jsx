import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

const UserPage = ({ name, profession, rate, completedMeetings, qualities }) => {
    const history = useHistory();
    const handleUsers = () => {
        history.push("/users");
    };
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    <span className="fs-2">{name}</span>
                </h5>
                <h5 className="card-title">
                    <span className="fs-3">Профессия: {profession.name}</span>
                </h5>
                <p className="card-text mb-1">
                    <span className="fs-6">
                        Встретился, раз: {completedMeetings}
                    </span>
                </p>
                <p className="card-text">
                    <span className="fs-3">Оценка: {rate} / 5</span>
                </p>
                <div className="mb-4">
                    <QualitiesList qualities={qualities} />
                </div>
                <button onClick={handleUsers}>Все пользователи</button>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    name: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired,
    rate: PropTypes.number.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    qualities: PropTypes.array.isRequired
};

export default UserPage;
