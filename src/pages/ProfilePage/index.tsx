import React, {useEffect} from 'react';
import ProfileGallery from "../../widgets/ProfileGallery";
import {useParams} from "react-router";
import {useAuth} from "../../shared/hooks/useAuth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, orderBy, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";
import {removeProfile, setProfile, setProfileImagesList} from "../../entities/profile/profileSlice";
import {useAppDispatch} from "../../shared/hooks/redux";
import ProfileInfo from "../../widgets/ProfileInfo";
import {LinearProgress} from "@mui/material";
import {IImage} from "../../shared/model/types";

const ProfilePage = () => {
    const {profileId} = useParams();
    const {userId} = useAuth()
    const dispatch = useAppDispatch()
    const id = profileId || userId

    const isUser = id === userId

    const [imagesData, imagesLoading, error, snapshot] = useCollectionData(query(
            collection(firestore, `users/${id}/images`),
            orderBy('date')
        )
    )
    const [profileData, profileLoading] = useCollectionData(query(
            collection(firestore, 'users'),
            where('id', '==', id)
        )
    )
    useEffect(() => {
        if (imagesData && !imagesLoading) {
            const images: IImage[] = []
            snapshot?.forEach(doc => {
                const local = doc.metadata.hasPendingWrites;
                if (!local) {
                    images.push({id: doc.id, date: doc.data().date.seconds * 1000, imgURL: doc.data().imgURL})
                }
            })
            dispatch(setProfileImagesList(images.reverse()))
        }
    }, [imagesData])

    useEffect(() => {
        if (profileData && !profileLoading) {
            dispatch(setProfile({...profileData[0], isUser}))
        }
    }, [profileData])

    useEffect(() => {
        return () => {
            dispatch(removeProfile())
        }
    }, [])

    if (profileLoading) return <LinearProgress/>

    if (profileData?.length === 0) return <h1>Profile not founded</h1>

    return (
        <>
            <ProfileInfo/>
            <ProfileGallery profileId={id}/>
        </>
    );
};

export default ProfilePage;