import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PageTypes } from "@/enums/PageTypes";
import { doSignOut } from "@/firebase/Auth";
import { NavLink } from "react-router-dom";
import UserSideBar from "./UserSideBar";

interface IUserNav {
    setSelectedPage: React.Dispatch<React.SetStateAction<PageTypes>>;
}

const userOptionsGroup = [
    { displayValue: "Overview", pageType: PageTypes.OVERVIEW },
    { displayValue: "Social", pageType: PageTypes.SOCIAL },
    { displayValue: "Analytics", pageType: PageTypes.ANALYTICS },
    { displayValue: "mySips", pageType: PageTypes.MYSIPS },
];

const otherOptionsGroup = [
    { displayValue: "Admin", pageType: PageTypes.ADMIN },
    { displayValue: "Upgrade", pageType: PageTypes.UPGRADE },
];

const settingsOptionsGroup = [
    { displayValue: "Report a Bug", pageType: PageTypes.BUG },
    { displayValue: "Settings", pageType: PageTypes.SETTINGS },
];

function UserNav(props: IUserNav) {
    const { setSelectedPage } = props;

    const switchToPage = (newSelectedPage: PageTypes) => {
        setSelectedPage(newSelectedPage);
    };

    const displayGroup = (
        optionsGroup: Array<{ displayValue: string; pageType: PageTypes }>
    ) => {
        return optionsGroup.map(
            (optionGroup: { displayValue: string; pageType: PageTypes }) => {
                return (
                    <a
                        key={`{option-group-${optionGroup.pageType.toLowerCase()}}`}
                        className="block cursor-pointer"
                        onClick={() =>
                            switchToPage(PageTypes[optionGroup.pageType])
                        }
                    >
                        {optionGroup.displayValue}
                    </a>
                );
            }
        );
    };

    const handleSignOut = async () => {
        await doSignOut();
    };

    return (
        // <div className="px-12 mt-8 w-56 flex flex-col justify-between h-[30rem] text-left ">
        //     <div className="flex flex-col font-medium text-3xl mb-8">
        //         <NavLink className="" to={"/"}>
        //             mySips
        //         </NavLink>
        //     </div>

        //     <div className="flex flex-col space-y-2 font-medium">
        //         {displayGroup(userOptionsGroup)}
        //     </div>
        //     <Separator className="bg-black" />
        //     <div className="flex flex-col space-y-2 font-medium">
        //         {displayGroup(otherOptionsGroup)}
        //     </div>
        //     <Separator className="bg-black" />
        //     <div className="flex flex-col space-y-2 font-medium">
        //         {displayGroup(settingsOptionsGroup)}

        //         <a onClick={handleSignOut} className="block cursor-pointer">
        //             Sign Out
        //         </a>
        //     </div>
        // </div>
        <SidebarProvider>
            <UserSideBar />
            <main>
                <SidebarTrigger />
            </main>
            <div className="border-2 border-black w-full h-full"></div>
        </SidebarProvider>
    );
}

export default UserNav;
