import React, { useEffect } from 'react' ;

import { connect } from 'react-redux';

import ExHeader from './Layout/Header/ExHeader' ;
import ExRoutes from './Routes/ExRoutes' ;

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        
    }
}))

const ExLayout = (props) => {

    const classes = useStyles() ;
    
    const {
        isAuthenticated
    } = props ;

    useEffect(() => {

    }, [isAuthenticated])
    
    return (
        <Box className={classes.root}>
            {
                isAuthenticated && <ExHeader />
            }
            <ExRoutes />
        </Box>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.ex.auth.isAuthenticated
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(ExLayout);