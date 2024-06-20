import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IDrink } from "./IDrink";

import { collection, Firestore, setDoc, doc } from "firebase/firestore";
import { Auth } from "firebase/auth";

interface IDrinkFormProps {
    drinksState: Array<IDrink>;
    setDrinksState: React.Dispatch<React.SetStateAction<IDrink[]>>;
    firebaseDB: Firestore;
    // firebaseAuth: Auth;
    userId: string;
}

function DrinkForm(props: IDrinkFormProps) {
    const { drinksState, setDrinksState, firebaseDB, userId } = props;

    const [drinkName, setDrinkName] = useState<string>("");
    const [drinkAddress, setDrinkAddress] = useState<string>("");

    const saveDrinksState = async () => {
        try {
            setDoc(doc(collection(firebaseDB, "users"), userId), {
                userDrinkData: drinksState,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    /** Adding new drink to local drinksState */
    const addDrink = () => {
        setDrinksState((prevDrinksState) =>
            prevDrinksState.concat({
                uuid: uuidv4(),
                name:
                    drinkName === ""
                        ? `New drink ${drinksState.length}`
                        : drinkName,
                description: "",
                address: drinkAddress,
            } as IDrink)
        );
    };

    return (
        <>
            <div>
                <label>Drink name</label>
                <input
                    type="text"
                    placeholder={`New drink ${drinksState.length}`}
                    required
                    value={drinkName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDrinkName(e.target.value);
                    }}
                    maxLength={32}
                ></input>
            </div>
            <div>
                <label>Street address</label>
                <input
                    type="text"
                    placeholder={`Street address`}
                    required
                    value={drinkAddress}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDrinkAddress(e.target.value);
                    }}
                    maxLength={32}
                ></input>
            </div>
            <button onClick={addDrink}>New drink</button>
            <button onClick={saveDrinksState}>Save</button>
        </>
    );
}

export default DrinkForm;
