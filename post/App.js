import React, { useState } from "react";
import { AppLoading } from "expo";
import { Provider } from "react-redux";

import { bootstrap } from "./src/bootstrap";
import { AppNavigation } from "./src/navigation/AppNavigation";
import store from "./src/store";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
        startAsync={bootstrap}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
