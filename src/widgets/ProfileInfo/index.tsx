import React from 'react';
import {useAppSelector} from "../../shared/hooks/redux";
import {Box, List, ListItemText, Typography} from "@mui/material";
import ProfileAvatar from "../../features/ProfileAvatar";
import SubscribeBtn from "../../features/SubscribeBtn";
import StartDialogBtn from "../../features/StartDialogBtn";
import {Link} from "react-router-dom";

const ProfileInfo = () => {
    const {
        name,
        surname,
        email,
        isUser,
        profileId,
        totalSubscriptions,
        totalSubscribers
    } = useAppSelector(state => state.profile)
    const {windowWidth} = useAppSelector(state => state.windowWidth)

    return (
        <Box display={'flex'} sx={{gap: 2, flexDirection: windowWidth < 500 ? 'column' : 'row'}}>
            <ProfileAvatar/>
            <List sx={{textAlign: windowWidth < 500 ? 'center' : 'start'}}>
                <ListItemText>{name + ' ' + surname}</ListItemText>
                <ListItemText>{'Email: ' + email}</ListItemText>
                <Box sx={{display: 'flex', gap: 1, mb: 1, justifyContent: windowWidth < 500 ? 'center' : 'start'}}>
                    <Box component={Link} to={`/subscriptions/${profileId}`}
                         sx={{textAlign: 'center', bgcolor: '#edf1f7', p: 0.5, borderRadius: 2, width: 110}}>
                        <Typography>Subscriptions</Typography>
                        <Typography sx={{fontWeight: 500}}>{totalSubscriptions}</Typography>
                    </Box>
                    <Box component={Link} to={`/subscribers/${profileId}`}
                         sx={{textAlign: 'center', bgcolor: '#edf1f7', p: 0.5, borderRadius: 2, width: 110}}>
                        <Typography>Subscribers</Typography>
                        <Typography sx={{fontWeight: 500}}>{totalSubscribers}</Typography>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', gap: 1, justifyContent: windowWidth < 500 ? 'center' : 'start'}}>
                    {!isUser && profileId && <SubscribeBtn sx={{width: 131}} accountId={profileId}/>}
                    {!isUser && profileId && <StartDialogBtn/>}
                </Box>
            </List>
        </Box>
    );
};

export default ProfileInfo;