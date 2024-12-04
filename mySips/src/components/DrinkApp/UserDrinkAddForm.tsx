import { useState } from "react";
import { v4 as uidv4 } from "uuid";
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
        Omit<IDrinkParams, "uid">
    >({ name: "", description: "", address: "" });

    /** Adding new drink to local drinksState */
    const addToDrinksState = () => {
        const newUid = uidv4();
        setDrinksState({
            ...drinksState,
            [newUid]: {
                uid: newUid,
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
