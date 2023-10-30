import React from 'react';
import {Box, Typography} from "@mui/material";
import {useAppSelector} from "../../shared/hooks/redux";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from "swiper";
import AddImageLabel from "../../features/AddImageLabel";
import GallerySlide from "../../features/GallerySlide";

const ProfileGallery = () => {
    const {imagesList, isUser} = useAppSelector(state => state.profile)


    return (
        <Box sx={{marginTop: 2}}>
            {imagesList.length != 0 && <Typography variant="h6" gutterBottom>
                Gallery
            </Typography>}
            <Swiper modules={[Navigation]} spaceBetween={5} slidesPerView={3} navigation>
                {imagesList.map((item) => <SwiperSlide key={item.id}>
                    <GallerySlide item={item}/>
                </SwiperSlide>)}
            </Swiper>

            {isUser && <AddImageLabel/>}
        </Box>
    );
};

export default ProfileGallery;