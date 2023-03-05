import React, { useEffect, useState, useRef } from 'react' ;

import { Link, useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { SignOut } from '../../../../redux/actions/ex/auth';
import { getCookie } from '../../../../utils/Helper' ;

import AvatarImg from '../../../../assets/avatars/avatar_1.jpg' ;

import Setting from './Setting';

import {
    Box, 
    List, 
    ListItem,
    Grid,
    Avatar
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        display : "flex" ,
        alignItems : 'flex-end',
        
        height : theme.layout.headerHeight , 
        backgroundColor : 'white',

        "& a" : {
            textDecoration : "none",
            minWidth : "90px !important" ,
            color : 'gray',

            textAlign : 'center'
        },
        "& .MuiList-root" : {
            display : "flex" ,
            padding : "0px"
        },
        "& .MuiListItem-root" : {
            width : "auto !important" ,
            
            fontSize : "15px" ,
            cursor : "pointer" 
        } ,
    },
    active : {
        borderBottom : '3px solid #4115dd' ,
        fontWeight : 600,
        color : "#4115dd !important"
    },
    logout : {
        display : 'flex',
        justifyContent : 'flex-end',
        alignItems : 'center',

        paddingRight : '20px'
    }
}))

let exCookieTimer ;

const ExHeader = (props) => {
    const classes = useStyles() ;

    const {
        SignOut,
        isAuthenticated
    } = props ;

    const [ navIndex, setNavIndex ] = useState(0);
    const [ isOpenSetting , setIsOpenSetting ] = useState(false) ;
    const anchorRef = useRef(null) ; 
    const navigate = useNavigate() ;

    const navItems = [
        {
            nav : 'User',
            link : '/ex/user'
        },
        {
            nav : 'Crypto',
            link : '/ex/crypto'
        },
        {
            nav : 'Wallet' ,
            link : '/ex/wallet'
        },
        {
            nav : 'Account' ,
            link : '/ex/account'
        },
        {
            nav : 'Notification' ,
            link : '/ex/notification'
        }
    ]

    const handlePopOver = () => {
        setIsOpenSetting(!isOpenSetting) ;
    }

    const handleNavIndex = (index) => {
        setNavIndex(index);
    }
    
    useEffect(() => {
        if(isAuthenticated){

            exCookieTimer = setTimeout( async () => {
                if(!getCookie('ex_access_token')) {
                    SignOut(navigate) ;
                    clearInterval(exCookieTimer) ;
                }
            } , 24 * 60 * 60 * 1000) ;

        } else {
            clearInterval(exCookieTimer) ;
        }
    }, [isAuthenticated]) ;

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={8}>
                    <List>
                        {
                            navItems.map((item, index) => {
                                return(
                                    <ListItem key={index} >
                                        <Link to={item.link} className={ index === navIndex ? classes.active : '' } onClick={() => handleNavIndex(index)}>
                                            {item.nav}
                                        </Link>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Grid>
                <Grid item xs={4} className={classes.logout} sx={{cursor : 'pointer'}}>
                    <Avatar alt="Avatar" src={AvatarImg} ref={anchorRef} onClick={(e) => handlePopOver(e)} />
                </Grid>
            </Grid>
            <Setting
                open={isOpenSetting}
                handlePopOver={handlePopOver}
                anchorEl={anchorRef.current}
                SignOut={SignOut}
            />
        </Box>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.ex.auth.isAuthenticated
})
const mapDispatchToProps = {
    SignOut
}
export default connect(mapStateToProps, mapDispatchToProps)(ExHeader) ;