import { useEffect, useState } from "react";
import { IDrink } from "./IDrink";

import DrinkDisplay from "./DrinkDisplay";
import DrinkForm from "./DrinkForm";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { isEqual } from "lodash";

interface IDrinkAppProps {
    userId: string;
    drinksState: Array<IDrink>;
    setDrinksState: React.Dispatch<React.SetStateAction<IDrink[]>>;
    firebaseDB: Firestore;
}

function DrinkApp(props: IDrinkAppProps) {
    const { userId, drinksState, setDrinksState, firebaseDB } = props;

    // Initial data load when new userId is detected
    const loadData = async () => {
        if (userId) {
            const docRef = doc(firebaseDB, "users", userId);
            const docSnap = await getDoc(docRef);
            if (
                docSnap.data()?.userDrinkData &&
                !isEqual(drinksState, docSnap.data()?.userDrinkData)
            ) {
                setDrinksState(docSnap.data()?.userDrinkData ?? []);
            }
        }
    };

    useEffect(() => {
        loadData();
    }, [userId]);

    return (
        <>
            {userId ? (
                <DrinkForm
                    drinksState={drinksState}
                    setDrinksState={setDrinksState}
                    firebaseDB={firebaseDB}
                    // firebaseAuth={firebaseAuth}
                    userId={userId}
                />
            ) : (
                <></>
            )}

            <DrinkDisplay
                drinksState={drinksState}
                mode="editable"
                setDrinksState={setDrinksState}
            />
        </>
    );
}

export default DrinkApp;
