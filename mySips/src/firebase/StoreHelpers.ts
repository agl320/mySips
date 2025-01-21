import { Drink } from "@/classes/Drink";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDB } from "./FirebaseSetup";

// Add drink to store
export const addDrinkToStore = async (
    storeUid: string,
    newDrinkProperties: Drink
) => {
    const drinkDocRef = doc(
        firebaseDB,
        "stores",
        storeUid,
        "storeDrinkData",
        newDrinkProperties.uid
    );

    // create drink
    const newDrinkObj = new Drink(newDrinkProperties);
    await setDoc(drinkDocRef, newDrinkObj.toFirestore());
};
