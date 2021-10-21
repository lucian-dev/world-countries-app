import styles from "./CountriesTable.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FaSortAmountUpAlt, FaSortAmountDownAlt } from "react-icons/fa";
import { useState } from "react";

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
        <FaSortAmountDownAlt />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <FaSortAmountUpAlt />
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

        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>

          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <div className={styles.heading_capital}>
          <div>Capital</div>
        </div>

        <button
          className={styles.heading_region}
          onClick={() => setValueAndDirection("region")}
        >
          <div>Region</div>
          {value === "region" && <SortArrow direction={direction} />}
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
                    alt={`${country.name.toLowerCase()}-flag`}
                    layout="fill"
                  />
                </div>
                <div className={styles.name}>
                  {country.name}
                  <span>...more details</span>
                </div>

                <div className={styles.population}>{country.population}</div>

                <div className={styles.capital}>{country.capital}</div>

                <div className={styles.region}>{country.region || 0}</div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default CountriesTable;
