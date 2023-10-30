import React, {useEffect, useState} from 'react';
import {Box, LinearProgress, Link, Typography} from "@mui/material";
import {useCollectionData, useCollectionDataOnce} from "react-firebase-hooks/firestore";
import {collection, orderBy, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {setPostsList} from "../../entities/posts/postsSlice";
import {IPost} from "../../shared/model/types";
import Post from "../../features/Post";
import {Link as RouterLink} from "react-router-dom";

const NewsPage = () => {
    const {userId} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const {postList} = useAppSelector(state => state.posts)

    const [subscriptionsList, setSubscriptionsList] = useState<(string)[]>([''])

    const [subscriptionsData, subscriptionsLoading] = useCollectionData(query(
        collection(firestore, `usersSubscriptions/${userId}/userSubscriptions`)
    ))
    useEffect(() => {
        if (subscriptionsData && subscriptionsData?.length > 0)
            setSubscriptionsList(subscriptionsData.map(item => item.subscriptionId))
    }, [subscriptionsData])

    const [postsData, postsLoading, postsError, postsSnapshot] = useCollectionData(query(
        collection(firestore, `posts`),
        where('authorId', 'in', subscriptionsList),
        orderBy('date')
    ))

    useEffect(() => {
        if (postsData && !postsLoading) {
            const posts: IPost[] = []
            postsSnapshot?.forEach(doc => {
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
            dispatch(setPostsList(posts.reverse()))
        }
        return
    }, [postsData])


    return (
        <Box sx={{maxWidth: 580, width: '100%'}}>
            {postsLoading ?
                <LinearProgress/> :
                (postList.length > 0 ?
                        postList.map(post => <Post key={post.id} id={post.id} date={post.date} text={post.text}
                                                   authorId={post.authorId}/>) :
                        <Box sx={{ textAlign: 'center'}}>
                            <Typography variant={'h5'} sx={{color: '#1976d2'}}>News not
                                found</Typography>
                            <Link component={RouterLink} to={'/users'}>
                                Follow someone
                            </Link>
                        </Box>
                )
            }
        </Box>
    );
};

export default NewsPage;