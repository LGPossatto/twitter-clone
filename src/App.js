import { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserContext from "./context/user/userContext";

import "./assets/styles/globals.style.scss";
import Home from "./pages/home/Home.page";
import Login from "./pages/login/Login.page";

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      {user ? (
        <Switch>
          <Route component={Home}></Route>
        </Switch>
      ) : (
        <Route component={Login}></Route>
      )}
    </BrowserRouter>
  );
}

export default App;
