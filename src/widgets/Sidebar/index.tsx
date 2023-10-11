import React from 'react';
import {Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FeedIcon from '@mui/icons-material/Feed';
import {Link} from "react-router-dom";
import {useAuth} from "../../shared/hooks/useAuth";

interface IIcons {
    [key: string]: JSX.Element
}
interface ILinks {
    [key: string]: string
}

const Sidebar = () => {
    const {userId} = useAuth()
    const drawerWidth = 240;

    const icons: IIcons = {
        'Profile': <AccountBoxIcon/>,
        'News': <FeedIcon/>,
        'Messages': <ForumIcon/>,
        'Users': <PeopleAltIcon/>
    }
    const links: ILinks = {
        'Profile': `/profile`,
        'News': '/news',
        'Messages': '/messages',
        'Users': '/users'
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <List>
                    {['Profile','News', 'Messages', 'Users'].map((text) => (
                        <ListItem component={Link} to={links[text]} key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {icons[text]}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;