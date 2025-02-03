import { Drink } from "@/classes/Drink";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import React, { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { User } from "firebase/auth";
import AddDrinkDialog from "../DrinkForms/AddDrinkDialog";
import AddReceiptDialog from "../DrinkForms/AddReceiptDialog";
import { createEmptyDrink } from "@/firebase/DrinkHelpers";

interface IAddSelectionDialogProps {
    user: User;
    addDrinkCallback: (
        userUid: string,
        newDrinkProperties: any
    ) => Promise<void>;
}

function AddSelectionDialog({
    user,
    addDrinkCallback,
}: IAddSelectionDialogProps) {
    const [isSelectionDialogOpen, setIsSelectionDialogOpen] = useState(false);
    const [isDrinkDialogOpen, setIsDrinkDialogOpen] = useState(false);
    const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
    const [baseDrinkData, setBaseDrinkData] = useState<Drink>(
        createEmptyDrink()
    );

    const handleAddDrinkClick = () => {
        setIsSelectionDialogOpen(false); // Close AddSelectionDialog
        setIsDrinkDialogOpen(true); // Open AddDrinkDialog
    };

    const handleUseReceiptClick = () => {
        setIsSelectionDialogOpen(false); // Close AddSelectionDialog
        setIsReceiptDialogOpen(true); // Open AddDrinkDialog
    };

    useEffect(() => {
        if (isSelectionDialogOpen) {
            console.log("Creating new drink");
            const newBaseDrinkData = createEmptyDrink();
            console.log({ newBaseDrinkData });
            setBaseDrinkData(newBaseDrinkData);
        }
    }, [isSelectionDialogOpen]);

    return (
        <>
            {/* Add Selection Dialog */}
            <Dialog
                open={isSelectionDialogOpen}
                onOpenChange={setIsSelectionDialogOpen}
            >
                <DialogTrigger asChild>
                    <div className="w-[230px] h-[300px] bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-md hover:bg-white/10 flex flex-col justify-around rounded-md">
                        <Button
                            onClick={() => setIsSelectionDialogOpen(true)}
                            className="w-full h-full"
                        >
                            <CirclePlus />
                        </Button>
                    </div>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader className="pb-2">
                        <DialogTitle className="text-2xl opacity-80 text-center">
                            How would you like to add a drink?
                        </DialogTitle>
                    </DialogHeader>
                    <br />

                    <div className="flex">
                        <div className="mr-2">
                            <Button
                                className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white block h-full py-8 w-full "
                                onClick={handleAddDrinkClick}
                            >
                                <p className="text-lg">Start from scratch</p>
                            </Button>
                        </div>
                        <div className="ml-2">
                            <Button
                                className="bg-gradient-to-r from-pastel-orange to-pastel-light-orange text-md rounded-md px-4 text-white block h-full py-8 w-full"
                                onClick={handleUseReceiptClick}
                            >
                                <p className="text-lg">Use receipt</p>
                                <p className="text-xs opacity-75 mt-4">
                                    Currently supports:
                                </p>
                                <p className="text-xs opacity-75">
                                    CoCo Bubble Tea
                                </p>
                                <p className="text-xs opacity-75 text-wrap mt-4">
                                    Take a picture of a receipt and we will
                                    match it with a drink from our database.
                                </p>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Drink Dialog */}
            <AddDrinkDialog
                open={isDrinkDialogOpen}
                onOpenChange={setIsDrinkDialogOpen}
                user={user}
                baseDrinkData={baseDrinkData}
                addDrinkCallback={addDrinkCallback}
            />
            <AddReceiptDialog
                open={isReceiptDialogOpen}
                onOpenChange={setIsReceiptDialogOpen}
                user={user}
                baseDrinkData={baseDrinkData}
                addDrinkCallback={addDrinkCallback}
            />
        </>
    );
}

export default AddSelectionDialog;
