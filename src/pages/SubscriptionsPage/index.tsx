import React from 'react';
import {useAuth} from "../../shared/hooks/useAuth";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";
import {collection, doc, query} from "firebase/firestore";
import {firestore} from "../../firebase";
import {Box, LinearProgress, Link, Typography} from "@mui/material";
import SubscriptionItem from "../../widgets/SubscriptionItem";
import {useParams} from "react-router";
import {Link as RouterLink} from 'react-router-dom'

const SubscriptionsPage = () => {
    const {userId} = useAuth()
    const {profileId} = useParams();

    const id = profileId || userId
    const isUser = id === userId
    const [subscriptionsData, subscriptionsLoading] = useCollectionData(query(
            collection(firestore, `usersSubscriptions/${id}/userSubscriptions`),
        )
    )
    const [userData] = useDocumentData(
        doc(firestore, `users/${id}`),
    )

    return (
        <Box sx={{maxWidth: 580}}>
            <Typography sx={{mb: 1}} variant={'h6'}>Subscriptions of {userData?.name} {userData?.surname}</Typography>
            {subscriptionsLoading && <LinearProgress/>}
            {!subscriptionsLoading && subscriptionsData && (
                subscriptionsData.length > 0 ?
                    subscriptionsData.map(subscription =>
                        <SubscriptionItem key={subscription.subscriptionId}
                                          subscriptionId={subscription.subscriptionId}/>
                    ) :

                    <Box sx={{textAlign: 'center'}}>
                        {isUser ?
                            <>
                                <Typography variant={'h5'} sx={{color: '#1976d2'}}>
                                    You don't have any subscription
                                </Typography>
                                <Link component={RouterLink} to={'/users'}>
                                    Follow someone
                                </Link>
                            </> :
                            <Typography variant={'h5'} sx={{color: '#1976d2'}}>
                                No subscriptions found
                            </Typography>
                        }
                    </Box>


            )}


        </Box>
    );
};

export default SubscriptionsPage;