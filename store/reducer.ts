import {combineReducers, configureStore} from '@reduxjs/toolkit'
import main from "./reducers/main";
import user from './reducers/user';
import auth from './reducers/auth';
import card from './reducers/card';

const rootReducer = combineReducers({
    main,
    user,
    auth,
    card,
});


export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
