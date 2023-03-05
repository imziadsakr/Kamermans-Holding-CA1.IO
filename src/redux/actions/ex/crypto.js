
import ActionTypes from "./actionTypes";
import axios from "axios";
import { authorization, errorHandler } from "../../../utils/Helper";
import * as config from "../../../static/constants";

export const CryptoList = () => async dispatch => {
    try{
        const header = authorization('ex') ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_ADMIN_API}crypto/cryptoList` , {}, header) ;

        if(res.status === 200){
            return dispatch({
                type : ActionTypes.ExCryptoList,
                payload : res.data.cryptoList
            })
        }

    } catch(err){
        console.log(err) ;
        return dispatch({
            type : ActionTypes.ExCryptoListError
        })
    }
}

export const BaseCryptoList = () => async dispatch => {
    try {
        const header = authorization('ex') ;
        let res = await axios.post(`${config.PRIVATE_CA1EX_ADMIN_API}crypto/baseCryptoList`, {} , header) ;

        if(res.status === 200){
            return dispatch({
                type : ActionTypes.ExBaseCryptoList,
                payload : res.data.baseCryptoList
            })
        }
    } catch(err) {
        console.log(errorHandler(err)) ;
    }
}
export const AddCrypto = (cryptoInfo, navigate) => async dispatch => {
    try {
        const header = authorization('ex') ;

        const fn = new FormData() ;

        fn.append('name', cryptoInfo.name);
        fn.append('symbol', cryptoInfo.symbol);
        if(cryptoInfo.address) {
            fn.append('address', cryptoInfo.address) ;
        }
        fn.append('decimal', cryptoInfo.decimal);
        fn.append('withdraw_fee', cryptoInfo.withdraw_fee) ;
        fn.append('deposit_fee', cryptoInfo.deposit_fee);
        fn.append('transfer_fee', cryptoInfo.transfer_fee);
        fn.append('transaction_fee', cryptoInfo.transaction_fee) ;
        fn.append('pair_list', JSON.stringify(cryptoInfo.pair_list));
        fn.append('is_deposit', cryptoInfo.is_deposit);
        fn.append('is_withdraw', cryptoInfo.is_withdraw);
        fn.append('is_base', cryptoInfo.is_base) ;
        fn.append("logo", cryptoInfo.logo);
        fn.append("paper", cryptoInfo.paper);

        let res = await axios.post(`${config.PRIVATE_CA1EX_ADMIN_API}/crypto/addcrypto` , fn , header) ;

        if(res.status === 200) {
            navigate('/ex/crypto') ;
        }

    } catch(err) {

        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.ExAddCryptoError
        })
    }
}

export const UpdateCrypto = (cryptoInfo, navigate) => async dispatch => {
    try {
        const header = authorization('ex') ;

        const fn = new FormData() ;

        fn.append('crypto_id', cryptoInfo.crypto_id) ;
        fn.append('name', cryptoInfo.name);
        fn.append('symbol', cryptoInfo.symbol);
        
        if(cryptoInfo.address) {
            fn.append('address', cryptoInfo.address) ;
        }

        if(cryptoInfo.is_base) {
            fn.append('is_base', cryptoInfo.is_base) ;
        }
        if(cryptoInfo.is_deposit) {
            fn.append('is_deposit', cryptoInfo.is_deposit);
        }
        if(cryptoInfo.is_withdraw) {
            fn.append('is_withdraw', cryptoInfo.is_withdraw);
        }

        fn.append('decimal', cryptoInfo.decimal);
        fn.append('withdraw_fee', cryptoInfo.withdraw_fee) ;
        fn.append('deposit_fee', cryptoInfo.deposit_fee);
        fn.append('transfer_fee', cryptoInfo.transfer_fee);
        fn.append('transaction_fee', cryptoInfo.transaction_fee) ;
        fn.append('pair_list', JSON.stringify(cryptoInfo.pair_list));
       
        if(cryptoInfo.hasOwnProperty('logo') && cryptoInfo.hasOwnProperty('paper')) {
            fn.append("logo", cryptoInfo.logo);
            fn.append("paper", cryptoInfo.paper);
        }

        let res = await axios.post(`${config.PRIVATE_CA1EX_ADMIN_API}/crypto/updatecrypto` , fn , header) ;

        if(res.status === 200) {
            navigate('/ex/crypto') ;
        }

    } catch(err) {

        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.ExAddCryptoError
        })
    }
}

export const DeleteCrypto = (_id) => async dispatch => {
    try {
        const header = authorization('ex') ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_ADMIN_API}/crypto/deletecrypto`,{
            _id : _id
        }, header) ;

        if(res.status === 200) {

            dispatch({
                type : ActionTypes.ExDeleteCrypto,
            });

            return true ;
        }

        return false ;
    } catch(err){
        console.log(errorHandler(err)) ;
        return dispatch({
            type : ActionTypes.ExDeleteCryptoError
        })
    }
}