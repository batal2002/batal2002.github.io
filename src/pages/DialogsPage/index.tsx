import React, {useEffect} from 'react';
import {Box, LinearProgress, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, orderBy, query} from "firebase/firestore";
import {firestore} from "../../firebase";
import {setDialogs, setLoading} from "../../entities/dialogs/dialogsSlice";
import {DialogInfo} from "../../shared/model/types";
import DialogItem from "../../widgets/DialogItem";

const DialogsPage = () => {
    const dispatch = useAppDispatch()
    const {userId} = useAppSelector(state => state.user)
    const {windowWidth} = useAppSelector(state => state.windowWidth)
    const {dialogsList, isLoading} = useAppSelector(state => state.dialogs)
    const [dialogsData, dialogsLoading] = useCollectionData(query(
        collection(firestore, `usersDialogs/${userId}/userDialogs`),
        orderBy('lastUpdateDate')
    ))

    useEffect(() => {
        dispatch(setLoading())
        if (dialogsData && !dialogsLoading) {
            const dialogs: DialogInfo[] = []
            dialogsData.forEach(data => {
                dialogs.push({
                    lastMessage: data.lastMessage,
                    lastUpdateDate: data.lastUpdateDate.toDate().toLocaleString(),
                    recipientId: data.recipientId,
                    uncheckedMessages: data.uncheckedMessages
                })

            })
            dispatch(setDialogs(dialogs.reverse()))
        }
    }, [dialogsData])


    return (
        <Box sx={{maxWidth: 580, m: (windowWidth <= 1200) ? '0 auto' : 0}}>
            {isLoading && <LinearProgress/>}
            {dialogsList && (
                dialogsList.length > 0 ?
                    dialogsList.map(dialog => <DialogItem key={dialog.recipientId} {...dialog}/>) :
                    <Typography variant={'h4'} sx={{color: '#1976d2', textAlign: 'center'}}>Dialogs not found</Typography>
            )}
        </Box>
    );
};

export default DialogsPage;