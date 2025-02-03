import {
    deleteDrink,
    deleteDrinkAndSubCollections,
    updateDrink,
} from "@/firebase/DrinkHelpers";
import { Separator } from "../ui/separator";
import EditDrinkDialog from "./EditDrinkDialog/EditDrinkDialog";
import { Button } from "../ui/button";
import { Info, Share, Star } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";

function DrinkCard({ user, userUid, drinkData, isEditable }) {
    const [showInfo, setShowInfo] = useState(false);

    const renderEditableActions = () => (
        <div className="mt-2">
            <Separator className="w-full bg-white mb-2 bg-opacity-50" />
            <div className="flex">
                <EditDrinkDialog
                    userUid={userUid}
                    drinkData={drinkData}
                    editCallback={updateDrink}
                />
                <Button
                    className="h-8 w-4 hover:bg-white/15"
                    onClick={() => setShowInfo(!showInfo)}
                >
                    <Info className="h-4 w-4" />
                </Button>
                <Popover>
                    <PopoverTrigger className="h-8 w-8 hover:bg-white/15 rounded-md">
                        <Share className="h-4 w-4 mx-auto" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-white border-0 space-y-8">
                        <Label>Share to</Label>
                    </PopoverContent>
                </Popover>
                <ConfirmDialog
                    // callback={() => deleteDrink(userUid, drinkData.uid)}
                    callback={() =>
                        deleteDrinkAndSubCollections(
                            user,
                            userUid,
                            drinkData.uid
                        )
                    }
                    title="Confirm Delete Drink"
                    description={`Remove ${drinkData.name}?`}
                    confirm="Delete Drink"
                    cancel="Cancel"
                />
            </div>
            <p className="text-xs line-clamp-1 no-wrap mt-1 opacity-[0.5]">
                {drinkData.uid}
            </p>
        </div>
    );

    if (showInfo) {
        return (
            <div
                className={`flex ${
                    drinkData?.rating === 10
                        ? "bg-gradient-to-r from-pastel-orange to-orange"
                        : "bg-gradient-to-r from-pastel-pink to-pastel-orange"
                } rounded-md`}
            >
                <div className="w-[476px] h-[300px] flex flex-col justify-between p-4">
                    <div className="flex h-full">
                        <div className="w-full h-full">
                            <h1 className="font-semibold font-display">
                                {drinkData.name}
                            </h1>
                            <p>
                                <span className="opacity-50">Rating:</span>{" "}
                                {drinkData.rating ?? 5}
                            </p>
                            <p>
                                {" "}
                                <span className="opacity-50">Price:</span> $
                                {drinkData.drinkPrice}
                            </p>
                            <p>
                                {" "}
                                <span className="opacity-50">
                                    Description:
                                </span>{" "}
                                {drinkData.description}
                            </p>
                        </div>
                        <div className="bg-white/50 h-full w-full rounded-md"></div>
                    </div>
                    {isEditable && renderEditableActions()}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex ${
                drinkData?.rating === 10
                    ? "bg-gradient-to-r from-pastel-orange to-orange"
                    : "bg-gradient-to-r from-pastel-pink to-pastel-orange"
            } rounded-md`}
        >
            <div className="w-[170px] h-[300px] flex flex-col justify-between p-4">
                <div className="h-full flex flex-col justify-between">
                    <h1 className="text-4xl font-semibold overflow-hidden line-clamp-4">
                        {drinkData.name}
                    </h1>
                    <div className="text-left opacity-75">
                        <p>{drinkData.store?.storeAddress}</p>
                        <p className="font-medium">
                            {drinkData.store?.storeName}
                        </p>
                    </div>
                </div>
                {isEditable && renderEditableActions()}
            </div>
            <div className="bg-white bg-opacity-25 w-[60px] h-full rounded-md flex items-center justify-center overflow-hidden">
                {drinkData?.rating === 10 ? (
                    <Star
                        className="stroke-white opacity-50 -rotate-12 w-[100px] h-[100px]"
                        fill="white"
                    />
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
