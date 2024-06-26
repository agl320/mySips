import { IMenu } from "../../interfaces/IMenu";
import { Button } from "../ui/button";
import DrinkDisplay from "./DrinkDisplay";
import DrinkForm from "./UserDrinkAddForm";

interface IDrinkAppProps {
  drinksState: IMenu;
  setDrinksState: React.Dispatch<React.SetStateAction<IMenu>>;
  saveDrinksState: () => Promise<void>;
  groupsState: Array<string>;
}

function DrinkApp(props: IDrinkAppProps) {
  const { drinksState, setDrinksState, saveDrinksState, groupsState } = props;

  const deleteDrink = (uuidToDelete: string) => {
    setDrinksState(
      Object.fromEntries(
        Object.entries(drinksState).filter(
          ([drinkId, drinkData]) => drinkData.uuid !== uuidToDelete
        )
      )
    );
  };

  return (
    <>
      <DrinkForm drinksState={drinksState} setDrinksState={setDrinksState} />
      <Button onClick={saveDrinksState}>Save All</Button>
      <DrinkDisplay
        drinksState={drinksState}
        groupsState={groupsState}
        mode="editable"
        deleteDrink={deleteDrink}
      />
      <DrinkDisplay
        drinksState={drinksState}
        mode="editable"
        deleteDrink={deleteDrink}
        group="fruit"
      />
    </>
  );
}

export default DrinkApp;
