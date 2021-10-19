import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "../../ui/userCard";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return <UserCard user={user} />;
    } else {
        return <h3>Loading...</h3>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
