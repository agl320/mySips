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

import { v4 as uidv4 } from "uuid";
import DrinkEdit from "../DrinkApp/DrinkDisplay/DrinkEdit";
import EditDrinkDialog from "./EditDrinkDialog/EditDrinkDialog";
import AddDrinkDialog from "../DrinkForms/AddDrinkDialog";
import { Button } from "../ui/button";
import { Info, Share } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";

interface IDrinkDisplayProps {
    userId: string;
    isAdmin?: boolean;
    isEditable?: boolean;
    className?: string;
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
                        if (!drinkData.uid) return acc;
                        acc[drinkData.uid] = drinkData;
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
        // const uid = uidv4();
        const drinkDocRef = doc(
            userDocRef,
            "userDrinkData",
            newDrinkProperties.uid
        );
        const newDrinkObj = new Drink(newDrinkProperties);
        await setDoc(drinkDocRef, newDrinkObj.toFirestore());
    };

    const createEmptyDrink = (): Drink => {
        const newDrinkObj = new Drink({
            name: "New Drink",
            uid: uidv4(),
            description: "",
        });

        return newDrinkObj;
    };

    // updates existing drink
    const updateSelectedDrink = async (
        uid: string,
        updatedDrinkProperties: Drink
    ) => {
        // Creates new Drink object then invokes toFirestore()
        //  perhaps create custom helper so we don't need to create new Drink each edit
        const newDrinkObj = new Drink(updatedDrinkProperties);

        console.log({ newDrinkObj });

        const drinkDocRef = doc(userDocRef, "userDrinkData", uid);
        await updateDoc(drinkDocRef, newDrinkObj.toFirestore());
    };

    const deleteSelectedDrink = async (uid: string) => {
        await deleteDoc(doc(userDocRef, "userDrinkData", uid));
    };

    // Wrapper around updateSelectedDrink that adds a timestamp
    const incrementDrinkRecord = (drinkData: Drink) => {
        const timeStamp = moment().toISOString();
        drinkData.addDrinkRecord(timeStamp, 1);
        updateSelectedDrink(drinkData.uid, drinkData);
    };

    return (
        <div className={props.className}>
            <div className="flex flex-wrap gap-4">
                {Object.values(userDrinkData).map((drinkData) => {
                    return (
                        <div
                            key={`drink-card-${drinkData.uid}`}
                            className="w-[200px] h-[300px] flex flex-col justify-between rounded-md p-4 bg-gradient-to-r from-pastel-pink to-pastel-orange"
                        >
                            <div className="h-full ">
                                <h1 className="text-4xl font-semibold overflow-hidden">
                                    {drinkData.name}
                                </h1>
                                <p>{drinkData.address}</p>
                            </div>
                            {/* <div className="overflow-hidden whitespace-pre">
                                <p>{drinkData.description}</p>
                            </div> */}

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
                                    <Button className="h-4 w-4">
                                        <Info className="h-4 w-4" />
                                    </Button>
                                    <Button className="h-4 w-4">
                                        <Share className="h-4 w-4" />
                                    </Button>
                                    <ConfirmDialog
                                        callback={() =>
                                            deleteSelectedDrink(drinkData.uid)
                                        }
                                        title="Confirm Delete Drink"
                                        description={`Are you sure you want to remove ${drinkData.name} from
                    mySips?`}
                                        confirm="Delete Drink"
                                        cancel="Cancel"
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            {/* <div className="bg-white text-xs bg-opacity-25 p-2">
                                <p>{drinkData.uid}</p>
                            </div> */}
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
