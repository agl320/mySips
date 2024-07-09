import { useEffect, useState } from "react";
import AuthProvider from "./components/contexts/authContext";
import DefaultView from "./views/DefaultView";
import { Separator } from "./components/ui/separator";
// import firebaseApp from "./firebase/FirebaseSetup";
// import UserComponent from "./components/UserComponent";
// import DrinkApp from "./components/DrinkApp/DrinkApp";
// import {
//     collection,
//     doc,
//     getDoc,
//     getFirestore,
//     setDoc,
// } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import PublicDisplay from "./components/DrinkPublic/PublicDisplay";
// import { isEqual } from "lodash";
// import PublicStores from "./components/DrinkPublic/PublicStores";
// import { IMenu } from "./interfaces/IMenu";
// import { Separator } from "./components/ui/separator";
// import _ from "lodash";
// import IUser from "./interfaces/IUser";
// import { Group } from "./classes/Group";
// import DefaultView from "./views/DefaultView";
// import AuthProvider from "./components/contexts/authContext";

function App() {
    // const firebaseProvider = new GoogleAuthProvider();
    // const firebaseAuth = getAuth();
    // const firebaseDB = getFirestore(firebaseApp);

    // /** Unique user id associated with account */
    // const [userId, setUserId] = useState<string>("");
    // /** Local state of drinks */
    // const [drinksState, setDrinksState] = useState<IMenu>({});
    // /** Server state; used for comparison  */
    // const [serverDrinksSate, setServerDrinksState] = useState<IMenu>({});

    // /** Array of groups */
    // // groupsState is {groupName, groupDrink: Array<drinkUuids>}
    // const [groupsState, setGroupsState] = useState<Record<string, Group>>({});

    // /** Initial user data import from database */
    // const loadData = async () => {
    //     if (userId) {
    //         const docRef = doc(firebaseDB, "users", userId);
    //         const docSnap = await getDoc(docRef);
    //         const userData = docSnap.data() as IUser;
    //         if (
    //             userData.userDrinkData &&
    //             !isEqual(drinksState, userData.userDrinkData)
    //         ) {
    //             setDrinksState(userData.userDrinkData ?? {});
    //             setServerDrinksState(userData.userDrinkData ?? {});
    //             setGroupsState(userData.userGroups ?? {});
    //         }
    //     }
    // };

    // useEffect(() => {
    //     if (userId) {
    //         loadData();
    //     } else {
    //         setDrinksState({});
    //         setServerDrinksState({});
    //         setGroupsState({});
    //     }
    // }, [userId]);

    // /** Saving to database drinksState */
    // const saveUserState = async () => {
    //     try {
    //         setDoc(doc(collection(firebaseDB, "users"), userId), {
    //             userDrinkData: drinksState,
    //             userGroups: groupsState,
    //         });
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     } finally {
    //         // Server presumably updated successfully
    //         setServerDrinksState(drinksState);
    //     }
    // };

    return (
            <AuthProvider children={<DefaultView />} />
            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                            setGroupsState={setGroupsState}
                            saveUserState={saveUserState}
                        />
                    ) : (
                        <></>
                    )}
                </div>
                {userId ? <PublicStores firebaseDB={firebaseDB} /> : <></>}
                {userId ? <PublicDisplay firebaseDB={firebaseDB} /> : <></>}
            </div> */}
    );
}

export default App;
