import { ReactNode } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Drink } from "@/classes/Drink";
import { Trash2 } from "lucide-react";

interface IDeleteDrinkDialogProps {
    // SaveTrigger: ReactNode;
    drinkData: Drink;
    deleteDrinkCallback: (uuid: string) => Promise<void>;
}

function DeleteDrinkDialog({
    drinkData,
    deleteDrinkCallback,
}: IDeleteDrinkDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-4 h-4">
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="pb-2 text-2xl">
                    Confirm Delete Drink
                </DialogTitle>
                <DialogDescription className="opacity-80">
                    Are you sure you want to remove {`${drinkData.name}`} from
                    mySips?
                </DialogDescription>
                <br />
                <DialogFooter className="sm:justify-end">
                    {/* <DialogClose asChild>{SaveTrigger}</DialogClose> */}
                    <DialogClose asChild>
                        <Button
                            className="bg-pastel-orange text-md rounded-sm px-4 text-pastel-orange bg-opacity-30"
                            onClick={() => deleteDrinkCallback(drinkData.uuid)}
                        >
                            Delete Drink
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-sm px-4 text-white">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteDrinkDialog;
