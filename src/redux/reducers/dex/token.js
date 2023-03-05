import ActionTypes from "../../actions/dex/actionTypes"

const INITIAL_STATE = {
    tokenList : null,
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.DexTokenList :
            return ({
                ...state,
                tokenList : action.payload
            })
        case ActionTypes.DexAddToken :
        case ActionTypes.DexAddTokenError :
        case ActionTypes.DexTokenListError :
        default : 
            return state ;
    }
}