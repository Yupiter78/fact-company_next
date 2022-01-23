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
        },
        commentRemoved: (state, action) => {
            console.log("action.payload:", action.payload);
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFiled,
    commentCreated,
    commentRemoved
} = actions;
const commentCreateRequested = createAction("comments/commentCreateRequested");
const createCommentFailed = createAction("comments/createCommentFailed");
const removeCommentFailed = createAction("comments/removeCommentFailed");

export function createComment(payload) {
    return async function (dispatch) {
        dispatch(commentCreateRequested());
        try {
            const { content } = await commentService.createComment(payload);
            console.log("content_createComment:", content);
            if (content.content) {
                dispatch(commentCreated(content));
            }
        } catch (error) {
            dispatch(createCommentFailed(error.message));
        }
    };
}

export const removeComment = (commentId) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(removeCommentFailed(error.message));
    }
};

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
