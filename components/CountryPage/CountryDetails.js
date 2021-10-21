import styles from "./Country.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function CountryDetails({ details, weather, borders }) {
  return (
    <div className={styles.container_center}>
      <div className={`${styles.container_panel} ${styles.details}`}>
        <h3>Details</h3>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Subregion</div>
          <div className={styles.details_panel_value}>{details.subregion}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Capital</div>
          <div className={styles.details_panel_value}>{details.capital}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Capital Weather</div>
          <div className={styles.details_panel_value}>
            {details.capital
              ? weather.name && (
                  <>
                    <Image
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      width="50"
                      height="50"
                    />
                    <span>{weather.main.temp.toFixed()}&deg;C</span>
                    {weather.weather[0].description}
                  </>
                )
              : ""}
          </div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Languages</div>
          <div className={styles.details_panel_value}>
            {details.languages.map(({ name }) => name).join(", ")}
          </div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Currencies</div>
          <div className={styles.details_panel_value}>
            {details.currencies
              ? details.currencies.map(({ name }) => name).join(", ")
              : ""}
          </div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Native name</div>
          <div className={styles.details_panel_value}>{details.nativeName}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Gini</div>
          <div className={styles.details_panel_value}>{details.gini} %</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Timezone</div>
          <div className={styles.details_panel_value}>
            {details.timezones.join(", ")}
          </div>
        </div>

        <div className={styles.details_panel_borders}>
          <div className={styles.details_panel_borders_label}>
            Neighbouring Countries
          </div>

          <div className={styles.details_panel_borders_container}>
            {borders.length > 0
              ? borders.map((border) => {
                  const code = border.alpha2Code.toLowerCase();
                  return (
                    <div
                      className={styles.details_panel_borders_country}
                      key={border.name}
                    >
                      <div className={styles.details_panel_borders_image}>
                        <Image
                          src={border.flag}
                          alt="Country Flag"
                          layout="fill"
                        />
                      </div>
                      <Link href={`/country/${code}`}>
                        <a className={styles.details_panel_borders_name}>
                          {border.name}
                        </a>
                      </Link>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
