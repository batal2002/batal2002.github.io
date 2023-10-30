import {createSlice} from "@reduxjs/toolkit";
import {Dialogs} from "../../shared/model/types";

const initialState: Dialogs = {
    dialogsList: [],
    isLoading: false
}

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        setLoading(state) {
          state.isLoading = true
        },
        setDialogs(state, action) {
            state.dialogsList = action.payload
            state.isLoading = false
        }
    }
})

export const {setLoading, setDialogs} = dialogsSlice.actions

export default dialogsSlice.reducer