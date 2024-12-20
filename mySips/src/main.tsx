import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "./output.css";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/contexts/authContext/index.tsx";
import LoginPage from "./components/Pages/LoginPage/LoginPage.tsx";
import firebaseConfig from "../../firebaseConfig";
import { FirebaseAppProvider } from "reactfire";
import LandingPage from "./components/Pages/UserPage/LandingPage/LandingPage.tsx";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage.tsx";
import UserPage from "./components/Pages/UserPage/UserPage.tsx";
import { PageTypes } from "./enums/PageTypes.tsx";
import LogoutPage from "./components/Pages/LogoutPage/LogoutPage.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/app",
        element: <UserPage selectedPage={PageTypes.OVERVIEW} />,
    },
    {
        path: "/app/admin",
        element: <UserPage selectedPage={PageTypes.ADMIN} />,
    },
    {
        path: "/app/mysips",
        element: <UserPage selectedPage={PageTypes.MYSIPS} />,
    },
    {
        path: "/app/friends",
        element: <UserPage selectedPage={PageTypes.FRIENDS} />,
    },
    {
        path: "/app/groups",
        element: <UserPage selectedPage={PageTypes.MYGROUPS} />,
    },
    {
        path: "/app/inbox",
        element: <UserPage selectedPage={PageTypes.INBOX} />,
    },
    {
        path: "/logout",
        element: <LogoutPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider children={<RouterProvider router={router} />} />
    </FirebaseAppProvider>
);
