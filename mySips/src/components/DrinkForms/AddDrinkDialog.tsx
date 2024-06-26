import { IDrinkParams } from "@/interfaces/Drink";
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
import React, { ReactNode } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

interface IDrinkFormProps {
    drinkInputState: Omit<IDrinkParams, "uuid">;
    setDrinkInputState: React.Dispatch<
        React.SetStateAction<Omit<IDrinkParams, "uuid">>
    >;
    SaveTrigger: ReactNode;
}

function DrinkForm(props: IDrinkFormProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>New Drink</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add New Drink</DialogTitle>
                <DialogDescription>Description</DialogDescription>
                <div>
                    <DrinkInput
                        drinkInputState={props.drinkInputState}
                        setDrinkInputState={props.setDrinkInputState}
                    />
                </div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>{props.SaveTrigger}</DialogClose>
                    <DialogClose asChild>
                        <Button>Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DrinkForm;
