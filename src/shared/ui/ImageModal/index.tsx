import React from 'react';
import {Box, Modal, Paper} from "@mui/material";

interface Props {
    open: boolean
    handleClose: () => void
    currentImg: string
}

const ImageModal = ({open, handleClose, currentImg}: Props) => {

    return (
        <Modal
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
        </Modal>
    );
};

export default ImageModal;