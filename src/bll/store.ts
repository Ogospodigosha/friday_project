import { combineReducers, legacy_createStore , applyMiddleware} from "redux";
import {loadingReducer} from "./loadingReducer";
import thunk from "redux-thunk"

export const RootReducer = combineReducers({
    loading: loadingReducer
})
export const store = legacy_createStore(RootReducer,  applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof RootReducer>
