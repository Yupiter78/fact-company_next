import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isloading = false;
        },
        commentCreated: (state, action) => {
            state.entities = [...state.entities, action.payload];
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFiled,
    commentCreated
} = actions;
const commentCreateRequested = createAction("comments/commentCreateRequested");
const createCommentFailed = createAction("comments/createCommentFailed");

export function createComment(payload) {
    return async function (dispatch) {
        dispatch(commentCreateRequested());
        try {
            const { content } = await commentService.createComment(payload);
            console.log("content_createComment:", content);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(createCommentFailed(error.message));
        }
    };
}

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
