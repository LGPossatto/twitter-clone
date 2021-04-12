import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./assets/styles/globals.style.scss";
import Home from "./pages/home/Home.page";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
