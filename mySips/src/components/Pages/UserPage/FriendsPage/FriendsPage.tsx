import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import {
    doesConnectionExist,
    userSetConnection,
} from "@/firebase/ConnectionHelpers";
import { ConnectionStatus } from "@/classes/Connection";
import { useFirestore } from "reactfire";
import _ from "lodash";

const FriendsPage = ({ user }) => {
    const [userConnections, setUserConnections] = useState<any>({});
    const firestore = useFirestore();

    useEffect(() => {
        const usersCollectionRef = collection(firestore, "users");
        const unsubscribeUsers = onSnapshot(
            usersCollectionRef,
            (querySnapshot) => {
                // Fetch users
                const fetchedUsers = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    uid: doc.id,
                }));

                // Fetch connections with real-time updates
                const connectionUnsubscribes = fetchedUsers.map((userData) => {
                    if (user?.uid !== userData.uid) {
                        return doesConnectionExist(
                            user?.uid ?? "",
                            userData.uid,
                            // callback in this case will update local connection data
                            (connectionData: {
                                connectionExists: true;
                                connection: ConnectionStatus;
                            }) => {
                                const pairUid = [user?.uid, userData.uid]
                                    .sort()
                                    .join("_");

                                const userConnectionItem = {
                                    ...connectionData,
                                    ...userData,
                                };
                                setUserConnections((prevUserConnections) => {
                                    return {
                                        ...prevUserConnections,
                                        [pairUid]: userConnectionItem,
                                    };
                                });
                            }
                        );
                    }
                    return null;
                });

                // Clean up listeners when component unmounts
                return () =>
                    connectionUnsubscribes.forEach((unsubscribe) => {
                        if (unsubscribe) unsubscribe();
                    });
            },
            (error) => {
                console.error("Error fetching users:", error.message);
            }
        );

        // Clean up user listener
        return () => unsubscribeUsers();
    }, [firestore, user?.uid]);

    useEffect(() => {
        console.log(userConnections);
    }, [userConnections]);

    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-black via-[#001237] via-[#002226] to-[#003760]">
            <UserBlock>
                <h1>Friends</h1>
                <div className="flex">
                    {Object.values(userConnections).map(
                        (userData: any, index) => {
                            if (user?.uid !== userData.uid) {
                                return (
                                    <div key={`user-${index}`}>
                                        <h2>{userData.name}</h2>
                                        <p>{userData.connection?.status}</p>
                                        <button
                                            onClick={() =>
                                                userSetConnection(
                                                    ConnectionStatus.Friend,
                                                    user.uid,
                                                    userData.uid
                                                )
                                            }
                                        >
                                            Add friend
                                        </button>
                                    </div>
                                );
                            }
                        }
                    )}
                </div>
            </UserBlock>
        </div>
    );
};

export default FriendsPage;
