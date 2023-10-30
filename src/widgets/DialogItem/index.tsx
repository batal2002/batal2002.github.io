import React from 'react';
import {DialogInfo} from "../../shared/model/types";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {firestore} from "../../firebase";
import {Avatar, Box, Link, Skeleton, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useAppSelector} from "../../shared/hooks/redux";

const DialogItem = ({recipientId, lastMessage, lastUpdateDate, uncheckedMessages}: DialogInfo) => {
    const [recipientData, recipientLoading] = useDocumentData(doc(firestore, `users/${recipientId}`))
    const {userId, avatarURL} = useAppSelector(state => state.user)

    return (
        <Link underline="none" component={RouterLink} to={`/dialogs/${recipientId}`} display={'flex'}
              sx={{
                  alignItems: 'center',
                  borderRadius: 5,
                  mb: 0.5,
                  justifyContent: 'space-between',
                  gap: 1,
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  p: 1,
                  transition: '0.3s',
                  "&:hover": {bgcolor: '#edf1f7'},
              }}>
            <Box display={'flex'} sx={{gap: 1, maxWidth: '100%', width: '100%', justifyContent: 'space-between'}}>
                {recipientLoading ?
                    <>
                        <Skeleton animation={'wave'} variant="circular" sx={{width: 100, height: 100}}/>
                        <Box>
                            <Skeleton
                                animation="wave"
                                height={20}
                                width={200}
                                sx={{mb: 1}}
                            />
                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                <Skeleton
                                    animation="wave"
                                    variant="circular"
                                    sx={{width: 40, height: 40}}
                                />
                                <Skeleton
                                    animation="wave"
                                    height={20}
                                    width={150}
                                />
                            </Box>

                        </Box>
                    </>
                    :
                    <>
                        <Box display={'flex'} sx={{gap: 1, maxWidth: '100%', width: '100%'}}>
                            <Avatar sx={{width: 100, height: 100}} src={recipientData?.avatarURL}/>
                            <Box sx={{maxWidth: 'calc(100% - 136px)', width: '100%'}}>
                                <Typography color={'rgba(0, 0, 0, 0.87)'} sx={{mb: 1}}>
                                    {recipientData?.name + ' ' + recipientData?.surname}
                                </Typography>
                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center', mb: 1}}>
                                    {lastMessage.authorId === userId && <Avatar src={avatarURL}/>}
                                    <Typography color='#666' sx={{
                                        fontSize: 13, textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        color: '#1976d2'
                                    }}>
                                        {lastMessage.text ?
                                            lastMessage.text :
                                            (lastMessage.imageCount > 1 ? lastMessage.imageCount + ' photos' : lastMessage.imageCount + ' photo')}
                                    </Typography>
                                </Box>
                                <Typography sx={{fontSize: 13, color: '#666'}}>{lastUpdateDate.slice(0, -3)}</Typography>
                            </Box>
                            {uncheckedMessages > 0 && <Box sx={{alignSelf: 'center', borderRadius: '50%', width: 20, height: 20, bgcolor: '#1976d2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography sx={{color: '#fff', fontSize: 12, fontWeight: '600'}}>{uncheckedMessages}</Typography>
                            </Box>
                            }
                        </Box>
                    </>
                }
            </Box>

        </Link>
    );
};

export default DialogItem;