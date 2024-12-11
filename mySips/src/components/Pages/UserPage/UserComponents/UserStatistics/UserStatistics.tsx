import { Drink } from "@/classes/Drink";
import { IMenu } from "@/interfaces/IMenu";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";

interface IUserStatisticsProps {
    userId: string;
    statistics: {
        drinkCount: boolean;
    };
}

function UserStatistics(props: IUserStatisticsProps) {
    const { userId } = props;
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

    return (
        <div className="flex gap-4">
            <div>
                <h1 className="pb-4 opacity-50   text-base">Drinks</h1>
                <p className="text-3xl  font-semibold">
                    {Object.values(userDrinkData).length}
                </p>
            </div>
            <div>
                <h1 className="pb-4 opacity-50 text-base">Groups</h1>
                <p className="text-3xl  font-semibold">3</p>
            </div>
        </div>
    );
}

export default UserStatistics;
