import styles from "./SearchInput.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchInput({ ...rest }) {
  return (
    <div className={styles.wrapper}>
      <AiOutlineSearch />
      <input className={styles.input} {...rest} />
    </div>
  );
}
