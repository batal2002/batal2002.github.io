import React from 'react';
import {Avatar, Box, Grid, Typography} from "@mui/material";
import {useAppSelector} from "../../shared/hooks/redux";
import ImageModal from "../../shared/ui/ImageModal";

interface Props {
    authorId: string
    date: string | null
    imageList: string[]
    text: string
    newAuthor: boolean
}

const Message = ({authorId, imageList, date, text, newAuthor}: Props) => {
    const {userId, avatarURL, name, surname} = useAppSelector(state => state.user)

    const {recipientInfo} = useAppSelector(state => state.dialog)
    const isUserMessage = userId === authorId
    const cols = 5


    return (
        <Box sx={{mb: 1, "&:nth-last-of-type(2)": {paddingBottom: 4}}}>
            <Box sx={{display: 'flex', gap: 1, width: '100%'}}>
                {newAuthor && <Avatar src={isUserMessage ? avatarURL : recipientInfo.avatarURL}/>}
                <Box sx={{paddingLeft: newAuthor ? 0 : '48px', width: '100%'}}>
                    {newAuthor && <Typography sx={{
                        mb: 1,
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#1976d2'
                    }}>{isUserMessage ? name + ' ' + surname : recipientInfo.name + ' ' + recipientInfo.surname}</Typography>}
                    <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
                        <Box>
                            {text && <Typography
                                sx={{mb: 0.5, wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}>{text}</Typography>}
                            {imageList &&
                                <Grid container spacing={0.5}
                                      columns={imageList?.length >= cols ? cols : imageList?.length}
                                      sx={{justifyContent: 'start'}}>
                                    {imageList?.map((img, index) =>
                                        <Grid key={index} item sx={{maxHeight: 300, width: '100%'}}
                                              xs={index >= cols - 1 && index >= imageList?.length - (imageList?.length % cols) ? cols / (imageList?.length % cols) : 1}>
                                            <ImageModal src={img}
                                                        sx={{objectFit: imageList?.length === 1 ? 'contain' : 'cover'}}/>
                                        </Grid>)}
                                </Grid>}
                        </Box>
                        <Typography variant={"caption"}>{date?.split(', ')[1].slice(0, -3)}</Typography>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
};

export default Message;