import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseSetup";
import Authentication from "./components/Authentication";

function App() {
  useEffect(() => {
    console.log(firebaseApp.options);
  });
  return (
    <>
      <h1>mySips</h1>
      <Authentication />
    </>
  );
}

export default App;
