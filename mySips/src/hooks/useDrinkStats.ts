import { useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";

const fetchDrinkStats = async (
    user: User,
    userUid: string,
    graphTypes: string[]
) => {
    const queryString = graphTypes
        .map((type) => `graphTypes=${type}`)
        .join("&");

    const idToken = await user.getIdToken();
    const response = await fetch(
        `http://127.0.0.1:5000/api/user-drink-data/stats?userUid=${userUid}&${queryString}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${idToken}`, // Add Bearer token here
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch drink stats");
    }

    return response.json();
};

interface UseDrinkStatsProps {
    user: User;
    userUid: string;
    graphTypes: string[];
    userDrinkData: any; // Dependency for refetching
}

export const useDrinkStats = ({
    user,
    userUid,
    graphTypes,
    userDrinkData,
}: UseDrinkStatsProps) => {
    const userDrinkDataChecksum = JSON.stringify(
        userDrinkData,
        Object.keys(userDrinkData).sort() // Ensure consistent key order
    );

    return useQuery({
        // Include userDrinkData in cache key
        queryKey: ["drinkStats", userUid, graphTypes, userDrinkDataChecksum],
        queryFn: () => fetchDrinkStats(user, userUid, graphTypes),
        // Fetch only if valid parameters
        enabled: !!userUid && graphTypes.length > 0,
        // Cache data for 5 minutes
        staleTime: 1000 * 60 * 5,
        // Optional: Avoid unnecessary refetching on focus
        refetchOnWindowFocus: false,
    });
};
