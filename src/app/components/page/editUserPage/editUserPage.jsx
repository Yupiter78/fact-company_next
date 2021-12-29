import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";
import { validator } from "../../../utils/ validator";
// import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    console.log("history:", history);
    const { getUserById } = useUser();
    const user = getUserById(userId);
    console.log("user:", user);
    const { currentUser, update } = useAuth();
    console.log("currentUser:", currentUser);
    const [data, setData] = useState({});
    const { qualities, getQuality, isLoading } = useQualities();
    console.log("isLoading:", isLoading);
    const isEmpty = _.isEmpty(data);
    console.log("isEmpty:", isEmpty);
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const { professions } = useProfessions();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const [errors, setErrors] = useState({});
    // const getProfessionById = (id) => {
    //     for (const prof in professions) {
    //         const profData = professions[prof];
    //         if (profData._id === id) return profData;
    //     }
    // };
    // const getQualities = (elements) => {
    //     const qualitiesQrray = [];
    //     for (const elem of elements) {
    //         for (const qualy in qualities) {
    //             if (elem.value === qualities[qualy]._id) {
    //                 qualitiesQrray.push(qualities[qualy]);
    //             }
    //         }
    //     }
    //     return qualitiesQrray;
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        // const { profession, qualities } = data;
        // api.users
        //     .update(userId, {
        //         ...data,
        //         profession: getProfessionById(profession),
        //         qualities: getQualities(qualities)
        //     })
        //     .then((data) => history.push(`/users/${data._id}`));
        update(data);
        console.log(data);
    };
    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };
    useEffect(() => {
        console.log("currentUser.qualities:", currentUser.qualities);
        console.log("getQuality:", getQuality);
        const getQualitiesById = (qualitiesId) => {
            console.log("qualitiesId:", qualitiesId);
            const qualities = qualitiesId.map((q) => getQuality(q));
            return qualities.map((q) => ({ label: q.name, value: q._id }));
        };
        // const getQualitiesById = !isLoading
        //     ? currentUser.qualities?.map((id) => getQuality(id))
        //     : [];
        if (!isLoading) {
            console.log(
                "getQualitiesById:",
                getQualitiesById(currentUser.qualities)
            );
            setData({
                ...currentUser,
                qualities: getQualitiesById(currentUser.qualities)
            });
        }
        //     api.users.getById(userId).then(({ profession, qualities, ...data }) =>
        //         setData((prevState) => ({
        //             ...prevState,
        //             ...data,
        //             qualities: transformData(qualities),
        //             profession: profession._id
        //         }))
        //     );
        //     api.qualities.fetchAll().then((data) => setQualities(data));
        //     api.professions.fetchAll().then((data) => setProfession(data));
    }, [isLoading]);
    console.log("data:", data);
    console.log("transformData(qualities)", transformData(qualities));
    useEffect(() => {
        if (data?._id) console.log("data_quality:", data);
    }, [data]);

    const validatorConfog = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <div className="mb-4">
                        <img
                            src={currentUser.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                    </div>
                    {!isLoading && !isEmpty ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={professionsList}
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                values
                                name="qualities"
                                label="Выберите ваши качесвта"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
