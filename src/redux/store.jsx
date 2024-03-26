import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './rootReducer';
import { persistStore } from 'redux-persist';

const MiddleWares = [];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(MiddleWares),
});

export const persistor = persistStore(store);
const exportStore = { store, persistor };

export const useAppDispatch = () => useDispatch();

export default exportStore;
