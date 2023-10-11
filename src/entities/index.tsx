import {configureStore} from "@reduxjs/toolkit";
import profileReducer from './profile/profileSlice'
import userReducer from './user/userSlice'

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch