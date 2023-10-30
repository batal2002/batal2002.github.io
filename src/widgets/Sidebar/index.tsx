import React from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FeedIcon from '@mui/icons-material/Feed';
import {Link} from "react-router-dom";
import Diversity2Icon from '@mui/icons-material/Diversity2';
import Diversity1Icon from '@mui/icons-material/Diversity1';

interface IIcons {
    [key: string]: JSX.Element
}

interface ILinks {
    [key: string]: string
}

const Sidebar = () => {
    const drawerWidth = 240;

    const icons: IIcons = {
        'Profile': <AccountBoxIcon/>,
        'News': <FeedIcon/>,
        'Messenger': <ForumIcon/>,
        'Subscriptions': <Diversity1Icon/>,
        'Subscribers': <Diversity2Icon/>,
        'Users': <PeopleAltIcon/>,
    }
    const links: ILinks = {
        'Profile': `/profile`,
        'News': '/news',
        'Messenger': '/dialogs',
        'Subscriptions': '/subscriptions',
        'Subscribers': '/subscribers',
        'Users': '/users',
    }

    return (
        <Box
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth},
            }}
        >
            <Box sx={{overflow: 'auto'}}>
                <List>
                    {['Profile', 'News', 'Messenger', 'Subscriptions', 'Subscribers', 'Users'].map((text) => (
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
        </Box>
    );
};

export default Sidebar;