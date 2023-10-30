import React from 'react';
import './styles/index.scss'
import {Outlet} from "react-router";
import Header from "../widgets/Header";
import {Box, Container, CssBaseline} from "@mui/material";
import Sidebar from "../widgets/Sidebar";
import {useAuth} from "../shared/hooks/useAuth";

const App = () => {
    const {isAuth} = useAuth()

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Header/>
            <Container sx={{mt: 10, display: 'flex', gap: 2}}>
                {isAuth && <Sidebar/>}
                <Box sx={{width: '100%', minWidth: 0}}>
                    <Outlet/>
                </Box>
            </Container>
        </Box>
    );
};


export default App;