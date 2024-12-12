import { Drink, IDrinkParams } from "@/classes/Drink";
import DrinkInput, { IDrinkInputProps } from "../DrinkInput";
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
import React, { ReactNode, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { CirclePlus } from "lucide-react";

interface IAddDrinkDialogProps {
    // drinkInputState: Omit<IDrinkParams, "uid">;
    // setDrinkInputState: React.Dispatch<
    //   React.SetStateAction<Omit<IDrinkParams, "uid">>
    // >;
    // SaveTrigger: ReactNode;

    // Generate uid in other object, then pass the empty here
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
                <div className="w-[200px] h-[300px] bg-background-block bg-clip-padding backdrop-filter backdrop-blur-md hover:bg-background-light flex flex-col justify-around rounded-md">
                    <Button
                        onClick={() => setDrinkInputState(baseDrinkData)}
                        className="w-full h-full "
                    >
                        <CirclePlus />
                    </Button>
                </div>
            </DialogTrigger>

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
                    {/* <DialogClose asChild>{props.SaveTrigger}</DialogClose> */}
                    <DialogClose asChild>
                        <Button
                            className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white"
                            onClick={() => addDrinkCallback(drinkInputState)}
                        >
                            Add Drink
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

export default AddDrinkDialog;
