import React, { useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { dodajPoene, dodajTimove } from "../Redux/counterSlice";
import Continue from "./Countinue";
import "./game.css";
const { api } = require("./../Api");
const colors = ["#d50000", "#ef9a9a", "black", "#90caf9", "#0d47a1"];

function StartGame() {
  //funkcije
  const dispatch = useDispatch();
  const history = useHistory();

  //refs

  const tryOuts = useRef(null);
  const firstWinner = useRef(null);
  const rijec = useRef([]);
  const TrenutniTim = useRef(0);
  const AktivniBodovi = useRef(0);
  let DifficultyLevels = useRef();

  //redux

  const allTeams = useSelector((state) => state.counter.timBodovi);
  const SviTimovi = useSelector((state) => state.counter.timovi);
  const allWords = useSelector((state) => state.counter.words);
  const details = useSelector((state) => state.counter.details);

  //hooks
  const [refresh, setRefresh] = useState(0);
  const [pobjeda, setPobjeda] = useState(null);
  const [timer, setTimer] = useState(1);
  const [igraTraje, setIgraTraje] = useState(true);
  const [difficultyLevel, setDifficultyLevel] = useState(0);
  const [currentWord, setCurrentWord] = useState("");

  useEffect(() => {
    is_there_a_winner();
    setIgraTraje(true);
    DifficultyLevels.current = [];
    setTimer(0);
    AktivniBodovi.current = 0;
    rijec.current = [];
    add_word();

    const inter = setInterval(() => {
      setTimer((prev) => {
        if (prev === details.duration) {
          clearInterval(inter);
          setIgraTraje(false);
        } else setTimer(prev + 1);
      });
    }, 1000);
  }, [refresh]);

  if (pobjeda === null && igraTraje)
    return (
      <div className="igra">
        <motion.div className="igra" animate={igraTraje ? {} : { opacity: "0", zIndex: -1, height: 0 }}>
          <div style={{ color: "black", fontSize: "4rem" }}>{timer}</div>
          <div style={{ color: colors[difficultyLevel + 2] }} className="rijec">
            {currentWord}
          </div>

          <div className="buttonPointsParent" style={{ display: "flex" }}>
            <div
              className="buttonPreskoci"
              onClick={() => {
                rijec.current[rijec.current.length - 1][1] = -1;
                AktivniBodovi.current--;
                add_word();
              }}
            >
              PRESKOCI
            </div>

            <div
              className="buttonTocno"
              onClick={() => {
                rijec.current[rijec.current.length - 1][1] = 1;
                AktivniBodovi.current++;
                add_word();
              }}
            >
              TOCNO
            </div>
          </div>
        </motion.div>
      </div>
    );
  else if (pobjeda === null && !igraTraje) {
    return (
      <div className="igra">
        <motion.div animate={igraTraje ? { opacity: "0", zIndex: -1, height: 0, display: "none" } : {}}>
          <Continue
            index={TrenutniTim.current}
            refresh={() => {
              TrenutniTim.current = (TrenutniTim.current + 1) % SviTimovi.length;
              setRefresh(!refresh);
            }}
            rijeci={rijec.current}
          />
        </motion.div>
      </div>
    );
  } else
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontSize: "1.4rem" }}>Pobjednik je: {pobjeda.tim}</div>
        <Link to="/">Home page</Link>
      </div>
    );

  function add_word() {
    const numWords = allWords.length;
    const randWord = Math.floor(Math.random() * numWords);
    const temporaryWord = allWords[randWord].trim();

    rijec.current = [...rijec.current, [temporaryWord, 0]];
    setCurrentWord(temporaryWord);
  }

  function is_there_a_winner() {
    if (TrenutniTim.current === 0) {
      let winner = { winner: false, points: 0 };
      for (var i = 0; i < SviTimovi.length; i++) {
        if (allTeams[i] > details.count && allTeams[i] > winner.points) {
          winner = { winner: SviTimovi[i], points: allTeams[i] };
        }
      }
      if (winner.points !== 0) setPobjeda(winner.winner);
    }
    return;
  }
}
export default StartGame;

/*
 logic
  console.log(SviTimovi[TrenutniTim.current])
            TrenutniTim.current = (TrenutniTim.current + 1) % SviTimovi.length
 */
