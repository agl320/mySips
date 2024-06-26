import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IMenu } from "../../interfaces/IMenu";
import { IDrinkParams } from "../../classes/Drink";
import DrinkInput from "../DrinkInput";
import { Button } from "../ui/button";
import AddDrinkDialog from "../DrinkForms/AddDrinkDialog";

interface IDrinkFormProps {
  drinksState: IMenu;
  setDrinksState: React.Dispatch<React.SetStateAction<IMenu>>;
}

function DrinkForm(props: IDrinkFormProps) {
  const { drinksState, setDrinksState } = props;

  const [drinkInputState, setDrinkInputState] = useState<
    Omit<IDrinkParams, "uuid">
  >({ name: "", description: "", address: "" });

  /** Adding new drink to local drinksState */
  const addToDrinksState = () => {
    const newUuid = uuidv4();
    setDrinksState({
      ...drinksState,
      [newUuid]: {
        uuid: newUuid,
        name:
          drinkInputState.name === ""
            ? `New drink ${Object.keys(drinksState).length}`
            : drinkInputState.name.trim(),
        description: "",
        address: drinkInputState.address,
      },
    });
  };

  return (
    <AddDrinkDialog
      drinkInputState={drinkInputState}
      setDrinkInputState={setDrinkInputState}
      SaveTrigger={
        <Button onClick={() => addToDrinksState()}>Add drink</Button>
      }
    />
  );
}

export default DrinkForm;
