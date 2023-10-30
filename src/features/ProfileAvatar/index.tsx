import React from 'react';
import {Avatar, Button} from "@mui/material";
import {firestore, storage} from "../../firebase";
import {useAppSelector} from "../../shared/hooks/redux";
import {addDoc, collection, doc, serverTimestamp, updateDoc} from "firebase/firestore";
import {compressImage} from "../../shared/helpers/handleImageDownload";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";

const ProfileAvatar = () => {
    const {userId} = useAppSelector(state => state.user)
    const {profileId, avatarURL, isUser} = useAppSelector(state => state.profile)
    const downloadAvatar = async (file: File) => {
        uploadBytes(ref(storage, `${userId}/${v4()}`), file)
            .then(value => {
                getDownloadURL(value.ref).then(async imgURL => {
                        if (profileId) {
                            await updateDoc(doc(firestore, 'users', profileId), {avatarURL: imgURL})
                            await addDoc(collection(firestore, 'usersImages', profileId, 'userImages'), {
                                imgURL,
                                date: serverTimestamp()
                            });
                        }
                    }
                )
            })

    }

    return (
        <Button disabled={!isUser} component="label" sx={{borderRadius: '50%'}}>
            <Avatar sx={{width: 200, height: 200}} src={avatarURL}/>
            {isUser && <input type="file" accept={'image/*'} hidden
                              onChange={e => compressImage(e.target, downloadAvatar)}/>}
        </Button>
    );
};

export default ProfileAvatar;