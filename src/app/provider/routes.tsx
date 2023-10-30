import {createBrowserRouter} from "react-router-dom";
import React from "react";
import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import App from "../index";
import ProfilePage from "../../pages/ProfilePage";
import UsersPage from "../../pages/UsersPage";
import NewsPage from "../../pages/NewsPage";
import DialogsPage from "../../pages/DialogsPage";
import {Navigate} from "react-router";
import SubscribersPage from "../../pages/SubscribersPage";
import SubscriptionsPage from "../../pages/SubscriptionsPage";
import DialogPage from "../../pages/DIalogPage";
import NotFound from "../../widgets/NotFound";


const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFound item={'Page'} />,
        children: [
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/registration',
                element: <RegistrationPage/>
            },
            {
                path: '/profile',
                element: <ProfilePage/>,
            },
            {
                path: '/profile/:profileId',
                element: <ProfilePage/>,
            },
            {
                path: '/news',
                element: <NewsPage/>
            },
            {
                path: '/',
                element: <Navigate to={'/news'}/>
            },
            {
                path: '/dialogs',
                element: <DialogsPage/>
            },
            {
                path: '/dialogs/:recipientId',
                element: <DialogPage/>
            },
            {
                path: '/subscribers/',
                element: <SubscribersPage/>
            },
            {
                path: '/subscribers/:profileId',
                element: <SubscribersPage/>
            },
            {
                path: '/subscriptions/',
                element: <SubscriptionsPage/>
            },
            {
                path: '/subscriptions/:profileId',
                element: <SubscriptionsPage/>
            },
            {
                path: '/users',
                element: <UsersPage/>
            },
        ]
    }
]


const router = createBrowserRouter(routes)

export default router