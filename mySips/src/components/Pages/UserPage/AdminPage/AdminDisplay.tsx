import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import { getAuth } from "firebase/auth";
import { getDatabase, orderByChild } from "firebase/database";
import { collection, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    AuthProvider,
    DatabaseProvider,
    useDatabase,
    useFirebaseApp,
    useFirestore,
    useFirestoreCollectionData,
} from "reactfire";

interface IAdminDisplayProps {
    userUUID: string;
}

function AdminDisplay(props: IAdminDisplayProps) {
    const [loadedUsers, setLoadedUsers] = useState<any>();
    const { userUUID } = props;

    const app = useFirebaseApp();

    const database = getDatabase(app);

    const auth = getAuth(app);

    const db = useDatabase();

    const firestore = useFirestore();

    const usersCollection = collection(firestore, "users");
    const usersQuery = query(usersCollection);

    const { status, data: users } = useFirestoreCollectionData(usersQuery, {
        idField: "uuid",
    });

    // if (status) console.log({ users });

    useEffect(() => {
        setLoadedUsers(users);
        console.log(`New users:`);
        console.log({ users });
    }, [users]);

    return (
        <div>
            <h1>{loadedUsers?.length ?? 0}</h1>
            {loadedUsers?.map((user) => {
                return <DrinkDisplay userDrinkData={user.userDrinkData} />;
            })}
        </div>
    );
}

export default AdminDisplay;
