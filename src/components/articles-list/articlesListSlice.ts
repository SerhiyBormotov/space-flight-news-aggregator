import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useAPIService , { ArticleInterface } from "../../services/APIService";

type ArticlesSlice = {
    data: ArticleInterface[],
    dataLoading: boolean,
    dataError: boolean,
    count: number,
    offset: number
}

export const fetchArticles = createAsyncThunk(
    'articles/getAll',
    async (keywords: string[]) => { 
        let payload : {
            data: ArticleInterface[],
            count: number
        } = {
            data: [],
            count: 0
        };
        try {
            const {getArticles, getArticlesCount} = useAPIService();

    
            payload.data = await getArticles(keywords);
    
            if (keywords.length === 0) {
                payload.count = await getArticlesCount();
            } else {
                payload.count = payload.data.length;
            }
             
        } catch (err) {
            console.log(err); 
        } 
        return payload;         
    

    }
)
const initialState: ArticlesSlice = {
    data: [],
    dataLoading: true,
    dataError: false,
    count: 0,
    offset: 0
}

const articlesListSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        incrOffset: (state) => {
            state.offset = state.offset + 6;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchArticles.pending, (state) => {
            state.dataLoading = true;
            state.dataError = false;
        })
        .addCase(fetchArticles.rejected, (state) => {
            state.dataError = true;
            state.dataLoading = false;
        })
        .addCase(fetchArticles.fulfilled, (state, action) => {
            state.dataLoading = false;
            state.data = action.payload.data;
            state.count = action.payload.count;
            state.offset = 0;
        })
    }
});

const {reducer, actions} = articlesListSlice;
export default reducer;
export const {
    incrOffset
} = actions;