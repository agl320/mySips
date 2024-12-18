import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { firebaseDB } from "./FirebaseSetup";
import { Group, IGroupParams } from "@/classes/Group";
import { v4 as uidv4 } from "uuid";
import { IDrinkParams } from "@/classes/Drink";

export interface GroupDrinkItem {
    drinkUid: string;
    userUid: string;
    pairUid: string;
    groupUid: string;
}

export const createGroup = async (
    userUid: string,
    newGroupProperties: IGroupParams
) => {
    const groupDocRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userGroups",
        newGroupProperties.uid
    );

    const newGroupObj = new Group(newGroupProperties);
    await setDoc(groupDocRef, newGroupObj.toFirestore());

    const groupDrinksCollectionRef = collection(groupDocRef, "groupDrinks");

    await addDoc(groupDrinksCollectionRef, { placeholder: true });
};

export const createEmptyGroup = (): Group => {
    const uid = uidv4();

    const newGroupObj = new Group({
        groupName: "New Group",
        uid,
    });

    return newGroupObj;
};

export const addDrinkToGroup = async (
    userUid: string,
    groupUid: string,
    drinkUid: string
) => {
    const pairUid = [userUid, drinkUid].join("_");

    const groupDrinksRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userGroups",
        groupUid,
        "groupDrinks",
        pairUid
    );
    const drinkGroupRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userDrinkData",
        drinkUid,
        "groups",
        pairUid
    );

    // Drink to group
    const groupEntry = {
        drinkUid,
        userUid,
        pairUid,
        groupUid,
    };
    await setDoc(groupDrinksRef, groupEntry);
    await setDoc(drinkGroupRef, groupEntry);
};

export const removeDrinkFromGroup = async (
    userUid: string,
    groupUid: string,
    drinkUid: string
) => {
    const pairUid = [userUid, drinkUid].join("_");

    // References
    const groupDrinkRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userGroups",
        groupUid,
        "groupDrinks",
        pairUid
    );
    // const drinkGroupRef = doc(
    //     firebaseDB,
    //     "users",
    //     userUid,
    //     "userDrinkData",
    //     drinkUid,
    //     "groups",
    //     pairUid
    // );

    await deleteDoc(groupDrinkRef);
    // await deleteDoc(drinkGroupRef);
};
