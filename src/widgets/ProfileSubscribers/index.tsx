import React from 'react';
import {Box, Grid, Paper, Typography} from "@mui/material";
import {useAppSelector} from "../../shared/hooks/redux";
import SubscriberItem from "../../shared/ui/SubscriberAvatar";
import {Link} from "react-router-dom";
const ProfileSubscribers = () => {

    const {subscribersList, totalSubscribers, profileId} = useAppSelector(state => state.profile)

    return (
        <Paper sx={{flexGrow: 1, p: 1, bgcolor: '#edf1f7'}}>
            <Box display={"flex"} sx={{gap: 0.5, alignItems: 'center', mb: 0.5}}>
                <Typography component={Link} to={`/subscribers/${profileId}`} variant="subtitle2">Subscribers</Typography>
                <Typography sx={{fontSize: 14, opacity: 0.6}}>{totalSubscribers}</Typography>
            </Box>
            <Grid container columns={4} spacing={0.5}>
                {
                    subscribersList?.map(subscriber => <SubscriberItem key={subscriber.subscriberId}
                                                                       subscriberId={subscriber.subscriberId}/>)

                }
            </Grid>
        </Paper>
    );
};

export default ProfileSubscribers;