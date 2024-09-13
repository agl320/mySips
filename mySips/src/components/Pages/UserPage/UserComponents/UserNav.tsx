import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { doSignOut } from "@/firebase/Auth";
import { NavLink } from "react-router-dom";

function UserNav() {
    const handleSignOut = async () => {
        await doSignOut();
    };

    return (
        <div className="px-12 mt-8 w-56 flex flex-col justify-between h-[30rem] text-left ">
            <div className="flex flex-col font-medium text-3xl mb-8">
                <NavLink className="" to={"/"}>
                    mySips
                </NavLink>
            </div>

            <div className="flex flex-col space-y-2 font-medium">
                <NavLink className="" to={""}>
                    Overview
                </NavLink>
                <NavLink className="" to={""}>
                    Social
                </NavLink>
                <NavLink className="" to={""}>
                    Analytics
                </NavLink>
                <NavLink className="" to={""}>
                    mySips
                </NavLink>
            </div>
            <Separator className="bg-black" />
            <div className="flex flex-col space-y-2 font-medium">
                <NavLink className="" to={""}>
                    Admin
                </NavLink>

                <NavLink className="" to={""}>
                    Upgrade
                </NavLink>
            </div>
            <Separator className="bg-black" />
            <div className="flex flex-col space-y-2 font-medium">
                <NavLink className="" to={""}>
                    Report a bug
                </NavLink>

                <NavLink className="" to={""}>
                    Settings
                </NavLink>

                <a onClick={handleSignOut} className="block cursor-pointer">
                    Sign Out
                </a>
            </div>
        </div>
    );
}

export default UserNav;
