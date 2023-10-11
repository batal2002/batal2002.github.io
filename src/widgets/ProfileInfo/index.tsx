import React from 'react';
import {useAppSelector} from "../../shared/hooks/redux";
import {Box, List, ListItemText} from "@mui/material";
import ProfileAvatar from "../../features/ProfileAvatar";

const ProfileInfo = () => {
    const {name, surname, email} = useAppSelector(state => state.profile)

    return (
        <Box display={'flex'} sx={{gap: 3}}>
            <ProfileAvatar/>
            <List>
                <ListItemText>{name + ' ' + surname}</ListItemText>
                <ListItemText>{'Email: ' + email}</ListItemText>
            </List>
        </Box>
    );
};

export default ProfileInfo;