import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { doSignOut } from "@/firebase/Auth";
import { NavLink } from "react-router-dom";
import { PageTypes } from "../UserPageContent";

interface IUserNav {
    setSelectedPage: React.Dispatch<React.SetStateAction<PageTypes>>;
}

function UserNav(props: IUserNav) {
    const { setSelectedPage } = props;

    const switchToPage = (newSelectedPage: PageTypes) => {
        setSelectedPage(newSelectedPage);
    };

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
                <a
                    className="block cursor-pointer"
                    onClick={() => switchToPage(PageTypes.OVERVIEW)}
                >
                    Overview
                </a>
                <a
                    className="block cursor-pointer"
                    onClick={() => switchToPage(PageTypes.SOCIAL)}
                >
                    Social
                </a>
                <a
                    className="block cursor-pointer"
                    onClick={() => switchToPage(PageTypes.ANALYTICS)}
                >
                    Analytics
                </a>
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
