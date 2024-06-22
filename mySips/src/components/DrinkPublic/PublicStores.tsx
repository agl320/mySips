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

import StoreDisplay from "./StoreDisplay";
import AdminDrinkDeleteForm from "./Admin/AdminDrinkDeleteForm";
import AdminDrinkAddForm from "./Admin/AdminDrinkAddForm";
import AdminStoreAddForm from "./Admin/AdminStoreAddForm";

function PublicStores({ firebaseDB }: { firebaseDB: Firestore }) {
  const [storesState, setStoresState] = useState<Record<string, IStore>>({});

  // Listener for Firestore database
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

  const [selectedStoreUUID, setSelectedStoreUUID] = useState<string>("");

  // Init dropdown
  useEffect(() => {
    if (Object.keys(storesState).length !== 0 && selectedStoreUUID === "") {
      setSelectedStoreUUID(Object.keys(storesState)[0]);
    }
  }, [selectedStoreUUID, storesState]);

  useEffect(() => {
    console.log({ storesState });
  }, [storesState]);
  return (
    <>
      <div>
        <p>Admin menu</p>
        <div
          style={{
            border: "1px solid black",
            padding: "5px",
            marginBottom: "15px",
          }}
        >
          <AdminStoreAddForm
            storesState={storesState}
            setStoresState={setStoresState}
          />
        </div>

        {Object.keys(storesState).length > 0 ? (
          <div style={{ border: "1px solid black", padding: "5px" }}>
            <select
              name="Store uuid"
              onChange={(e) => {
                setSelectedStoreUUID(e.target.value);
              }}
            >
              {Object.keys(storesState).map((storeId, index) => (
                <option value={storeId} key={index}>
                  {storeId}
                </option>
              ))}
            </select>
            <div>
              {selectedStoreUUID
                ? `Selected ${selectedStoreUUID}`
                : "No store selected"}
            </div>
            <AdminDrinkAddForm
              storesState={storesState}
              setStoresState={setStoresState}
              selectedStoreUUID={selectedStoreUUID}
            />
            {Object.keys(storesState[selectedStoreUUID].storeMenu).length >
            0 ? (
              <AdminDrinkDeleteForm
                storesState={storesState}
                setStoresState={setStoresState}
                selectedStoreUUID={selectedStoreUUID}
              />
            ) : (
              <p>No drinks in store</p>
            )}
          </div>
        ) : (
          <p>No stores in database</p>
        )}
      </div>

      <div>
        <p>Admin View Stores</p>
        <StoreDisplay storesState={storesState} />
      </div>
    </>
  );
}

export default PublicStores;
