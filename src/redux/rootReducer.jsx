import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import toastReducer from "./slices/toastSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "QUIZ",
    storage,
    whitelist: ["auth"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    toast: toastReducer,
});

export default persistReducer(persistConfig, rootReducer);
