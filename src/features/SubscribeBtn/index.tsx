import React from 'react';
import {Button} from "@mui/material";
import {useAppSelector} from "../../shared/hooks/redux";
import {collection, deleteDoc, doc, query, setDoc, updateDoc} from "firebase/firestore";
import {firestore} from "../../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";

interface Props {
    accountId: string
    sx?: any
}

const SubscribeBtn = ({accountId, sx}: Props) => {
    const {userId} = useAppSelector(state => state.user)
    const [userSubscriptions, userSubscriptionsLoading] = useCollectionData(query(
            collection(firestore, `usersSubscriptions/${userId}/userSubscriptions`)
        )
    )
    const [userSubscribers] = useCollectionData(query(
            collection(firestore, `usersSubscribers/${accountId}/userSubscribers`)
        )
    )

    const SubscribeClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (userId) {
            await setDoc(doc(firestore, 'usersSubscriptions', userId, 'userSubscriptions', accountId), {
                subscriptionId: accountId
            }).then(() => {
                if (userSubscriptions) {
                    setDoc(doc(firestore, 'usersSubscriptions', userId), {
                        totalSubscriptions: userSubscriptions.length + 1
                    })

                }
            })

            await setDoc(doc(firestore, 'usersSubscribers', accountId, 'userSubscribers', userId), {
                subscriberId: userId
            }).then(() => {
                if (userSubscribers) {
                    setDoc(doc(firestore, 'usersSubscribers', accountId), {
                        totalSubscribers: userSubscribers.length + 1
                    })
                }
            })

        }
    }
    const UnsubscribeClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (userId) {
            await deleteDoc(doc(firestore, 'usersSubscriptions', userId, 'userSubscriptions', accountId))
                .then(() => {
                    if (userSubscriptions) {
                        updateDoc(doc(firestore, 'usersSubscriptions', userId), {
                            totalSubscriptions: userSubscriptions.length - 1
                        })

                    }
                })

            await deleteDoc(doc(firestore, 'usersSubscribers', accountId, 'userSubscribers', userId))
                .then(() => {
                    if (userSubscribers) {
                        updateDoc(doc(firestore, 'usersSubscribers', accountId), {
                            totalSubscribers: userSubscribers.length - 1
                        })

                    }
                })
        }
    }

    return (
        <>
            {
                userSubscriptions && userSubscriptions.find(vendor => vendor['subscriptionId'] == accountId) ?
                    <Button variant={'contained'} disabled={userSubscriptionsLoading}
                            onClick={UnsubscribeClick} sx={sx}>Unfollow</Button>
                    :
                    <Button variant={'contained'} disabled={userSubscriptionsLoading}
                            onClick={e => SubscribeClick(e)} sx={sx}>Follow</Button>
            }
        </>
    );
};

export default SubscribeBtn;