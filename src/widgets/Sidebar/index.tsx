import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FeedIcon from '@mui/icons-material/Feed';
import {Link} from "react-router-dom";
import Diversity2Icon from '@mui/icons-material/Diversity2';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";
import {useAppSelector} from "../../shared/hooks/redux";

interface IIcons {
    [key: string]: JSX.Element
}

interface ILinks {
    [key: string]: string
}

interface Props {
    isMobile: boolean
    setOpenDrawer?: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({isMobile, setOpenDrawer}: Props) => {
    const {userId} = useAppSelector(state => state.user)
    const [uncheckedDialogsData, uncheckedDialogsLoading] = useCollectionData(query(
        collection(firestore, `usersDialogs/${userId}/userDialogs`),
        where('uncheckedMessages', '>', 0)
    ))
    const [count, setCount] = useState(0)

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

    const onClick = () => {
        if (setOpenDrawer && isMobile) {
            setOpenDrawer(false)
        }
    }

    useEffect(() => {
        if (uncheckedDialogsData && !uncheckedDialogsLoading) {
            const count = uncheckedDialogsData.reduce((acc, item) => {
                return acc + item.uncheckedMessages
            }, 0)
            setCount(count)
        }
    }, [uncheckedDialogsData])

    return (
        <Box
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth},
            }}
        >
            <Box sx={{overflow: 'auto', pt: isMobile ? '64px' : 0}}>
                <List>
                    {['Profile', 'News', 'Messenger', 'Subscriptions', 'Subscribers', 'Users'].map((text) => (
                        <ListItem component={Link} to={links[text]} key={text} disablePadding>
                            <ListItemButton onClick={onClick}>
                                <ListItemIcon>
                                    {icons[text]}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                                {text === 'Messenger' && count > 0 && <Box sx={{
                                    alignSelf: 'center',
                                    borderRadius: '50%',
                                    width: 20,
                                    height: 20,
                                    bgcolor: '#1976d2',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#fff',
                                    fontSize: 12,
                                    fontWeight: '600'
                                }}>{count}</Box>}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Sidebar;