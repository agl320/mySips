import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseSetup";
import UserComponent from "./components/UserComponent";
import DrinkApp from "./components/DrinkApp/DrinkApp";
import {
    collection,
    doc,
    getDoc,
    getFirestore,
    setDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import PublicDisplay from "./components/DrinkPublic/PublicDisplay";
import { isEqual } from "lodash";
import PublicStores from "./components/DrinkPublic/PublicStores";
import { IMenu } from "./interfaces/IMenu";

function App() {
    const firebaseProvider = new GoogleAuthProvider();
    const firebaseAuth = getAuth();
    const firebaseDB = getFirestore(firebaseApp);

    /** Unique user id associated with account */
    const [userId, setUserId] = useState<string>("");
    /** Array of drinks */
    const [drinksState, setDrinksState] = useState<IMenu>({});

    /** Initial user data import from database */
    const loadData = async () => {
        if (userId) {
            const docRef = doc(firebaseDB, "users", userId);
            const docSnap = await getDoc(docRef);
            if (
                docSnap.data()?.userDrinkData &&
                !isEqual(drinksState, docSnap.data()?.userDrinkData)
            ) {
                setDrinksState(docSnap.data()?.userDrinkData ?? {});
            }
        }
    };

    useEffect(() => {
        if (userId) {
            loadData();
        } else {
            setDrinksState({});
        }
    }, [userId]);

    /** Saving to database drinksState */
    const saveDrinksState = async () => {
        try {
            setDoc(doc(collection(firebaseDB, "users"), userId), {
                userDrinkData: drinksState,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <>
            <h1>mySips</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <UserComponent
                        userId={userId}
                        firebaseProvider={firebaseProvider}
                        firebaseAuth={firebaseAuth}
                        setUserId={setUserId}
                    />
                    <DrinkApp
                        drinksState={drinksState}
                        setDrinksState={setDrinksState}
                        userId={userId}
                        saveDrinksState={saveDrinksState}
                    />
                </div>
                <PublicStores firebaseDB={firebaseDB} />
                {userId ? <PublicDisplay firebaseDB={firebaseDB} /> : <></>}
            </div>
        </>
    );
}

export default App;
