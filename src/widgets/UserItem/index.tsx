import React from 'react';
import {Avatar, Box, Button, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import SubscribeBtn from "../../features/SubscribeBtn";

interface Props {
    userId: string
    avatarURL?: string | undefined
    name: string
    surname: string
    email: string
}

const UserItem = ({userId, avatarURL, name, surname, email}: Props) => {

    return (
        <Box display={'flex'}
             sx={{
                 alignItems: 'center',
                 borderRadius: 5,
                 mb: 0.5,
                 justifyContent: 'space-between',
                 gap: 1,
                 borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                 p: 1,
                 transition: '0.3s',
                 "&:hover": {bgcolor: '#edf1f7'},
             }}>

            <Box display={'flex'} sx={{gap: 1}}>
                <Link component={RouterLink} to={`/profile/${userId}`}>
                    <Avatar sx={{width: 100, height: 100}} src={avatarURL}/>
                </Link>
                <Box>
                    <Link component={RouterLink} underline="hover" color={'rgba(0, 0, 0, 0.87)'}
                          to={`/profile/${userId}`}>{name + ' ' + surname}</Link>
                    <Typography>{email}</Typography>
                </Box>
            </Box>
            <SubscribeBtn accountId={userId}/>
        </Box>
    );
};

export default UserItem;