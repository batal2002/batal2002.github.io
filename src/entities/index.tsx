import {configureStore} from "@reduxjs/toolkit";
import profileReducer from './profile/profileSlice'
import userReducer from './user/userSlice'
import postsReducer from './posts/postsSlice'
import dialogReducer from './dialog/dialogSlice'
import dialogsReducer from './dialogs/dialogsSlice'
import windowWidthReducer from './windowWidth/windowWidthSlice'

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        user: userReducer,
        posts: postsReducer,
        dialog: dialogReducer,
        dialogs: dialogsReducer,
        windowWidth: windowWidthReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch