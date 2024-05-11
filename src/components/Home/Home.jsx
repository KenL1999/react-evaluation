import s from "./Home.module.css";
import reactIconUrl from "../../assets/react-icon-lg.svg";
import Button from "../Button";

function Home({ setPage }) {
  return (
    <div className={s.wrapper}>
      <img src={reactIconUrl} />
      <h1 className={s.title}>React Evaluation</h1>
      <p className={s.name}>Angélica Arias</p>
      <div className={s.buttons}>
        <Button
          variant="outline"
          onClick={() => {
            setPage("/color-game");
          }}
        >
          Color Game
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setPage("/doable");
          }}
        >
          Doable
        </Button>
      </div>
    </div>
  );
}

export default Home;