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
import { Pen } from "lucide-react";
import { useState } from "react";

interface IDrinkEditProps {
    // groupsState: Record<string, Group>;
    drinkData: Drink;
    editCallback: (
        uuid: string,
        updatedDrinkProperties: Drink
    ) => Promise<void>;
}

function EditDrinkDialog({
    drinkData,
    editCallback: editDrinkCallback,
}: IDrinkEditProps) {
    const [drinkInputState, setDrinkInputState] = useState<
        Pick<Drink, "uuid"> & Partial<Drink>
    >(drinkData);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button onClick={() => setDrinkInputState(drinkData)}>
                        <Pen className="h-4 w-4" />
                    </Button>
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
                                            groupItem.uuid
                                        )}
                                        onChange={() =>
                                            setDrinkInputState({
                                                ...drinkInputState,
                                                groups: drinkInputState.groups?.includes(
                                                    groupItem.uuid
                                                )
                                                    ? drinkInputState.groups.filter(
                                                          (currGroup) =>
                                                              currGroup !==
                                                              groupItem.uuid
                                                      )
                                                    : [
                                                          ...(drinkInputState.groups ??
                                                              []),
                                                          groupItem.uuid,
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
                                    editDrinkCallback(
                                        drinkData.uuid,
                                        drinkInputState
                                    )
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

export default EditDrinkDialog;
