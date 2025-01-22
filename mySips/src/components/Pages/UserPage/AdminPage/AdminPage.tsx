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
import { addDrinkToStore } from "@/firebase/StoreHelpers";
import StoreDrinkDisplay from "@/components/DrinkDisplay/StoreDrinkDisplay";

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
                            <div className="bg-black/25 inline-block p-4 rounded-md ">
                                <h2>{storeData.storeName}</h2>
                                <p>{storeData.storeAddress ?? "No address"}</p>
                                <Button
                                    className="bg-pastel-orange mt-4 "
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    Add drink to menu
                                </Button>
                                <AddDrinkDialog
                                    user={user}
                                    baseDrinkData={createEmptyDrink()}
                                    addDrinkCallback={addDrinkToStore}
                                    open={isDialogOpen}
                                    onOpenChange={setIsDialogOpen}
                                    storeUid={storeData.uid}
                                />
                                <StoreDrinkDisplay
                                    user={user}
                                    storeUid={storeData.uid}
                                    className="mt-8"
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
