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

import moment from "moment";

import { v4 as uuidv4 } from "uuid";
import DeleteDrinkDialog from "./DeleteDrinkDialog/DeleteDrinkDialog";
import DrinkEdit from "../DrinkApp/DrinkDisplay/DrinkEdit";
import EditDrinkDialog from "./EditDrinkDialog/EditDrinkDialog";
import AddDrinkDialog from "../DrinkForms/AddDrinkDialog";
import { Button } from "../ui/button";

interface IDrinkDisplayProps {
    userId: string;
    isAdmin?: boolean;
    isEditable?: boolean;
}
function DrinkDisplay(props: IDrinkDisplayProps) {
    const { userId, isAdmin, isEditable = false } = props;
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
    const addNewDrink = async (newDrinkProperties: any) => {
        // const uuid = uuidv4();
        const drinkDocRef = doc(
            userDocRef,
            "userDrinkData",
            newDrinkProperties.uuid
        );
        const newDrinkObj = new Drink(newDrinkProperties);
        await setDoc(drinkDocRef, newDrinkObj.toFirestore());
    };

    const createEmptyDrink = (): Drink => {
        const newDrinkObj = new Drink({
            name: "New Drink",
            uuid: uuidv4(),
            description: "",
        });

        return newDrinkObj;
    };

    // updates existing drink
    const updateSelectedDrink = async (
        uuid: string,
        updatedDrinkProperties: Drink
    ) => {
        // Creates new Drink object then invokes toFirestore()
        //  perhaps create custom helper so we don't need to create new Drink each edit
        const newDrinkObj = new Drink(updatedDrinkProperties);

        console.log({ newDrinkObj });

        const drinkDocRef = doc(userDocRef, "userDrinkData", uuid);
        await updateDoc(drinkDocRef, newDrinkObj.toFirestore());
    };

    const deleteSelectedDrink = async (uuid: string) => {
        await deleteDoc(doc(userDocRef, "userDrinkData", uuid));
    };

    // Wrapper around updateSelectedDrink that adds a timestamp
    const incrementDrinkRecord = (drinkData: Drink) => {
        const timeStamp = moment().toISOString();
        drinkData.addDrinkRecord(timeStamp, 1);
        updateSelectedDrink(drinkData.uuid, drinkData);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-4">
                {Object.values(userDrinkData).map((drinkData) => {
                    return (
                        <div
                            key={`drinkCard-${drinkData.uuid}`}
                            className="w-[200px] h-[300px] flex flex-col justify-between rounded-sm p-4 bg-gradient-to-r from-pastel-pink to-pastel-orange"
                        >
                            <div className="h-[20%]">
                                <p>{drinkData.name}</p>
                                <p>{drinkData.address}</p>
                            </div>
                            <div className="h-[60%]">
                                {drinkData.description}
                            </div>

                            {isEditable ? (
                                <div className="flex justify-end">
                                    {/* <Button
                                        onClick={() =>
                                            incrementDrinkRecord(drinkData)
                                        }
                                    >
                                        +
                                    </Button> */}
                                    <EditDrinkDialog
                                        drinkData={drinkData}
                                        editCallback={updateSelectedDrink}
                                    />
                                    <DeleteDrinkDialog
                                        drinkData={drinkData}
                                        deleteDrinkCallback={
                                            deleteSelectedDrink
                                        }
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className="bg-white text-xs bg-opacity-25 p-2">
                                <p>{drinkData.uuid}</p>
                            </div>
                        </div>
                    );
                })}
                {isEditable ? (
                    <AddDrinkDialog
                        baseDrinkData={createEmptyDrink()}
                        addDrinkCallback={addNewDrink}
                    />
                ) : (
                    <></>
                )}
                {/* <button onClick={addNewDrink}>Add drink</button> */}
            </div>
        </div>
    );
}

export default DrinkDisplay;
