import React from "react";
import DrinkItem from "../DrinkItem";
import { IMenu } from "../../../interfaces/IMenu";
import { Button } from "../../ui/button";
import DrinkEdit from "./DrinkEdit";
import { Drink } from "@/classes/Drink";

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
}
interface IDrinkDisplayLimitedProps {
  mode?: DisplayMode.Limited;
  drinksState: IMenu;
  group?: string;
  setDrinksState?: undefined;
  deleteCallback?: undefined;
  groupsState?: undefined;
  editCallback?: undefined;
}

interface IDrinkDisplayEditabeProps {
  mode: DisplayMode.Editable;
  drinksState: IMenu;
  group?: string;
  setDrinksState: React.Dispatch<React.SetStateAction<IMenu>>;
  deleteCallback: (uuidToDelete: string) => void;
  groupsState: Array<string>;
  editCallback: (newDrinkData: Partial<Drink>) => void;
}

type IDrinkDisplayProps = IDrinkDisplayEditabeProps | IDrinkDisplayLimitedProps;

// TODO: Type inferencing for prop existence
function DrinkDisplay(props: IDrinkDisplayProps) {
  const {
    drinksState,
    mode = DisplayMode.Limited,
    deleteCallback,
    group = "all",
    groupsState,
    editCallback,
  } = props;

  return (
    <>
      <p>{`Drinks (${group}):`}</p>
      <div key={`drinkDisplay-${group}`}>
        {Object.entries(drinksState).map(([drinkId, drinkData]) => {
          if (group === "all" || drinkData.groups?.includes(group)) {
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
                  {mode === DisplayMode.Editable && deleteCallback ? (
                    <>
                      <DrinkItem drinkData={drinkData} />
                      <DrinkEdit
                        groupsState={groupsState}
                        drinkData={drinkData}
                        editCallback={editCallback}
                      />
                      <Button onClick={() => deleteCallback(drinkData.uuid)}>
                        Delete
                      </Button>
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
