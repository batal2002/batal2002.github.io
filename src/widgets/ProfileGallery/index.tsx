import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {deleteDoc, deleteField, doc, updateDoc} from "firebase/firestore";
import {firestore, storage} from "../../firebase";
import {useAppSelector} from "../../shared/hooks/redux";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from "swiper";
import {deleteObject, ref} from "firebase/storage";
import ImageModal from "../../shared/ui/ImageModal";
import AddImageLabel from "../../features/AddImageLabel";

interface Props {
    profileId: string | null
}

const ProfileGallery = ({profileId}: Props) => {
    const {imagesList, avatarURL, isUser} = useAppSelector(state => state.profile)
    const [open, setOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState('');


    const deleteClick = async (imageId: string, imgURL: string) => {
        if (profileId) {
            const imgName = imgURL.split('%2F')[1].split('?alt')[0]
            await deleteDoc(doc(firestore, 'users', profileId, 'images', imageId));
            deleteObject(ref(storage, `images/${imgName}`))
            if (avatarURL === imgURL) {
                await updateDoc(doc(firestore, 'users', profileId), {
                    avatarURL: deleteField()
                });
            }
        }
    }
    const handleClose = () => {
        setOpen(false)
        setCurrentImg('')
    }
    const setAvatarClick = async (imgURL: string) => {
        if (profileId) {
            await updateDoc(doc(firestore, 'users', profileId), {
                avatarURL: imgURL
            });
        }
    }
    const handleOpen = (imgURL: string) => {
        setOpen(true)
        setCurrentImg(imgURL)
    }


    return (
        <Box sx={{marginTop: 2}}>
            {imagesList.length != 0 && <Typography variant="h6" gutterBottom>
                Gallery
            </Typography>}
            <Swiper modules={[Navigation]} spaceBetween={5} slidesPerView={4} navigation>
                {imagesList.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Box sx={{bgcolor: '#edf1f7', borderRadius: 2, padding: 1}}>
                            <Box sx={{height: 200}} onClick={() => handleOpen(item.imgURL)}>
                                <Box display={'block'} component={'img'} src={item.imgURL}/>
                            </Box>
                            {isUser && <Box display={"flex"} sx={{justifyContent: 'space-between', marginTop: 0.5}}>
                                <Button variant={"contained"}
                                        onClick={() => deleteClick(item.id, item.imgURL)}>Delete</Button>
                                <Button variant={"contained"} onClick={() => setAvatarClick(item.imgURL)}>Set
                                    avatar</Button>
                            </Box>}
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>

            {isUser && <AddImageLabel/>}
            <ImageModal open={open} handleClose={handleClose} currentImg={currentImg}/>
        </Box>
    );
};

export default ProfileGallery;