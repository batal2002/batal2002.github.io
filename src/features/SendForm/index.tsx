import React, {useState} from 'react';
import {Box, Grid, IconButton, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppSelector} from "../../shared/hooks/redux";
import {zodResolver} from "@hookform/resolvers/zod";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PreviewImage from "../../shared/ui/PreviewImage";
import {compressImage} from "../../shared/helpers/handleImageDownload";
import {sendFormSchema} from "../../shared/model/validation";
import {SendFormSchema} from "./model/types";
import SendIcon from "@mui/icons-material/Send";
import {enterPress} from "../../shared/helpers/enterPress";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc, increment, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {firestore} from "../../firebase";
import {sendMessage} from "../../shared/helpers/sendMessage";

interface Props {
    recipientId: string
}

const SendForm = ({recipientId}: Props) => {
        const {userId} = useAppSelector(state => state.user)
        const {control, handleSubmit, reset, formState: {errors}, setError} = useForm({
            resolver: zodResolver(sendFormSchema),
            defaultValues: {
                message: ""
            },
        })
        const [previewImages, setPreviewImages] = useState<(string | undefined)[]>([])
        const [userDialogData, userDialogLoading] = useDocumentData(doc(firestore, `usersDialogs/${userId}/userDialogs/${recipientId}`))
        const [recipientDialogData, recipientDialogLoading] = useDocumentData(doc(firestore, `usersDialogs/${recipientId}/userDialogs/${userId}`))
        const handleImage = (file: File) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = r => {
                setPreviewImages((prevState) => ([
                    ...prevState,
                    r.target?.result?.toString()
                ]))
            }
        }

        const onSubmit: SubmitHandler<SendFormSchema> = async (data) => {

            if (!userDialogLoading && !recipientDialogLoading && userId) {
                const messageText = data.message.replace(/(\r?\n){3,}/g, '\n\n').replace(/ {2,}/g, ' ').trim();
                const previewMessageText = data.message.replace(/\s+/g, ' ').trim();
                if (!messageText && previewImages.length === 0) {
                    setError("message", {
                        type: "manual",
                        message: "message is empty",
                    })
                    return
                }

                if (!userDialogData) {
                    await setDoc(doc(firestore, 'usersDialogs', userId, 'userDialogs', recipientId), {
                        recipientId,
                        creator: userId,
                        lastMessage: {
                            authorId: userId,
                            text: previewMessageText,
                            imageCount: previewImages.length
                        },
                        uncheckedMessages: 0,
                        lastUpdateDate: serverTimestamp()
                    })
                }
                if (!recipientDialogData) {
                    await setDoc(doc(firestore, 'usersDialogs', recipientId, 'userDialogs', userId), {
                        recipientId: userId,
                        creator: userId,
                        lastMessage: {
                            authorId: userId,
                            text: previewMessageText,
                            imageCount: previewImages.length
                        },
                        uncheckedMessages: 1,
                        lastUpdateDate: serverTimestamp()

                    })
                }


                if (userDialogData) {
                    await updateDoc(doc(firestore, 'usersDialogs', userId, 'userDialogs', recipientId), {
                        lastMessage: {
                            authorId: userId,
                            text: previewMessageText,
                            imageCount: previewImages.length
                        },
                        uncheckedMessages: 0,
                        lastUpdateDate: serverTimestamp()
                    })
                }
                if (recipientDialogData) {
                    await updateDoc(doc(firestore, 'usersDialogs', recipientId, 'userDialogs', userId), {
                        lastMessage: {
                            authorId: userId,
                            text: previewMessageText,
                            imageCount: previewImages.length
                        },
                        uncheckedMessages: increment(1),
                        lastUpdateDate: serverTimestamp()
                    })
                }
                await sendMessage(recipientId, userId, messageText, previewImages)

                setPreviewImages([])
                reset()
            }
        }

        return (
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{width: '100%', p: 1, bgcolor: '#d8eaff',}}>
                <Box display={'flex'} sx={{alignItems: 'start', gap: 1}}>
                    <IconButton component={'label'} aria-label="delete" sx={{mt: 1}}
                                disabled={previewImages.length >= 10}>
                        <AddAPhotoIcon/>
                        <input type="file" accept={'image/*'} hidden
                               onChange={e => compressImage(e.target, handleImage)}/>
                    </IconButton>
                    <Controller control={control} name={'message'} render={({field}) => (
                        <TextField
                            id={'message'}
                            fullWidth
                            label="Write a message"
                            multiline
                            onKeyDown={(e) => enterPress(e, handleSubmit(onSubmit))}
                            onChange={e => field.onChange(e)}
                            value={field.value}
                            error={!!errors.message?.message}
                            helperText={errors.message?.message}
                        />)
                    }/>
                    <IconButton disabled={userDialogLoading && recipientDialogLoading} type="submit" sx={{mt: 1}}>
                        <SendIcon fontSize={"medium"}/>
                    </IconButton>
                </Box>
                {previewImages.length > 0 && <Grid container columns={10} spacing={1} sx={{mt: 1}}>
                    {previewImages.map((base, index) => <PreviewImage key={index} base={base} index={index}
                                                                      setPreviewImages={setPreviewImages}/>)}
                </Grid>}

            </Box>
        );
    }
;

export default SendForm;