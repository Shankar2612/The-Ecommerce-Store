import {createStore, combineReducers} from "redux";
import { addCartReducer, userAuthReducer, userAddressReducer, userOrderReducer } from "./reducer";

const store = createStore(combineReducers({addCartReducer, userAuthReducer, userAddressReducer, userOrderReducer}));

export default store;