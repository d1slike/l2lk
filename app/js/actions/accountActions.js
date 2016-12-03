import * as Types from "../const/ActionsTypes";

export function fetchAccountData() {
    return {
        type: Types.FETCH_ACCOUNT_DATA,
        payload: null //TODO change to call api
    }
}