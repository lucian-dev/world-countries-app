import Link from "next/link";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a>World Countries App</a>
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>

      <footer className={styles.footer}>@Lucian-DEV</footer>
    </>
  );
};

export default Layout;
