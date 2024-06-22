import { useState } from "react";
import { IStore } from "../../../interfaces/IStore";
import DrinkInput from "../../DrinkInput";
import { IDrink } from "../../../interfaces/IDrink";
import { v4 as uuidv4 } from "uuid";

function AdminDrinkAddForm({
  storesState,
  setStoresState,
  selectedStoreUUID,
}: {
  storesState: Record<string, IStore>;
  setStoresState: React.Dispatch<React.SetStateAction<Record<string, IStore>>>;
  selectedStoreUUID: string;
}) {
  const [drinkInputState, setDrinkInputState] = useState<Omit<IDrink, "uuid">>({
    name: "",
    description: "",
    address: "",
  });

  //   const saveDrinkToStore = () => {
  //     const newUuid = uuidv4();
  //     setStoreInputState({
  //       ...storeInputState,
  //       storeMenu: {
  //         ...storeInputState.storeMenu,
  //         [newUuid]: {
  //           uuid: newUuid,
  //           name: drinkInputState.name,
  //           description: "",
  //           address: drinkInputState.address,
  //         },
  //       },
  //     });
  //   };

  const addDrinkToStore = () => {
    if (Object.hasOwn(storesState, selectedStoreUUID)) {
      const uuid = uuidv4();
      setStoresState({
        ...storesState,
        [selectedStoreUUID]: {
          ...storesState[selectedStoreUUID],
          storeMenu: {
            ...storesState[selectedStoreUUID].storeMenu,
            [uuid]: { ...drinkInputState, uuid: uuid },
          },
        },
      });
    }
  };

  return (
    <div>
      <p>Drink add</p>
      <DrinkInput
        drinkInputState={drinkInputState}
        setDrinkInputState={setDrinkInputState}
      />

      <button onClick={() => addDrinkToStore()}>Add drink to store</button>
    </div>
  );
}

export default AdminDrinkAddForm;
