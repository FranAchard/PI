import { Route, Switch } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import start from "./Pages/Start";
import Details from "./Pages/Details";
import Create from "./Pages/Create";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={start} />

        <Route exact path="/videogames">
          <Home />
        </Route>

        <Route exact path="/create">
          <Create />
        </Route>

        <Route exact path="/videogames/:id">
          <Details />
        </Route>

        <Route path="*">
          <h2>Pagina no encontrada.</h2>
        </Route>
      </Switch>
    </div>
  );
}

export default App;