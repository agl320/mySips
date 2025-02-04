import { useState } from "react";
import { IStore } from "../../../interfaces/IStore";
import DrinkInput from "../../DrinkForms/DrinkInput";
import { IDrinkParams } from "../../../classes/Drink";
import { v4 as uidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddDrinkDialog from "@/components/DrinkForms/AddDrinkDialog";

function AdminDrinkAddForm({
    storesState,
    setStoresState,
    selectedStoreUUID,
}: {
    storesState: Record<string, IStore>;
    setStoresState: React.Dispatch<
        React.SetStateAction<Record<string, IStore>>
    >;
    selectedStoreUUID: string;
}) {
    const [drinkInputState, setDrinkInputState] = useState<
        Omit<IDrinkParams, "uid">
    >({
        name: "",
        description: "",
        address: "",
    });

    //   const saveDrinkToStore = () => {
    //     const newUuid = uidv4();
    //     setStoreInputState({
    //       ...storeInputState,
    //       storeMenu: {
    //         ...storeInputState.storeMenu,
    //         [newUuid]: {
    //           uid: newUuid,
    //           name: drinkInputState.name,
    //           description: "",
    //           address: drinkInputState.address,
    //         },
    //       },
    //     });
    //   };

    const addDrinkToStore = () => {
        if (Object.hasOwn(storesState, selectedStoreUUID)) {
            const uid = uidv4();
            setStoresState({
                ...storesState,
                [selectedStoreUUID]: {
                    ...storesState[selectedStoreUUID],
                    storeMenu: {
                        ...storesState[selectedStoreUUID].storeMenu,
                        [uid]: { ...drinkInputState, uid: uid },
                    },
                },
            });
        }
    };

    return (
        // <Dialog>
        //     <DialogTrigger>
        //         <Button>New Drink</Button>
        //     </DialogTrigger>
        //     <DialogContent>
        //         <div>
        //             <DrinkInput
        //                 drinkInputState={drinkInputState}
        //                 setDrinkInputState={setDrinkInputState}
        //             />

        //             <Button onClick={() => addDrinkToStore()}>Add drink</Button>
        //         </div>
        //     </DialogContent>
        // </Dialog>

        <AddDrinkDialog
            drinkInputState={drinkInputState}
            setDrinkInputState={setDrinkInputState}
            SaveTrigger={
                <Button onClick={() => addDrinkToStore()}>Add drink</Button>
            }
        />
    );
}

export default AdminDrinkAddForm;
