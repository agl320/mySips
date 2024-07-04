import React from "react";
import DrinkItem from "../DrinkItem";
import { IMenu } from "../../../interfaces/IMenu";
import { Button } from "../../ui/button";
import DrinkEdit from "./DrinkEdit";
import { Drink } from "@/classes/Drink";
import { Group } from "@/classes/Category";

// interface IDrinkDisplayProps {
//   drinksState: IMenu;
//   setDrinksState?: React.Dispatch<React.SetStateAction<IMenu>>;
//   mode?: "editable" | "limited";
//   deleteDrink?: (uuidToDelete: string) => void;
//   group?: string;
//   groupsState?: Array<string>;
//   editCallback?: (newDrinkData: Drink) => void;
// }

export const enum DisplayMode {
    Limited = "Limited",
    Editable = "Editable",
    Checkbox = "Checkbox",
}
interface IDrinkDisplayLimitedProps {
    mode?: DisplayMode.Limited;
    drinksState: IMenu;
    group?: Group;
    setDrinksState?: undefined;
    setGroupsState?: undefined;
    deleteCallback?: undefined;
    groupsState?: undefined;
    editCallback?: undefined;
}

interface IDrinkDisplayEditabeProps {
    mode: DisplayMode.Editable;
    drinksState: IMenu;
    group?: Group;
    setDrinksState: React.Dispatch<React.SetStateAction<IMenu>>;
    setGroupsState: React.Dispatch<React.SetStateAction<Record<string, Group>>>;
    deleteCallback: (uuidToDelete: string) => void;
    groupsState: Record<string, Group>;
    editCallback: (newDrinkData: Pick<Drink, "uuid"> & Partial<Drink>) => void;
}

type IDrinkDisplayProps = IDrinkDisplayEditabeProps | IDrinkDisplayLimitedProps;

// TODO: Type inferencing for prop existence
function DrinkDisplay(props: IDrinkDisplayProps) {
    const {
        drinksState,
        mode = DisplayMode.Limited,
        deleteCallback,
        group,
        groupsState,
        editCallback,
    } = props;

    return (
        <>
            <p>{`Drinks (${group?.groupName || "All"}):`}</p>
            <div key={`drinkDisplay-${group}`}>
                {Object.entries(drinksState).map(([drinkId, drinkData]) => {
                    if (!group || drinkData.groups?.includes(group?.uuid)) {
                        return (
                            <React.Fragment key={drinkId}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "500px",
                                        padding: "15px",
                                        border: "1px solid rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    {mode === DisplayMode.Editable &&
                                    deleteCallback ? (
                                        <>
                                            <DrinkItem drinkData={drinkData} />
                                            <div>
                                                <DrinkEdit
                                                    groupsState={groupsState}
                                                    drinkData={drinkData}
                                                    editCallback={editCallback}
                                                />
                                                <Button
                                                    onClick={() =>
                                                        deleteCallback(
                                                            drinkData.uuid
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <DrinkItem drinkData={drinkData} />
                                    )}
                                </div>
                            </React.Fragment>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </>
    );
}

export default DrinkDisplay;
