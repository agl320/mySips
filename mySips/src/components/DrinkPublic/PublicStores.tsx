import {
    collection,
    doc,
    Firestore,
    onSnapshot,
    setDoc,
} from "firebase/firestore";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { IStore } from "../../interfaces/IStore";
import { IDrink } from "../../interfaces/IDrink";
import DrinkInput from "../DrinkInput";
import StoreInput from "./StoreInput";
import { v4 as uuidv4 } from "uuid";
import StoreDisplay from "./StoreDisplay";

function PublicStores({ firebaseDB }: { firebaseDB: Firestore }) {
    const [storesState, setStoresState] = useState<Record<string, IStore>>({});

    const [drinkInputState, setDrinkInputState] = useState<
        Omit<IDrink, "uuid">
    >({ name: "", description: "", address: "" });

    const [storeInputState, setStoreInputState] = useState<IStore>({
        uuid: "",
        storeName: "",
        storeAddress: "",
        storeMenu: {},
    });

    const unsubscribeAll = onSnapshot(
        collection(firebaseDB, "stores"),
        (querySnapshot) => {
            if (querySnapshot) {
                const newStoreDrinks = {};
                querySnapshot.forEach((doc) => {
                    newStoreDrinks[doc.id] = doc.data();
                });

                if (!isEqual(newStoreDrinks, storesState)) {
                    setStoresState(newStoreDrinks);
                }
            }
        }
    );

    /** Saving to database storesState */
    const saveStoresState = async (storeUuid?: string) => {
        // Either inputted store uid, store uid from form, or generate new one
        const newStoreUuid = storeUuid
            ? storeUuid
            : storeInputState.uuid
            ? storeInputState.uuid
            : uuidv4();
        const newStoreObj = {
            ...storeInputState,
            uuid: newStoreUuid,
        };

        try {
            setDoc(doc(collection(firebaseDB, "stores"), newStoreUuid), {
                ...(Object.hasOwn(storesState, newStoreUuid)
                    ? storesState[newStoreUuid]
                    : {}),
                ...newStoreObj,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const saveDrinkToStore = () => {
        const newUuid = uuidv4();
        setStoreInputState({
            ...storeInputState,
            storeMenu: {
                ...storeInputState.storeMenu,
                [newUuid]: {
                    uuid: newUuid,
                    name: drinkInputState.name,
                    description: "",
                    address: drinkInputState.address,
                },
            },
        });
    };

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
        <>
            <div>
                <p>Admin menu</p>
                <br></br>
                <StoreInput
                    storeInputState={storeInputState}
                    setStoreInputState={setStoreInputState}
                />
                <br></br>
                <DrinkInput
                    drinkInputState={drinkInputState}
                    setDrinkInputState={setDrinkInputState}
                />

                <br></br>
                <button onClick={saveDrinkToStore}>Save drink to store</button>
                <button onClick={() => saveStoresState()}>Save store</button>

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
            <div>
                <p>Stores</p>
                <StoreDisplay storesState={storesState} />
            </div>
        </>
    );
}

export default PublicStores;
