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

interface IDeleteDrinkDialogProps {
    SaveTrigger: ReactNode;
}

function DeleteDrinkDialog(props: IDeleteDrinkDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Delete Drink</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Confirm Delete Drink</DialogTitle>
                <DialogDescription>Description</DialogDescription>
                <div></div>
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

export default DeleteDrinkDialog;
