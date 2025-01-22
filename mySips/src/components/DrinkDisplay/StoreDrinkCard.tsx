import { Check, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { doesUserDrinkExist } from "@/firebase/DrinkHelpers";
import { addStoreDrinkToUser } from "@/firebase/StoreHelpers";
import { Drink } from "@/classes/Drink";

function StoreDrinkCard({ user, drinkData, storeUid }) {
    const [userHasAdded, setUserHasAdded] = useState<boolean>(false);

    useEffect(() => {
        const checkDrinkExists = async () => {
            const userHasDrinkCheck = await doesUserDrinkExist(
                user.uid,
                drinkData.uid
            );
            setUserHasAdded(userHasDrinkCheck);
        };

        checkDrinkExists();
    }, [drinkData.uid, user.uid]);

    const handleAddStoreDrink = async () => {
        const drinkObj = new Drink(drinkData);
        await addStoreDrinkToUser(storeUid, drinkObj, user.uid);
        setUserHasAdded(true);
    };

    return (
        <div
            className={`flex bg-gradient-to-r from-pastel-pink to-pastel-orange rounded-md`}
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
                        <p className="uppercase text-sm inline-block font-medium flex items-center space-x-1">
                            <span>Verified</span>
                            <Check className="w-4 h-4" strokeWidth={4} />
                        </p>
                    </div>
                </div>
            </div>
            <div>
                {userHasAdded ? (
                    <button disabled className="bg-white/50 p-2 m-4 rounded-md">
                        <Check
                            className="w-4 h-4 stroke-pastel-orange"
                            strokeWidth={4}
                        />
                    </button>
                ) : (
                    <button
                        className="bg-white p-2 m-4 rounded-md"
                        onClick={handleAddStoreDrink}
                    >
                        <Plus
                            className="w-4 h-4 stroke-pastel-orange"
                            strokeWidth={4}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}

export default StoreDrinkCard;
