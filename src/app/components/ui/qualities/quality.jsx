import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
    console.log("id:", id);
    const { getQuality } = useQualities();
    console.log("getQuality(id):", getQuality(id));
    const { _id, color, name } = getQuality(id);
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
    // return "something";
};
Quality.propTypes = {
    // id: PropTypes.string.isRequired
    id: PropTypes.object.isRequired
};

export default Quality;
