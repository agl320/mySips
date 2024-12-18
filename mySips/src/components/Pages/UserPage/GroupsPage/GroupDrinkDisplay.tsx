import { useUseGroupDrinkData } from "@/components/Hooks/useUserGroupDrinkData";
import { User } from "firebase/auth";
import { useFirestore } from "reactfire";
import GroupItem from "./GroupItem";
import { useEffect, useState } from "react";
import { getAllGroupUids } from "@/firebase/DrinkHelpers";

function GroupDrinkDisplay(props: { user: User; groupUid: string }) {
    const { user, groupUid } = props;
    const firestore = useFirestore();
    const groupDrinkData = useUseGroupDrinkData(
        firestore,
        user?.uid ?? "",
        groupUid
    );
    console.log({ groupDrinkData });

    return (
        <div className="flex flex-wrap gap-4 mt-8">
            {Object.values(groupDrinkData).map((groupDrink: any, index) => (
                <GroupItem
                    user={user}
                    drinkUid={groupDrink.drinkUid}
                    key={index}
                />
            ))}
        </div>
    );
}

export default GroupDrinkDisplay;
