import { createSlice } from "@reduxjs/toolkit";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        qualitiesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFiled } =
    actions;
const loadQualitiesList = () => (dispatch) => {
    dispatch(qualitiesReceived());
};

export default qualitiesReducer;
