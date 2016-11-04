const initialState = {
    login: "test",
    email: "test@test",
    registerDate: "30.05.2010",
    lastAccessDate: "01.01.2016",
    state: "Не заблокирован",
    premium: "Премиальная подписка не оформлена",
    lastIp: "101.101.101.1"
};

export default function accountReducer(state = initialState, action) {
    return state;
}