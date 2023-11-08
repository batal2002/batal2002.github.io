import React from 'react';
import './styles/index.scss'
import {Outlet} from "react-router";
import Header from "../widgets/Header";
import {Box, Container, CssBaseline} from "@mui/material";
import Sidebar from "../widgets/Sidebar";
import {useAuth} from "../shared/hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {setWidth} from "../entities/windowWidth/windowWidthSlice";

const App = () => {
    const {isAuth} = useAuth()
    const {windowWidth} = useAppSelector(state => state.windowWidth)
    const dispatch = useAppDispatch()
    const handleSubscribe = () => {
        dispatch(setWidth(window.innerWidth))
    }

    const onSubscribe = () => {
        window.addEventListener('resize', handleSubscribe)
    }

    const offSubscribe = () =>
        window.removeEventListener('resize', handleSubscribe)


    React.useEffect(() => {
        onSubscribe()

        return () => offSubscribe()
    }, [])

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Header/>
            <Container sx={{mt: 10, display: 'flex', gap: 2, pl: '10px', pr: '10px'}}
                       maxWidth={windowWidth < 1200 ? 'md' : "lg"}>
                {isAuth && windowWidth >= 1200 && <Sidebar isMobile={false}/>}
                <Box sx={{width: '100%', minWidth: 0}}>
                    <Outlet/>
                </Box>
            </Container>
        </Box>
    );
};


export default App;