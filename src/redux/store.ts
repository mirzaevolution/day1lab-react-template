import { configureStore } from '@reduxjs/toolkit'
import MainSlice from './Slices/MainSlice'

export const store = configureStore({
    reducer: {
        main: MainSlice
    }, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch