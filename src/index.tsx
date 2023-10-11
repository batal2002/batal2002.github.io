import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import router from "./app/provider/routes";
import {Provider} from "react-redux";
import {store} from "./entities";
import './firebase'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
