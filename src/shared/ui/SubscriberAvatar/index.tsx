import React from 'react';
import {Link} from "react-router-dom";
import {Avatar, Grid, Skeleton, Typography} from "@mui/material";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {firestore} from "../../../firebase";

interface Props {
    subscriberId: string
}

const SubscriberAvatar = ({subscriberId}: Props) => {
    const [userData, userLoading] = useDocumentData(
        doc(firestore, `users/${subscriberId}`)
    )

    return (
        <Grid component={Link}
              to={`/profile/${subscriberId}`} item
              xs={1}
              textAlign={'center'}>
            {
                userLoading ?
                    <>
                        <Skeleton animation={'wave'} variant="circular" sx={{m: '0 auto', width: 50, height: 50}}/>
                        <Skeleton
                            animation="wave"
                            height={18}
                            width="80%"
                            sx={{m: '0 auto'}}
                        />
                    </>
                    :
                    <>
                        <Avatar src={userData && userData.avatarURL} sx={{m: '0 auto', width: 50, height: 50}}/>
                        <Typography sx={{
                            fontSize: 12, textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                        }}>
                            {userData && userData.name.charAt(0).toUpperCase() + userData.name.slice(1).toLowerCase()}

                        </Typography>
                    </>
            }
        </Grid>
    );
};

export default SubscriberAvatar;