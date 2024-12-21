import ReactDOM from "react-dom/client";
import "./output.css";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/contexts/authContext/index.tsx";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "../../firebaseConfig";

import LoginPage from "./components/Pages/LoginPage/LoginPage.tsx";
import LandingPage from "./components/Pages/UserPage/LandingPage/LandingPage.tsx";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage.tsx";
import UserPage from "./components/Pages/UserPage/UserPage.tsx";
import LogoutPage from "./components/Pages/LogoutPage/LogoutPage.tsx";
import { PageTypes } from "./enums/PageTypes.tsx";
import ErrorPage from "./components/Pages/ErrorPage/ErrorPage.tsx";

const router = createBrowserRouter([
    { errorElement: <ErrorPage /> },
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/app", element: <UserPage selectedPage={PageTypes.OVERVIEW} /> },
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
    { path: "/logout", element: <LogoutPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </FirebaseAppProvider>
);
