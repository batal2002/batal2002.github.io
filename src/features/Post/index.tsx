import React from 'react';
import {Avatar, Box, Grid, IconButton, Link, Menu, MenuItem, Paper, Skeleton, Typography} from "@mui/material";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";
import {collection, deleteDoc, doc, query} from "firebase/firestore";
import {firestore, storage} from "../../firebase";
import {Link as RouterLink} from "react-router-dom";
import ImageModal from "../../shared/ui/ImageModal";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useAppSelector} from "../../shared/hooks/redux";
import {deleteObject, ref} from "firebase/storage";

interface Props {
    id: string
    date: string
    text: string
    authorId: string

}

const Post = ({id, date, text, authorId}: Props) => {
    const {userId} = useAppSelector(state => state.user)

    const [postsImages, postsLoading] = useCollectionData(query(
            collection(firestore, `postsImages/${id}/postImages`)
        )
    )
    const [author, authorLoading] = useDocumentData(
        doc(firestore, `users/${authorId}`)
    )

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deletePost = async () => {
        await deleteDoc(doc(firestore, 'posts', id));


        postsImages?.forEach((item, index) => {
            const imgName = item.imgURL.split('%2F')[1].split('?alt')[0]
            deleteObject(ref(storage, `${userId}/${imgName}`)).then(async () => {
                await deleteDoc(doc(firestore, 'postsImages', id, 'postImages', index.toString()));
            })

        })

        handleClose()
    }

    const cols = 4


    return (
        <Paper sx={{p: 2, mb: 2, bgcolor: '#edf1f7', borderRadius: '15px'}}>
            <Box display={'flex'} sx={{justifyContent: 'space-between', mb: 1, alignItems: 'center'}}>
                <Box display={"flex"} sx={{gap: 1}}>
                    <Box>
                        {authorLoading ? <Skeleton animation="wave" variant={'circular'} sx={{width: 50, height: 50}}/> :
                            <Link component={RouterLink} to={`/profile/${author?.userId}`}>
                                <Avatar sx={{width: 50, height: 50}} src={author?.avatarURL}/>
                            </Link>
                        }
                    </Box>
                    <Box>
                        {authorLoading ?
                            <Skeleton
                                animation="wave"
                                height={24}
                                width="80%"
                            />
                            :
                            <Link component={RouterLink} underline="hover"  to={`/profile/${author?.userId}`}>
                            <Typography sx={{color: 'secondary', fontWeight: 500}}>{author?.name} {author?.surname}</Typography>
                            </Link>
                        }
                        <Typography variant="caption">{date.slice(0, -3)}</Typography>
                    </Box>
                </Box>
                {userId === authorId && <>
                    <IconButton onClick={handleClick}>
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
                        <MenuItem onClick={deletePost}>Delete</MenuItem>
                    </Menu>
                </>}
            </Box>

            <Typography sx={{whiteSpace: 'pre-wrap', mb: 1, width: '100%',wordBreak:'break-word'}}>{text}</Typography>

            {postsImages && !postsLoading &&
                <Grid container spacing={1} columns={postsImages?.length >= cols ? cols : postsImages?.length}>
                    {postsImages?.map((img, index) =>
                        <Grid key={index} item sx={{maxHeight: 500}}
                              xs={index >= cols - 1 && index >= postsImages?.length - (postsImages?.length % cols) ? cols / (postsImages?.length % cols) : 1}>
                            <ImageModal src={img.imgURL}
                                        sx={{objectFit: postsImages?.length === 1 ? 'contain' : 'cover'}}/>
                        </Grid>)}
                </Grid>}


        </Paper>
    );
};

export default Post;