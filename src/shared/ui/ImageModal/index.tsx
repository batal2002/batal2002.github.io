import React, {useState} from 'react';
import {Box, Modal, Paper, Skeleton} from "@mui/material";
import {useImageOnLoad} from "../../hooks/useImageOnLoad";

interface Props {
    src: string

    [x: string]: any;
}

const ImageModal = ({src, sx}: Props) => {
    const [open, setOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState('');
    const {handleImageOnLoad, isLoaded} = useImageOnLoad()
    const handleOpen = (imgURL: string) => {
        setOpen(true)
        setCurrentImg(imgURL)
    }
    const handleClose = () => {
        setOpen(false)
        setCurrentImg('')
    }

    return (
        <Box sx={{position: 'relative', width: '100%', height: '100%'}}>
            <Box display={'block'} component={'img'} src={src} sx={{...sx, opacity: isLoaded ? 1 : 0, height: isLoaded ? '100%' : '300px'}} onLoad={handleImageOnLoad}
                 onClick={() => handleOpen(src)}>
            </Box>
            {!isLoaded && <Skeleton animation={'wave'} sx={{...sx, width: '100%', height: '300px', transform: 'scale(1, 1)', position: 'absolute', top: 0, left: 0}}/>}

            {currentImg && <Modal
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <Paper sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 1000,
                    maxHeight: '90vh',
                    outline: 0,
                    p: 3,
                }}>
                    <Box component={"img"} src={currentImg}
                         sx={{objectFit: 'contain', maxHeight: 'calc(90vh - ' + 48 + 'px)'}}/>
                </Paper>
            </Modal>}
        </Box>

    );
}

export default ImageModal;