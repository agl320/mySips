import { Button } from "@/components/ui/button";
import UserStatistics from "../UserComponents/UserStatistics/UserStatistics";
import { ChevronLeft, Pen, Pencil, Plus, Settings, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

import { v4 as uidv4 } from "uuid";
import { Group } from "@/classes/Group";
import AddGroupDialog from "@/components/GroupForms/AddGroupDialog";
import {
    addDrinkToGroup,
    createEmptyGroup,
    createGroup,
} from "@/firebase/GroupHelpers";
import { useUserGroups } from "@/components/Hooks/useUserGroup";
import { useUserDrinkData } from "../../../Hooks/useUserDrinkData";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Drink } from "@/classes/Drink";
import GroupDrinkDisplay from "./GroupDrinkDisplay";

function GroupDisplay({ user }) {
    const [focusedGroup, setFocusedGroup] = useState<string>("");

    const focusGroupHandler = (groupUid: string) => {
        setFocusedGroup(groupUid);
    };

    const firestore = useFirestore();

    const userGroups = useUserGroups(firestore, user?.uid);

    // TEMP
    // should filter by group
    const userDrinkData = useUserDrinkData(firestore, user?.uid);

    return (
        <div>
            {focusedGroup === "" ? (
                <div>
                    <AddGroupDialog
                        baseGroupData={createEmptyGroup()}
                        addGroupCallback={createGroup}
                        user={user}
                    />

                    <div className="flex gap-x-4">
                        {Object.values(userGroups)
                            .filter((group) => group?.uid)
                            .map((group) => (
                                <div
                                    className="relative w-80 bg-pastel-pink rounded-md p-4 flex justify-between hover:cursor-pointer mt-8"
                                    onClick={() =>
                                        focusGroupHandler(group?.uid)
                                    }
                                >
                                    <div className="">
                                        <h1 className="text-4xl font-semibold mb-8">
                                            {group.groupName}
                                        </h1>
                                        {/* <UserStatistics
                                            userId={user?.uid}
                                            name="Drinks"
                                            value={String(
                                                group.groupDrinks.length
                                            )}
                                        /> */}
                                        <div className="absolute right-4 bottom-4 rounded-full w-12 h-12 bg-pastel-blue"></div>
                                        <div className="absolute right-10 bottom-4 rounded-full w-12 h-12 bg-pastel-green"></div>
                                        <div className="absolute right-16 bottom-4 rounded-full w-12 h-12 bg-pastel-yellow"></div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex gap-x-4 w-full">
                        <Button
                            className="bg-pastel-pink w-12 h-12"
                            onClick={() => focusGroupHandler("")}
                        >
                            <ChevronLeft className="" />
                        </Button>
                        <Button
                            className="bg-pastel-pink w-12 h-12"
                            onClick={() => focusGroupHandler("")}
                        >
                            <Settings className="" />
                        </Button>
                        <Popover>
                            <PopoverTrigger>
                                <Button className="bg-pastel-pink h-12 text-base">
                                    Invite collaborators
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-white border-0 space-y-8">
                                <div className="space-y-4">
                                    <Label className="text-base">
                                        Share GroupName
                                    </Label>
                                    <Input placeholder="Username"></Input>
                                </div>
                                <h4 className="text-base">
                                    People with access
                                </h4>
                                <h4 className="text-base">General access</h4>
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger>
                                <Button className="bg-pastel-pink h-12 text-base">
                                    Add drink
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-white border-0 space-y-8">
                                <div className="space-y-4">
                                    <Label className="text-base">
                                        Drink Name
                                    </Label>
                                    <Command>
                                        <CommandInput placeholder="Type a drink to search..." />
                                        <CommandList>
                                            <CommandEmpty>
                                                No drinks found.
                                            </CommandEmpty>
                                            <CommandGroup heading="Suggestions">
                                                {Object.values(
                                                    userDrinkData
                                                ).map((drinkData) => (
                                                    <CommandItem
                                                        className="flex justify-between hover:bg-pastel-pink/15 rounded-sm cursor-pointer"
                                                        onClickCapture={() =>
                                                            addDrinkToGroup(
                                                                user?.uid,
                                                                focusedGroup,
                                                                drinkData.uid
                                                            )
                                                        }
                                                    >
                                                        <p>{drinkData.name}</p>
                                                        <p>
                                                            {drinkData.rating}
                                                        </p>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {/* <DrinkDisplay
                        user={user}
                        userId={user?.uid}
                        className="mt-8"
                    /> */}
                    <GroupDrinkDisplay user={user} groupUid={focusedGroup} />
                </div>
            )}
        </div>
    );
}

export default GroupDisplay;
