import React from "react";
import { FirebaseState } from "./context/firebase/FirebaseState";
import { AlertState } from "./context/alert/AlertState";
import { PageMaker } from "./components/PageMaker";

function App() {
  return (
    <AlertState>
      <FirebaseState>
        <PageMaker />
      </FirebaseState>
    </AlertState>
  );
}

export default App;
