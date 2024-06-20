import React from "react";
import DrinkItem from "./DrinkItem";
import { IDrink } from "./IDrink";

interface IDrinkDisplayProps {
    drinksState: Array<IDrink>;
    mode?: "editable" | "limited";
    setDrinksState: React.Dispatch<React.SetStateAction<IDrink[]>>;
}

function DrinkDisplay(props: IDrinkDisplayProps) {
    const { drinksState, mode = "limited", setDrinksState } = props;

    const deleteDrink = (uuidToDelete: string) => {
        setDrinksState(
            drinksState.filter((drinkData) => drinkData.uuid !== uuidToDelete)
        );
    };
    return (
        <>
            {drinksState.map((drinkData, index) => (
                <React.Fragment key={index}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "500px",
                        }}
                    >
                        {mode === "editable" ? (
                            <>
                                <input type="checkbox"></input>
                                <DrinkItem drinkData={drinkData} />
                                <button
                                    onClick={() => deleteDrink(drinkData.uuid)}
                                >
                                    Delete
                                </button>
                            </>
                        ) : (
                            <DrinkItem drinkData={drinkData} />
                        )}
                    </div>
                </React.Fragment>
            ))}
        </>
    );
}

export default DrinkDisplay;
