import React from "react";
import DrinkItem from "./DrinkItem";
import { IMenu } from "../../interfaces/IMenu";

interface IDrinkDisplayProps {
    drinksState: IMenu;
    mode?: "editable" | "limited";
    deleteDrink?: (uuidToDelete: string) => void;
}

function DrinkDisplay(props: IDrinkDisplayProps) {
    const { drinksState, mode = "limited", deleteDrink } = props;

    return (
        <>
            <p>Drinks:</p>
            <div style={{ paddingLeft: "15px" }}>
                {Object.entries(drinksState).map(
                    ([drinkId, drinkData], index) => (
                        <React.Fragment key={index}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "500px",
                                }}
                            >
                                {mode === "editable" && deleteDrink ? (
                                    <>
                                        <input type="checkbox"></input>
                                        <DrinkItem drinkData={drinkData} />
                                        <button
                                            onClick={() =>
                                                deleteDrink(drinkData.uuid)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <DrinkItem drinkData={drinkData} />
                                )}
                            </div>
                        </React.Fragment>
                    )
                )}
            </div>
        </>
    );
}

export default DrinkDisplay;
