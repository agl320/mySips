import { doc, getFirestore } from "firebase/firestore";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import AdminDisplay from "./AdminDisplay";

function AdminPage() {
    const { status: statusUser, data: user } = useUser();
    // const firestore = useFirestore();

    if (statusUser === "loading") {
        return <span>Loading...</span>;
    }

    // const ref = doc(firestore, "users", user?.uid);
    // const { status: statusData, data: userData } = useFirestoreDocData(ref);

    // if (statusData === "loading") {
    //     return <span>Loading...</span>;
    // }

    // console.log(userData);

    return (
        <div>
            <p>{user?.uid}</p>
            <AdminDisplay userUUID={user?.uid ?? ""} />
        </div>
    );
}

export default AdminPage;
