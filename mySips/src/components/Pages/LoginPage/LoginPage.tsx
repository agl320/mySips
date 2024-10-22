import {
    AuthProvider,
    DatabaseProvider,
    FirebaseAppProvider,
    FirestoreProvider,
    useFirebaseApp,
    useSigninCheck,
    useUser,
} from "reactfire";
import { getAuth } from "firebase/auth";
import LoginPageContent from "./LoginPageContent";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
function LoginPage() {
    const app = useFirebaseApp();
    const auth = getAuth(app);

    const database = getDatabase(app);

    const firestore = getFirestore(app);

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={database}>
                <FirestoreProvider sdk={firestore}>
                    <LoginPageContent />
                </FirestoreProvider>
            </DatabaseProvider>
        </AuthProvider>
    );
}

export default LoginPage;
