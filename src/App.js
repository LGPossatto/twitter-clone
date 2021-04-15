import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./assets/styles/globals.style.scss";
import Home from "./pages/home/Home.page";
import Login from "./pages/login/Login.page";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
