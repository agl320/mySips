import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import "./output.css";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/contexts/authContext/index.tsx";
import LoginPage from "./components/Pages/LoginPage/LoginPage.tsx";
import firebaseConfig from "../../firebaseConfig";
import { FirebaseAppProvider } from "reactfire";
import LandingPage from "./components/Pages/LandingPage/LandingPage.tsx";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage.tsx";
import UserPage from "./components/Pages/UserPage/UserPage.tsx";
import { PageTypes } from "./enums/PageTypes.tsx";
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider children={<RouterProvider router={router} />} />
    </FirebaseAppProvider>
);
