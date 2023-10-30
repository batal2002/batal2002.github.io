import {createSlice} from "@reduxjs/toolkit";
import {Posts} from "../../shared/model/types";

const initialState: Posts = {
    postList: []
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPostsList(state, action) {
            state.postList = [...action.payload]
        }
    }
})

export const {setPostsList} = postsSlice.actions
export default postsSlice.reducer