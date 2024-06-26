import { Drink } from "@/classes/Drink";
import DrinkInput from "@/components/DrinkInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface IDrinkEditProps {
  groupsState: string[];
  drinkData: Drink;
  editCallback: (newDrinkData: Partial<Drink>) => void;
}

function DrinkEdit({ groupsState, drinkData, editCallback }: IDrinkEditProps) {
  const [drinkInputState, setDrinkInputState] =
    useState<Partial<Drink>>(drinkData);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit Drink</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <div>
            <DrinkInput
              drinkInputState={drinkInputState}
              setDrinkInputState={setDrinkInputState}
            />
            {groupsState?.map((groupKey) => {
              return (
                <div key={groupKey}>
                  <label>{groupKey}</label>

                  <input
                    type="checkbox"
                    checked={drinkInputState.groups?.includes(groupKey)}
                    onChange={() =>
                      setDrinkInputState({
                        ...drinkInputState,
                        groups: drinkInputState.groups?.includes(groupKey)
                          ? drinkInputState.groups.filter(
                              (currGroup) => currGroup !== groupKey
                            )
                          : [...(drinkInputState.groups ?? []), groupKey],
                      })
                    }
                  ></input>
                </div>
              );
            })}
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button onClick={() => editCallback(drinkInputState)}>
                Save
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DrinkEdit;
