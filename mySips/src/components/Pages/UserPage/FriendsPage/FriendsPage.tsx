import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import {
    doesConnectionExist,
    userRemoveConnection,
    userSetConnection,
} from "@/firebase/ConnectionHelpers";
import { ConnectionStatus } from "@/classes/Connection";
import { useFirestore } from "reactfire";
import _ from "lodash";
import UserPageHeader from "../UserPageHeader/UserPageHeader";
import { Button } from "@/components/ui/button";
import { User, UserRoundSearch } from "lucide-react";

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

    const getButtonComponent = (userData: any) => {
        if (userData.connection?.status === ConnectionStatus.Pending) {
            return (
                <Button
                    onClick={() => userRemoveConnection(user.uid, userData.uid)}
                    className="bg-pastel-orange bg-opacity-30 rounded-sm mr-2 h-full w-full text-base text-pastel-orange"
                >
                    Pending...
                </Button>
            );
        } else if (userData.connection?.status === ConnectionStatus.Friend) {
            return (
                <Button
                    onClick={() => userRemoveConnection(user.uid, userData.uid)}
                    className="bg-gradient-to-r from-pastel-pink to-pastel-orange rounded-sm mr-2 h-full w-full text-base"
                >
                    Remove Friend
                </Button>
            );
        }
        return (
            <Button
                onClick={() =>
                    userSetConnection(
                        ConnectionStatus.Pending,
                        user.uid,
                        userData.uid
                    )
                }
                className="bg-gradient-to-r from-pastel-pink to-pastel-orange rounded-sm mr-2 h-full w-full text-base"
            >
                Send Request
            </Button>
        );
    };

    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-black via-[#001237] via-[#002226] to-[#003760]">
            <UserBlock>
                <UserPageHeader
                    pageTitle="Friends"
                    linkTrail={[{ value: "Social" }, { value: "Friends" }]}
                />
            </UserBlock>

            <div className="flex gap-x-4 mt-8">
                {Object.values(userConnections).map((userData: any, index) => {
                    if (user?.uid !== userData.uid) {
                        return (
                            <div
                                key={`user-${index}`}
                                className="h-[300px] p-2 rounded-sm bg-white space-y-4 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-full h-[80px] bg-pastel-orange bg-opacity-50"></div>
                                    <div className="mt-[-60px] rounded-sm w-[100px] aspect-square bg-pastel-orange mx-auto border-4 border-white mb-2"></div>
                                    <h2 className="text-4xl font-semibold text-black text-center">
                                        {userData.name}
                                    </h2>
                                </div>
                                <div className="flex">
                                    {getButtonComponent(userData)}
                                    <Button className="h-full  aspect-square bg-gradient-to-r from-pastel-pink to-pastel-orange bg-opacity-30 rounded-sm">
                                        <UserRoundSearch
                                            // stroke="#ff844b"
                                            strokeWidth={3}
                                        />
                                    </Button>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default FriendsPage;
