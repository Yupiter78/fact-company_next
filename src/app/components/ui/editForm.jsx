import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";

const EditForm = ({ user }) => {
    const history = useHistory();
    const [data, setData] = useState({
        name: user.name,
        email: user.email || "",
        profession: user.profession._id,
        sex: user.sex || "male",
        qualities: user.qualities.map((quality) => ({
            value: quality._id,
            label: quality.name
        }))
    });
    const [qualities, setQualities] = useState();
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: { message: "Name isRequired" }
        },
        email: {
            isRequired: { message: "email isRequired" },
            isEmail: { message: "Email entered incorrectly" }
        },

        profession: {
            isRequired: { message: " Be sure to choose your profession" }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const profession = {
            _id: data.profession,
            name: Object.keys(professions)
                .map((p) => professions[p])
                .find((p) => p._id === data.profession).name
        };
        const qualityIds = data.qualities.map((quality) => quality.value);
        const updatedQualities = Object.values(qualities).filter((quality) =>
            qualityIds.includes(quality._id)
        );
        const updatedData = {
            ...data,
            profession,
            qualities: updatedQualities
        };
        api.users.update(user._id, updatedData).then();
        history.goBack();
    };
    return (
        <>
            <button
                onClick={() => history.goBack()}
                className="btn btn-primary pe-4"
                disabled={!professions}
            >
                <i className="bi bi-caret-left" />
                Come back
            </button>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h3 className="mb-4">Changing user data</h3>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Choose your profession"
                                defaultOption="Choose..."
                                options={professions}
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                label="Choose your gender"
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                label="Choose your qualities"
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                defaultValue={data.qualities}
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
EditForm.propTypes = {
    user: PropTypes.object
};

export default EditForm;
