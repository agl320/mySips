import { doSignOut } from "@/firebase/Auth";
import { Button } from "../ui/button";
import { Link } from "lucide-react";

function UserNav() {
    return (
        <div className="flex">
            <Link>Home</Link>
            <Button onClick={() => doSignOut()}>Sign Out</Button>
        </div>
    );
}

export default UserNav;
