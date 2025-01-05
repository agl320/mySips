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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function UserPage(props: { selectedPage: PageTypes }) {
    const { selectedPage } = props;

    // Initialize Firebase app and SDKs
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    const queryClient = new QueryClient();

    return (
        // Provide Firebase context for authentication, database, and Firestore
        <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestore}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <QueryClientProvider client={queryClient}>
                        <UserPageContent selectedPage={selectedPage} />
                    </QueryClientProvider>
                </LocalizationProvider>
            </FirestoreProvider>
        </AuthProvider>
    );
}

export default UserPage;
