import { useEffect, useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles/AppStyles.module.scss";

export default function App() {
  const [advice, setAdvice] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        if (/^[a-zA-Z]+$/.test(data.slip.advice.slice(-1))) {
          setAdvice(data.slip.advice + ".");
        } else {
          setAdvice(data.slip.advice);
        }
      });
  }, []);

  function findAdvice() {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        if (/^[a-zA-Z]+$/.test(data.slip.advice.slice(-1))) {
          setAdvice(data.slip.advice + ".");
        } else {
          setAdvice(data.slip.advice);
        }

        setIsDisabled(true);

        setTimeout(() => {
          setIsDisabled(false);
        }, 2000);
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
        <div key={advice} className={styles.content}>
          {advice !== "" ? `"${advice}"` : null}
        </div>

        <div className={styles.generate}>
          <hr />
          <button
            disabled={isDisabled}
            className={styles.generateAdviceBtn}
            onClick={findAdvice}
          >
            <i className="fa-regular fa-plus"></i>
          </button>
          <hr />
        </div>

        <button
          className={styles.copy}
          title="Copy to clipboard"
          onClick={() => {
            navigator.clipboard.writeText(advice);
            toast("Copied to clipboard.");
          }}
        >
          <i className="fa-regular fa-copy"></i>
        </button>
      </div>
    </>
  );
}
