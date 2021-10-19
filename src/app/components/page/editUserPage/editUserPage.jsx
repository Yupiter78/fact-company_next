import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import EditForm from "../../ui/editForm";

const EditUserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    return <>{user ? <EditForm user={user} /> : <h3>Loading...</h3>}</>;
};
export default EditUserPage;
