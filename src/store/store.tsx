import { configureStore } from "@reduxjs/toolkit";
import keywords from '../components/keyword-bar/keywordBarSlice';
import articles from '../components/articles-list/articlesListSlice';

const store = configureStore({
    reducer: {keywords, articles},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production"
})
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;