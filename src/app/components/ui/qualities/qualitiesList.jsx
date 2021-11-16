import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();

    return (
        <>
            {!isLoading ? (
                qualities.map((id) => <Quality key={id} {...getQuality(id)} />)
            ) : (
                <h3>loading...</h3>
            )}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
