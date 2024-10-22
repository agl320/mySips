import { Drink, IDrinkParams } from "@/classes/Drink";
import DrinkInput, { IDrinkInputProps } from "../DrinkInput";
import { Button, ButtonProps } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import React, { ReactNode, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

interface IAddDrinkDialogProps {
    // drinkInputState: Omit<IDrinkParams, "uuid">;
    // setDrinkInputState: React.Dispatch<
    //   React.SetStateAction<Omit<IDrinkParams, "uuid">>
    // >;
    // SaveTrigger: ReactNode;

    // Generate uuid in other object, then pass the empty here
    baseDrinkData: Drink;
    addDrinkCallback: (newDrinkProperties: any) => Promise<void>;
}

function AddDrinkDialog({
    baseDrinkData,
    addDrinkCallback,
}: IAddDrinkDialogProps) {
    const [drinkInputState, setDrinkInputState] =
        useState<Drink>(baseDrinkData);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={() => setDrinkInputState(baseDrinkData)}>
                    New Drink
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add New Drink</DialogTitle>
                <DialogDescription>Description</DialogDescription>
                <div>
                    <DrinkInput
                        drinkInputState={drinkInputState}
                        setDrinkInputState={setDrinkInputState}
                    />
                </div>
                <DialogFooter className="sm:justify-end">
                    {/* <DialogClose asChild>{props.SaveTrigger}</DialogClose> */}
                    <DialogClose asChild>
                        <Button
                            onClick={() => addDrinkCallback(drinkInputState)}
                        >
                            Add
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddDrinkDialog;
