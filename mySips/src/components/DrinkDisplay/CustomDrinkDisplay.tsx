import DrinkCard from "./DrinkCard";

interface ICustomDrinkDisplayProps {
    drinks: Array<any>; // Replace `any` with a specific drink type/interface if available
    className?: string;
}

function CustomDrinkDisplay({ drinks, className }: ICustomDrinkDisplayProps) {
    console.log(drinks);
    return (
        <div className={className}>
            <div className="flex flex-wrap gap-4">
                {drinks.map((drinkData, index) => (
                    <DrinkCard
                        key={`${drinkData.id}-${index}`} // Assuming each drink has a unique `id`
                        userUid={drinkData.userUid} // Pass the associated user's UID if available
                        drinkData={drinkData}
                        isEditable={false} // Always non-editable
                    />
                ))}
            </div>
        </div>
    );
}

export default CustomDrinkDisplay;
