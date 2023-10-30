import React, {useState} from 'react';
import {Box, Button, Grid, IconButton, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppSelector} from "../../shared/hooks/redux";
import {zodResolver} from "@hookform/resolvers/zod";
import {postFormSchema} from "../../shared/model/validation";
import {PostFormSchema} from "./model/types";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PreviewImage from "../../shared/ui/PreviewImage";
import {compressImage} from "../../shared/helpers/handleImageDownload";
import {addDoc, collection, doc, serverTimestamp, setDoc} from "firebase/firestore";
import {firestore, storage} from "../../firebase";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {v4} from "uuid";
import {enterPress} from "../../shared/helpers/enterPress";

const AddPostForm = () => {
        const {userId} = useAppSelector(state => state.user)
        const {control, handleSubmit, reset, formState: {errors}, setError} = useForm({
            resolver: zodResolver(postFormSchema),
            defaultValues: {
                post: ""
            },
        })
        const [previewImages, setPreviewImages] = useState<(string | undefined)[]>([])

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

        const onSubmit: SubmitHandler<PostFormSchema> = async (data) => {
            const postText = data.post.replace(/(\r?\n){3,}/g, '\n\n').replace(/ {2,}/g, ' ').trim();

            if (!postText && previewImages.length === 0) {
                setError("post", {
                    type: "manual",
                    message: "Post is empty",
                })
                return
            }

            await addDoc(collection(firestore, 'posts'), {
                authorId: userId,
                text: postText,
                date: serverTimestamp()
            }).then(async docRef => {
                previewImages.forEach((file, index) => {
                    if (file) {
                        uploadString(ref(storage, `${userId}/${v4()}`), file, 'data_url')
                            .then(value => {
                                getDownloadURL(value.ref).then(async imgURL => {
                                        await setDoc(doc(firestore, 'postsImages', docRef.id, 'postImages', index.toString()), {
                                            imgURL
                                        });
                                    }
                                )
                            })
                    }
                })
            })

            setPreviewImages([])
            reset()
        }

        return (
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{mb: 2}}>
                <Box display={'flex'} sx={{alignItems: 'start', gap: 1, marginBottom: 1}}>
                    <Controller control={control} name={'post'} render={({field}) => (
                        <TextField
                            id={'post'}
                            fullWidth
                            label="Whats new?"
                            multiline
                            maxRows={6}
                            onKeyDown={(e) => enterPress(e, handleSubmit(onSubmit))}
                            onChange={e => field.onChange(e)}
                            value={field.value}
                            error={!!errors.post?.message}
                            helperText={errors.post?.message}
                        />)
                    }/>
                    <IconButton component={'label'} aria-label="delete" sx={{mt: 1}} disabled={previewImages.length >= 10}>
                        <AddAPhotoIcon/>
                        <input type="file" accept={'image/*'} hidden
                               onChange={e => compressImage(e.target, handleImage)}/>
                    </IconButton>
                </Box>
                {previewImages.length > 0 && <Grid container columns={10} spacing={1}>
                    {previewImages.map((base, index) => <PreviewImage key={index} base={base} index={index}
                                                                      setPreviewImages={setPreviewImages}/>)}
                </Grid>}
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 1, ml: 'auto', mr: 0}}
                >
                    publish
                </Button>

            </Box>
        );
    }
;

export default AddPostForm;