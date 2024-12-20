import { Group } from "@/classes/Category";
import { Drink } from "@/classes/Drink";
import DrinkInput from "@/components/DrinkForms/DrinkInput";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "firebase/auth";
import { Pen, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import GroupInput from "./GroupInput";
import { deleteGroup } from "@/firebase/GroupHelpers";
import ConfirmDialog from "../DrinkDisplay/ConfirmDialog/ConfirmDialog";

interface IGroupEditProps {
    // groupsState: Record<string, Group>;
    user: User;
    groupData: Group;
    editCallback: (
        userUid: string,
        groupUid: string,
        updatedGroupProperties: Group
    ) => Promise<void>;
    deleteCallback: (groupUid: string) => Promise<void>;
}

function EditGroupDialog({
    user,
    groupData,
    editCallback: editGroupCallback,
    deleteCallback,
}: IGroupEditProps) {
    const [groupInputState, setGroupInputState] = useState<any>(groupData);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="bg-pastel-pink w-12 h-12"
                        onClick={() => setGroupInputState(groupData)}
                    >
                        <Settings className="" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle className="pb-2 text-2xl">
                        Edit Group
                    </DialogTitle>
                    <DialogDescription className="opacity-80 pb-2 text-base">
                        Description
                    </DialogDescription>
                    <br />
                    <div>
                        <GroupInput
                            groupInputState={groupInputState}
                            setGroupInputState={setGroupInputState}
                        />
                    </div>
                    <br></br>

                    <DialogFooter className="sm:justify-between">
                        <DialogClose asChild>
                            <ConfirmDialog
                                title="Delete Group"
                                description="Deleting the group will remove it from all users."
                                confirm="Confirm"
                                cancel="Cancel"
                                callback={() =>
                                    deleteCallback(groupData.groupUid)
                                }
                                customTrigger={
                                    <Button className="bg-pastel-orange bg-opacity-30 w-10 h-10">
                                        <Trash2
                                            strokeWidth={3}
                                            className="stroke-pastel-orange"
                                        />
                                    </Button>
                                }
                            />
                        </DialogClose>
                        <DialogClose asChild>
                            <div>
                                <Button
                                    className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white mr-2"
                                    onClick={() =>
                                        editGroupCallback(
                                            groupData.groupUid,
                                            groupInputState
                                        )
                                    }
                                >
                                    Save Changes
                                </Button>
                                <Button className="bg-pastel-orange text-md rounded-md px-4 text-pastel-orange bg-opacity-30">
                                    Cancel
                                </Button>
                            </div>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default EditGroupDialog;
