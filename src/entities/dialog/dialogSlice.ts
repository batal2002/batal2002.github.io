import {createSlice} from "@reduxjs/toolkit";
import {IDialog} from "../../shared/model/types";

const initialState: IDialog = {
    recipientInfo: {
        id: '',
        avatarURL: '',
        name: '',
        surname: '',
        isLoading: false,
    },
    messages: []
}

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        createDialog(state, action) {
            state.recipientInfo.id = action.payload.recipentId
        },
        setRecipientIsLoading(state) {
            state.recipientInfo.isLoading = true
        },
        setRecipientInfo(state, action) {
            state.recipientInfo = {
                id: action.payload.id,
                avatarURL: action.payload.avatarURL,
                name: action.payload.name,
                surname: action.payload.surname,
                isLoading: action.payload.isLoading,
            }
        },
        setMessages(state, action) {
            state.messages = action.payload.messages
        },
        removeDialog(state) {
            state.recipientInfo = {
                id: '',
                avatarURL: '',
                name: '',
                surname: '',
                isLoading: false,
            }
            state.messages = []
        },
    }
})

export const {createDialog, setRecipientIsLoading, setRecipientInfo, setMessages, removeDialog} = dialogSlice.actions

export default dialogSlice.reducer