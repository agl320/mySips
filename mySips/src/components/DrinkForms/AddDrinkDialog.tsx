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
import { User } from "firebase/auth";

interface IAddDrinkDialogProps {
    // drinkInputState: Omit<IDrinkParams, "uid">;
    // setDrinkInputState: React.Dispatch<
    //   React.SetStateAction<Omit<IDrinkParams, "uid">>
    // >;
    // SaveTrigger: ReactNode;

    user: User;
    // Generate uid in other object, then pass the empty here
    baseDrinkData: Drink;
    addDrinkCallback: (
        userUid: string,
        newDrinkProperties: any
    ) => Promise<void>;
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddDrinkDialog({
    user,
    baseDrinkData,
    addDrinkCallback,
    open,
    onOpenChange,
}: IAddDrinkDialogProps) {
    const [drinkInputState, setDrinkInputState] =
        useState<Drink>(baseDrinkData);

    useEffect(() => {
        setDrinkInputState(baseDrinkData);
    }, [baseDrinkData]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="pb-2">
                    <DialogTitle className="text-2xl opacity-80">
                        Add New Drink
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="opacity-80">
                    Description
                </DialogDescription>
                <br />
                <div>
                    <DrinkInput
                        drinkInputState={drinkInputState}
                        setDrinkInputState={setDrinkInputState}
                    />
                </div>
                <br />

                <DialogFooter className="sm:justify-end">
                    <Button
                        className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white"
                        onClick={() => {
                            addDrinkCallback(user?.uid, drinkInputState);
                            onOpenChange(false); // Close dialog
                        }}
                    >
                        Add Drink
                    </Button>
                    <Button
                        className="bg-pastel-orange text-md rounded-md px-4 text-pastel-orange bg-opacity-30  mb-2 sm:mt-0"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddDrinkDialog;
