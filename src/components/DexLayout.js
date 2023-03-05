
import React from 'react' ;

import DexHeader from './Layout/Header/DexHeader' ;
import DexRoutes from './Routes/DexRoutes' ;

import { connect } from 'react-redux';

import {
    Box
} from '@mui/material' ;

const DexLayout = (props) => {

    
    const {
        isAuthenticated
    } = props ;

    
    return (
        <Box>
            {
                isAuthenticated && <DexHeader />
            }
            <DexRoutes />
        </Box>
    )
}
const mapStateToProps = state => ({
    isAuthenticated : state.dex.auth.isAuthenticated
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(DexLayout) ;