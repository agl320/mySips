import { Drink, IDrinkParams } from "@/classes/Drink";
import DrinkInput, { IDrinkInputProps } from "./DrinkInput";
import { Button, ButtonProps } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import React, { ReactNode, useEffect, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { CirclePlus, Plus } from "lucide-react";
import { Group, IGroupParams } from "@/classes/Group";
import GroupInput from "./GroupInput";
import { User } from "firebase/auth";
import { createEmptyGroup } from "@/firebase/GroupHelpers";

interface IAddDrinkDialogProps {
    baseGroupData: Group;
    addGroupCallback: (
        userUid: string,
        newGroupProperties: IGroupParams
    ) => Promise<void>;
    user: User;
}

function AddGroupDialog({
    user,
    baseGroupData,
    addGroupCallback,
}: IAddDrinkDialogProps) {
    const [groupInputState, setGroupInputState] =
        useState<IGroupParams>(baseGroupData);

    console.log({ groupInputState });
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="bg-pastel-pink w-12 h-12"
                    onClick={() => setGroupInputState(baseGroupData)}
                >
                    <Plus className="" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader className="pb-2">
                    <DialogTitle className="text-2xl opacity-80">
                        Add New Groupa
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="opacity-80">
                    Description
                </DialogDescription>
                <br />
                <div>
                    <GroupInput
                        groupInputState={groupInputState}
                        setGroupInputState={setGroupInputState}
                    />
                </div>
                <br />

                <DialogFooter className="sm:justify-end">
                    {/* <DialogClose asChild>{props.SaveTrigger}</DialogClose> */}
                    <DialogClose asChild>
                        <Button
                            className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white"
                            onClick={() =>
                                addGroupCallback(user?.uid, groupInputState)
                            }
                        >
                            Create Group
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="bg-pastel-orange text-md rounded-md px-4 text-pastel-orange bg-opacity-30">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddGroupDialog;
