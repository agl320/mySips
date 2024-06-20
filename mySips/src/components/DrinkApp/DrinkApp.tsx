import { IDrink } from "../../interfaces/IDrink";
import { IMenu } from "../../interfaces/IMenu";

import DrinkDisplay from "./DrinkDisplay";
import DrinkForm from "./DrinkForm";

interface IDrinkAppProps {
    userId: string;
    drinksState: IMenu;
    setDrinksState: React.Dispatch<React.SetStateAction<IMenu>>;
    saveDrinksState: () => Promise<void>;
}

function DrinkApp(props: IDrinkAppProps) {
    const { userId, drinksState, setDrinksState, saveDrinksState } = props;

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
            {userId ? (
                <DrinkForm
                    drinksState={drinksState}
                    setDrinksState={setDrinksState}
                    saveDrinksState={saveDrinksState}
                />
            ) : (
                <></>
            )}

            <DrinkDisplay
                drinksState={drinksState}
                mode="editable"
                deleteDrink={deleteDrink}
            />
        </>
    );
}

export default DrinkApp;
