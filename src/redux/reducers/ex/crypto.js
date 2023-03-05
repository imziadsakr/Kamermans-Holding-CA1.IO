import ActionTypes from "../../actions/ex/actionTypes"

const INITIAL_STATE = {
    cryptoList : null,
    baseCryptoList : null
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.ExCryptoList :
            return ({
                ...state,
                cryptoList : action.payload
            })
        case ActionTypes.ExBaseCryptoList :
            return ({
                ...state,
                baseCryptoList : action.payload
            })
        case ActionTypes.ExAddCrypto :
        case ActionTypes.ExAddCryptoError :
        case ActionTypes.ExCryptoListError :
        default : 
            return state ;
    }
}