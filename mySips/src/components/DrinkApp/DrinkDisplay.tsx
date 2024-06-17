import DrinkItem from "./DrinkItem";
import { IDrink } from "./IDrink";

interface IDrinkDisplayProps {
  drinksState: Array<IDrink>;
}

function DrinkDisplay(props: IDrinkDisplayProps) {
  const { drinksState } = props;
  return (
    <>
      {drinksState.map((drinkData) => (
        <DrinkItem drinkData={drinkData} />
      ))}
    </>
  );
}

export default DrinkDisplay;
