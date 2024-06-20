import {
    collection,
    doc,
    Firestore,
    onSnapshot,
    setDoc,
} from "firebase/firestore";
import { isEqual } from "lodash";
import { useState } from "react";
import { IStore } from "../../interfaces/IStore";
import { IDrink } from "../../interfaces/IDrink";
import DrinkInput from "../DrinkInput";

function PublicStores({ firebaseDB }: { firebaseDB: Firestore }) {
    const [storesState, setStoresState] = useState<Record<string, IStore>>({});

    const [drinkInputState, setDrinkInputState] = useState<
        Omit<IDrink, "uuid">
    >({ name: "", description: "" });

    const unsubscribeAll = onSnapshot(
        collection(firebaseDB, "stores"),
        (querySnapshot) => {
            if (querySnapshot) {
                const newStoreDrinks = {};
                querySnapshot.forEach((doc) => {
                    newStoreDrinks[doc.id] = doc.data();
                });
                if (!isEqual(newStoreDrinks, storesState)) {
                    setStoresState(storesState);
                }
            }
        }
    );

    /** Saving to database storesState */
    const saveStoresState = async (storeId: string) => {
        try {
            setDoc(
                doc(collection(firebaseDB, "stores"), storeId),
                storesState[storeId]
            );
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <>
            <div>
                <p>Admin menu</p>
                <input type="text" placeholder="Store id"></input>
                <button>Save to store</button>
                <DrinkInput
                    drinkInputState={drinkInputState}
                    setDrinkInputState={setDrinkInputState}
                />
            </div>
            <div>
                <p>Stores</p>
            </div>
        </>
    );
}

export default PublicStores;
