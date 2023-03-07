import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type KeywordsSlice = {
    keywords: string[]
}
const initialState: KeywordsSlice = {
    keywords: []
}
const keywordBarSlice = createSlice({
    name: 'keywords',
    initialState,
    reducers: {
        setKeywords: {
            reducer: (state, action: PayloadAction<string[]>) => {
                if (!(action.payload.length === state.keywords.length && action.payload.every((item, i) => item === state.keywords[i]))) {
                    state.keywords = action.payload;
                  }
            },
            prepare: (str: string) => {
                const payload = str.trim().split(/\s|,/).filter(item => item.length > 1); 
                return {payload}
            }
        }
    }

})

const {reducer, actions} = keywordBarSlice;
export default reducer;
export const {setKeywords} = actions;