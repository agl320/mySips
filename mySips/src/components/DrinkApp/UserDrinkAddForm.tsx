import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IMenu } from "../../interfaces/IMenu";
import { IDrinkParams } from "../../classes/Drink";
import { Button } from "../ui/button";
import AddDrinkDialog from "../DrinkForms/AddDrinkDialog";

interface IUserDrinkAddFormProps {
  drinksState: IMenu;
  setDrinksState: React.Dispatch<React.SetStateAction<IMenu>>;
}

function UserDrinkAddForm(props: IUserDrinkAddFormProps) {
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
        groups: [],
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

export default UserDrinkAddForm;
