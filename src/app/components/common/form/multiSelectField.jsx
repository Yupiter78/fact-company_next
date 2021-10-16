import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    return (
        <Select
            isMulti
            options={optionsArray}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChange}
            name={name}
        />
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string
};

export default MultiSelectField;
