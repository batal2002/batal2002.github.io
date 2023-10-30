import React from 'react';
import {useAuth} from "../../shared/hooks/useAuth";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";
import {collection, doc, query} from "firebase/firestore";
import {firestore} from "../../firebase";
import {Box, LinearProgress, Typography} from "@mui/material";
import SubscriberItem from "../../widgets/SubscriberItem";
import {useParams} from "react-router";

const SubscribersPage = () => {
    const {userId} = useAuth()
    const {profileId} = useParams();

    const id = profileId || userId

    const [subscribersData, subscribersLoading] = useCollectionData(query(
            collection(firestore, `usersSubscribers/${id}/userSubscribers`),
        )
    )

    const [userData] = useDocumentData(
        doc(firestore, `users/${id}`),
    )

    return (
        <Box sx={{maxWidth: 580}}>
            <Typography sx={{mb: 1}} variant={'h6'}>Subscribers of {userData?.name} {userData?.surname}</Typography>
            {subscribersLoading && <LinearProgress/>}
            {!subscribersLoading && subscribersData &&
                (subscribersData.length > 0 ?
                        subscribersData.map(subscriber =>
                            <SubscriberItem key={subscriber.subscriberId} subscriberId={subscriber.subscriberId}/>) :
                        <Typography variant={'h5'} sx={{color: '#1976d2', textAlign: 'center'}}>
                            No subscribers found
                        </Typography>
                )
            }
        </Box>
    );
};

export default SubscribersPage;