import { Drink } from "@/classes/Drink";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDB } from "./FirebaseSetup";
import { doesUserDrinkExist } from "./DrinkHelpers";

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

export const addStoreDrinkToUserByUid = async (
    storeUid: string,
    drinkUid: string,
    userUid: string
) => {
    if (await doesUserDrinkExist(userUid, drinkUid)) {
        throw new Error("Drink already exists in user's collection");
    }

    const drinkDocRef = doc(
        firebaseDB,
        "stores",
        storeUid,
        "storeDrinkData",
        drinkUid
    );
    const drinkSnapshot = await getDoc(drinkDocRef);
    if (drinkSnapshot.exists()) {
        const userDrinkDocRef = doc(
            firebaseDB,
            "users",
            userUid,
            "userDrinkData",
            drinkUid
        );
        await setDoc(userDrinkDocRef, drinkSnapshot.data());
    } else {
        throw new Error("Drink not found in store");
    }
};

export const addStoreDrinkToUser = async (
    storeUid: string,
    drink: Drink,
    userUid: string
) => {
    if (await doesUserDrinkExist(userUid, drink.uid)) {
        throw new Error("Drink already exists in user's collection");
    }

    const drinkDocRef = doc(
        firebaseDB,
        "stores",
        storeUid,
        "storeDrinkData",
        drink.uid
    );
    const drinkSnapshot = await getDoc(drinkDocRef);
    if (drinkSnapshot.exists()) {
        const userDrinkDocRef = doc(
            firebaseDB,
            "users",
            userUid,
            "userDrinkData",
            drink.uid
        );
        await setDoc(userDrinkDocRef, drink.toFirestore());
    } else {
        throw new Error("Drink not found in store");
    }
};
