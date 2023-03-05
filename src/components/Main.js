import React from 'react' ;

import SideBar from './Layout/SideBar';

import MainRoutes from './Routes/MainRoutes';

import AOS from 'aos/dist/aos';
import 'aos/dist/aos.css' ;

import {
    Box,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

AOS.init({once : true}) ;

const useStyles = makeStyles((theme) => ({
    root : {
    }
}))

const Main = () => {
    const classes = useStyles() ;

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={2.5}>
                    <SideBar />
                </Grid>
                <Grid item xs={9.5}>
                    <MainRoutes />
                </Grid>
            </Grid>
        </Box>
    )
}
export default Main ;