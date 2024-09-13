import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import "./output.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/contexts/authContext/index.tsx";
import LoginPage from "./components/Pages/LoginPage/LoginPage.tsx";
import firebaseConfig from "../../firebaseConfig";
import { FirebaseAppProvider } from "reactfire";
import LandingPage from "./components/Pages/LandingPage/LandingPage.tsx";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage.tsx";
import UserPage from "./components/Pages/UserPage/UserPage.tsx";
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
        element: <UserPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider children={<RouterProvider router={router} />} />
    </FirebaseAppProvider>
);
