import { cloneElement, ReactNode } from "react";
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
    callback: () => Promise<void>;
    title: string;
    description: string;
    confirm?: string;
    cancel?: string;
    customTrigger?: React.ReactNode;
}

function ConfirmDialog({
    callback,
    title,
    description,
    confirm = "Yes",
    cancel = "No",
    customTrigger,
}: IDeleteDrinkDialogProps) {
    const triggerComponent = customTrigger ? (
        cloneElement(customTrigger as React.ReactElement)
    ) : (
        <Button className="w-4 h-8 hover:bg-white/15 ">
            <Trash2 />
        </Button>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
            <DialogContent>
                <DialogTitle className="pb-2 text-2xl">{title}</DialogTitle>
                <DialogDescription className="opacity-80">
                    {description}
                </DialogDescription>
                <br />
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button
                            className="bg-pastel-orange text-md rounded-md px-4 text-pastel-orange bg-opacity-30 hover:saturate-150"
                            onClick={callback}
                        >
                            {confirm}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white hover:saturate-150">
                            {cancel}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmDialog;
