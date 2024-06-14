import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

function Authentication() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  // Observer for auth; will update upon authentication state change
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(`${uid} is logged in.`);
    } else {
      console.log("No one logged in.");
    }
  });

  const onClickSignIn = async () => {
    try {
      signInWithPopup(auth, provider);
      const result = await getRedirectResult(auth);
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;
      if (result) {
        const user = result.user;
        console.log({ user });
      } else {
        console.log("No result from redirect.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSignOut = () => {
    console.log("User signed out.");
    auth.signOut();
  };

  return (
    <div>
      <button onClick={onClickSignIn}>Sign in</button>
      <button onClick={onClickSignOut}>Sign out</button>
    </div>
  );
}

export default Authentication;
