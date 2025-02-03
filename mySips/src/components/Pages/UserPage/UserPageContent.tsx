import { Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import UserApplication from "./UserComponents/UserApplication/UserApplication";
import { PageTypes } from "@/enums/PageTypes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserSideBar from "./UserComponents/UserNav/UserSideBar";

function UserPageContent(props: { selectedPage: PageTypes }) {
    const { selectedPage } = props;
    const { status, data: signInCheckResult } = useSigninCheck();

    // Show loading indicator while authentication state is being checked
    if (status === "loading") {
        return <span>loading...</span>;
    }

    // Redirect to home page if the user is not signed in
    if (!signInCheckResult.signedIn) {
        return <Navigate to="/" />;
    }

    return (
        <SidebarProvider className="flex text-white">
            <UserSideBar selectedPage={selectedPage} />
            <main>
                <SidebarTrigger className="rounded-md fixed" />
            </main>
            <div className="w-screen  min-w-[1600px] ">
                <UserApplication selectedPage={selectedPage} />
            </div>
        </SidebarProvider>
    );
}

export default UserPageContent;
