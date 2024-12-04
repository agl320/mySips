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

const user = {
    name: "xegativ",
    email: "x@example.com",
    avatar: "/avatars/shadcn.jpg",
};
// Menu items.
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
                url: "/app/mysips",
                icon: PackageOpen,
            },
            {
                title: "Inbox",
                url: "#",
                icon: Inbox,
            },
            {
                title: "Calendar",
                url: "#",
                icon: Calendar,
            },
        ],
    },
    {
        title: "Social",
        items: [
            {
                title: "Search",
                url: "#",
                icon: Search,
            },
            {
                title: "Friends",
                url: "/app/friends",
                icon: UsersRound,
            },
            {
                title: "Menus",
                url: "#",
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
    const { selectedPage } = props;
    return (
        <Sidebar className="p-4">
            <SidebarHeader className="mb-8">
                <h1 className="text-3xl font-semibold">
                    <Link to="/">mySips</Link>
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
                                            {selectedPage.toLowerCase() ===
                                            item.title.toLowerCase() ? (
                                                <Link
                                                    to={item.url}
                                                    className="rounded-sm bg-pastel-pink text-black"
                                                >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            ) : (
                                                <Link
                                                    to={item.url}
                                                    className="rounded-sm hover:text-white duration-200 text-[#cccccc]"
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
                                            AL
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
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={user.avatar}
                                                alt={user.name}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                AL
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
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut />
                                    Log out
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
