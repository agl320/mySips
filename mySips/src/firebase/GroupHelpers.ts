import { doc, setDoc } from "firebase/firestore";
import { firebaseDB } from "./FirebaseSetup";
import { Group, IGroupParams } from "@/classes/Group";
import { v4 as uidv4 } from "uuid";

export const createGroup = async (
    userUid: string,
    newGroupProperties: IGroupParams
) => {
    const drinkDocRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userGroups",
        newGroupProperties.uid
    );

    const newGroupObj = new Group(newGroupProperties);
    await setDoc(drinkDocRef, newGroupObj.toFirestore());
};

export const createEmptyGroup = (): Group => {
    const newGroupObj = new Group({
        groupName: "New Group",
        uid: uidv4(),
    });

    return newGroupObj;
};
