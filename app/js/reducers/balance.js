import * as Types from "../const/ActionsTypes";
const initialState = {
    balance: 120
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Types.FETCH_BALANCE_DATA:
            return {...state, balanceIsFetched: true};
        default:
            return state;
    }
}