import React from 'react';
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import {compressImage} from "../../shared/helpers/handleImageDownload";
import {Button} from "@mui/material";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {firestore, storage} from "../../firebase";
import {useAppSelector} from "../../shared/hooks/redux";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";

const AddImageLabel = () => {
    const {userId} = useAppSelector(state => state.user)
    const downloadImage = async (file: File) => {
        uploadBytes(ref(storage, `${userId}/${v4()}`), file)
            .then(value => {
                getDownloadURL(value.ref).then(async imgURL => {
                        if (userId) {
                            await addDoc(collection(firestore, 'usersImages', userId, 'userImages'), {
                                imgURL,
                                name: file.name,
                                date: serverTimestamp()
                            });
                        }
                    }
                )
            })
    }

    return (
        <Button component="label" variant={'text'} sx={{
            marginTop: 1,
        }}>
            Add new photo
            <AddToPhotosIcon sx={{marginLeft: 1}}/>
            <input id={'add-photo'}
                   type="file"
                   accept={'image/*'}
                   hidden
                   onChange={e => compressImage(e.target, downloadImage)}
            />
        </Button>
    );
};

export default AddImageLabel;