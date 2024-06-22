import { useState } from "react";
import StoreInput from "../StoreInput";
import { IStore } from "../../../interfaces/IStore";
import { v4 as uuidv4 } from "uuid";
import { collection, doc, setDoc } from "firebase/firestore";

function AdminStoreAddForm({ storesState, setStoresState, addNewStore }) {
    const [storeInputState, setStoreInputState] = useState<IStore>({
        uuid: "",
        storeName: "",
        storeAddress: "",
        storeMenu: {},
    });

    return (
        <div>
            <p>New store</p>
            <StoreInput
                storeInputState={storeInputState}
                setStoreInputState={setStoreInputState}
            />
            <button onClick={() => addNewStore(storeInputState)}>
                Add new store
            </button>
        </div>
    );
}

export default AdminStoreAddForm;
