import * as React from "react";
import clsx from "clsx";
import s from "./App.module.css";
import Home from "../Home";
import ColorGame from "../ColorGame";
import Doable from "../Doable";
import { AuthProvider } from "../../contexts/authContext";

import reactIconUrl from "../../assets/react-icon.svg";

const navigation = [
  {
    name: "Color Game",
    to: "/color-game",
  },
  {
    name: "Doable",
    to: "/doable",
  },
];

function App() {
  const [page, setPage] = React.useState("/");

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <button
          className={s.logo}
          onClick={() => {
            setPage("/");
          }}
        >
          <img src={reactIconUrl} /> React Evaluation
        </button>
        <nav className={s.nav}>
          {navigation.map((item) => (
            <button
              key={item.to}
              className={clsx(s["nav-item"], page === item.to && s.current)}
              onClick={() => {
                setPage(item.to);
              }}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </header>
      <main className={s.main}>
        {/* Utiliza la variable 'page' para renderizar solo uno de los siguientes */}
        {page === "/" && <Home setPage={setPage} />}
        {page === "/color-game" && <ColorGame />}
        {page === "/doable" && (
          <AuthProvider>
            <Doable />
          </AuthProvider>
        )}
      </main>
    </div>
  );
}

export default App;
