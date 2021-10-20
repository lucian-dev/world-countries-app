import Link from "next/link";
import Image from "next/image";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>

        <button className={styles.heading_name}>
          <div>Name</div>
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>

          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button className={styles.heading_area}>
          <div>Capital</div>
        </button>
        <button className={styles.heading_area}>
          <div>Region</div>
        </button>
      </div>

      {orderedCountries.map((country) => {
        const code = country.alpha2Code.toLowerCase();
        return (
          <Link href={`/country/${code}`} key={country.alpha3Code}>
            <a>
              <div className={styles.row}>
                <div className={styles.flag}>
                  <Image
                    src={country.flags.png}
                    alt="Country Flag"
                    width="100"
                    height="80"
                  />
                </div>
                <div className={styles.name}>
                  {country.name}
                  <span>...more details</span>
                </div>

                <div className={styles.population}>{country.population}</div>

                <div className={styles.population}>{country.capital}</div>

                <div className={styles.area}>{country.region || 0}</div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default CountriesTable;
