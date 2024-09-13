import {
    AuthProvider,
    FirebaseAppProvider,
    useFirebaseApp,
    useSigninCheck,
    useUser,
} from "reactfire";
import { getAuth } from "firebase/auth";
import UserPageContent from "./UserPageContent";
function UserPage() {
    const app = useFirebaseApp();
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            <UserPageContent />
        </AuthProvider>
    );
}

export default UserPage;
