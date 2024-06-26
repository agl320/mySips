import { IDrinkParams } from "../../interfaces/Drink";

function DrinkItem({ drinkData }: { drinkData: IDrinkParams }) {
    return (
        <div>
            <p>{drinkData.name}</p>
            <p>{drinkData.uuid}</p>
        </div>
    );
}

export default DrinkItem;
