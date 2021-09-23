import React from "react";
import { useParams } from "react-router-dom";
import UsersList from "./usersList";
import User from "../components/user";

const Users = () => {
    const { userId } = useParams();

    return <>{userId ? <User /> : <UsersList />}</>;
};

export default Users;
