import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
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

export const loadProfessionList = () => async (dispatch) => {
    dispatch(professionsRequested());
    try {
        const { content } = await professionService.get();
        dispatch(professionsReceived(content));
    } catch (error) {
        dispatch(professionsRequestFiled(error.message));
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export default professionsReducer;
