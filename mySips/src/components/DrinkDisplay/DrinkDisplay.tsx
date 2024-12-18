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
import { useUserDrinkData } from "../Hooks/useUserDrinkData";
import DrinkCard from "./DrinkCard";

interface IDrinkDisplayProps {
    user: User;
    userId: string;
    isAdmin?: boolean;
    isEditable?: boolean;
    className?: string;
    filterByGroupUid?: string;
}
function DrinkDisplay(props: IDrinkDisplayProps) {
    const {
        user,
        userId,
        isAdmin,
        isEditable = false,
        filterByGroupUid,
    } = props;

    const firestore = useFirestore();

    const userDrinkData = useUserDrinkData(firestore, user?.uid);

    return (
        <div className={props.className}>
            <div className="flex flex-wrap gap-4">
                {Object.values(userDrinkData).map((drinkData) => {
                    return (
                        <DrinkCard
                            user={user}
                            drinkData={drinkData}
                            isEditable={isEditable}
                        />
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
