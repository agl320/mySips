import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseSetup";
import Authentication from "./components/Authentication";
import DrinkApp from "./components/DrinkApp/DrinkApp";
import { IDrink } from "./components/DrinkApp/IDrink";

function App() {
  // User logged in state
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  // User drink state
  const [drinksState, setDrinksState] = useState<Array<IDrink>>([]);
  // Fire base init
  useEffect(() => {
    console.log(firebaseApp.options);
  });
  return (
    <>
      <h1>mySips</h1>
      <Authentication
        userLoggedIn={userLoggedIn}
        setUserLoggedIn={setUserLoggedIn}
        setDrinksState={setDrinksState}
      />
      <DrinkApp
        drinksState={drinksState}
        setDrinksState={setDrinksState}
        userLoggedIn={userLoggedIn}
      />
    </>
  );
}

export default App;
