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
                <Button>
                    {" "}
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Confirm Delete Drink</DialogTitle>
                <DialogDescription>
                    Are you sure you want to remove {`${drinkData.name}`} from
                    mySips?
                </DialogDescription>
                <div></div>
                <DialogFooter className="sm:justify-end">
                    {/* <DialogClose asChild>{SaveTrigger}</DialogClose> */}
                    <DialogClose asChild>
                        <Button
                            onClick={() => deleteDrinkCallback(drinkData.uuid)}
                        >
                            Delete Drink
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

export default DeleteDrinkDialog;
