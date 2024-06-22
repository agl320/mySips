import { useState } from "react";
import StoreInput from "../StoreInput";
import { IStore } from "../../../interfaces/IStore";
import { v4 as uuidv4 } from "uuid";
import { collection, doc, setDoc } from "firebase/firestore";

function AdminStoreAddForm({ storesState, setStoresState }) {
  const [storeInputState, setStoreInputState] = useState<IStore>({
    uuid: "",
    storeName: "",
    storeAddress: "",
    storeMenu: {},
  });

  //   /** Saving to database storesState */
  //   const saveStoresState = async (storeUuid?: string) => {
  //     // Either inputted store uid, store uid from form, or generate new one
  //     const newStoreUuid = storeUuid
  //       ? storeUuid
  //       : storeInputState.uuid
  //       ? storeInputState.uuid
  //       : uuidv4();
  //     const newStoreObj = {
  //       ...storeInputState,
  //       uuid: newStoreUuid,
  //     };
  //     try {
  //       setDoc(doc(collection(firebaseDB, "stores"), newStoreUuid), {
  //         ...(Object.hasOwn(storesState, newStoreUuid)
  //           ? storesState[newStoreUuid]
  //           : {}),
  //         ...newStoreObj,
  //       });
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   };

  const addNewStore = () => {
    const uuid = uuidv4();
    setStoresState({
      ...storesState,
      [uuid]: { ...storeInputState, uuid: uuid },
    });
  };

  return (
    <div>
      <p>New store</p>
      <StoreInput
        storeInputState={storeInputState}
        setStoreInputState={setStoreInputState}
      />
      <button onClick={addNewStore}>Add new store</button>
    </div>
  );
}

export default AdminStoreAddForm;
