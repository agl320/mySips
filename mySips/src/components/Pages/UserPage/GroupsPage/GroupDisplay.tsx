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
    allowGroupAccess,
    createEmptyGroup,
    createGroup,
    deleteGroup,
    getAllGroupDocData,
    isDrinkInGroup,
    removeGroupDrinkPair,
    updateGroup,
} from "@/firebase/GroupHelpers";
import { useUserGroups } from "@/hooks/useUserGroup";
import { useUserDrinkData } from "../../../../hooks/useUserDrinkData";
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
import EditGroupDialog from "@/components/GroupForms/EditGroupDialog";
import CustomCommandItem from "./CustomCommandItem";
import { useUserConnections } from "@/hooks/useUserConnections";
import { useAllGroupDocs } from "@/hooks/useAllGroupDocs";
import { ConnectionStatus } from "@/classes/Connection";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import AddCollaboratorPopup from "./Popover/AddCollaboratorPopup";
import AddDrinkPopup from "./Popover/AddDrinkPopup";

function GroupDisplay({ user, setLinkTrail }) {
    const [focusedGroup, setFocusedGroup] = useState<{
        groupUid: string;
        ownerUid: string;
        groupName: string;
    }>({
        groupUid: "",
        ownerUid: "",
        groupName: "",
    });

    const focusGroupHandler = (groupUid: string) => {
        if (groupUid === "") {
            setFocusedGroup({
                groupUid: "",
                ownerUid: "",
                groupName: "",
            });
            setLinkTrail(null);
        } else {
            setFocusedGroup({
                groupUid: allGroupDocData[groupUid].groupUid,
                ownerUid: allGroupDocData[groupUid].ownerUid,
                groupName: allGroupDocData[groupUid].groupName,
            });
            setLinkTrail({ value: allGroupDocData[groupUid].groupName });
        }
    };

    const firestore = useFirestore();

    const userGroups = useUserGroups(firestore, user?.uid);
    const allGroupDocData = useAllGroupDocs(firestore, userGroups);

    // TEMP
    // should filter by group
    const userDrinkData = useUserDrinkData(firestore, user?.uid);

    const userConnections = useUserConnections(
        firestore,
        user?.uid,
        ConnectionStatus.Friend
    );

    const deleteGroupHandler = (groupUid: string) => {
        focusGroupHandler("");
        setLinkTrail(null);
        deleteGroup(groupUid);
    };

    return (
        <div>
            {focusedGroup?.groupUid === "" ? (
                <div>
                    <AddGroupDialog
                        baseGroupData={createEmptyGroup(user?.uid)}
                        addGroupCallback={createGroup}
                        user={user}
                    />

                    <div className="flex gap-x-4">
                        {Object.values(allGroupDocData)
                            .filter((group) => group?.uid)
                            .map((group, index) => (
                                <div
                                    key={`gd-ug-${index}`}
                                    className="relative w-80 bg-gradient-to-r from-pastel-pink to-pastel-orange rounded-md p-4 flex justify-between hover:cursor-pointer mt-8"
                                    onClick={() =>
                                        focusGroupHandler(group?.uid)
                                    }
                                >
                                    <div className="">
                                        <h1 className="text-4xl font-semibold mb-8">
                                            {group.groupName}
                                        </h1>
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

                        {focusedGroup.ownerUid === user.uid ? (
                            <>
                                <EditGroupDialog
                                    user={user}
                                    groupData={
                                        allGroupDocData[
                                            focusedGroup?.groupUid ?? ""
                                        ]
                                    }
                                    editCallback={updateGroup}
                                    deleteCallback={deleteGroupHandler}
                                />
                                <AddCollaboratorPopup
                                    user={user}
                                    userConnections={userConnections}
                                    groupUid={focusedGroup.groupUid}
                                />
                            </>
                        ) : (
                            <>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button className="bg-pastel-pink w-12 h-12 opacity-50 cursor-no-drop">
                                                <Settings className="" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-pastel-blue border-none">
                                            <p>
                                                Only owner can access settings
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button className="bg-pastel-pink h-12 text-base px-4 rounded-md opacity-50 cursor-no-dropq">
                                                Add collaborators
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-pastel-blue border-none">
                                            <p>Only owner can invite users</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </>
                        )}

                        <AddDrinkPopup
                            user={user}
                            userDrinkData={userDrinkData}
                            groupUid={focusedGroup.groupUid}
                        />
                    </div>

                    <GroupDrinkDisplay
                        user={user}
                        groupUid={focusedGroup?.groupUid}
                        userGroups={userGroups}
                    />
                </div>
            )}
        </div>
    );
}

export default GroupDisplay;
