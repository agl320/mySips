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
import { Separator } from "./components/ui/separator";
import _ from "lodash";

function App() {
  const firebaseProvider = new GoogleAuthProvider();
  const firebaseAuth = getAuth();
  const firebaseDB = getFirestore(firebaseApp);

  /** Unique user id associated with account */
  const [userId, setUserId] = useState<string>("");
  /** Local state of drinks */
  const [drinksState, setDrinksState] = useState<IMenu>({});
  /** Server state; used for comparison  */
  const [serverDrinksSate, setServerDrinksState] = useState<IMenu>({});

  /** Array of groups */
  const [groupsState, setGroupsState] = useState<Array<string>>([
    "fruit",
    "morning",
  ]);

  useEffect(() => {
    console.log({ drinksState, serverDrinksSate });
  }, [drinksState, serverDrinksSate]);

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
        setServerDrinksState(docSnap.data()?.userDrinkData ?? {});
      }
    }
  };

  useEffect(() => {
    if (userId) {
      loadData();
    } else {
      setDrinksState({});
      setServerDrinksState({});
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
    } finally {
      // Server presumably updated successfully
      setServerDrinksState(drinksState);
    }
  };

  return (
    <>
      <h1>mySips</h1>
      <Separator className="my-4" />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <UserComponent
            userId={userId}
            firebaseProvider={firebaseProvider}
            firebaseAuth={firebaseAuth}
            setUserId={setUserId}
          />
          <Separator className="my-4" />
          {userId && !_.isEqual(serverDrinksSate, drinksState) ? (
            <p>Changes not saved.</p>
          ) : (
            <p>All updated.</p>
          )}
          {userId ? (
            <DrinkApp
              drinksState={drinksState}
              groupsState={groupsState}
              setDrinksState={setDrinksState}
              saveDrinksState={saveDrinksState}
            />
          ) : (
            <></>
          )}
        </div>
        {userId ? <PublicStores firebaseDB={firebaseDB} /> : <></>}
        {userId ? <PublicDisplay firebaseDB={firebaseDB} /> : <></>}
      </div>
    </>
  );
}

export default App;
