
import ActionTypes from './actionTypes';

import * as config from '../../../static/constants';

import axios from 'axios' ;

import { setCookie, eraseCookie, errorHandler } from '../../../utils/Helper';

export const SignInDex = (adminInfo, navigate) => async dispatch => {
    try {
        let res = await axios.post(`${config.PRIVATE_CA1DEX_ADMIN_API}auth/signin` , {
            email : adminInfo.email,
            password : adminInfo.password
        })
        
        if(res.status === 200) {
            setCookie('dex_access_token', res.data.access_token) ;

            dispatch({
                type : ActionTypes.DexSignIn,
                payload : {
                    accessToken : res.data.access_token
                }
            })

            navigate('/dex/token');
        }
    } catch(err) {
        console.log(errorHandler(err)) ;
        return dispatch({
            type : ActionTypes.DexSignInError
        })
    }
}

export const SignOut = (navigate) => async dispatch => {
    
    eraseCookie('dex_access_token');

    dispatch({
        type : ActionTypes.DexSignOut
    })

    navigate('/dex') ;
}