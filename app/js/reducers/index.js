import {combineReducers} from "redux";
import account from "./account";
import balance from "./balance";
import players from "./players";

export default combineReducers({
    account,
    balance,
    players,
    //TODO add here
});