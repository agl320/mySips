import { IDrinkParams } from "@/classes/Drink";
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

interface IAddDrinkDialogProps {
  drinkInputState: Omit<IDrinkParams, "uuid">;
  setDrinkInputState: React.Dispatch<
    React.SetStateAction<Omit<IDrinkParams, "uuid">>
  >;
  SaveTrigger: ReactNode;
}

function AddDrinkDialog(props: IAddDrinkDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
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

export default AddDrinkDialog;
