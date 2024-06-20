import React from "react";
import DrinkItem from "./DrinkItem";
import { IDrink } from "./IDrink";

interface IDrinkDisplayProps {
    drinksState: Array<IDrink>;
}

function DrinkDisplay(props: IDrinkDisplayProps) {
    const { drinksState } = props;
    return (
        <>
            {drinksState.map((drinkData, index) => (
                <React.Fragment key={index}>
                    <DrinkItem drinkData={drinkData} />
                </React.Fragment>
            ))}
        </>
    );
}

export default DrinkDisplay;
