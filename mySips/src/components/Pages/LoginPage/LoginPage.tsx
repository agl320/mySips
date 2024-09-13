import {
    AuthProvider,
    FirebaseAppProvider,
    useFirebaseApp,
    useSigninCheck,
    useUser,
} from "reactfire";
import { getAuth } from "firebase/auth";
import LoginPageContent from "./LoginPageContent";
function LoginPage() {
    const app = useFirebaseApp();
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            <LoginPageContent />
        </AuthProvider>
    );
}

export default LoginPage;
