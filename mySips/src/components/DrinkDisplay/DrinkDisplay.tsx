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
import { Info, Share, Star } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";
import { Separator } from "../ui/separator";
import {
    createDrink,
    createEmptyDrink,
    deleteDrink,
    updateDrink,
} from "@/firebase/DrinkHelpers";
import { User } from "firebase/auth";
import { useUserDrinkData } from "../Hooks/useUserDinkData";

interface IDrinkDisplayProps {
    user: User;
    userId: string;
    isAdmin?: boolean;
    isEditable?: boolean;
    className?: string;
}
function DrinkDisplay(props: IDrinkDisplayProps) {
    const { user, userId, isAdmin, isEditable = false } = props;

    const firestore = useFirestore();

    const userDrinkData = useUserDrinkData(firestore, user?.uid);

    // Wrapper around updateSelectedDrink that adds a timestamp
    // const incrementDrinkRecord = (drinkData: Drink) => {
    //     const timeStamp = moment().toISOString();
    //     drinkData.addDrinkRecord(timeStamp, 1);
    //     updateSelectedDrink(drinkData.uid, drinkData);
    // };

    return (
        <div className={props.className}>
            <div className="flex flex-wrap gap-4">
                {Object.values(userDrinkData).map((drinkData) => {
                    return (
                        <div
                            className={`flex ${
                                drinkData?.rating === 10
                                    ? "bg-gradient-to-r from-pastel-orange to-orange"
                                    : "bg-gradient-to-r from-pastel-pink to-pastel-orange"
                            } rounded-md`}
                        >
                            <div
                                key={`drink-card-${drinkData.uid}`}
                                className="w-[170px] h-[300px] flex flex-col justify-between  p-4 "
                            >
                                {/* <div className="relative absolute top-0">
                                <h2 className="text-[300px] font-semibold -rotate-12 opacity-25 overflow-hidden">
                                    5
                                </h2>
                            </div> */}

                                <div className="h-full flex flex-col justify-between">
                                    <h1 className="text-4xl font-semibold overflow-hidden line-clamp-4">
                                        {drinkData.name}
                                    </h1>
                                    <div className="text-left opacity-75">
                                        <p className="">
                                            {drinkData.store?.storeAddress}
                                        </p>
                                        <p className="font-medium">
                                            {drinkData.store.storeName}
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="overflow-hidden whitespace-pre">
                                <p>{drinkData.description}</p>
                            </div> */}

                                {isEditable ? (
                                    <div className="mt-4">
                                        <Separator className="w-full bg-white mb-4 bg-opacity-50" />
                                        <div className="flex justify-begin ">
                                            {/* <Button
                                        onClick={() =>
                                            incrementDrinkRecord(drinkData)
                                        }
                                    >
                                        +
                                    </Button> */}
                                            <EditDrinkDialog
                                                user={user}
                                                drinkData={drinkData}
                                                editCallback={updateDrink}
                                            />
                                            <Button className="h-4 w-4">
                                                <Info className="h-4 w-4" />
                                            </Button>
                                            <Button className="h-4 w-4">
                                                <Share className="h-4 w-4" />
                                            </Button>
                                            <ConfirmDialog
                                                callback={() =>
                                                    deleteDrink(
                                                        userId,
                                                        drinkData.uid
                                                    )
                                                }
                                                title="Confirm Delete Drink"
                                                description={`Are you sure you want to remove ${drinkData.name} from
                    mySips?`}
                                                confirm="Delete Drink"
                                                cancel="Cancel"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {/* <div className="bg-white text-xs bg-opacity-25 p-2">
                                <p>{drinkData.uid}</p>
                            </div> */}
                            </div>
                            <div className="bg-white bg-opacity-25 w-[60px] h-full rounded-md flex items-center justify-center overflow-hidden">
                                {drinkData?.rating === 10 ? (
                                    <div className="relative">
                                        <Star
                                            className="stroke-white opacity-50 -rotate-12 w-[100px] h-[100px]"
                                            fill="white"
                                        ></Star>
                                    </div>
                                ) : (
                                    <p className="text-white/50 text-[200px] font-bold -rotate-12">
                                        {drinkData?.rating ?? 5}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
                {isEditable ? (
                    <AddDrinkDialog
                        user={user}
                        baseDrinkData={createEmptyDrink()}
                        addDrinkCallback={createDrink}
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
