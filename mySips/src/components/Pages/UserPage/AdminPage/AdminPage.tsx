import { doc, getFirestore } from "firebase/firestore";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import AdminDisplay from "./AdminDisplay";
import { getUserData } from "@/firebase/ConnectionHelpers";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import { useEffect, useState } from "react";
import firebaseConfig from "../../../../../../firebaseConfig";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import AddDrinkDialog from "@/components/DrinkForms/AddDrinkDialog";
import { createEmptyDrink } from "../../../../firebase/DrinkHelpers";
import { Button } from "@/components/ui/button";
import { useStoresData } from "@/hooks/useStoresData";

function AdminPage() {
    const firestore = useFirestore();

    const { status: statusUser, data: user } = useUser();
    const storesData = useStoresData(firestore);

    console.log(storesData);

    const [userData, setUserData] = useState<any>();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedUser = await getUserData(user?.uid ?? "");
            setUserData(fetchedUser);
        };

        fetchUserData();
    }, [user?.uid]);

    if (statusUser === "loading" || !userData) {
        return <CustomLoader />;
    }

    const addDrinkToMenu = async (storeUid) => {
        console.log(`Adding fixed drink ${storeUid}`);
    };

    if (user && userData.email === firebaseConfig.adminEmail) {
        return (
            <section className="m-8">
                <UserBlock className="space-y-8">
                    <p>Logged in admin user: {user?.uid}</p>
                </UserBlock>
                <UserBlock className="mt-4">
                    <h1>Menus</h1>
                    {storesData.map((storeData) => {
                        return (
                            <div>
                                <h2>{storeData.storeName}</h2>
                                <p>{storeData.storeAddress ?? "No address"}</p>
                                <Button
                                    className="bg-pastel-blue"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    Add drink to menu
                                </Button>
                                <AddDrinkDialog
                                    user={user}
                                    baseDrinkData={createEmptyDrink()}
                                    addDrinkCallback={() =>
                                        addDrinkToMenu(storeData.uid)
                                    }
                                    open={isDialogOpen}
                                    onOpenChange={setIsDialogOpen}
                                />
                            </div>
                        );
                    })}
                </UserBlock>
            </section>
        );
    } else {
        return (
            <section className="w-full h-full text-center flex flex-col justify-center">
                Permission Denied.
            </section>
        );
    }
}

export default AdminPage;
