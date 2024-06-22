import { useEffect, useState } from "react";
import { IStore } from "../../../interfaces/IStore";

function AdminDrinkDeleteForm({
    storesState,
    setStoresState,
    selectedStoreUUID,
    setSelectedStoreUUID,
}: {
    storesState: Record<string, IStore>;
    setStoresState: React.Dispatch<
        React.SetStateAction<Record<string, IStore>>
    >;
    selectedStoreUUID: string;
    setSelectedStoreUUID: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [selectedDrinkUUID, setSelectedDrinkUUID] = useState<string>("");

    useEffect(() => {
        setSelectedDrinkUUID(
            Object.keys(storesState[selectedStoreUUID].storeMenu)[0]
        );
    }, [selectedStoreUUID]);

    const deleteDrinkFromStore = () => {
        if (Object.hasOwn(storesState, selectedStoreUUID)) {
            setStoresState({
                ...storesState,
                [selectedStoreUUID]: {
                    ...storesState[selectedStoreUUID],
                    storeMenu: Object.fromEntries(
                        Object.entries(
                            storesState[selectedStoreUUID].storeMenu
                        ).filter(
                            ([drinkId, drinkData]) =>
                                drinkId !== selectedDrinkUUID
                        )
                    ),
                },
            });
            setSelectedDrinkUUID("");
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
                        console.log(e.target.value);
                        setSelectedDrinkUUID(e.target.value);
                    }}
                    value={selectedDrinkUUID}
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
