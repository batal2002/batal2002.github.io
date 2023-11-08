import React, {useState} from 'react';
import {AppBar, Box, Drawer, IconButton, Toolbar} from "@mui/material";
import Logo from "../../shared/ui/Logo";
import LogOutBtn from "../../features/LogOutBtn";
import Sidebar from "../Sidebar";
import MenuIcon from '@mui/icons-material/Menu';
import {useAppSelector} from "../../shared/hooks/redux";

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const {windowWidth} = useAppSelector(state => state.windowWidth)

    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setOpenDrawer(open);
        };
    return (
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar sx={{
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box sx={{display: 'flex'}}>
                    {windowWidth < 1200 &&
                        <>
                            <IconButton onClick={toggleDrawer(!openDrawer)}>
                                <MenuIcon sx={{color: '#fff'}}></MenuIcon>
                            </IconButton>
                            <Drawer
                                open={openDrawer}
                                onClose={toggleDrawer(false)}
                            >
                                {<Sidebar isMobile={true} setOpenDrawer={setOpenDrawer}/>}
                            </Drawer>
                        </>
                    }
                    <Logo/>
                </Box>

                <LogOutBtn/>
            </Toolbar>
        </AppBar>
    );
};

export default Header;