import React from 'react';
import {Box, Grid, Paper, Typography} from "@mui/material";
import {useAppSelector} from "../../shared/hooks/redux";
import SubscriptionItem from "../../shared/ui/SubscriptionAvatar";
import {Link} from "react-router-dom";

const ProfileSubscriptions = () => {

    const {subscriptionsList, totalSubscriptions, profileId} = useAppSelector(state => state.profile)

    return (
        <Paper sx={{p: 1, mb: 2, bgcolor: '#edf1f7'}}>
            <Box display={"flex"} sx={{gap: 0.5, alignItems: 'center', mb: 0.5}}>
                <Typography component={Link} to={`/subscriptions/${profileId}`}
                            variant="subtitle2">Subscriptions</Typography>
                <Typography sx={{fontSize: 14, opacity: 0.6}}>{totalSubscriptions}</Typography>
            </Box>
            <Grid container columns={4} spacing={0.5}>
                {
                    subscriptionsList?.map(subscription => <SubscriptionItem key={subscription.subscriptionId}
                                                                             subscriptionId={subscription.subscriptionId}/>)
                }
            </Grid>
        </Paper>
    );
};

export default ProfileSubscriptions;