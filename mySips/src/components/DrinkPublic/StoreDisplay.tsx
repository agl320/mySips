import { IStore } from "../../interfaces/IStore";
import DrinkDisplay from "../DrinkApp/DrinkDisplay/DrinkDisplay";
import React from "react";

function StoreDisplay({
  storesState,
}: {
  storesState: Record<string, IStore>;
}) {
  return (
    <div>
      {Object.entries(storesState).map(([storeId, storeContent], index) => {
        return (
          <React.Fragment key={index}>
            <div style={{ border: "1px solid black" }}>
              <p>Store name: {storeContent.storeName}</p>
              <p>Store uid: {storeId}</p>
              <DrinkDisplay drinksState={storeContent.storeMenu} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default StoreDisplay;
