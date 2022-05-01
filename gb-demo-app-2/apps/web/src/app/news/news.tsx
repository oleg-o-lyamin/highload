import './news.module.scss';
import { useEffect, useState, useRef } from 'react';

/* eslint-disable-next-line */
export interface NewsProps { }
export interface PeaceOfNews {
  id: number,
  title: string,
  description: string,
  createdAt: number
}

export function News(props: NewsProps) {
  const [news, setNews] = useState([] as PeaceOfNews[]);
  const sortNews = (news: PeaceOfNews[]) => {
    return news.sort((a, b) => a.createdAt - b.createdAt)
  }
  const cache = useRef<{ last: number, news: PeaceOfNews[] | null }>({ last: 0, news: null });

  const updateNews = () => {
    if (cache.current.last && (Date.now() - cache.current.last) < 5000 && cache.current.news) {
      setNews(cache.current.news)
    }
    else {
      fetch('http://localhost:3333/api/news')
        .then(response => response.json())
        .then(news => {
          const sortedNews = sortNews(news);
          cache.current.last = Date.now();
          cache.current.news = sortedNews;
          setNews(sortedNews);
        })
    }
  }

  useEffect(() => {
    updateNews()
  }, []);

  return (
    <div>
      <h1>Последние новости </h1>
      <a style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={updateNews}>обновить</a>
      <ul>
        {news.map(peaceOfNews => {
          return <li key={peaceOfNews.id}>
            <h2>{peaceOfNews.title}</h2>
            <p>{peaceOfNews.description}</p>
            <hr />
          </li>
        })}
      </ul>
    </div >
  );
}

export default News;
