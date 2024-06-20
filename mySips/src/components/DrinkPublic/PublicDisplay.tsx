import React, { useEffect, useState } from "react";
import DrinkDisplay from "../DrinkApp/DrinkDisplay";
import { collection, doc, Firestore, onSnapshot } from "firebase/firestore";
import { IDrink } from "../DrinkApp/IDrink";
import { isEqual } from "lodash";

interface IPublicDisplayProps {
    firebaseDB: Firestore;
    userId: string;
    setDrinksState: React.Dispatch<React.SetStateAction<IDrink[]>>;
    drinksState: IDrink[];
}

function PublicDisplay(props: IPublicDisplayProps) {
    const { firebaseDB, userId, setDrinksState, drinksState } = props;
    const [publicDrinks, setPublicDrinks] = useState<
        Record<string, { userDrinkData: IDrink[] }>
    >({});

    const unsubscribeAll = onSnapshot(
        collection(firebaseDB, "users"),
        (querySnapshot) => {
            if (querySnapshot) {
                const newPublicDrinks = {};
                querySnapshot.forEach((doc) => {
                    newPublicDrinks[doc.id] = doc.data();
                });
                if (!isEqual(newPublicDrinks, publicDrinks)) {
                    setPublicDrinks(newPublicDrinks);
                }
            }
        }
    );

    // Detects updates if account logged in from multiple places
    // const unsubscribeUser = onSnapshot(
    //     doc(firebaseDB, "users", userId),
    //     (doc) => {
    //         if (!isEqual(doc.data().userDrinkData, drinksState)) {
    //             setDrinksState(doc.data().userDrinkData);
    //         }
    //     },
    //     (error) => {
    //         console.log(error);
    //     }
    // );

    useEffect(() => {
        console.log({ publicDrinks });
    }, [publicDrinks]);

    return (
        <div>
            {Object.entries(publicDrinks).map(
                ([publicUserId, publicDrinkState], index) => {
                    return (
                        <React.Fragment key={index}>
                            --{publicUserId}--
                            <DrinkDisplay
                                drinksState={publicDrinkState.userDrinkData}
                                setDrinksState={setDrinksState}
                            />
                        </React.Fragment>
                    );
                }
            )}
        </div>
    );
}

export default PublicDisplay;
