import {
    AuthProvider,
    DatabaseProvider,
    FirebaseAppProvider,
    useFirebaseApp,
    useSigninCheck,
    useUser,
} from "reactfire";
import { getAuth } from "firebase/auth";
import UserPageContent from "./UserPageContent";
import { getDatabase } from "firebase/database";
function UserPage() {
    const app = useFirebaseApp();

    const database = getDatabase(app);
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={database}>
                <UserPageContent />
            </DatabaseProvider>
        </AuthProvider>
    );
}

export default UserPage;
