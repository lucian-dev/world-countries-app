import styles from "@components/CountryPage/Country.module.scss";
import Link from "next/link";
import CountryCard from "@components/CountryPage/CountryCard";
import CountryDetails from "@components/CountryPage/CountryDetails";
import CountryNews from "@components/CountryPage/CountryNews";

export default function Country({ country, borders, weather, news }) {
  return (
    <section>
      <Link href="/">
        <a className={styles.back_link}>...back home</a>
      </Link>
      <div className={styles.container}>
        <CountryCard countrycard={country} />
        <CountryDetails details={country} weather={weather} borders={borders} />
        <CountryNews news={news} name={country.name} />
      </div>
    </section>
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

  const resNews = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.API_KEY_NEWS}&country=${country.alpha2Code}`
  );

  const news = await resNews.json();

  if (!weather && !capitals && !data && !news) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      country,
      borders,
      weather,
      news,
    },
    revalidate: 10,
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
    fallback: true,
  };
};
