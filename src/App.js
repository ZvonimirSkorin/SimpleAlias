import React, { useEffect, useState } from "react";
import "./App.css";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./Components/game";
import StartGame from "./Components/startGame";
import Continue from "./Components/Countinue";
import { useDispatch } from "react-redux";
import { set_words } from "./Redux/counterSlice";
import { useSelector } from "react-redux";
const { fck } = require("./Words/WordParser.js");

function App() {
  const loadingWords = useSelector((state) => state.counter.words);
  const dispatch = useDispatch();

  useEffect(() => {
    fck.then((resolve) => {
      dispatch(set_words(resolve));
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <div>
              <Game />
            </div>
          </Route>

          <Route exact path="/startGame">
            <StartGame />
          </Route>

          <Route exact path="/startGameContinue">
            <Continue />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
