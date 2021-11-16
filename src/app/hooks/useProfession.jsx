import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../services/profession.service";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessionsList();
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }

    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    const getProfession = (id) => {
        return professions.find((profession) => profession._id === id);
    };

    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
