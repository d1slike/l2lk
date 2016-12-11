import * as Types from "../const/ActionsTypes";

const initialState = {
    data: {
        login: "test",
        email: "test@test",
        registrationDate: "30.05.2010",
        lastAccessDate: "01.01.2016",
        state: {
            ban: false,
            banExpireDate: null,
        },
        premiumState: {
            premium: false,
            premiumExpireDate: null
        },
        lastIp: "101.101.101.1"
    },
    dataIsFetched: false
};


export default function account(state = initialState, action) {
    switch (action.type) {
        case Types.FETCH_ACCOUNT_DATA: {
            return {...state, dataIsFetched: true}
        }
        default:
            return state;
    }
}