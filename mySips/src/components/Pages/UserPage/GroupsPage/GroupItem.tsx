import { Drink } from "@/classes/Drink";
import DrinkItem from "@/components/DrinkApp/DrinkItem";
import DrinkCard from "@/components/DrinkDisplay/DrinkCard";
import { Button } from "@/components/ui/button";
import { getAllGroupUids, getDrink } from "@/firebase/DrinkHelpers";
import {
    removeGroupDrinkPair,
    removeGroupFromDrink,
} from "@/firebase/GroupHelpers";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

function GroupItem(props: {
    user: User;
    userUid: string;
    drinkUid: string;
    groupUid: string;
}) {
    const { user, userUid, drinkUid, groupUid } = props;
    console.log({ userUid, drinkUid, groupUid });

    const [drinkData, setDrinkData] = useState<any>(null);

    const [groupData, setGroupData] = useState<any>(null);

    useEffect(() => {
        const fetchDrinkData = async () => {
            try {
                const fetchedGroup = await getAllGroupUids(userUid, drinkUid);
                if (fetchedGroup) setGroupData(fetchedGroup);
            } catch (error) {
                console.error("Error fetching drink data:", error);
            }
        };

        fetchDrinkData();
    }, [userUid, drinkUid]);

    useEffect(() => {
        const fetchDrinkData = async () => {
            try {
                const fetchedDrink = await getDrink(userUid, drinkUid);
                if (fetchedDrink) setDrinkData(fetchedDrink.data());
            } catch (error) {
                console.error("Error fetching drink data:", error);
            }
        };

        fetchDrinkData();
    }, [userUid, drinkUid]);

    if (!drinkData) {
        return <></>;
    }
    return (
        <DrinkCard
            user={user}
            userUid={userUid}
            drinkData={drinkData}
            isEditable={false}
        />
    );
}

export default GroupItem;
