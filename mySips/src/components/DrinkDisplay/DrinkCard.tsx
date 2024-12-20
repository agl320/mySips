import { deleteDrink, updateDrink } from "@/firebase/DrinkHelpers";
import { Separator } from "../ui/separator";
import EditDrinkDialog from "./EditDrinkDialog/EditDrinkDialog";
import { Button } from "../ui/button";
import { Info, Share, Star } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";

function DrinkCard(props: { userUid: string; drinkData; isEditable }) {
    const { userUid, drinkData, isEditable } = props;

    return (
        <div
            className={`flex ${
                drinkData?.rating === 10
                    ? "bg-gradient-to-r from-pastel-orange to-orange"
                    : "bg-gradient-to-r from-pastel-pink to-pastel-orange"
            } rounded-md`}
        >
            <div
                key={`drink-card-${drinkData.uid}`}
                className="w-[170px] h-[300px] flex flex-col justify-between  p-4 "
            >
                <div className="h-full flex flex-col justify-between">
                    <h1 className="text-4xl font-semibold overflow-hidden line-clamp-4">
                        {drinkData.name}
                    </h1>
                    <div className="text-left opacity-75">
                        <p className="">{drinkData.store?.storeAddress}</p>
                        <p className="font-medium">
                            {drinkData.store.storeName}
                        </p>
                    </div>
                </div>
                {isEditable ? (
                    <div className="mt-4">
                        <Separator className="w-full bg-white mb-4 bg-opacity-50" />
                        <div className="flex justify-begin ">
                            <EditDrinkDialog
                                userUid={userUid}
                                drinkData={drinkData}
                                editCallback={updateDrink}
                            />
                            <Button className="h-4 w-4">
                                <Info className="h-4 w-4" />
                            </Button>
                            <Button className="h-4 w-4">
                                <Share className="h-4 w-4" />
                            </Button>
                            <ConfirmDialog
                                callback={() =>
                                    deleteDrink(userUid, drinkData.uid)
                                }
                                title="Confirm Delete Drink"
                                description={`Are you sure you want to remove ${drinkData.name} from
                    mySips?`}
                                confirm="Delete Drink"
                                cancel="Cancel"
                            />
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                {/* <div className="bg-white text-xs bg-opacity-25 p-2">
                                <p>{drinkData.uid}</p>
                            </div> */}
            </div>
            <div className="bg-white bg-opacity-25 w-[60px] h-full rounded-md flex items-center justify-center overflow-hidden">
                {drinkData?.rating === 10 ? (
                    <div className="relative">
                        <Star
                            className="stroke-white opacity-50 -rotate-12 w-[100px] h-[100px]"
                            fill="white"
                        ></Star>
                    </div>
                ) : (
                    <p className="text-white/50 text-[200px] font-bold -rotate-12">
                        {drinkData?.rating ?? 5}
                    </p>
                )}
            </div>
        </div>
    );
}

export default DrinkCard;
