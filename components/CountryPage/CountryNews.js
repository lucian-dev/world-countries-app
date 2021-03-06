import styles from "./Country.module.scss";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

export default function CountryNews({ news, name }) {
  return (
    <div className={styles.container_right}>
      <div className={styles.container_panel}>
        <h3>Latest news from {name}</h3>
        {news.results.length > 0
          ? news.results.slice(0, 2).map((article, index) => {
              return (
                <div className={styles.article} key={index}>
                  <Link href={article.link}>
                    <a target="_blank">
                      <div className={styles.article_image}>
                        <div className={styles.article_icon}>
                          <FiExternalLink />
                        </div>
                        <img
                          src={
                            article.image_url
                              ? article.image_url
                              : "/thumbnail-default.jpg"
                          }
                          alt={article.title}
                        />
                      </div>
                      <div className={styles.article_meta}>
                        <h4>{`${article.title.substring(0, 50)}...`}</h4>
                        <span>Source: {article.source_id}</span>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })
          : "No news at this moment"}
      </div>
    </div>
  );
}
