import { getCookie, isAuthenticated } from "../../../utils/Helper";
import ActionTypes from "../../actions/ex/actionTypes";


const INITIAL_STATE = {
    isAuthenticated : !isAuthenticated('ex_access_token') ? false : true,
    accessToken : !isAuthenticated('ex_access_token') ? null : getCookie('ex_access_token'),
    userInfo : {
        user_id : !isAuthenticated('ex_access_token') ? null : getCookie('user_id'),
    },
    error : null ,
}

export default (state=INITIAL_STATE , action) => {
    switch(action.type){
        case ActionTypes.ExSignIn:
            return ({
                ...state,
                isAuthenticated : true,
                userInfo : {
                    user_id : action.payload.user_id
                },
                accessToken : action.payload.accessToken
            })
        case ActionTypes.ExSignOut : 
            return ({
                ...state,
                isAuthenticated : false ,
                userInfo : {
                    user_id : null
                },
                accessToken : null
            })
        default :
            return state ;
    }
}