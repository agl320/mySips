import CustomLoader from "@/components/CustomLoader/CustomLoader";
import ConfirmDialog from "@/components/DrinkDisplay/ConfirmDialog/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { getUserData } from "@/firebase/ConnectionHelpers";
import {
    allowGroupAccess,
    revokeGroupAccess,
    isUserInGroup,
} from "@/firebase/GroupHelpers";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface CustomCommandItemProps {
    user: { uid: string } | null; // Type user with uid or null
    focusedGroup: string;
    userData: { pairUid: string; userAUid: string; userBUid: string }; // Type for user data
}

function ConnectionCommandItem({
    user,
    focusedGroup,
    userData,
}: CustomCommandItemProps) {
    const [isInGroup, setIsInGroup] = useState<boolean>(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false); // Dialog visibility state
    const [connectionData, setConnectionData] = useState<any>(false);

    const friendUid =
        userData.userAUid === user?.uid ? userData.userBUid : userData.userAUid;

    useEffect(() => {
        const fetchUserData = async () => {
            if (friendUid && focusedGroup && userData) {
                const result = await getUserData(friendUid);
                setConnectionData(result); // Update state based on the result
            }
        };

        fetchUserData();
    }, [focusedGroup, friendUid, user?.uid, userData]);

    // Check if the user is already in the group
    useEffect(() => {
        const checkIsUserInGroup = async () => {
            if (friendUid && focusedGroup && userData) {
                const result = await isUserInGroup(friendUid, focusedGroup);
                setIsInGroup(result); // Update state based on the result
            }
        };

        checkIsUserInGroup();
    }, [focusedGroup, friendUid, user?.uid, userData]);

    // Handle confirmation of revoke action
    const confirmRevokeAction = async () => {
        try {
            await revokeGroupAccess(friendUid, focusedGroup);
            setIsInGroup(false); // Update state after revocation
        } catch (error) {
            console.error("Error revoking access:", error);
        } finally {
            setShowConfirmDialog(false); // Close the dialog
        }
    };

    // Handle main click action
    const handleDrinkAction = async () => {
        if (isInGroup) {
            setShowConfirmDialog(true); // Show confirmation dialog for revocation
        } else {
            try {
                await allowGroupAccess(friendUid, focusedGroup);
                setIsInGroup(true); // Update state after allowing access
            } catch (error) {
                console.error("Error allowing group access:", error);
            }
        }
    };

    return (
        <>
            <CommandItem
                className={`mt-1 flex justify-between hover:bg-gradient-to-r hover:from-pastel-pink/50 hover:to-pastel-orange/50 rounded-md cursor-pointer ${
                    isInGroup
                        ? "bg-gradient-to-r from-pastel-pink to-pastel-orange text-white font-medium"
                        : ""
                }`}
                onClickCapture={handleDrinkAction}
            >
                <p>{connectionData.name}</p>
                {showConfirmDialog && (
                    <ConfirmDialog
                        title="Revoke Access Warning"
                        description={`Revoking access will remove all their drinks from the group.`}
                        confirm="Yes, Revoke"
                        cancel="Cancel"
                        callback={confirmRevokeAction} // Execute revoke on confirm
                        customTrigger={
                            <Button className="w-4 h-4">
                                <X></X>
                            </Button>
                        }
                    />
                )}
            </CommandItem>
        </>
    );
}

export default ConnectionCommandItem;
