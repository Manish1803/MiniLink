import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import styles from "./Auth.module.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <main className={styles.main}>
      <img src="./logo.png" alt="Cuvette logo" className={styles.logo} />
      <img src="/sky.png" alt="Login Form Image" className={styles.sideImage} />
      <section className={styles.section}>
        <header className={styles.header}>
          <button
            className={`${styles.btn} ${!isLogin ? styles.active : ""}`}
            onClick={toggleMode}
          >
            SignUp
          </button>
          <button
            className={`${styles.btn} ${isLogin ? styles.active : ""}`}
            onClick={toggleMode}
          >
            Login
          </button>
        </header>
        <article className={styles.container}>
          <div className={styles.formContainer}>
            <p className={styles.formTitle}>
              {isLogin ? "Login" : "Join us Today!"}
            </p>

            {isLogin ? <Login /> : <SignUp />}

            <p className={styles.linkContainer}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className={styles.link} onClick={toggleMode}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Auth;
