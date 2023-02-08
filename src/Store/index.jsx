import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "../API/MainApi";
import mainReducer from './MainSlice'


export const store = configureStore({
    reducer: {
        main: mainReducer,
        [mainApi.reducerPath]: mainApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware)
})