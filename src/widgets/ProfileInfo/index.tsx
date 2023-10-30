import React from 'react';
import {useAppSelector} from "../../shared/hooks/redux";
import {Box, List, ListItemText} from "@mui/material";
import ProfileAvatar from "../../features/ProfileAvatar";
import SubscribeBtn from "../../features/SubscribeBtn";
import StartDialogBtn from "../../features/StartDialogBtn";

const ProfileInfo = () => {
    const {name, surname, email, isUser, profileId} = useAppSelector(state => state.profile)
    const {userId} = useAppSelector(state => state.user)

    return (
        <Box display={'flex'} sx={{gap: 3}}>
            <ProfileAvatar/>
            <List>
                <ListItemText>{name + ' ' + surname}</ListItemText>
                <ListItemText>{'Email: ' + email}</ListItemText>
                <Box sx={{display: 'flex', gap: 1}}>
                    {!isUser && profileId && <SubscribeBtn accountId={profileId} />}
                    {!isUser && profileId && <StartDialogBtn/>}
                </Box>

            </List>
        </Box>
    );
};

export default ProfileInfo;