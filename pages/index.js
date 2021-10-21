import styles from "@styles/Home.module.scss";
import { useState } from "react";
import SearchInput from "@components/SearchInput/SearchInput";
import CountriesTable from "@components/CountriesTable/CountriesTable";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <section>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>
          Found {filteredCountries.length} countries
        </div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name or Region"
            onChange={onInputChange}
          />
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </section>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`https://restcountries.com/v2/all`);
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
