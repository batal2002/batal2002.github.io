import React from 'react';
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";
import {useAuth} from "../../shared/hooks/useAuth";
import {Avatar, Box, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const UsersPage = () => {
    const {userId} = useAuth()

    const [usersData, usersLoading] = useCollectionData(query(
            collection(firestore, 'users'),
            where('id', '!=', userId)
        )
    )
    console.log(usersData)
    return (
        <div>
            <Typography variant={'h6'}>Users</Typography>
            {usersData && usersData.map(user =>
                <Box key={user.id} display={'flex'}
                     sx={{
                         gap: 1, paddingBottom: 1, paddingTop: 1,
                         "&:not(:last-child)": {
                             borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
                         }
                     }}>
                    <Link component={RouterLink} to={`/profile/${user.id}`}>
                        <Avatar sx={{width: 100, height: 100}} src={user.avatarURL}/>
                    </Link>
                    <Box>
                        <Link component={RouterLink} underline="hover" color={'rgba(0, 0, 0, 0.87)'}
                              to={`/profile/${user.id}`}>{user.name + ' ' + user.surname}</Link>
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default UsersPage;