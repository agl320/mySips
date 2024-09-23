import { getAuth } from "firebase/auth";
import { getDatabase, orderByChild } from "firebase/database";
import { collection, getFirestore, query } from "firebase/firestore";
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

    if (status) console.log({ users });

    return <p>hi</p>;
}

export default AdminDisplay;
