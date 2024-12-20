import { doc, getFirestore } from "firebase/firestore";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import AdminDisplay from "./AdminDisplay";
import { getUserData } from "@/firebase/ConnectionHelpers";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import { useEffect, useState } from "react";
import firebaseConfig from "../../../../../../firebaseConfig";

function AdminPage() {
    const { status: statusUser, data: user } = useUser();
    const [userData, setUserData] = useState<any>();

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

    if (userData.email === firebaseConfig.adminEmail) {
        return (
            <section>
                <p>Logged in user: {user?.uid}</p>
                <AdminDisplay userUUID={user?.uid ?? ""} />
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
