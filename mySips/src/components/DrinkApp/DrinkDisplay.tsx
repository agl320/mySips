import React from "react";
import DrinkItem from "./DrinkItem";
import { IMenu } from "../../interfaces/IMenu";
import { Button } from "../ui/button";

interface IDrinkDisplayProps {
  drinksState: IMenu;
  mode?: "editable" | "limited";
  deleteDrink?: (uuidToDelete: string) => void;
  group?: string;
  groupsState?: Array<string>;
}

function DrinkDisplay(props: IDrinkDisplayProps) {
  const {
    drinksState,
    mode = "limited",
    deleteDrink,
    group = "all",
    groupsState,
  } = props;

  return (
    <>
      <p>{`Drinks (${group}):`}</p>
      <div>
        {Object.entries(drinksState).map(([drinkId, drinkData], index) => {
          if (group === "all" || drinkData.groups?.includes(group)) {
            return (
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
                      <Button onClick={() => deleteDrink(drinkData.uuid)}>
                        Delete
                      </Button>
                      {groupsState?.map((groupKey) => {
                        return <Button>{groupKey}</Button>;
                      })}
                    </>
                  ) : (
                    <DrinkItem drinkData={drinkData} />
                  )}
                </div>
              </React.Fragment>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    </>
  );
}

export default DrinkDisplay;
