import React, { useEffect, useState } from "react";
import DrinkDisplay from "../DrinkApp/DrinkDisplay";
import { collection, Firestore, onSnapshot } from "firebase/firestore";
import { isEqual } from "lodash";
import { IMenu } from "../../interfaces/IMenu";

interface IPublicDisplayProps {
    firebaseDB: Firestore;
}

function PublicDisplay(props: IPublicDisplayProps) {
    const { firebaseDB } = props;
    const [publicDrinks, setPublicDrinks] = useState<
        Record<string, { userDrinkData: IMenu }>
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

    useEffect(() => {
        console.log({ publicDrinks });
    }, [publicDrinks]);

    return (
        <div>
            <p>Social</p>
            {Object.entries(publicDrinks).map(
                ([publicUserId, publicDrinkState], index) => {
                    return (
                        <React.Fragment key={index}>
                            --{publicUserId}--
                            <DrinkDisplay
                                drinksState={publicDrinkState.userDrinkData}
                            />
                        </React.Fragment>
                    );
                }
            )}
        </div>
    );
}

export default PublicDisplay;
