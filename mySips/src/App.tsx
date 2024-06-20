import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseSetup";
import Authentication from "./components/Authentication";
import DrinkApp from "./components/DrinkApp/DrinkApp";
import { IDrink } from "./components/DrinkApp/IDrink";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { isEqual } from "lodash";
import React from "react";
import DrinkDisplay from "./components/DrinkApp/DrinkDisplay";

function App() {
    const firebaseProvider = new GoogleAuthProvider();
    const firebaseAuth = getAuth();

    // User logged in state
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");

    // const [userId, setUserId] = useState<string>('');
    // User drink state
    const [drinksState, setDrinksState] = useState<Array<IDrink>>([]);

    const [publicDrinks, setPublicDrinks] = useState<
        Record<string, { userDrinkData: IDrink[] }>
    >({});

    // Fire base init
    const firebaseDB = getFirestore(firebaseApp);

    const unsubscribe = onSnapshot(
        collection(firebaseDB, "users"),
        (querySnapshot) => {
            if (querySnapshot) {
                const newPublicDrinks = {};
                querySnapshot.forEach((doc) => {
                    newPublicDrinks[doc.id] = doc.data();
                });
                if (!isEqual(newPublicDrinks, publicDrinks)) {
                    setPublicDrinks(newPublicDrinks);
                }
            }
        }
    );

    useEffect(() => {
        if (userId === "") {
            setDrinksState([]);
            setUserLoggedIn(false);
        } else {
            setUserLoggedIn(true);
        }
    }, [userId]);

    return (
        <>
            <h1>mySips</h1>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Authentication
                        userLoggedIn={userLoggedIn}
                        setDrinksState={setDrinksState}
                        firebaseProvider={firebaseProvider}
                        firebaseAuth={firebaseAuth}
                        setUserId={setUserId}
                    />
                    <DrinkApp
                        drinksState={drinksState}
                        setDrinksState={setDrinksState}
                        userLoggedIn={userLoggedIn}
                        firebaseDB={firebaseDB}
                        // firebaseAuth={firebaseAuth}
                        userId={userId}
                    />
                </div>
                <div>
                    {Object.entries(publicDrinks).map(
                        ([publicUserId, publicDrinkState], index) => {
                            return (
                                <React.Fragment key={index}>
                                    --{publicUserId}--
                                    <DrinkDisplay
                                        drinksState={
                                            publicDrinkState.userDrinkData
                                        }
                                    />
                                </React.Fragment>
                            );
                        }
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
