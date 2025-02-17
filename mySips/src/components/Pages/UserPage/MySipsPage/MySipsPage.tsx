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
import {
    ArrowDownWideNarrow,
    CircleMinus,
    DollarSign,
    ListFilter,
    UsersRound,
} from "lucide-react";
import UserGraphScatter from "../UserComponents/UserStatistics/UserGraphScatter";
import { useDrinkStats } from "@/hooks/useDrinkStats";
import UserGraphWrapper from "../UserComponents/UserStatistics/UserGraphWrapper";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useCachedDrinkStats } from "@/hooks/useCachedDrinkStats";
import UserGraphLine from "../UserComponents/UserStatistics/UserGraphLine";
import {
    colors,
    convertToDatasets,
    monthLabels,
} from "../UserComponents/UserStatistics/GraphHelpers";

interface IUserProps {
    user: User;
}

function MySipsPage(props: IUserProps) {
    const { user } = props;

    const firestore = useFirestore();

    const userDrinkData = useUserDrinkData(firestore, user.uid);
    const userGroups = useUserGroups(firestore, user?.uid ?? "");

    const { cachedData, isLoading } = useCachedDrinkStats({
        user,
        userUid: user.uid,
        graphTypes: [
            "sugar_vs_ice",
            "average_drink_price",
            "drink_count_change_previous_month",
            "total_drink_count",
            "drinks_per_month",
            "total_money_spent",
            "money_spent_per_month",
            "money_spent_change_previous_month",
        ],
        userDrinkData,
    });

    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-background-dark to-[#1c1a10] via-[#1c1015]">
            <div className="flex space-x-4 max-h-72">
                <UserBlock className="">
                    <UserPageHeader
                        pageTitle="mySips"
                        linkTrail={[{ value: "Home" }, { value: "mySips" }]}
                        pageCaption="All your drinks, stored in one place."
                    />
                </UserBlock>
                <UserBlock className="flex">
                    <div>
                        {" "}
                        <UserStatistics
                            userId={user?.uid ?? ""}
                            name="Drinks"
                            value={String(Object.keys(userDrinkData).length)}
                        />
                        <Separator className="bg-white/15 my-8" />
                        <UserStatistics
                            userId={user?.uid ?? ""}
                            name="Groups"
                            value={String(Object.keys(userGroups).length)}
                            customIcon={
                                <UsersRound className="w-3 h-3 stroke-pastel-orange" />
                            }
                            customColor="bg-pastel-orange/15"
                        />
                    </div>
                    <Separator
                        orientation="vertical"
                        className="bg-white/15 mx-8"
                    />
                    <div>
                        <UserStatistics
                            userId={user?.uid ?? ""}
                            name="Money Spent"
                            value={
                                cachedData?.total_money_spent.toFixed(2) ??
                                "0.00"
                            }
                            valueUnit="$"
                            customIcon={
                                <DollarSign className="w-3 h-3 stroke-pastel-green" />
                            }
                            customColor="bg-pastel-green/15"
                        />
                        <Separator className="bg-white/15 my-8" />
                        <UserStatistics
                            userId={user?.uid ?? ""}
                            name="Avg. Price"
                            value={
                                cachedData?.average_drink_price.toFixed(2) ??
                                "0.00"
                            }
                            valueUnit="$"
                            customIcon={
                                <CircleMinus className="w-3 h-3 stroke-white" />
                            }
                            customColor="bg-white/15"
                        />
                    </div>
                </UserBlock>
                <UserBlock className="flex">
                    <UserStatistics
                        customIcon={
                            <DollarSign className="w-3 h-3 stroke-pastel-pink" />
                        }
                        userId={user.uid}
                        name="Total Spent"
                        value={`$${
                            cachedData?.total_money_spent.toFixed(2) ?? "0.00"
                        }`}
                        className="mr-6 flex flex-col justify-center"
                        delta={cachedData?.money_spent_change_previous_month.change.toFixed(
                            2
                        )}
                        deltaPrefix={"$"}
                    />
                    <UserGraphWrapper isLoading={cachedData == undefined}>
                        <UserGraphLine
                            height={200}
                            width={300}
                            fontSize={10}
                            fontColor="white"
                            xAxisLabel="Months"
                            yAxisLabel="Amount ($)"
                            labels={monthLabels}
                            datasets={convertToDatasets(
                                cachedData?.money_spent_per_month,
                                colors
                            ).reverse()}
                        />
                    </UserGraphWrapper>
                </UserBlock>
                <UserBlock className="w-full min-w-[525px] flex justify-center">
                    <UserStatistics
                        userId={user.uid}
                        name="Drinks Bought"
                        value={`${cachedData?.total_drink_count ?? "0"} drinks`}
                        className="mr-6 flex flex-col justify-center"
                        delta={
                            cachedData?.drink_count_change_previous_month.change
                        }
                    />
                    <UserGraphWrapper isLoading={cachedData == undefined}>
                        <UserGraphLine
                            height={200}
                            width={300}
                            fontSize={10}
                            fontColor="white"
                            xAxisLabel="Months"
                            yAxisLabel="Drinks"
                            labels={monthLabels}
                            datasets={convertToDatasets(
                                cachedData?.drinks_per_month,
                                colors
                            ).reverse()}
                        />
                    </UserGraphWrapper>
                </UserBlock>
            </div>

            <UserBlock className="mt-4">
                <div className="flex">
                    <Button className="bg-pastel-pink h-12 text-base" disabled>
                        <ArrowDownWideNarrow />
                        Sort by
                    </Button>
                    <Button
                        className="bg-pastel-pink h-12 text-base ml-4"
                        disabled
                    >
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
