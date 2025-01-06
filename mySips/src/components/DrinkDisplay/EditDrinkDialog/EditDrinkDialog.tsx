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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "firebase/auth";
import { Pen } from "lucide-react";
import { useState } from "react";

interface IDrinkEditProps {
    // groupsState: Record<string, Group>;
    userUid: string;
    drinkData: Drink;
    editCallback: (
        userUid: string,
        drinkUid: string,
        updatedDrinkProperties: Drink
    ) => Promise<void>;
}

function EditDrinkDialog({
    userUid,
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
                        className="h-8 w-4 hover:bg-white/15"
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
                    <Tabs defaultValue="activity" className="w-full h-full">
                        <TabsList className="w-full">
                            <TabsTrigger
                                value="activity"
                                className="w-full rounded-md mr-2 hover:saturate-200"
                            >
                                Activity
                            </TabsTrigger>
                            <TabsTrigger
                                value="information"
                                className="w-full rounded-md hover:saturate-200"
                            >
                                Information
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="activity">
                            <div>
                                <DrinkInput
                                    drinkInputState={drinkInputState}
                                    setDrinkInputState={setDrinkInputState}
                                    formType="activity"
                                />
                            </div>
                            <br></br>
                        </TabsContent>
                        <TabsContent value="information">
                            <div>
                                <DrinkInput
                                    drinkInputState={drinkInputState}
                                    setDrinkInputState={setDrinkInputState}
                                />
                            </div>
                            <br></br>
                        </TabsContent>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button
                                    className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white hover:saturate-150"
                                    onClick={() =>
                                        editDrinkCallback(
                                            userUid,
                                            drinkData.uid,
                                            drinkInputState
                                        )
                                    }
                                >
                                    Save Changes
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="bg-pastel-orange text-md rounded-md px-4 text-pastel-orange bg-opacity-30 mb-2 sm:mt-0 hover:saturate-150">
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default EditDrinkDialog;
