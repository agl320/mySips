import {
    AuthProvider,
    FirebaseAppProvider,
    useFirebaseApp,
    useSigninCheck,
    useUser,
} from "reactfire";
import { getAuth } from "firebase/auth";
import RegisterPageContent from "./RegisterPageContent";
function RegisterPage() {
    const app = useFirebaseApp();
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            <RegisterPageContent />
        </AuthProvider>
    );
}

export default RegisterPage;
