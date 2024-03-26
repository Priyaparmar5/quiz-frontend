import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';

const initialState = {
    message: null,
    type: null,
};

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        ToastShow: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
    },
});

const selectToastState = (state) => {
    return { message: state.toast?.message, type: state.toast?.type };
};

export const toastSelector = createSelector(
    [selectToastState],
    (toastState) => toastState
);

const { actions, reducer } = toastSlice;

export const { ToastShow } = actions;

export default reducer;
