import {
    AuthProvider,
    DatabaseProvider,
    FirebaseAppProvider,
    FirestoreProvider,
    useFirebaseApp,
    useFirestore,
    useSigninCheck,
    useUser,
} from "reactfire";
import { getAuth } from "firebase/auth";
import UserPageContent from "./UserPageContent";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import { PageTypes } from "@/enums/PageTypes";
function UserPage(props: { selectedPage: PageTypes }) {
    const { selectedPage } = props;
    // const [selectedPage, setSelectedPage] = useState<PageTypes>(
    //     PageTypes.OVERVIEW
    // );

    const app = useFirebaseApp();

    const database = getDatabase(app);
    const auth = getAuth(app);

    const firestore = getFirestore(app);

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={database}>
                <FirestoreProvider sdk={firestore}>
                    <UserPageContent selectedPage={selectedPage} />
                </FirestoreProvider>
            </DatabaseProvider>
        </AuthProvider>
    );
}

export default UserPage;
