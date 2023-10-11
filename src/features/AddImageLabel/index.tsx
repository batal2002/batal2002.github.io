import React from 'react';
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import {handleImageDownload} from "../../shared/helpers/handleImageDownload";
import {InputLabel} from "@mui/material";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {firestore} from "../../firebase";
import {useAppSelector} from "../../shared/hooks/redux";

const AddImageLabel = () => {
    const {userId} = useAppSelector(state => state.user)
    const downloadImage = async (imgURL: string, imgName: string | undefined) => {
        if (userId) {
            await addDoc(collection(firestore, 'users', userId, 'images'), {
                imgURL,
                name: imgName,
                date: serverTimestamp()
            });
        }
    }
    return (
        <InputLabel sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            fontWeight: 600,
            marginTop: 1,
        }}>
            Add photo
            <AddToPhotosIcon/>
            <input id={'add-photo'}
                   type="file"
                   accept={'image/*'}
                   hidden
                   onChange={e => handleImageDownload(e.target, downloadImage)}
            />
        </InputLabel>
    );
};

export default AddImageLabel;