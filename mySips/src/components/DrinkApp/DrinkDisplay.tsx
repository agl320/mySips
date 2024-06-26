import React from "react";
import DrinkItem from "./DrinkItem";
import { IMenu } from "../../interfaces/IMenu";
import { Button } from "../ui/button";

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
            <div>
                {Object.entries(drinksState).map(
                    ([drinkId, drinkData], index) => (
                        <React.Fragment key={index}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "500px",
                                    padding: "15px",
                                    border: "1px solid rgba(0, 0, 0, 0.2)",
                                }}
                            >
                                {mode === "editable" && deleteDrink ? (
                                    <>
                                        <DrinkItem drinkData={drinkData} />
                                        <Button
                                            onClick={() =>
                                                deleteDrink(drinkData.uuid)
                                            }
                                        >
                                            Delete
                                        </Button>
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
