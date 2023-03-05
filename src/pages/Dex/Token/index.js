import React from 'react' ;

import TokenInfoList from '../../../components/Dex/Token/TokenInfoList'; 

import {
    Box,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        height : 'calc(100vh - 55px)',

        paddingLeft : "10px",
        paddingRight : '10px',

        paddingTop : "40px",
        paddingBottom : "40px",

        overflow : 'hidden' ,
        overflowY : 'scroll'
    },
}))
const Token = () => {

    const classes = useStyles() ;
    
    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <TokenInfoList />
                </Grid>
            </Grid>
        </Box>
    )
}
export default Token ;