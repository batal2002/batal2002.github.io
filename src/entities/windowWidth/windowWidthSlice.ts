import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    windowWidth: window.innerWidth
}

const windowWidthSlice = createSlice({
    name: 'windowWidth',
    initialState,
    reducers: {
        setWidth(state, action) {
            state.windowWidth = action.payload
        }
    }
})

export const {
    setWidth
} = windowWidthSlice.actions
export default windowWidthSlice.reducer