import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { createAction } from "@reduxjs/toolkit/src/createAction";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {}
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceived, usersRequestFiled, authRequestSuccess } =
    actions;
const authRequested = createAction("users/authRequested");

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ useId: data.localId }));
        } catch (error) {
            console.log("error:", error);
        }
    };

export const loadUsersList = () => async (dispatch) => {
    console.log("usersRequested():", usersRequested());
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        console.log("usersReceived(content):", usersReceived(content));
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message()));
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === userId);
    }
};

export default usersReducer;
