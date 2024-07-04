import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

function GroupAddDrinkDialog({ editDrinksState }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Drink to Group</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Drink to Group</DialogTitle>
                <DialogDescription>Description</DialogDescription>
                <div>content</div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button>Save</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default GroupAddDrinkDialog;
