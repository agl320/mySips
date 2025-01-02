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
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff5466", // Custom primary color
        },
        secondary: {
            main: "#ff844b",
        },
    },
    typography: {
        fontFamily: "General Sans, sans-serif", // Set default font
    },
    components: {
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    borderRadius: "0.375rem", // Rounded corners for the day
                },
                "&.Mui-selected": {
                    backgroundColor: "#ff5466", // Customize selected background color
                    borderRadius: "0.375rem", // Ensure the selected day is also rounded
                },
                "&.Mui-selected:hover": {
                    backgroundColor: "#e74a57", // Adjust hover color for selected day
                },
                "&.Mui-selected:focus": {
                    backgroundColor: "#ff5466", // Prevent focus effect from altering the color
                },
            },
        },
    },
});

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
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    </FirebaseAppProvider>
);
