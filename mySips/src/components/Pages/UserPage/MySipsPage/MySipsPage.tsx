import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import { useFirestore, useUser } from "reactfire";
import UserPageHeader from "../UserPageHeader/UserPageHeader";
import UserStatistics from "../UserComponents/UserStatistics/UserStatistics";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useUserDrinkData } from "@/hooks/useUserDrinkData";
import { useUserGroups } from "@/hooks/useUserGroup";
import { Separator } from "@/components/ui/separator";
import { ArrowDownWideNarrow, ListFilter } from "lucide-react";
import UserGraphScatter from "../UserComponents/UserStatistics/UserGraphScatter";
import { useDrinkStats } from "@/hooks/useDrinkStats";
import UserGraphWrapper from "../UserComponents/UserStatistics/UserGraphWrapper";
import { useEffect, useState } from "react";
import _ from "lodash";

interface IUserProps {
    user: User;
}

function MySipsPage(props: IUserProps) {
    const { user } = props;

    const [cachedData, setCachedData] = useState<any>(null);
    const firestore = useFirestore();

    const userDrinkData = useUserDrinkData(firestore, user.uid);
    const userGroups = useUserGroups(firestore, user?.uid ?? "");

    const { data, isLoading, error, refetch } = useDrinkStats({
        user,
        userUid: user.uid,
        graphTypes: ["sugar_vs_ice"], // Request only this graph type
        userDrinkData, // Pass as a dependency
    });

    useEffect(() => {
        if (data != undefined && _.isEqual(data, cachedData) == false) {
            setCachedData(data);
        }
    }, [data, cachedData]);

    // Add delay before triggering fetch
    useEffect(() => {
        const delayFetch = setTimeout(() => {
            refetch(); // Trigger query refetch after 2 seconds
        }, 2000);

        return () => clearTimeout(delayFetch); // Clean up timeout
    }, [userDrinkData, refetch]); // Trigger on userDrinkData changes

    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-background-dark to-[#1c1a10] via-[#1c1015]">
            <div className="flex space-x-4 max-h-72">
                <UserBlock>
                    <UserPageHeader
                        pageTitle="mySips"
                        linkTrail={[{ value: "Home" }, { value: "mySips" }]}
                        pageCaption="All your drinks, stored in one place."
                    />
                </UserBlock>
                <UserBlock className="flex">
                    <UserStatistics
                        userId={user?.uid ?? ""}
                        name="Drinks"
                        value={String(Object.keys(userDrinkData).length)}
                    />
                    <Separator
                        orientation="vertical"
                        className="bg-white/15 mx-8"
                    />
                    <UserStatistics
                        userId={user?.uid ?? ""}
                        name="Groups"
                        value={String(Object.keys(userGroups).length)}
                    />
                    <Separator
                        orientation="vertical"
                        className="bg-white/15 mx-8"
                    />
                    <UserStatistics
                        userId={user?.uid ?? ""}
                        name="Money Spent"
                        value="$5,604.65"
                    />
                </UserBlock>
                <UserBlock className="w-full">
                    <UserGraphWrapper isLoading={cachedData == undefined}>
                        <UserGraphScatter
                            xAxisLabel="Sugar Level"
                            yAxisLabel="Ice Level"
                            title="Ice vs. Sugar Level"
                            height={150}
                            data={cachedData?.sugar_vs_ice}
                        />
                    </UserGraphWrapper>
                </UserBlock>
            </div>

            <UserBlock className="mt-4">
                <div className="flex">
                    <Button className="bg-pastel-pink h-12 text-base">
                        <ArrowDownWideNarrow />
                        Sort by
                    </Button>
                    <Button className="bg-pastel-pink h-12 text-base ml-4">
                        <ListFilter />
                        Filter by
                    </Button>
                </div>

                <DrinkDisplay
                    user={user}
                    userId={user?.uid ?? ""}
                    isEditable
                    className="mt-8"
                />
            </UserBlock>
        </div>
    );
}

export default MySipsPage;
