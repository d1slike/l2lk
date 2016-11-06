import * as Types from "../const/ActionsTypes";

const initialState = {
    data: {
        login: "test",
        email: "test@test",
        registerDate: "30.05.2010",
        lastAccessDate: "01.01.2016",
        state: "Не заблокирован",
        premium: "Премиальная подписка не оформлена",
        lastIp: "101.101.101.1",
        balance: 118
    }
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