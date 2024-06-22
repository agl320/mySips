import { useEffect, useState } from "react";
import { IStore } from "../../../interfaces/IStore";

function AdminDrinkDeleteForm({
  storesState,
  setStoresState,
  selectedStoreUUID,
}: {
  storesState: Record<string, IStore>;
  setStoresState: React.Dispatch<React.SetStateAction<Record<string, IStore>>>;
  selectedStoreUUID: string;
}) {
  const [selectedDrinkUUID, setSelectedDrinkUUID] = useState<string>("");

  console.log({ storesState });
  // Init dropdown
  useEffect(() => {
    if (selectedDrinkUUID === "") {
      setSelectedDrinkUUID(
        Object.keys(storesState[selectedStoreUUID].storeMenu)[0]
      );
    }
  }, [selectedDrinkUUID, selectedStoreUUID, storesState]);

  const deleteDrinkFromStore = () => {
    if (Object.hasOwn(storesState, selectedStoreUUID)) {
      setStoresState({
        ...storesState,
        [selectedDrinkUUID]: {
          ...storesState[selectedStoreUUID],
          storeMenu: Object.fromEntries(
            Object.entries(storesState[selectedStoreUUID].storeMenu).filter(
              ([drinkId, drinkData]) => drinkId !== selectedDrinkUUID
            )
          ),
        },
      });
    }
  };
  return (
    <div>
      <p>Drink delete</p>

      <div>
        <label>Drink uuid</label>
        <select
          name="Drink uuid"
          onChange={(e) => {
            setSelectedDrinkUUID(e.target.value);
          }}
        >
          {Object.keys(storesState[selectedStoreUUID].storeMenu).map(
            (drinkId, index) => (
              <option value={drinkId} key={index}>
                {drinkId}
              </option>
            )
          )}
        </select>
        {selectedDrinkUUID
          ? `Selected ${selectedDrinkUUID}`
          : "No drink selected"}
      </div>
      <button onClick={() => deleteDrinkFromStore()}>
        Delete drink from store
      </button>
    </div>
  );
}

export default AdminDrinkDeleteForm;
