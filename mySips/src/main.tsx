import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import "./output.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPageView from "./views/LandingPageView.tsx";
import UserView from "./views/UserView.tsx";
import LoginView from "./views/LoginView.tsx";
import RegisterView from "./views/RegisterView.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPageView />,
    },
    {
        path: "/login",
        element: <LoginView />,
    },
    {
        path: "/register",
        element: <RegisterView />,
    },
    {
        path: "/app",
        element: <UserView />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
