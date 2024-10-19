import { IMenu } from "@/interfaces/IMenu";

interface IDrinkDisplayProps {
    userDrinkData: IMenu;
}
function DrinkDisplay(props: IDrinkDisplayProps) {
    const { userDrinkData } = props;
    console.log(userDrinkData);
    return (
        <div>
            <p>Drink Data</p>
            <div className="flex flex-wrap">
                {Object.values(userDrinkData).map((drinkData) => {
                    return (
                        <div className="w-[200px] h-[300px] border border-black">
                            <p>{drinkData.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DrinkDisplay;
