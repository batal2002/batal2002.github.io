import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {useEffect} from "react";
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
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../../firebase";
import {removeUser, setUser} from "../../entities/user/userSlice";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {useAuth} from "../../shared/hooks/useAuth";


const routesIsAuth = [
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFound item={'Page'}/>,
        children: [
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
            {
                path: '/*',
                element: <Navigate to={'/news'}/>
            },

        ]
    }
]


const isAuthRouter = createBrowserRouter(routesIsAuth)
const routesNotAuth = [
    {
        path: '/',
        element: <App/>,
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
                path: '/*',
                element: <Navigate to={'/login'}/>
            },
            {
                path: '/',
                element: <Navigate to={'/login'}/>
            },

        ]
    }
]


const notAuthRouter = createBrowserRouter(routesNotAuth)


const Routes = () => {
    const auth = getAuth();
    const dispatch = useAppDispatch()
    const {userId} = useAppSelector(state => state.user)
    const [userData, userLoading] = useDocumentData(doc(firestore, `users/${userId}`))
        const {isAuth} = useAuth()

    useEffect(() => {
        if (userData && !userLoading) {
            dispatch(setUser(userData))
        }
    }, [userData])

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docSnap = await getDoc(doc(firestore, 'users', user.uid))
                dispatch(setUser(docSnap.data()))
            } else {
                dispatch(removeUser())
            }
        });
    }, [])
    return (
        <RouterProvider router={isAuth ? isAuthRouter : notAuthRouter}/>
    );
};

export default Routes;