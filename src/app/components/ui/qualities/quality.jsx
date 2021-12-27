import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
    console.log("id_quality:", id);
    const { getQuality } = useQualities();
    const { _id, color, name } = getQuality(id);
    console.log("_ID, COLOR, NAME_quality:", _id, color, name);
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
    // return "something";
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
