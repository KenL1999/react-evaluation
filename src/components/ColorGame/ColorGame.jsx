import * as React from "react";
import s from "./ColorGame.module.css";
import { getRandomColors, getStatus, rgbString, statusMessage } from "./utils";
import Button from "../Button";

function ColorGame() {
  const [numOfColors, setNumOfColors] = React.useState(6);
  const [colors, setColors] = React.useState(getRandomColors(numOfColors));
  const [attempts, setAttempts] = React.useState([]);
  const [target, setTarget] = React.useState(
    Math.floor(Math.random() * colors.length)
  );

  function handleReset() {
    setAttempts([]);
    setColors(getRandomColors(numOfColors));
    setTarget(Math.floor(Math.random() * colors.length));
  }

  function handleChangeNumber(event) {
    if (event.target.value === "") return;
    const num = +event.target.value;
    if (![3, 6, 9].includes(num)) return;

    setNumOfColors(num);
    setAttempts([]);
    setColors(getRandomColors(num));
    setTarget(Math.floor(Math.random() * num));
  }

  const status = getStatus(attempts, target, numOfColors);

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Color Game</h1>
      <p className={s.description}>
        Guess which color correspond to the following RGB code
      </p>

      <div className={s["rgb-wrapper"]}>
        <div className={`${s.red_box} ${s.rgb}`}>
          <p className={s.color_number}>{colors[target][0]}</p>
          <p className={s.color_name}>red</p>
        </div>
        <div className={`${s.green_box} ${s.rgb}`}>
          <p className={s.color_number}>{colors[target][1]}</p>
          <p className={s.color_name}>green</p>
        </div>
        <div className={`${s.blue_box} ${s.rgb}`}>
          <p className={s.color_number}>{colors[target][2]}</p>
          <p className={s.color_name}>blue</p>
        </div>
      </div>
      <div className={s.dashboard}>
        <div className={s["number-input"]}>
          <label htmlFor="colors"># Colors</label>
          <input
            id="colors"
            type="number"
            value={numOfColors}
            onChange={handleChangeNumber}
            step={3}
            min={3}
            max={9}
          />
        </div>
        <p className={s["game-status"]}>{statusMessage[status]}</p>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <div className={s.squares}>
        {colors.map((color, index) => {
          const backgroundColor =
            status === "playing" ? rgbString(color) : rgbString(colors[target]);
          const opacity =
            attempts.includes(index) && status === "playing" ? "0" : "100";

          return (
            <button
              key={index}
              style={{ backgroundColor, opacity }}
              onClick={() => {
                setAttempts([...attempts, index]);
              }}
              className={s.square}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default ColorGame;
