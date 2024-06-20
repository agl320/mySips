import React from "react";
import { IDrink } from "./IDrink";

function DrinkItem({ drinkData }: { drinkData: IDrink }) {
    return (
        <div>
            <p>{drinkData.name}</p>
            <p>{drinkData.uuid}</p>
        </div>
    );
}

export default DrinkItem;
