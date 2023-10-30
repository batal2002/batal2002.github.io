import React from 'react';
import {Avatar, Box, Skeleton, Typography} from "@mui/material";
import SubscribeBtn from "../../features/SubscribeBtn";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {firestore} from "../../firebase";
import {doc} from "firebase/firestore";
import {useAppSelector} from "../../shared/hooks/redux";
import {Link as RouterLink} from "react-router-dom";

interface Props {
    subscriberId: string
}

const SubscriberItem = ({subscriberId}: Props) => {
    const {userId} = useAppSelector(state => state.user)
    const [userData, userLoading] = useDocumentData(doc(firestore, `users/${subscriberId}`))

    return (

        <Box component={RouterLink} to={`/profile/${subscriberId}`} display={'flex'}
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
                {userLoading ?
                    <>
                        <Skeleton animation={'wave'} variant="circular" sx={{width: 100, height: 100}}/>
                        <Box>
                            <Skeleton
                                animation="wave"
                                height={20}
                                width={200}
                            />
                            <Skeleton
                                animation="wave"
                                height={20}
                                width={200}
                            />
                        </Box>
                    </>
                    :
                    <>

                        <Avatar sx={{width: 100, height: 100}} src={userData?.avatarURL}/>

                        <Box>
                            <Typography color={'rgba(0, 0, 0, 0.87)'}>
                                {userData?.name + ' ' + userData?.surname}
                            </Typography>
                            <Typography>{userData?.email}</Typography>
                        </Box>
                    </>
                }
            </Box>
            {subscriberId !== userId && <SubscribeBtn accountId={subscriberId}/>}

        </Box>
    );
};

export default SubscriberItem;