import ActionTypes from './actionTypes';

import * as config from '../../../static/constants';

import axios from 'axios' ;

import { setCookie, eraseCookie, errorHandler } from '../../../utils/Helper';

export const SignInEx = (adminInfo, navigate) => async dispatch => {
    try {
        let res = await axios.post(`${config.PRIVATE_CA1EX_ADMIN_API}auth/signin` , {
            email : adminInfo.email,
            password : adminInfo.password
        })
        
        if(res.status === 200) {
            setCookie('ex_access_token', res.data.access_token) ;

            dispatch({
                type : ActionTypes.ExSignIn,
                payload : {
                    user_id : res.data.user_id,
                    accessToken : res.data.access_token
                }
            })

            navigate('/ex/user');
        }
    } catch(err) {
        console.log(errorHandler(err)) ;
        return dispatch({
            type : ActionTypes.ExSignInError
        })
    }
}

export const SignOut = (navigate) => async dispatch => {
    
    eraseCookie('ex_access_token');
    eraseCookie('user_id') ;

    dispatch({
        type : ActionTypes.ExSignOut
    })

    navigate('/ex') ;
}