import React from 'react';
import {AppBar, Toolbar} from "@mui/material";
import Logo from "../../shared/ui/Logo";
import LogOutBtn from "../../features/LogOutBtn";

const Header = () => {
    return (
        <AppBar position="fixed"  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Logo/>
                <LogOutBtn/>
            </Toolbar>
        </AppBar>
    );
};

export default Header;