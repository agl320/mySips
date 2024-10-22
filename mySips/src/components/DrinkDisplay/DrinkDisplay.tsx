import { Drink } from "@/classes/Drink";
import { IMenu } from "@/interfaces/IMenu";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";

import { v4 as uuidv4 } from "uuid";
import DeleteDrinkDialog from "./DeleteDrinkDialog/DeleteDrinkDialog";
import DrinkEdit from "../DrinkApp/DrinkDisplay/DrinkEdit";

interface IDrinkDisplayProps {
    userId: string;
    isAdmin?: boolean;
    isEditable?: boolean;
}
function DrinkDisplay(props: IDrinkDisplayProps) {
    const { userId, isAdmin, isEditable } = props;
    const [userDrinkData, setUserDrinkData] = useState<IMenu>({});

    const firestore = useFirestore();

    // doc reference
    const userDocRef = doc(firestore, "users", userId);

    // collection reference
    const userDrinkDataCollectionRef = collection(userDocRef, "userDrinkData");

    useEffect(() => {
        const unsubscribe = onSnapshot(
            userDrinkDataCollectionRef,
            (querySnapshot) => {
                const fetchedDrinks = querySnapshot.docs.map((doc) =>
                    Drink.fromFirestore(doc.data())
                );

                const formattedDrinkData = fetchedDrinks.reduce(
                    (acc, drinkData) => {
                        if (!drinkData.uuid) return acc;
                        acc[drinkData.uuid] = drinkData;
                        return acc;
                    },
                    {} as IMenu
                );

                setUserDrinkData(formattedDrinkData);
            },
            (error) => {
                console.error("Error fetching user drinks:", error.message);
            }
        );

        return () => unsubscribe();
    }, [firestore, userId]);

    // adds empty drink
    const addNewDrink = async () => {
        const uuid = uuidv4();
        const drinkDocRef = doc(userDocRef, "userDrinkData", uuid);
        await setDoc(
            drinkDocRef,
            new Drink({
                name: "New Drink",
                uuid,
                description: "",
            }).toFirestore()
        );
    };

    // updates existing drink
    const updateSelectedDrink = async (
        uuid: string,
        updatedDrinkProperties: Drink
    ) => {
        // Creates new Drink object then invokes toFirestore()
        //  perhaps create custom helper so we don't need to create new Drink each edit
        const newDrinkObj = new Drink(updatedDrinkProperties);
        const drinkDocRef = doc(userDocRef, "userDrinkData", uuid);
        await updateDoc(drinkDocRef, newDrinkObj.toFirestore());
    };

    const deleteSelectedDrink = async (uuid: string) => {
        await deleteDoc(doc(userDocRef, "userDrinkData", uuid));
    };

    return (
        <div>
            <p>Drink Data</p>
            <div className="flex flex-wrap">
                {Object.values(userDrinkData).map((drinkData) => {
                    return (
                        <div
                            key={`drinkCard-${drinkData.uuid}`}
                            className="w-[200px] h-[300px] border border-black flex flex-col justify-between"
                        >
                            <div className="h-[20%]">
                                <p>{drinkData.name}</p>
                                <p>{drinkData.address}</p>
                            </div>
                            <div className="h-[60%]">body</div>

                            <div className="h-[20%]">
                                <p>{drinkData.uuid}</p>
                            </div>
                            <DrinkEdit
                                drinkData={drinkData}
                                editCallback={updateSelectedDrink}
                            />
                            <DeleteDrinkDialog
                                SaveTrigger={
                                    <button
                                        onClick={() =>
                                            deleteSelectedDrink(drinkData.uuid)
                                        }
                                    >
                                        Delete
                                    </button>
                                }
                            />
                        </div>
                    );
                })}
                <button onClick={addNewDrink}>Add drink</button>
            </div>
        </div>
    );
}

export default DrinkDisplay;
