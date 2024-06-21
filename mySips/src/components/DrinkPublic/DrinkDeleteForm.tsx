import { useState } from "react";
import { IStore } from "../../interfaces/IStore";

function DrinkDeleteForm({
    storesState,
    setStoresState,
}: {
    storesState: Record<string, IStore>;
    setStoresState: React.Dispatch<
        React.SetStateAction<Record<string, IStore>>
    >;
}) {
    const [storeUuidDelete, setStoreUuidDelete] = useState<string>("");
    const [drinkUuidDelete, setDrinkUuidDelete] = useState<string>("");

    const deleteDrinkFromStore = () => {
        if (Object.hasOwn(storesState, storeUuidDelete)) {
            setStoresState({
                ...storesState,
                [storeUuidDelete]: {
                    ...storesState[storeUuidDelete],
                    storeMenu: Object.fromEntries(
                        Object.entries(
                            storesState[storeUuidDelete].storeMenu
                        ).filter(
                            ([drinkId, drinkData]) =>
                                drinkId !== drinkUuidDelete
                        )
                    ),
                },
            });
        }
    };
    return (
        <div>
            <p>Drink delete</p>
            <label>Store uuid</label>
            <select
                name="Store uuid"
                onChange={(e) => {
                    setStoreUuidDelete(e.target.value);
                }}
            >
                {Object.keys(storesState).map((storeId) => (
                    <option value={storeId}>{storeId}</option>
                ))}
            </select>
            {`Selected ${storeUuidDelete}`}
            <div>
                <label>Drink uuid</label>
                <input
                    placeholder="Drink uuid"
                    value={drinkUuidDelete}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDrinkUuidDelete(e.target.value);
                    }}
                ></input>
            </div>
            <button onClick={() => deleteDrinkFromStore()}>
                Delete drink from store
            </button>
        </div>
    );
}

export default DrinkDeleteForm;
