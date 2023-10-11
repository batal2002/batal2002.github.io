import React from 'react';
import {useAuth} from "../../shared/hooks/useAuth";
import {getAuth, signOut} from "firebase/auth";
import {Button} from "@mui/material";

const LogOutBtn = () => {
    const {isAuth} = useAuth()
    const auth = getAuth();

    const logOut = () => {
        signOut(auth)
            .catch((error) => {
                console.log(error)
            });
    }

    return isAuth ? <Button variant={"contained"} onClick={logOut}>Log out</Button> : <></>
}

export default LogOutBtn;