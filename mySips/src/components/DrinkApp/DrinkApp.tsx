import { useState } from "react";
import { IDrink } from "./IDrink";

import DrinkDisplay from "./DrinkDisplay";
import DrinkForm from "./DrinkForm";
import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth";

interface IDrinkAppProps {
    userLoggedIn: boolean;
    drinksState: Array<IDrink>;
    setDrinksState: React.Dispatch<React.SetStateAction<IDrink[]>>;
    firebaseDB: Firestore;
    // firebaseAuth: Auth;
    userId: string;
}

function DrinkApp(props: IDrinkAppProps) {
    const {
        userLoggedIn,
        drinksState,
        setDrinksState,
        firebaseDB,
        // firebaseAuth,
        userId,
    } = props;

    return (
        <>
            {userLoggedIn ? (
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

            <DrinkDisplay drinksState={drinksState} />
        </>
    );
}

export default DrinkApp;
