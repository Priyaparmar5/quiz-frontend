import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: null,
};
export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        removeToken: (state) => {
            state.token = null;
        },
    },
});


export const userSelector = (state) =>
    state.auth.user;

export const tokenSelector = (state) =>
    state.auth.token;

const { actions, reducer } = userSlice;

export const { setUser, setToken, removeToken } = actions;

export const setuser = (data) => {
    setUser(data);
};
export const settoken = (data) => {
    setToken(data);
};

export default reducer;
