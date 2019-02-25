import { combineReducers } from "redux";
function  reducer_login(state = {},action) {
    switch (action.type) {
        case 'LoginSuccess':
            return { login_info: action.payload};          
        default:
            return state;
    }
}
function  reducer_user(state = {},action) {
    switch (action.type) {
        case 'GetUserSuccess':
            return { user_info: action.payload};          
        default:
            return state;
    }
}
export default combineReducers({
    reducer_login,
    reducer_user,
})