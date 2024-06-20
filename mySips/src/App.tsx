import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseSetup";
import Authentication from "./components/Authentication";
import DrinkApp from "./components/DrinkApp/DrinkApp";
import { IDrink } from "./components/DrinkApp/IDrink";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import PublicDisplay from "./components/DrinkPublic/PublicDisplay";

function App() {
    const firebaseProvider = new GoogleAuthProvider();
    const firebaseAuth = getAuth();

    // User logged in state
    const [userId, setUserId] = useState<string>("");

    // const [userId, setUserId] = useState<string>('');
    // User drink state
    const [drinksState, setDrinksState] = useState<Array<IDrink>>([]);

    // Fire base init
    const firebaseDB = getFirestore(firebaseApp);

    useEffect(() => {
        if (userId === "") {
            setDrinksState([]);
        }
    }, [userId]);

    return (
        <>
            <h1>mySips</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Authentication
                        userId={userId}
                        setDrinksState={setDrinksState}
                        firebaseProvider={firebaseProvider}
                        firebaseAuth={firebaseAuth}
                        setUserId={setUserId}
                    />
                    <DrinkApp
                        drinksState={drinksState}
                        setDrinksState={setDrinksState}
                        firebaseDB={firebaseDB}
                        // firebaseAuth={firebaseAuth}
                        userId={userId}
                    />
                </div>
                {userId ? (
                    <PublicDisplay
                        firebaseDB={firebaseDB}
                        userId={userId}
                        setDrinksState={setDrinksState}
                        drinksState={drinksState}
                    />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default App;
