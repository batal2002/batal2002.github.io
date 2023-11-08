import React, {useEffect} from 'react';
import {Box, LinearProgress, Typography} from "@mui/material";
import AddPostForm from "../../features/AddPostForm";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, orderBy, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";
import Post from "../../features/Post";
import {setProfilePostsList} from "../../entities/profile/profileSlice";
import {IPost} from "../../shared/model/types";

const ProfilePosts = () => {

    const dispatch = useAppDispatch()
    const {isUser, postsList, profileId} = useAppSelector(state => state.profile)

    const {windowWidth} = useAppSelector(state => state.windowWidth)
    const [postsData, postsLoading, error, snapshot] = useCollectionData(query(
            collection(firestore, `posts`),
            where('authorId', '==', profileId),
            orderBy('date'),
        )
    )

    useEffect(() => {
        if (postsData && !postsLoading) {
            const posts: IPost[] = []
            snapshot?.forEach(doc => {
                const local = doc.metadata.hasPendingWrites;
                if (!local) {
                    posts.push({
                        id: doc.id,
                        date: doc.data().date.toDate().toLocaleString(),
                        text: doc.data().text,
                        authorId: doc.data().authorId,
                        imageList: []
                    })
                }
            })
            dispatch(setProfilePostsList(posts.reverse()))
        }
        return
    }, [postsData])

    return (
        <Box sx={{ width: '100%'}}>
            <Typography variant={'h6'} sx={{marginBottom: 1}}>Posts</Typography>
            {isUser && <AddPostForm/>}
            <Box sx={{maxWidth: 580,m: windowWidth < 900 ? '0 auto' : 0}}>
                {postsLoading ?
                    <LinearProgress/> :
                    <Box>
                        {postsList.length > 0 ?
                            postsList.map(post => <Post key={post.id} id={post.id} date={post.date} text={post.text} authorId={post.authorId}/>) :
                            <Typography variant={'h4'} sx={{color: '#1976d2', textAlign: 'center'}}>There are no posts here yet</Typography>
                        }
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default ProfilePosts;