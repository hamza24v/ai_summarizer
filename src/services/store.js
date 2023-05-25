import {configureStore} from '@reduxjs/toolkit'
import { articleApi } from './article'

/**
 * configure a glabal state called store, which saves the entire information of our application
 */
export const store = configureStore({
    reducer: { // most cases we don't need entire state, just a slice
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})