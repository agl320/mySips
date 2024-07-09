import { useContext } from "react";
import { AuthContext } from ".";

export function useAuth() {
    return useContext(AuthContext);
}
