import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../shared/model/types";

const initialState: User = {
    userId: null,
    name: '',
    surname: '',
    avatarURL: '',
    isLoginLoading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoginLoading(state) {
            state.isLoginLoading = true;
        },
        unsetLoginLoading(state) {
            state.isLoginLoading = false;
        },
        setUser(state, action) {
            state.userId = action.payload.userId;

            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.avatarURL = action.payload.avatarURL;
        },
        removeUser(state) {
            state.userId = null;
            state.name = '';
            state.surname = '';
            state.avatarURL = '';
        },
    }
})

export const {
    setLoginLoading,
    unsetLoginLoading,
    setUser,
    removeUser,
} = userSlice.actions
export default userSlice.reducer