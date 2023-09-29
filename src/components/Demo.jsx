import React from 'react'
import { useEffect, useState } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import enter from '../assets/enter.png';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  })
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  },[]);

  const handleCopy = (copyurl) => {
      setCopied(copyurl)
      navigator.clipboard.writeText(copyurl);
      setTimeout(()=>setCopied(false), 3000);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if(data?.summary){
      const newArticle = { ...article, summary : data.summary};
      const updatedAllArticle = [newArticle, ...allArticles];

      setArticle(newArticle)
      setAllArticles(updatedAllArticle);
      localStorage.setItem('artices', JSON.stringify(updatedAllArticle));
    }
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link_icon" className="absolute ml-3 w-5 left-0 my-2" />
          <input type="url" placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className="url_input peer"
            required
          />
          <button typ="submit" className="submit_btn peer-focus:border-gray-700
          peer-focus:text-gray-700
          ">
            ←
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
          <div
            key={`link=${index}`}
            onClick={() => setArticle(item)}
            className="link_card"
          >
            <div className="copy_btn"
              onClick={()=>{
                handleCopy(item.url)
              }}
            >
              <img
                src={copied === item.url ? tick : copy}
                alt="copy_icon"
                className="w-[40%] h-[40%] object-contain"
              />
            </div>
            <p>{item.url}</p>
          </div>
        ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img src={loader} alt="loader" className="w-20 h-20 object-contain"/>
          ) : error ? (
              <p className="font-inter font-bold text-black text-center">
                Well, that wasn't supposed to happen ... 
                <br/>
                <span className="font-satoshi font-normal text-gray-700">
                  {error?.data?.error}
                </span>
              </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gao-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient"> Summary </span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
                </div>
              </div>
            )
          )}
      </div>
    </section>
  )
}

export default Demo