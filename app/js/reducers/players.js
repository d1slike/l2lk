import * as Types from "../const/ActionsTypes";

const initialState = {
    data: [
        {
            name: "test1",
        },
        {
            name: "test2",
        }
    ]
};

export default function players(state = initialState, action) {
    switch (action.type) {
        case Types.FETCH_ACCOUNT_DATA: {
            return {...state}
        }
        default:
            return state;
    }
}