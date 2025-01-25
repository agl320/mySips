import { doesUserDrinkExist } from "@/firebase/DrinkHelpers";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Check, Plus } from "lucide-react";
import { addStoreDrinkToUser } from "@/firebase/StoreHelpers";
import { Drink } from "@/classes/Drink";

function DrinkRow({ user, drinkData }) {
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
        await addStoreDrinkToUser(drinkData.store.storeUid, drinkObj, user.uid);
        setUserHasAdded(true);
    };

    return (
        <div className="w-full bg-gradient-to-r from-pastel-pink to-pastel-orange py-2 px-2 rounded-md mb-2 flex justify-between">
            <div className="flex justify-between items-center w-full pl-2 pr-4">
                <p className="text-white font-medium">{drinkData.name}</p>
                <p className="bg-white/25 px-2 rounded-md text-white font-medium">
                    ${drinkData.drinkPrice}
                </p>
            </div>
            {userHasAdded ? (
                <Button disabled className="bg-white/50 w-4 h-8">
                    <Check
                        className="w-4 h-8 stroke-pastel-orange"
                        strokeWidth={4}
                    />
                </Button>
            ) : (
                <Button
                    className="bg-white w-4 h-8"
                    onClick={handleAddStoreDrink}
                >
                    <Plus
                        className="w-4 h-8 stroke-pastel-orange"
                        strokeWidth={4}
                    />
                </Button>
            )}
        </div>
    );
}

export default DrinkRow;
