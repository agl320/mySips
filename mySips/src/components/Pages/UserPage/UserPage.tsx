import {
    AuthProvider,
    DatabaseProvider,
    FirestoreProvider,
    useFirebaseApp,
} from "reactfire";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import UserPageContent from "./UserPageContent";
import { PageTypes } from "@/enums/PageTypes";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function UserPage(props: { selectedPage: PageTypes }) {
    const { selectedPage } = props;

    // Initialize Firebase app and SDKs
    const app = useFirebaseApp();
    const database = getDatabase(app);
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    return (
        // Provide Firebase context for authentication, database, and Firestore
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={database}>
                <FirestoreProvider sdk={firestore}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <UserPageContent selectedPage={selectedPage} />
                    </LocalizationProvider>
                </FirestoreProvider>
            </DatabaseProvider>
        </AuthProvider>
    );
}

export default UserPage;
