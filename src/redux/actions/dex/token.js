
import ActionTypes from "./actionTypes";
import axios from "axios";
import { authorization, errorHandler } from "../../../utils/Helper";
import * as config from "../../../static/constants";

export const TokenList = () => async dispatch => {
    try{
        const header = authorization('dex') ;

        let res = await axios.post(`${config.PRIVATE_CA1DEX_ADMIN_API}token/tokenList` , {}, header) ;

        if(res.status === 200){
            return dispatch({
                type : ActionTypes.DexTokenList,
                payload : res.data.tokenList
            })
        }

    } catch(err){
        console.log(err) ;
        return dispatch({
            type : ActionTypes.DexTokenListError
        })
    }
}

export const AddToken = (tokenInfo, navigate) => async dispatch => {
    try {
        const header = authorization('dex') ;

        const fn = new FormData() ;

        fn.append('name', tokenInfo.name);
        fn.append('symbol', tokenInfo.symbol);
        fn.append('decimal', tokenInfo.decimal);
        fn.append('pair', tokenInfo.pair);
        fn.append('token_address', tokenInfo.token_address);
        fn.append('website_url', tokenInfo.website_url);
        fn.append('issuer', tokenInfo.issuer);
        fn.append('email', tokenInfo.email);
        fn.append('deposit_fee', tokenInfo.deposit_fee);
        fn.append('transfer_fee', tokenInfo.transfer_fee);
        fn.append("logo", tokenInfo.logo);
        fn.append("paper", tokenInfo.paper);

        let res = await axios.post(`${config.PRIVATE_CA1DEX_ADMIN_API}token/addToken` , fn , header) ;

        if(res.status === 200) {
            navigate('/dex/token') ;
        }

    } catch(err) {

        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.DexAddTokenError
        })
    }
}

export const DeleteToken = (_id) => async dispatch => {
    try {
        const header = authorization('dex') ;

        let res = await axios.post(`${config.PRIVATE_CA1DEX_ADMIN_API}/token/deleteToken`,{
            _id : _id
        }, header) ;

        if(res.status === 200) {

            dispatch({
                type : ActionTypes.DexDeleteToken,
            });

            return true ;
        }

        return false ;
    } catch(err){
        console.log(errorHandler(err)) ;
        return dispatch({
            type : ActionTypes.DexDeleteTokenError
        })
    }
}