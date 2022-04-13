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
      <div className={styles.content}>
        "{advice.slip.advice}"
      </div>

      <button className="copyText">Copy</button>
      <button className="generateAdvice" onClick={findAdvice}>
        Generate
      </button>
    </div>
  );
}
