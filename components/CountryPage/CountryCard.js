import styles from "./Country.module.scss";
import Image from "next/image";

export default function CountryCard({ countrycard }) {
  return (
    <div className={styles.container_left}>
      <div className={`${styles.container_panel} ${styles.overview}`}>
        <div className={styles.overview_image}>
          <Image src={countrycard.flag} alt="Country Flag" layout="fill" />
        </div>
        <h1 className={styles.overview_name}>{countrycard.name}</h1>
        <div className={styles.overview_region}>{countrycard.region}</div>

        <div className={styles.overview_numbers}>
          <div className={styles.overview_population}>
            <div className={styles.overview_value}>
              {countrycard.population}
            </div>
            <div className={styles.overview_label}>Population</div>
          </div>

          <div className={styles.overview_area}>
            <div className={styles.overview_value}>{countrycard.area}</div>
            <div className={styles.overview_label}>Area</div>
          </div>
        </div>
      </div>
    </div>
  );
}
