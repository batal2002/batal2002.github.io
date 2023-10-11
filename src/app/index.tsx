import React, {useEffect} from 'react';
import './styles/index.scss'
import {Outlet, useNavigate} from "react-router";
import Header from "../widgets/Header";
import {Box, Container, CssBaseline} from "@mui/material";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAppDispatch} from "../shared/hooks/redux";
import Sidebar from "../widgets/Sidebar";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../firebase";
import {useAuth} from "../shared/hooks/useAuth";
import {removeUser, setUser} from "../entities/user/userSlice";

const App = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const dispatch = useAppDispatch()
    const {isAuth} = useAuth()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docSnap = await getDoc(doc(firestore, 'users', user.uid))
                dispatch(setUser(docSnap.data()))
            } else {
                dispatch(removeUser())
                navigate('/login')
            }
        });
    }, [])

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Header/>
            {isAuth && <Sidebar/>}
            <Container sx={{mt: 12}}>
                <Outlet/>
            </Container>
        </Box>
    );
};


export default App;