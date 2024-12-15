import { Group } from "@/classes/Category";
import { Drink } from "@/classes/Drink";
import DrinkInput from "@/components/DrinkForms/DrinkInput";
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
    editCallback: (uid: string, updatedDrinkProperties: Drink) => Promise<void>;
}

function EditDrinkDialog({
    drinkData,
    editCallback: editDrinkCallback,
}: IDrinkEditProps) {
    const [drinkInputState, setDrinkInputState] = useState<
        Pick<Drink, "uid"> & Partial<Drink>
    >(drinkData);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        onClick={() => setDrinkInputState(drinkData)}
                        className="h-4 w-4"
                    >
                        <Pen className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle className="pb-2 text-2xl">
                        Edit Drink
                    </DialogTitle>
                    <DialogDescription className="opacity-80 pb-2 text-base">
                        Description
                    </DialogDescription>
                    <br />
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
                    <br></br>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button
                                className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white"
                                onClick={() =>
                                    editDrinkCallback(
                                        drinkData.uid,
                                        drinkInputState
                                    )
                                }
                            >
                                Save Changes
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="bg-pastel-orange text-md rounded-md px-4 text-pastel-orange bg-opacity-30">
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default EditDrinkDialog;
