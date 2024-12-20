import { CommandItem } from "cmdk";
import { useEffect } from "react";

function CollaboratorCommandItem(props: { userData }) {
    const { pairUid, requesterUid, userAUid, userBUid } = props.userData;

    // Check if the drink is already in the group
    useEffect(() => {
        const checkIsUserInGroup = async () => {
            if (user?.uid && focusedGroup && drinkData.uid) {
                const result = await isDrinkInGroup(
                    user.uid,
                    focusedGroup,
                    drinkData.uid
                );
                setIsInGroup(result); // Update state based on the result
            }
        };

        checkIsUserInGroup();
    }, []);

    // Handle click to add/remove drink from the group
    const handleDrinkAction = async () => {
        try {
            if (isInGroup) {
                await removeGroupDrinkPair(
                    user?.uid ?? "",
                    focusedGroup,
                    drinkData.uid
                );
                console.log("Drink removed from group.");
            } else {
                await addDrinkToGroup(
                    user?.uid ?? "",
                    focusedGroup,
                    drinkData.uid
                );
                console.log("Drink added to group.");
            }
            setIsInGroup(!isInGroup); // Toggle the state
        } catch (error) {
            console.error("Error handling drink action:", error);
        }
    };

    return (
        <CommandItem
            className={`flex justify-between hover:bg-pastel-pink/25 rounded-sm cursor-pointer ${
                isInGroup ? "bg-pastel-pink/25" : ""
            }`}
            onClickCapture={handleDrinkAction}
        >
            <p>{drinkData.name}</p>
            <p>{drinkData.rating}</p>
        </CommandItem>
    );
}

export default CollaboratorCommandItem;
