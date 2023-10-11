import {createSlice} from "@reduxjs/toolkit";
import {Profile} from "../../shared/model/types";

const initialState: Profile = {
    userId: null,
    email: '',
    name: '',
    surname: '',
    avatarURL: '',
    imagesList: [],
    isProfileLoading: false,
    isUser: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileLoading(state) {
            state.isProfileLoading = true;
        },
        unsetProfileLoading(state) {
            state.isProfileLoading = false;
        },
        setProfile(state, action) {
            state.userId = action.payload.id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.avatarURL = action.payload.avatarURL;
            state.isProfileLoading = false;
            state.isUser = action.payload.isUser;
        },
        setProfileImagesList(state, action) {
            state.imagesList = action.payload
        },
        removeProfile(state) {
            state.userId = null;
            state.email = '';
            state.name = '';
            state.surname = '';
            state.avatarURL = '';
            state.imagesList = [];
            state.isProfileLoading = false;
            state.isUser = false;
        },
    }
})

export const {
    setProfile,
    removeProfile,
    setProfileLoading,
    unsetProfileLoading,
    setProfileImagesList
} = profileSlice.actions
export default profileSlice.reducer