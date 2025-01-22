import { useFirestore } from "reactfire";
import { User } from "firebase/auth";
import DrinkCard from "./DrinkCard";
import { useStoreDrinkData } from "../../hooks/useStoreDrinkData";
import StoreDrinkCard from "./StoreDrinkCard";

interface IStoreDrinkDisplayProps {
    user: User;
    storeUid: string;
    className?: string;
}

function StoreDrinkDisplay({
    user,
    storeUid,
    className,
}: IStoreDrinkDisplayProps) {
    const firestore = useFirestore();

    // Fetch store's drink data
    const storeDrinkData = useStoreDrinkData(firestore, storeUid);

    return (
        <div className={className}>
            <div className="flex flex-wrap gap-4">
                {Object.values(storeDrinkData).map((drinkData, index) => (
                    <StoreDrinkCard
                        user={user}
                        storeUid={storeUid}
                        key={`${drinkData.id}-${index}`} // Assuming drinkData has a unique id
                        drinkData={drinkData}
                    />
                ))}
            </div>
        </div>
    );
}

export default StoreDrinkDisplay;
