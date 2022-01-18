import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import { isOutdated } from "../utils/outDated";

const professionSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isloading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionSlice;
const { professionsRequested, professionsReceived, professionsRequestFiled } =
    actions;

export const loadProfessionList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        console.log("lastFetch:", lastFetch);
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsReceived(content));
        } catch (error) {
            dispatch(professionsRequestFiled(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionById = (professionId) => (state) => {
    return state.professions.entities.find((p) => p._id === professionId);
};

export default professionsReducer;
