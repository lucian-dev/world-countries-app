import styles from "./Country.module.css";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Country({ country, borders, weather }) {
  return (
    <Layout>
      <Link href="/">
        <a className={styles.back_link}>...back home</a>
      </Link>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <div className={styles.overview_image}>
              <Image src={country.flag} alt="Country Flag" layout="fill" />
            </div>
            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Subregion</div>
              <div className={styles.details_panel_value}>
                {country.subregion}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital Weather</div>
              <div className={styles.details_panel_value}>
                {country.capital
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
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.currencies
                  ? country.currencies.map(({ name }) => name).join(", ")
                  : ""}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>{country.gini} %</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Timezone</div>
              <div className={styles.details_panel_value}>
                {country.timezones.join(", ")}
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
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${params.code}`);
  const country = await res.json();

  let query = [];
  if (country.borders) {
    for (const border of country.borders) {
      query.push(border);
    }
  }
  const resBorders = await fetch(
    `https://restcountries.com/v2/alpha?codes=${query.join(",")}`
  );
  const data = await resBorders.json();
  let borders = [];
  if (data.length > 0) {
    for (let border of data) {
      borders.push({
        alpha2Code: border.alpha2Code,
        name: border.name,
        flag: border.flags.png,
      });
    }
  }

  const resCapitals = await fetch(
    `https://restcountries.com/v2/capital/${encodeURI(country.capital)}`
  );
  const capitals = await resCapitals.json();
  let capital = [];
  if (capitals.length > 0) {
    let item = capitals.map(({ capital }) => encodeURI(capital));
    capital.push(item);
  } else {
    capital.push("Bucharest");
  }
  const resWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.API_KEY}&units=metric`
  );
  const weather = await resWeather.json();

  if (!weather && !capitals && !data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      country,
      borders,
      weather,
    },
    revalidate: 15,
  };
};
export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v2/all");

  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: {
      code: country.alpha2Code.toLowerCase(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
