import React from 'react';
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {createDialog} from "../../entities/dialog/dialogSlice";
import {useNavigate} from "react-router";

const StartDialogBtn = () => {
    const {profileId} = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const onClick = async () => {
        dispatch(createDialog({recipientId: profileId}))
        navigate(`/dialogs/${profileId}`)
    }

    return (
        <Button onClick={onClick} variant={'contained'}>Start
            dialog</Button>
    );
};

export default StartDialogBtn;