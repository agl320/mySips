import { Connection, ConnectionStatus } from "@/classes/Connection";
import { userSetConnection } from "@/firebase/ConnectionHelpers";
import { User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { useFirestore } from "reactfire";

interface IFriendsProps {
    user: User | null;
}

function FriendsPage(props: IFriendsProps) {
    const { user } = props;
    return (
        <div>
            <h1>Friends</h1>
            {user?.uid ? (
                <button
                    onClick={() =>
                        userSetConnection(
                            ConnectionStatus.Pending,
                            "esFiGtwRNHaFQkOWHrZIc0eu5Mh2",
                            "syLiFLFG2fhFWpa6V0KcBmHkps43"
                        )
                    }
                >
                    Add friend
                </button>
            ) : (
                <></>
            )}
        </div>
    );
}

export default FriendsPage;
