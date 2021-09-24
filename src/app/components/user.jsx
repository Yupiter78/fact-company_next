import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import UserPage from "./userPage";
import SplashScreen from "./splashScreen";

const User = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((user) => setUser(user));
    }, []);
    return <>{user ? <UserPage {...user} /> : <SplashScreen />}</>;
};

export default User;
