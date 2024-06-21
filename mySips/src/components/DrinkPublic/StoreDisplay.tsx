import { collection, Firestore, onSnapshot } from "firebase/firestore";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { IStore } from "../../interfaces/IStore";
import DrinkDisplay from "../DrinkApp/DrinkDisplay";
import React from "react";

function StoreDisplay({
    storesState,
}: {
    storesState: Record<string, IStore>;
}) {
    // const [publicStores, setPublicStores] = useState<Record<string, IStore>>(
    //     {}
    // );

    // const unsubscribeAll = onSnapshot(
    //     collection(firebaseDB, "stores"),
    //     (querySnapshot) => {
    //         if (querySnapshot) {
    //             const newPublicStores = {};
    //             querySnapshot.forEach((doc) => {
    //                 newPublicStores[doc.id] = doc.data();
    //             });
    //             if (!isEqual(newPublicStores, publicStores)) {
    //                 setPublicStores(newPublicStores);
    //             }
    //         }
    //     }
    // );

    // useEffect(() => {
    //     console.log({ publicStores });
    // }, [publicStores]);

    return (
        <div>
            {Object.entries(storesState).map(
                ([storeId, storeContent], index) => {
                    return (
                        <React.Fragment key={index}>
                            <div>
                                <p>
                                    --={storeContent.storeName} : {storeId}=--
                                </p>
                                <DrinkDisplay
                                    drinksState={storeContent.storeMenu}
                                    mode="limited"
                                />
                            </div>
                        </React.Fragment>
                    );
                }
            )}
        </div>
    );
}

export default StoreDisplay;
