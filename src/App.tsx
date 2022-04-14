import { useEffect, useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles/AppStyles.module.scss";

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
      .then((data) => {
        setAdvice(data);
      });
  }, []);

  function findAdvice() {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        setAdvice(data);
      });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
        toastClassName={styles.toastContainer}
        bodyClassName={styles.toastBody}
      />

      <a
        className={styles.github}
        href="https://github.com/isabdch/advice-generator"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-github"></i>
      </a>

      <div className={styles.container}>
        <div key={`"${advice.slip.advice}"`} className={styles.content}>
          "{advice.slip.advice}"
        </div>

        <div className={styles.generate}>
          <hr />
          <button className={styles.generateAdviceBtn} onClick={findAdvice}>
            <i className="fa-regular fa-plus"></i>
          </button>
          <hr />
        </div>

        <button
          className={styles.copy}
          onClick={() => {
            navigator.clipboard.writeText(advice.slip.advice);
            toast("Copied to clipboard.");
          }}
        >
          <i className="fa-regular fa-copy"></i>
        </button>
      </div>
    </>
  );
}
