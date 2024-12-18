import { Drink } from "@/classes/Drink";
import DrinkItem from "@/components/DrinkApp/DrinkItem";
import DrinkCard from "@/components/DrinkDisplay/DrinkCard";
import { getAllGroupUids, getDrink } from "@/firebase/DrinkHelpers";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

function GroupItem(props: { user: User; drinkUid: string }) {
    const { user, drinkUid } = props;

    const [drinkData, setDrinkData] = useState<any>(null);

    const [groupData, setGroupData] = useState<any>(null);

    useEffect(() => {
        const fetchDrinkData = async () => {
            try {
                const fetchedGroup = await getAllGroupUids(
                    user?.uid ?? "",
                    drinkUid
                );
                if (fetchedGroup) setGroupData(fetchedGroup);
            } catch (error) {
                console.error("Error fetching drink data:", error);
            }
        };

        fetchDrinkData();
    }, [user?.uid, drinkUid]);

    useEffect(() => {
        const fetchDrinkData = async () => {
            try {
                const fetchedDrink = await getDrink(user?.uid ?? "", drinkUid);
                if (fetchedDrink) setDrinkData(fetchedDrink.data());
            } catch (error) {
                console.error("Error fetching drink data:", error);
            }
        };

        fetchDrinkData();
    }, [user?.uid, drinkUid]);

    if (!drinkData) {
        return <></>;
    }
    return <DrinkCard user={user} drinkData={drinkData} isEditable={false} />;
}

export default GroupItem;
