import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux"
import fetchReducer from "./reducers/fetchReducer";
import thunk from "redux-thunk"
const rootReducer = combineReducers({ fetchReducer })

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;


