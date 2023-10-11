import React from 'react';
import {Avatar, Button} from "@mui/material";
import {firestore} from "../../firebase";
import {useAppSelector} from "../../shared/hooks/redux";
import {addDoc, collection, doc, serverTimestamp, updateDoc} from "firebase/firestore";
import {handleImageDownload} from "../../shared/helpers/handleImageDownload";

const ProfileAvatar = () => {
    const {userId, avatarURL, isUser} = useAppSelector(state => state.profile)
    const downloadAvatar = async (imgURL: string, imgName: string | undefined) => {
        if (userId) {
            const docRef = doc(firestore, 'users', userId)
            await updateDoc(docRef, {avatarURL: imgURL})
            await addDoc(collection(firestore, 'users', userId, 'images'), {
                imgURL,
                name: imgName,
                date: serverTimestamp()
            });
        }
    }

    return (
        <Button disabled={!isUser} component="label" sx={{borderRadius: '50%'}}>
            <Avatar sx={{width: 200, height: 200}} src={avatarURL}/>
            {isUser && <input type="file" accept={'image/*'} hidden
                              onChange={e => handleImageDownload(e.target, downloadAvatar)}/>}
        </Button>
    );
};

export default ProfileAvatar;