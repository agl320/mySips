import { Link, Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import UserNav from "./UserComponents/UserNav/UserNav";
import UserApplication from "./UserComponents/UserApplication/UserApplication";
import { useState } from "react";
import { PageTypes } from "@/enums/PageTypes";
import { getFirestore } from "firebase/firestore";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserSideBar from "./UserComponents/UserNav/UserSideBar";

function UserPageContent(props: { selectedPage: PageTypes }) {
    const { selectedPage } = props;
    const { status, data: signInCheckResult } = useSigninCheck();

    // if loading, display some loading component
    if (status === "loading") {
        return <span>loading...</span>;
    }

    // If not signed in, return to home page
    if (signInCheckResult.signedIn === false) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex min-h-screen min-w-screen bg-black text-white">
            {/* <UserNav setSelectedPage={setSelectedPage} /> */}

            <SidebarProvider>
                <UserSideBar selectedPage={selectedPage} />
                <main className="">
                    <SidebarTrigger />
                </main>
                <div className="w-screen">
                    <UserApplication selectedPage={selectedPage} />
                </div>
            </SidebarProvider>
        </div>
    );
}

export default UserPageContent;
