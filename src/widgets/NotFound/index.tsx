import React from 'react';
import {Box, Typography} from "@mui/material";

interface Props {
    item: string
}

const NotFoundPage = ({item}: Props) => {
    return (
        <Box sx={{maxWidth: 580, m: '0 auto'}}>
            <Typography variant={'h5'}
                        sx={{color: '#1976d2', textAlign: 'center'}}>{item.charAt(0).toUpperCase() + item.slice(1)} not
                found</Typography>
            <Box component={'img'}
                 src={'https://firebasestorage.googleapis.com/v0/b/social-network-832aa.appspot.com/o/siteImages%2Fnot-found.png?alt=media&token=34ff70ac-03ee-4255-8282-110966f9f9a6&_gl=1*blmfhs*_ga*MTU0ODI0MzYzNC4xNjk1OTgyNDUz*_ga_CW55HF8NVT*MTY5ODYxODQ4MS43OC4xLjE2OTg2MTkwMTUuNTkuMC4w'}/>
        </Box>
    );
};

export default NotFoundPage;