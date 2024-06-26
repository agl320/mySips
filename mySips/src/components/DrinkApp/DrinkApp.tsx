import { Drink } from "@/classes/Drink";
import { IMenu } from "../../interfaces/IMenu";
import { Button } from "../ui/button";
import DrinkDisplay, { DisplayMode } from "./DrinkDisplay/DrinkDisplay";
import UserDrinkAddForm from "./UserDrinkAddForm";

interface IDrinkAppProps {
  drinksState: IMenu;
  setDrinksState: React.Dispatch<React.SetStateAction<IMenu>>;
  saveDrinksState: () => Promise<void>;
  groupsState: Array<string>;
}

function DrinkApp(props: IDrinkAppProps) {
  const { drinksState, setDrinksState, saveDrinksState, groupsState } = props;

  /** Adding new drink to local drinksState */
  const editDrinksState = (newDrinkData: Partial<Drink>) => {
    if (!newDrinkData.uuid)
      throw new Error("Trying to edit drink with no uuid!");
    setDrinksState({
      ...drinksState,
      [newDrinkData.uuid]: {
        ...drinksState[newDrinkData.uuid],
        ...newDrinkData,
      },
    });
  };

  const deleteDrink = (uuidToDelete: string) => {
    setDrinksState(
      Object.fromEntries(
        Object.entries(drinksState).filter(
          ([, drinkData]) => drinkData.uuid !== uuidToDelete
        )
      )
    );
  };

  return (
    <>
      <UserDrinkAddForm
        drinksState={drinksState}
        setDrinksState={setDrinksState}
      />
      <Button onClick={saveDrinksState}>Save All</Button>
      <DrinkDisplay
        drinksState={drinksState}
        groupsState={groupsState}
        mode={DisplayMode.Editable}
        setDrinksState={setDrinksState}
        deleteCallback={deleteDrink}
        editCallback={editDrinksState}
      />
      {groupsState.map((groupKey) => {
        return (
          <DrinkDisplay
            key={`drinkDisplay-${groupKey}`}
            drinksState={drinksState}
            group={groupKey}
          />
        );
      })}
    </>
  );
}

export default DrinkApp;
