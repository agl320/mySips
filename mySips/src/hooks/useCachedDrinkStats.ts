import { useEffect, useState } from "react";
import _ from "lodash";
import { useDrinkStats } from "@/hooks/useDrinkStats";
import { User } from "firebase/auth";

interface UseCachedDrinkStatsProps {
    user: User;
    userUid: string;
    graphTypes: string[];
    userDrinkData: any;
}

export const useCachedDrinkStats = ({
    user,
    userUid,
    graphTypes,
    userDrinkData,
}: UseCachedDrinkStatsProps) => {
    const [cachedData, setCachedData] = useState<any>(null);

    const { data, isLoading, error, refetch } = useDrinkStats({
        user,
        userUid,
        graphTypes,
        userDrinkData,
    });

    useEffect(() => {
        if (data && !_.isEqual(data, cachedData)) {
            setCachedData(data);
        }
    }, [data, cachedData]);

    // Add delay before triggering fetch
    useEffect(() => {
        const delayFetch = setTimeout(() => {
            refetch();
        }, 2000);

        return () => clearTimeout(delayFetch);
    }, [userDrinkData, refetch]);

    return { cachedData, isLoading, error };
};
