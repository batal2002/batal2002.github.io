import React, {useEffect, useRef} from 'react';
import {Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import SendForm from "../../features/SendForm";
import DialogTitle from "../../widgets/DialogTitle";
import {removeDialog, setMessages, setRecipientInfo, setRecipientIsLoading} from "../../entities/dialog/dialogSlice";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";
import {collection, doc, orderBy, query, updateDoc} from "firebase/firestore";
import {firestore} from "../../firebase";
import {useParams} from "react-router";
import Message from "../../widgets/Message";
import {IMessage} from "../../shared/model/types";
import NotFound from "../../widgets/NotFound";

const DialogPage = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const {userId} = useAppSelector(state => state.user)
    const {messages} = useAppSelector(state => state.dialog)
    const {windowWidth} = useAppSelector(state => state.windowWidth)
    const dispatch = useAppDispatch()
    const {recipientId} = useParams()
    const [messagesData, messagesLoading, error, messagesSnapshot] = useCollectionData(query(
        collection(firestore, `usersMessages/${userId}/${recipientId}`),
        orderBy('date')
    ))
    const [userDialogData, userDialogLoading] = useDocumentData(doc(firestore, `usersDialogs/${userId}/userDialogs/${recipientId}`))
    const [recipientData, recipientLoading] = useDocumentData(doc(firestore, `users/${recipientId}`))
    const scrollBot = () => {
        if (ref.current) ref.current.scrollIntoView()
    }
    useEffect(() => {
        if (recipientLoading) {
            dispatch(setRecipientIsLoading())
        }
        if (!recipientLoading && recipientData) {
            dispatch(setRecipientInfo({
                id: recipientData.userId,
                avatarURL: recipientData.avatarURL,
                name: recipientData.name,
                surname: recipientData.surname,
                isLoading: false
            }))
        }
    }, [recipientData])

    useEffect(() => {
        if (messagesSnapshot && !messagesLoading) {
            const messages: IMessage[] = []

            messagesSnapshot.forEach(doc => {
                const local = doc.metadata.hasPendingWrites;
                if (!local) {
                    messages.push({
                        id: doc.id,
                        date: doc.data().date.toDate().toLocaleString(),
                        text: doc.data().text,
                        authorId: doc.data().authorId,
                        imageList: doc.data().imageList,
                    })
                }
            })
            dispatch(setMessages({messages}))
        }
    }, [messagesSnapshot])
    useEffect(() => {
        scrollBot()
    }, [messages.length])

    useEffect(() => {
        if (userId && recipientId && messagesData && userDialogData && !userDialogLoading) {
            updateDoc(doc(firestore, 'usersDialogs', userId, 'userDialogs', recipientId), {
                uncheckedMessages: 0
            })
        }
    }, [messagesData])
    useEffect(() => {
        return () => {
            dispatch(removeDialog())
        }
    }, [])

    if (!recipientData && !recipientLoading) return <NotFound item={'dialog'}/>


    return (
        <Box sx={{
            position: 'relative',
            height: (windowWidth <= 1200) ? 'calc(100vh - 100px)' : 'calc(100vh - 140px)',
            maxWidth: 580,
            bgcolor: '#edf1f7',
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            m: (windowWidth <= 1200) ? '0 auto' : 0
        }}>
            <DialogTitle/>
            <Box sx={{overflow: 'auto', height: '100%', position: 'relative', p: '20px 20px 0'}}>
                {messages && messages.map((message, index) =>
                    <Message key={message.id} authorId={message.authorId} date={message.date} text={message.text}
                             imageList={message.imageList}
                             newAuthor={messages[index - 1]?.authorId !== message.authorId}/>
                )}
                {messages && <div ref={ref}></div>}
            </Box>

            {recipientId && <SendForm recipientId={recipientId}/>}
        </Box>);
};

export default DialogPage;