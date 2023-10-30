import {createSlice} from "@reduxjs/toolkit";
import {Profile} from "../../shared/model/types";

const initialState: Profile = {
    profileId: null,
    email: '',
    name: '',
    surname: '',
    avatarURL: '',
    imagesList: [],
    postsList: [],
    subscriptionsList: [],
    totalSubscriptions: 0,
    subscribersList: [],
    totalSubscribers: 0,
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
            state.profileId = action.payload.userId;
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
        setProfilePostsList(state, action) {
            state.postsList = action.payload
        },
        setProfileSubscriptionsList(state, action) {
            state.subscriptionsList = action.payload
        },
        setProfileTotalSubscriptions(state, action) {
            state.totalSubscriptions = action.payload
        },
        setProfileSubscribersList(state, action) {
            state.subscribersList = action.payload
        },
        setProfileTotalSubscribers(state, action) {
            state.totalSubscribers = action.payload
        },
        removeProfile(state) {
            state.profileId = null;
            state.email = '';
            state.name = '';
            state.surname = '';
            state.avatarURL = '';
            state.imagesList = [];
            state.postsList = [];
            state.subscriptionsList = [];
            state.totalSubscriptions = 0;
            state.subscribersList = [];
            state.totalSubscribers = 0;
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
    setProfileImagesList,
    setProfilePostsList,
    setProfileSubscriptionsList,
    setProfileTotalSubscriptions,
    setProfileSubscribersList,
    setProfileTotalSubscribers
} = profileSlice.actions
export default profileSlice.reducer