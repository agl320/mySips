import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import UserPageHeader from "../UserPageHeader/UserPageHeader";
import { User } from "firebase/auth";
import { useCachedDrinkStats } from "@/hooks/useCachedDrinkStats";
import { useUserDrinkData } from "@/hooks/useUserDrinkData";
import { useFirestore } from "reactfire";
import UserGraphWrapper from "../UserComponents/UserStatistics/UserGraphWrapper";
import UserGraphScatter from "../UserComponents/UserStatistics/UserGraphScatter";
import UserStatistics from "../UserComponents/UserStatistics/UserStatistics";
import { Separator } from "@/components/ui/separator";
import UserGraphLine from "../UserComponents/UserStatistics/UserGraphLine";
import CustomDrinkDisplay from "@/components/DrinkDisplay/CustomDrinkDisplay";
import {
    BookOpenText,
    CircleDollarSign,
    DollarSign,
    Info,
    Trophy,
} from "lucide-react";
import UserGraphBar from "../UserComponents/UserStatistics/UserGraphBar";
import {
    colors,
    convertToDatasets,
    convertToPieDataset,
    monthLabels,
} from "../UserComponents/UserStatistics/GraphHelpers";
import DrinkTable from "@/components/DrinkDisplay/DrinkTable";
import { Button } from "@/components/ui/button";
import UserGraphPie from "../UserComponents/UserStatistics/UserGraphPie";
import { Link } from "react-router-dom";

interface IUserProps {
    user: User;
}

function OverviewPage({ user }: IUserProps) {
    const firestore = useFirestore();

    const userDrinkData = useUserDrinkData(firestore, user.uid);

    const { cachedData, isLoading } = useCachedDrinkStats({
        user,
        userUid: user.uid,
        graphTypes: [
            "sugar_vs_ice",
            "average_drink_price",
            "money_spent_per_month",
            "total_money_spent",
            "top_three_drinks",
            "total_drink_count",
            "drinks_per_month",
            "sugar_vs_ice_freq",
            "money_spent_change_previous_month",
            "drink_count_change_previous_month",
            "rating_count",
            "average_drink_rating",
        ],
        userDrinkData,
    });

    console.log(cachedData);

    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-background-dark to-[#1c1a10] via-[#1c1015]">
            <div className="flex">
                <UserBlock className="mr-4">
                    <UserPageHeader
                        pageTitle="Overview"
                        linkTrail={[{ value: "Home" }, { value: "Overview" }]}
                        pageCaption="Here's your drink data overview."
                    />
                </UserBlock>
                <UserBlock className="mr-4 w-[500px]">
                    <div className="flex h-full p-2">
                        <div className="flex flex-col justify-between mr-4">
                            <UserStatistics
                                customIcon={
                                    <Trophy className="w-3 h-3 stroke-pastel-pink" />
                                }
                                userId={user.uid}
                                name="Average Rating"
                                value={`${
                                    cachedData?.average_drink_rating.toFixed(
                                        2
                                    ) ?? "0"
                                }/10`}
                                className="mr-6 flex flex-col justify-center"
                            />

                            <p className="text-white text-xs whitespace-normal break-words">
                                <span className="bg-[#F1F33F] inline-block w-3 h-2 rounded-sm"></span>{" "}
                                is for rating 10, ranging to{" "}
                                <span className="bg-[#E84B5D] inline-block w-3 h-2 rounded-sm"></span>{" "}
                                for 0.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <UserGraphWrapper
                                isLoading={cachedData == undefined}
                            >
                                <UserGraphPie
                                    datasets={convertToPieDataset(
                                        cachedData?.rating_count
                                    )}
                                    height={150}
                                    width={150}
                                    labels={[
                                        "Rating 0",
                                        "Rating 1",
                                        "Rating 2",
                                        "Rating 3",
                                        "Rating 4",
                                        "Rating 5",
                                        "Rating 6",
                                        "Rating 7",
                                        "Rating 8",
                                        "Rating 9",
                                        "Rating 10",
                                    ].map(String)}
                                />
                            </UserGraphWrapper>
                        </div>
                    </div>
                </UserBlock>
                <UserBlock className="bg-gradient-to-r from-pastel-pink to-pastel-orange w-full mr-4 px-0 py-0 ">
                    <div className="bg-overview bg-cover bg-right-bottom rounded-md h-full backdrop-saturate-150">
                        <div className="relative z-10 h-full flex flex-col justify-between p-6">
                            <h1 className="text-4xl font-semibold font-display">
                                Welcome back, {user?.displayName}
                            </h1>
                            <Button className="bg-white text-pastel-orange font-medium float-right ml-auto shadow-lg hover:shadow-none">
                                <Link to="/app/menu">Explore Menus</Link>
                                <BookOpenText />
                            </Button>
                        </div>
                    </div>
                </UserBlock>

                <UserBlock className="bg-gradient-to-r from-pastel-orange to-pastel-light-orange w-[600px]">
                    <div className="h-40">
                        <h1 className="text-4xl font-semibold font-display">
                            User Info
                        </h1>
                        <p className="mt-4">
                            <span className="opacity-50">Display Name:</span>{" "}
                            {user.displayName}
                        </p>
                        <p className="overflow-hidden truncate text-ellipsis">
                            <span className="opacity-50">User UID:</span>{" "}
                            {user.uid.substring(0, 10)}...
                        </p>
                    </div>
                </UserBlock>
            </div>

            <div className="flex mt-4">
                <UserBlock className="max-h-72 flex mr-4 w-[1050px] justify-center">
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
                    <Separator
                        orientation="vertical"
                        className="bg-white/15 mx-8 h-auto self-stretch"
                    />

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
                <UserBlock className="flex-grow flex justify-center">
                    <UserGraphWrapper isLoading={cachedData == undefined}>
                        <UserGraphBar
                            datasets={convertToDatasets(
                                cachedData?.sugar_vs_ice_freq,
                                colors
                            )}
                            height={200}
                            width={400}
                            fontSize={10}
                            fontColor="white"
                            title="Ice & Sugar Levels"
                            yAxisLabel="Drinks"
                        />
                    </UserGraphWrapper>
                </UserBlock>
            </div>

            <div className="flex mt-4">
                <UserBlock className="space-y-8 max-content inline-block mr-4">
                    <h1 className="text-3xl font-semibold font-display">
                        Most Popular
                    </h1>
                    <div className="inline-flex bg-white/15 px-4 py-2 rounded-lg w-max">
                        <Info className="mr-4" />
                        {!cachedData ||
                        cachedData?.top_three_drinks.length === 0 ? (
                            <p>There are currently no drinks.</p>
                        ) : (
                            <p>
                                Your top drink is{" "}
                                {cachedData?.top_three_drinks[0].data.name},
                                which you have drank{" "}
                                {cachedData?.top_three_drinks[0].count ?? 0}{" "}
                                times.
                            </p>
                        )}
                    </div>

                    <CustomDrinkDisplay
                        user={user}
                        drinks={
                            cachedData?.top_three_drinks.map(
                                (drink) => drink.data
                            ) ?? []
                        }
                    />
                </UserBlock>
                <UserBlock className="flex-grow">
                    <h1 className="text-3xl font-semibold mb-4 font-display">
                        Sip Rankings
                    </h1>
                    <DrinkTable user={user} />
                </UserBlock>
            </div>
        </div>
    );
}

export default OverviewPage;
