import React from "react";
import PropTypes from "prop-types";

const Search = ({ onChange, value }) => {
    return (
        <div>
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default Search;
