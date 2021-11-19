import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const profession = getProfession(id);
    console.log("profession_jsx:", profession);

    return <>{!isLoading ? profession.name : "loading..."}</>;
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;