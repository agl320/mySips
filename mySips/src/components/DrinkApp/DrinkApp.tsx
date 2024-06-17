import { useState } from "react";
import { IDrink } from "./IDrink";
import { v4 as uuidv4 } from "uuid";
import DrinkDisplay from "./DrinkDisplay";

interface IDrinkAppProps {
  userLoggedIn: boolean;
  drinksState: Array<IDrink>;
  setDrinksState: React.Dispatch<React.SetStateAction<IDrink[]>>;
}

function DrinkApp(props: IDrinkAppProps) {
  const { userLoggedIn, drinksState, setDrinksState } = props;

  /** Adding new drink to local drinksState */
  const addDrink = () => {
    setDrinksState((prevDrinksState) =>
      prevDrinksState.concat({
        uuid: uuidv4(),
        name: `Drink ${prevDrinksState.length}`,
        description: "",
      })
    );
  };
  return (
    <>
      {userLoggedIn ? (
        <>
          <button onClick={addDrink}>New drink</button>
          <button>Save</button>
        </>
      ) : (
        <p>New drink</p>
      )}

      <DrinkDisplay drinksState={drinksState} />
    </>
  );
}

export default DrinkApp;
