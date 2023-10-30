import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Avatar, Box, IconButton, Menu, MenuItem, Skeleton, Typography} from "@mui/material";
import {useAppSelector} from "../../shared/hooks/redux";
import {Link} from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {deleteDoc, doc} from "firebase/firestore";
import {firestore, storage} from "../../firebase";
import {deleteObject, listAll, ref} from "firebase/storage";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {useNavigate, useParams} from "react-router";

const DialogTitle = () => {
    const {userId} = useAppSelector(state => state.user)
    const {recipientId} = useParams()
    const {recipientInfo, messages} = useAppSelector(state => state.dialog)
    const [userDialogData, userDialogLoading] = useDocumentData(doc(firestore, `usersDialogs/${userId}/userDialogs/${recipientId}`))
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteDialog = async () => {
        if (userId && messages && recipientId) {

            await deleteDoc(doc(firestore, 'usersDialogs', userId, 'userDialogs', recipientId));
            messages.forEach((message) => {
                deleteDoc(doc(firestore, 'usersMessages', userId, recipientInfo.id, message.id))
            })
            if (userDialogData && !userDialogLoading) {
                listAll(ref(storage, `${userId + recipientId}/`))
                    .then((res) => {
                        res.items.forEach((itemRef) => {
                            deleteObject(ref(storage, `${userId + recipientId}/${itemRef.name}`))
                        });
                    })
            }
            navigate('/dialogs')
        }

        handleClose()
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, bgcolor: '#d8eaff'}}>
            <IconButton component={Link} to={'/dialogs'}>
                <ArrowBackIcon/>
            </IconButton>
            {
                recipientInfo.isLoading ?
                    <Skeleton animation={'wave'} width={150}/> :
                    <Typography component={Link} to={`/profile/${recipientInfo.id}`}
                                sx={{fontSize: 14, fontWeight: 500}}>
                        {recipientInfo.name} {recipientInfo.surname}
                    </Typography>
            }
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                {userDialogData && !userDialogLoading &&
                    <>
                        <IconButton onClick={handleClick} sx={{width: 40, height: 40}}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={deleteDialog}>Delete dialog</MenuItem>
                        </Menu>
                    </>
                }

                {
                    recipientInfo.isLoading ?
                        <Skeleton animation={'wave'} variant={'circular'} sx={{width: 50, height: 50}}/> :
                        <Link to={`/profile/${recipientInfo.id}`}>
                            <Avatar src={recipientInfo.avatarURL}
                                    sx={{width: 50, height: 50}}/>
                        </Link>
                }
            </Box>
        </Box>
    );
};

export default DialogTitle;