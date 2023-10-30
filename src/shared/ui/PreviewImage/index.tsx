import React, {Dispatch, SetStateAction} from 'react';
import {Box, Grid, IconButton} from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface Props {
    base: string | undefined
    setPreviewImages: Dispatch<SetStateAction<(string | undefined)[]>>
    index: number
}

const PreviewImage = ({base, setPreviewImages, index}: Props) => {
    const deleteImage = () => {
        setPreviewImages((prevState) => {
            let arr = [...prevState]
            arr.splice(index, 1)
            return arr
        })
    }

    return (
        <Grid xs={1} item sx={{aspectRatio: '1 / 1'}} position={'relative'}>
            <Box component={'img'} src={base?.toString()} sx={{borderRadius: 1}}/>
            <IconButton size={'small'} sx={{position: 'absolute', top: '-9px', right: '-14px'}} onClick={deleteImage}>
                <RemoveCircleIcon color={'primary'} sx={{bgcolor: '#fff', borderRadius: '50%'}}/>
            </IconButton>
        </Grid>
    );
};

export default PreviewImage;