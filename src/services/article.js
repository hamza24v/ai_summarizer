import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const rapidApiKey = '962dacb42amshf9711f4ea44c8d6p112738jsn454e1bd1efd3'    // issue with extracing key from import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
console.log("api key: " + rapidApiKey);
export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`, //encodeURI => usefule when passing user generated content.
        }),
    }),
});

export const {useLazyGetSummaryQuery} = articleApi; // allows use to fire hook on demand (i.e, presses enter)