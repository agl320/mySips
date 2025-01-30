import { useEffect, useState } from "react";
import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    LogOut,
    Lock,
    SquareTerminal,
    ChevronsUpDown,
    Sparkles,
    BadgeCheck,
    CreditCard,
    Bell,
    CupSoda,
    ShoppingBasket,
    PackageOpen,
    UsersRound,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { PageTypes } from "@/enums/PageTypes";
import { useUser } from "reactfire";

const groupArr = [
    {
        title: "Home",
        items: [
            {
                title: "Overview",
                url: "/app",
                icon: Home,
            },
            {
                title: "mySips",
                url: "/app/mysips",
                icon: CupSoda,
            },

            {
                title: "myGroups",
                url: "/app/groups",
                icon: PackageOpen,
            },
            {
                title: "Calendar",
                url: "#",
                icon: Calendar,
                disabled: true,
            },
        ],
    },
    {
        title: "Social",
        items: [
            {
                title: "Friends",
                url: "/app/friends",
                icon: UsersRound,
            },
            {
                title: "Menu",
                url: "/app/menu",
                icon: ShoppingBasket,
            },
        ],
    },
    {
        title: "Config",
        items: [
            {
                title: "Admin",
                url: "/app/admin",
                icon: Lock,
            },

            {
                title: "Settings",
                url: "#",
                icon: Settings,
                disabled: true,
            },
        ],
    },
    {
        title: "Session",
        items: [
            {
                title: "Log out",
                url: "/logout",
                icon: LogOut,
            },
        ],
    },
];

export function UserSideBar(props: { selectedPage: PageTypes }) {
    const { status: statusUser, data: userData } = useUser();
    const [user, setUser] = useState({
        name: userData?.displayName,
        email: userData?.email,
        avatar: "/avatars/shadcn.jpg",
    });

    useEffect(() => {
        if (userData) {
            setUser({
                name: userData.displayName,
                email: userData.email,
                avatar: "/avatars/shadcn.jpg",
            });
        }
    }, [userData]);

    const { selectedPage } = props;

    const getInitials = (name: string) => {
        const nameParts = name.split(" ");
        const initials =
            nameParts.length > 1
                ? `${nameParts[0][0]}${nameParts[1][0]}`
                : `${nameParts[0][0]}`;
        return initials.toUpperCase();
    };

    return (
        <Sidebar className="p-4">
            <SidebarHeader className="mb-8">
                <h1 className="text-5xl font-wide">
                    <Link
                        to="/"
                        className="text-4xl font-regular font-wide whitespace-nowrap items-baseline flex"
                    >
                        my
                        <span className="text-pastel-orange font-regular bg-gradient-to-r from-pastel-pink to-pastel-orange  text-transparent bg-clip-text">
                            Sips
                        </span>
                        <img
                            src="./images/mysips-logo.png"
                            className="h-8 w-8 ml-2"
                            style={{ verticalAlign: "baseline" }}
                        />
                    </Link>
                </h1>
            </SidebarHeader>
            <SidebarContent>
                {groupArr.map((group, index) => (
                    <SidebarGroup key={`side-bar-group-${index}`}>
                        <SidebarGroupLabel>
                            <h2>{group.title}</h2>
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            {item.disabled ? (
                                                <Link
                                                    to={item.url}
                                                    className="rounded-md duration-200 text-[#cccccc]/50 cursor-default"
                                                >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            ) : selectedPage.toLowerCase() ===
                                              item.title.toLowerCase() ? (
                                                <Link
                                                    to={item.url}
                                                    className="rounded-md bg-gradient-to-r from-pastel-pink to-pastel-orange text-white font-medium"
                                                >
                                                    <item.icon
                                                        strokeWidth={3}
                                                    />
                                                    <span>{item.title}</span>
                                                </Link>
                                            ) : (
                                                <Link
                                                    to={item.url}
                                                    className="rounded-md hover:text-white duration-200 text-[#cccccc] hover:bg-white/5"
                                                >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {user.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-gradient-to-r from-pastel-pink to-pastel-orange border-none"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal text-white">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={user.avatar}
                                                alt={user.name}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                {getInitials(user.name ?? "")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {user.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/50" />

                                <DropdownMenuItem>
                                    <Settings className="stroke-white/50 mr-2" />
                                    <p className="text-white/50">
                                        Account Settings
                                    </p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default UserSideBar;
