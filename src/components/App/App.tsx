import { useEffect, useState } from "react";
import styles from "./AppStyles.module.scss";

type Advice = {
  slip: {
    advice: string;
    id: number;
  };
};

export default function App() {
  const [advice, setAdvice] = useState<Advice>({ slip: { advice: "", id: 0 } });

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => setAdvice(data));
  }, []);

  function findAdvice() {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => setAdvice(data));
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>"{advice.slip.advice}"</div>

      <div className={styles.generate}>
        <hr />
        <button className={styles.generateAdviceBtn} onClick={findAdvice}>
          <i className="fa-regular fa-plus"></i>
        </button>
        <hr />
      </div>

      <button className={styles.copy} onClick={() => {navigator.clipboard.writeText(advice.slip.advice)}}>
        <i className="fa-regular fa-copy"></i>
      </button>
    </div>
  );
}
