import { configureStore } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'

import application from './application/reducer'
import { updateVersion } from './global/actions'
import multicall from './multicall/reducer'
import transactions from './transactions/reducer'
import user from './user/reducer'
import wallets from './wallets/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
  reducer: {
    application,
    user,
    transactions,
    multicall,
    wallets,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: process.env.NODE_ENV === 'test' }),
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
