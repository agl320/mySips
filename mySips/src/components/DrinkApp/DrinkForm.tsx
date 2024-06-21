import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IMenu } from "../../interfaces/IMenu";
import { IDrink } from "../../interfaces/IDrink";
import DrinkInput from "../DrinkInput";

interface IDrinkFormProps {
    drinksState: IMenu;
    setDrinksState: React.Dispatch<React.SetStateAction<IMenu>>;
    saveDrinksState: () => Promise<void>;
}

function DrinkForm(props: IDrinkFormProps) {
    const { drinksState, setDrinksState, saveDrinksState } = props;

    const [drinkInputState, setDrinkInputState] = useState<
        Omit<IDrink, "uuid">
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
                        : drinkInputState.name,
                description: "",
                address: drinkInputState.address,
            },
        });
    };

    return (
        <>
            <DrinkInput
                drinkInputState={drinkInputState}
                setDrinkInputState={setDrinkInputState}
            />
            <button onClick={addToDrinksState}>New drink</button>
            <button onClick={saveDrinksState}>Save</button>
        </>
    );
}

export default DrinkForm;
