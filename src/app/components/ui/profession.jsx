import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus,
    loadProfessionList
} from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getProfessionsLoadingStatus());

    // const professions = useSelector(getProfessions());
    // function getProfession(professionId) {
    //     return professions.find((p) => p._id === professionId);
    // }
    // const prof = getProfession(id);

    const prof = useSelector(getProfessionById(id));
    useEffect(() => {
        dispatch(loadProfessionList());
    }, []);

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "loading ...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
