import React from 'react';
import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import ImageModal from "../../shared/ui/ImageModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {SwiperSlide} from "swiper/react";
import {IImage} from "../../shared/model/types";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {firestore, storage} from "../../firebase";
import {deleteObject, ref} from "firebase/storage";
import {useAppSelector} from "../../shared/hooks/redux";

interface Props {
    item: IImage
}

const GallerySlide = ({item}: Props) => {
    const {profileId, avatarURL ,isUser} = useAppSelector(state => state.profile)
    const {userId} = useAppSelector(state => state.user)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const deleteClick = async (imageId: string, imgURL: string) => {
        if (profileId) {
            const imgName = imgURL.split('%2F')[1].split('?alt')[0]
            await deleteDoc(doc(firestore, 'usersImages', profileId, 'userImages', imageId));
            deleteObject(ref(storage, `${userId}/${imgName}`))
            if (avatarURL === imgURL) {
                await updateDoc(doc(firestore, 'users', profileId), {
                    avatarURL: ''
                });
            }
        }
        handleClose()
    }

    const setAvatarClick = async (imgURL: string) => {
        if (profileId) {
            await updateDoc(doc(firestore, 'users', profileId), {
                avatarURL: imgURL
            });
        }
        handleClose()
    }
    return (

            <Box sx={{bgcolor: '#edf1f7', borderRadius: 2, padding: 1, position: 'relative'}}>
                <Box sx={{height: 200}}>
                    <ImageModal src={item.imgURL}/>
                </Box>
                {isUser && <>
                    <IconButton onClick={handleClick} sx={{position: 'absolute', top: 10, right: 10}}>
                        <MoreVertIcon sx={{color: 'rgba(0, 0, 0, 0.87)'}}/>
                    </IconButton>
                    <Menu
                        id={item.id}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => deleteClick(item.id, item.imgURL)}>Delete</MenuItem>
                        <MenuItem onClick={() => setAvatarClick(item.imgURL)}>Set as avatar</MenuItem>
                    </Menu>
                </>}
            </Box>
    );
};

export default GallerySlide;