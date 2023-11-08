import React from 'react';
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";
import {Box, LinearProgress, Typography} from "@mui/material";
import UserItem from "../../widgets/UserItem";
import {useAppSelector} from "../../shared/hooks/redux";

const UsersPage = () => {
    const {userId} = useAppSelector(state => state.user)
    const {windowWidth} = useAppSelector(state => state.windowWidth)

    const [usersData, usersLoading] = useCollectionData(query(
            collection(firestore, 'users'),
            where('userId', '!=', userId)
        )
    )
    return (
        <Box sx={{maxWidth: 580, m: (windowWidth <= 1200) ? '0 auto' : 0}}>
            <Typography variant={'h6'}>Users</Typography>
            {usersLoading && <LinearProgress/>}
            {!usersLoading && usersData && usersData.map(user =>
                <UserItem key={user.userId} userId={user.userId} avatarURL={user.avatarURL} name={user.name}
                          surname={user.surname} email={user.email}/>
            )}
        </Box>
    );
};

export default UsersPage;