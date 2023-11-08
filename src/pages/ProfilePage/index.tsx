import React, {useEffect} from 'react';
import ProfileGallery from "../../widgets/ProfileGallery";
import {useParams} from "react-router";
import {useAuth} from "../../shared/hooks/useAuth";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";
import {collection, doc, limit, orderBy, query} from "firebase/firestore";
import {firestore} from "../../firebase";
import {
    removeProfile,
    setProfile,
    setProfileImagesList,
    setProfileSubscribersList,
    setProfileSubscriptionsList,
    setProfileTotalSubscribers,
    setProfileTotalSubscriptions
} from "../../entities/profile/profileSlice";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import ProfileInfo from "../../widgets/ProfileInfo";
import {Box, LinearProgress} from "@mui/material";
import {IImage} from "../../shared/model/types";
import ProfilePosts from "../../widgets/ProfilePosts";
import ProfileSubscriptions from "../../widgets/ProfileSubscriptions";
import ProfileSubscribers from "../../widgets/ProfileSubscribers";
import NotFound from "../../widgets/NotFound";

const ProfilePage = () => {
    const {profileId} = useParams();
    const {userId} = useAuth()
    const dispatch = useAppDispatch()
    const id = profileId || userId
    const isUser = id === userId
    const {windowWidth} = useAppSelector(state => state.windowWidth)

    const [imagesData, imagesLoading, error, snapshot] = useCollectionData(query(
            collection(firestore, `usersImages/${id}/userImages`),
            orderBy('date')
        )
    )
    const [profileData, profileLoading] = useDocumentData(doc(firestore, `users/${id}`))
    const [profileSubscriptions, profileSubscriptionsLoading] = useCollectionData(query(
            collection(firestore, `usersSubscriptions/${id}/userSubscriptions`),
            limit(8)
        )
    )
    const [profileTotalSubscriptions, profileTotalSubscriptionsLoading] = useDocumentData(doc(firestore, `usersSubscriptions/${id}`),)
    const [profileTotalSubscribers, profileTotalSubscribersLoading] = useDocumentData(doc(firestore, `usersSubscribers/${id}`),)
    const [profileSubscribers, profileSubscribersLoading] = useCollectionData(query(
            collection(firestore, `usersSubscribers/${id}/userSubscribers`),
            limit(8)
        )
    )


    useEffect(() => {
        if (imagesData && !imagesLoading) {
            const images: IImage[] = []
            snapshot?.forEach(doc => {
                const local = doc.metadata.hasPendingWrites;
                if (!local) {
                    images.push({
                        id: doc.id,
                        date: doc.data().date.toDate().toLocaleString(),
                        imgURL: doc.data().imgURL
                    })
                }
            })
            dispatch(setProfileImagesList(images.reverse()))
        }
    }, [imagesData])

    useEffect(() => {
        if (profileData && !profileLoading) {
            dispatch(setProfile({...profileData, isUser}))
        }
    }, [profileData])

    useEffect(() => {
        if (profileSubscriptions && !profileSubscriptionsLoading) {
            dispatch(setProfileSubscriptionsList(profileSubscriptions))
        }
    }, [profileSubscriptions])

    useEffect(() => {
        if (profileTotalSubscriptions && !profileTotalSubscriptionsLoading) {
            dispatch(setProfileTotalSubscriptions(profileTotalSubscriptions.totalSubscriptions))
        }
    }, [profileTotalSubscriptions])

    useEffect(() => {
        if (profileTotalSubscribers && !profileTotalSubscribersLoading) {
            dispatch(setProfileTotalSubscribers(profileTotalSubscribers.totalSubscribers))
        }
    }, [profileTotalSubscribers])

    useEffect(() => {
        if (profileSubscribers && !profileSubscribersLoading) {
            dispatch(setProfileSubscribersList(profileSubscribers))
        }
    }, [profileSubscribers])

    useEffect(() => {
        return () => {
            dispatch(removeProfile())
        }
    }, [])

    if (profileLoading) return <LinearProgress/>

    if (profileData?.length === 0) return <NotFound item={'profile'}/>

    return (
        <>
            <ProfileInfo/>
            <ProfileGallery/>
            <Box display={'flex'} sx={{gap: 2, alignItems: 'start'}}>
                <ProfilePosts/>
                {windowWidth > 900 && <Box sx={{width: 300, flexShrink: 0}}>
                    <ProfileSubscriptions/>
                    <ProfileSubscribers/>
                </Box>}
            </Box>
        </>
    );
};

export default ProfilePage;