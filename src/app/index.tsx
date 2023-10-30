import React, {useEffect} from 'react';
import './styles/index.scss'
import {Outlet, useNavigate} from "react-router";
import Header from "../widgets/Header";
import {Box, Container, CssBaseline} from "@mui/material";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import Sidebar from "../widgets/Sidebar";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../firebase";
import {useAuth} from "../shared/hooks/useAuth";
import {removeUser, setUser} from "../entities/user/userSlice";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {setWidth} from "../entities/windowWidth/windowWidthSlice";

const App = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const dispatch = useAppDispatch()
    const {isAuth} = useAuth()
    const {userId} = useAppSelector(state => state.user)
    const [userData, userLoading] = useDocumentData(doc(firestore, `users/${userId}`))
    const {windowWidth} = useAppSelector(state => state.windowWidth)

    const handleSubscribe = () => {
        dispatch(setWidth(window.innerWidth))
    }

    const onSubscribe = () => {
        window.addEventListener('resize', handleSubscribe)
    }
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
        onSubscribe()

        return () => offSubscribe()
    }, [])


    const offSubscribe = () =>
        window.removeEventListener('resize', handleSubscribe)

    useEffect(() => {
        if (userData && !userLoading) {
            dispatch(setUser(userData))
        }
    }, [userData])
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Header/>

            <Container sx={{mt: 10, display: 'flex', gap: 2}}>
                {isAuth  && <Sidebar/>}
                <Box sx={{width: '100%', minWidth: 0}}>
                    <Outlet/>
                </Box>
            </Container>
        </Box>
    );
};


export default App;