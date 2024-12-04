import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import { getAuth } from "firebase/auth";
import { getDatabase, orderByChild } from "firebase/database";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    AuthProvider,
    DatabaseProvider,
    useDatabase,
    useFirebaseApp,
    useFirestore,
    useFirestoreCollectionData,
    useUser,
} from "reactfire";

interface IAdminDisplayProps {
    userUUID: string;
}

function AdminDisplay(props: IAdminDisplayProps) {
    const [loadedUsers, setLoadedUsers] = useState<any>();
    const { userUUID } = props;

    const app = useFirebaseApp();

    const database = getDatabase(app);

    const auth = getAuth(app);

    const db = useDatabase();

    const firestore = useFirestore();
    const usersCollection = collection(firestore, "users");
    const usersQuery = query(usersCollection);

    const { status: statusUser, data: user } = useUser();

    const { status, data: users } = useFirestoreCollectionData(usersQuery, {
        idField: "uid",
    });

    useEffect(() => {
        setLoadedUsers(users);
        console.log(`New users:`);
        console.log({ users });
    }, [users]);

    if (statusUser === "loading") {
        return <span>Loading...</span>;
    }

    // doc reference
    const currUserDocRef = doc(firestore, "users", user?.uid);
    console.log(user?.uid);
    // collection reference
    const currUserDrinkDataCollectionRef = collection(
        currUserDocRef,
        "userDrinkData"
    );

    // ADD USER
    // const doAddUser = async () => {
    //     const docRef = await addDoc(collection(firestore, "users"), {
    //         name: "test",
    //     });
    //     console.log(docRef);
    // };

    const doAddDrink = async () => {
        const docRef = await addDoc(currUserDrinkDataCollectionRef, {
            test: "test",
        });
        console.log(docRef);
    };

    const debug = async () => {
        const docSnap = await getDoc(currUserDocRef);
        if (docSnap.exists()) {
            console.log(docSnap.data());
        } else {
            console.log("Does not exist");
        }
        const querySnapshot = await getDocs(currUserDrinkDataCollectionRef);
        console.log(querySnapshot);
    };

    return (
        <div>
            <h1>{loadedUsers?.length ?? 0}</h1>
            {loadedUsers?.map((user) => {
                return (
                    <DrinkDisplay
                        key={`DrinkDisplay-${user.uid}`}
                        userDrinkData={user.userDrinkData}
                    />
                );
            })}
            <button onClick={doAddDrink}>Test</button>
            <button onClick={debug}>DEBUG </button>
        </div>
    );
}

export default AdminDisplay;
