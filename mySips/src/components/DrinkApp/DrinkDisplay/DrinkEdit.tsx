import { Group } from "@/classes/Category";
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
    // groupsState: Record<string, Group>;
    drinkData: Drink;
    editCallback: (uid: string, updatedDrinkProperties: Drink) => Promise<void>;
}

function DrinkEdit({ drinkData, editCallback }: IDrinkEditProps) {
    const [drinkInputState, setDrinkInputState] = useState<
        Pick<Drink, "uid"> & Partial<Drink>
    >(drinkData);

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
                        {/* {Object.values(groupsState)?.map((groupItem) => {
                            return (
                                <div key={groupItem.groupName}>
                                    <label>{groupItem.groupName}</label>

                                    <input
                                        type="checkbox"
                                        checked={drinkInputState.groups?.includes(
                                            groupItem.uid
                                        )}
                                        onChange={() =>
                                            setDrinkInputState({
                                                ...drinkInputState,
                                                groups: drinkInputState.groups?.includes(
                                                    groupItem.uid
                                                )
                                                    ? drinkInputState.groups.filter(
                                                          (currGroup) =>
                                                              currGroup !==
                                                              groupItem.uid
                                                      )
                                                    : [
                                                          ...(drinkInputState.groups ??
                                                              []),
                                                          groupItem.uid,
                                                      ],
                                            })
                                        }
                                    ></input>
                                </div>
                            );
                        })} */}
                    </div>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button
                                onClick={() =>
                                    editCallback(drinkData.uid, drinkInputState)
                                }
                            >
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
