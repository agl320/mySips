import { CommandItem } from "@/components/ui/command";
import {
    addDrinkToGroup,
    removeGroupDrinkPair,
    isDrinkInGroup,
} from "@/firebase/GroupHelpers";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

interface CustomCommandItemProps {
    user: { uid: string } | null; // Type user with uid or null
    focusedGroup: string;
    drinkData: { uid: string; name: string; rating: number }; // Type for drink data
}

function CustomCommandItem({
    user,
    focusedGroup,
    drinkData,
}: CustomCommandItemProps) {
    const [isInGroup, setIsInGroup] = useState<boolean>(false);

    // Check if the drink is already in the group
    useEffect(() => {
        const checkIsDrinkInGroup = async () => {
            if (user?.uid && focusedGroup && drinkData.uid) {
                const result = await isDrinkInGroup(
                    user.uid,
                    focusedGroup,
                    drinkData.uid
                );
                setIsInGroup(result); // Update state based on the result
            }
        };

        checkIsDrinkInGroup();
    }, [drinkData.uid, focusedGroup, user?.uid]);

    // Handle click to add/remove drink from the group
    const handleDrinkAction = async () => {
        try {
            if (isInGroup) {
                await removeGroupDrinkPair(
                    user?.uid ?? "",
                    focusedGroup,
                    drinkData.uid
                );
            } else {
                await addDrinkToGroup(
                    user?.uid ?? "",
                    focusedGroup,
                    drinkData.uid
                );
            }
            setIsInGroup(!isInGroup); // Toggle the state
        } catch (error) {
            console.error("Error handling drink action:", error);
        }
    };

    return (
        <CommandItem
            className={`mt-1 flex justify-between hover:bg-gradient-to-r hover:from-pastel-pink/50 hover:to-pastel-orange/50 rounded-md cursor-pointer ${
                isInGroup
                    ? "bg-gradient-to-r from-pastel-pink/50 to-pastel-orange/50"
                    : ""
            }`}
            onClickCapture={handleDrinkAction}
        >
            <p>{drinkData.name}</p>
            <p>{drinkData.rating}</p>
        </CommandItem>
    );
}

export default CustomCommandItem;
