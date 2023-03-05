import React,{useState, useEffect} from 'react' ;

import { useLocation } from 'react-router-dom';

import UpdateCryptoForm from '../../../components/Ex/UpdateCrypto/UpdateCryptoForm';

import * as config from '../../../static/constants';
import {
    Box,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';
import ImagePreview from '../../../components/Common/ImagePreview';
import PdfPreview from '../../../components/Common/PdfPreview' ;

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
const UpdateCrypto = () => {

    const classes = useStyles() ;
    
    const [ imagePreview, setImagePreview ] = useState(null) ;
    const [ pdfPreview, setPdfPreview ] = useState(null);

    const location = useLocation() ;

    const handleImagePreview = (previewUrl) => {
        setImagePreview(previewUrl);
    }

    const handlePdfPreview = (previewUrl) => {
        setPdfPreview(previewUrl) ;
    }

    useEffect(() => {
      if(location.state && location.state.cryptoInfo) {
          handleImagePreview(`${config.PUBLIC_CA1EX_ADMIN_API}${location.state.cryptoInfo.logo_url}`) ;
          handlePdfPreview(`${config.PUBLIC_CA1EX_ADMIN_API}${location.state.cryptoInfo.paper_url}`) ;
      }
    }, [location]) ;
    
    return (
        <Box className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <UpdateCryptoForm 
                        handleImagePreview={handleImagePreview}
                        handlePdfPreview={handlePdfPreview}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <ImagePreview 
                                previewUrl={imagePreview}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PdfPreview
                                previewUrl={pdfPreview}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
export default UpdateCrypto ;