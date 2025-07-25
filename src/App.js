import React from "react";
import Routing from "./Routes/Routing";
import { TrainerAccountProvider } from "./APIContext/TrainerAccountContext";
import { useLogin } from "./APIContext/LoginContext";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./App.css";

function App() {
  const { user } = useLogin();
  return (
    <div className="app">
      <TrainerAccountProvider user={user}>
        <Routing />
      </TrainerAccountProvider>
    </div>
  );
}

export default App;
