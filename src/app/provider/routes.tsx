import {createBrowserRouter} from "react-router-dom";
import React from "react";
import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import App from "../index";
import ProfilePage from "../../pages/ProfilePage";
import UsersPage from "../../pages/UsersPage";
import NewsPage from "../../pages/NewsPage";
import MessagesPage from "../../pages/MessagesPage";
import {Navigate} from "react-router";


const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <h1>404</h1>,
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
                path: '/messages',
                element: <MessagesPage/>
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