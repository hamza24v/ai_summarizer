import React, { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: ''
    });
    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState("");

    // RTL lazy query
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    //Load data from localStorage on mount
    useEffect(() => {
        const localArticles = JSON.parse(
            localStorage.getItem("articles")
        );

        if (localArticles) {
            setAllArticles(localArticles);
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const existingArticle = allArticles.find(
            (item) => item.url === article.url
        );
        if(existingArticle) 
            return setArticle

        const { data } = await getSummary({ articleUrl: article.url });

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary }
            const updatedAllArticles = [newArticle, ...allArticles];

            //update state and local storage
            setArticle(newArticle)
            console.log(`article sum: ${newArticle.summary}`);
            setAllArticles(updatedAllArticles);
            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        }
    };

    // copy the url and toggle icon for user feedback
    function handleCopy(copyUrl) {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) { //enter key
            handleSubmit
        }
    };

    return (
        <section className='mt-16 w-full max-w-x1'>
            {/* Search */}
            <div className='flex flex-col w-full gap-2'>
                <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
                    <img src={linkIcon} alt='link-icon' className='absolute left-0 my-2 ml-3 w-5' />
                    <input
                        type='url'
                        placeholder='Paste article link'
                        value={article.url}
                        onChange={(e) => setArticle({ ...article, url: e.target.value })}
                        onKeyDown={handleKeyDown}
                        required
                        className='url_input peer' //used to style element based on state of sibling element, sibling is marked with peer class, and target element is styled using peer-* modifiers
                    />
                    <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
                        <p>↵</p>
                    </button>
                </form>

                {/*Browse URL history */}
                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArticles.map((item, index) => (
                        <div
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                            className='link_card'
                        >
                            <div className='copy_btn' onClick={() => handlecopy(item.url)}>
                                <img
                                    src={copied == item.url ? tick : copy}
                                    alt={copied == item.url ? "tick_icon" : "copy_icon"}
                                    className='w-[40%] h-[40%] object-contain'
                                />
                            </div>
                            <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                                {item.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/*Display result */}
            <div className='my-10 max-w-full flex justify-center items-center'>
                {isFetching ? (
                    <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
                ): error ? (
                    <p className='font-inter font-bold text-black text-center' >
                        That wasn't supposed to happen...
                        <br />
                        <span className='font-satoshi font-normal text-gray-700'>
                            {error?.data?.error}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className='flex flex-col gap-3'>
                          <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                            Article <span className='blue_gradient'>Summary</span>
                          </h2>
                          <div className='summary_box'>
                            <p className='font-inter font-medium text-sm text-gray-700'>
                              {article.summary}
                            </p>
                          </div>
                        </div>
                      )
                )}
            </div>
        </section>
    )
}

export default Demo