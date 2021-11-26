import { duration } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { dodajTimove, set_details } from "../Redux/counterSlice";
import "./game.css";

function Game() {
  const [state, setState] = useState(false);
  const [igraci, setIgraci] = useState(null);
  const [details, setDetails] = useState({ duration: 10, count: 50 });
  let input1 = useRef();
  let input2 = useRef();
  let input3 = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (igraci === null) return;
    if (igraci.length === 0) return;

    clear_inputs();
    dispatch(dodajTimove(igraci));
    setState(!state);
  }, [igraci]);

  useEffect(() => {
    dispatch(set_details(details));
  }, [details]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="nova"></div>
      <div
        onClick={() => {
          setDetails(true);
        }}
        className="postavke"
      >
        <section>
          <strong>Round:</strong>
          <input
            onChange={(e) => {
              const formerVal = details.count;
              setDetails({ duration: e.currentTarget.value, count: formerVal });
            }}
            type="number"
            placeholder={10}
            style={{ width: 50 }}
          />
          <strong>s</strong>
        </section>
        <section>
          <strong>First to</strong>
          <input
            onChange={(e) => {
              const formerVal = details.duration;
              setDetails({ count: e.currentTarget.value, duration: formerVal });
            }}
            type="number"
            placeholder={50}
            style={{ width: 50 }}
          />
          <strong>words</strong>
        </section>
      </div>
      <div className="nova">Timovi</div>
      <section className="timWrapper">
        {igraci?.map((val, index) => (
          <div
            onClick={() => {
              setIgraci((prev) =>
                prev.filter((v, ind) => {
                  if (ind !== index) return v;
                })
              );
            }}
            key={index}
            className="igraci"
          >
            {" "}
            {`${val.tim}`}
          </div>
        ))}
      </section>
      <div
        className="timbuttonparent"
        onClick={() => {
          setState(true);
        }}
      >
        <div className="button"> NOVI TIM </div>
      </div>

      <motion.div className="gameInputParent" animate={state ? {} : { x: "-200%" }}>
        <div className="gameInputChild">
          <input onEnded={() => alert("kraj")} ref={input1} id="input1" placeholder="Ime tima" type="text" className="gameInput" />
          <input ref={input2} id="input2" placeholder="Igrac 1" type="text" className="gameInput" />
          <input ref={input3} id="input3" placeholder="Igrac 2" type="text" className="gameInput" />

          <div style={{ display: "flex", width: "100%" }}>
            <div className="buttonInputcreate" onClick={() => addingPlayers()}>
              KREIRAJ
            </div>
            <div
              className="buttonInputcancel"
              onClick={() => {
                setState(false);
              }}
            >
              ODUSTANI
            </div>
          </div>
        </div>
      </motion.div>

      <div className="pokrenibuttonparent">
        <Link to="/startGame" className="pokrenibutton">
          {" "}
          POKRENI IGRU{" "}
        </Link>
      </div>
    </div>
  );

  function addingPlayers() {
    let temporaryArray = [];

    if (igraci !== null && igraci.length != 0)
      igraci.forEach((val) => {
        temporaryArray.push(val);
      });

    const tim = input1.current.value;
    const igrac1 = input2.current.value;
    const igrac2 = input3.current.value;
    const value = { tim: tim, igrac1: igrac1, igrac2: igrac2 };
    temporaryArray.push(value);

    setIgraci(temporaryArray);
  }

  function clear_inputs() {
    input1.current.value = "";
    input2.current.value = "";
    input3.current.value = "";
  }
}

export default Game;
