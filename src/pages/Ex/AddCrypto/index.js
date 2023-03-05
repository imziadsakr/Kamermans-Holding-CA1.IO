import React,{useState} from 'react' ;

import AddCryptoForm from '../../../components/Ex/AddCrypto/AddCryptoForm';

import {
    Box,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';
import ImagePreview from '../../../components/Ex/AddCrypto/ImagePreview';
import PdfPreview from '../../../components/Ex/AddCrypto/PdfPreview';

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
const AddCrypto = () => {

    const classes = useStyles() ;
    
    const [ imagePreview, setImagePreview ] = useState(null) ;
    const [ pdfPreview, setPdfPreview ] = useState(null);

    const handleImagePreview = (previewUrl) => {
        setImagePreview(previewUrl);
    }

    const handlePdfPreview = (previewUrl) => {
        setPdfPreview(previewUrl) ;
    }

    return (
        <Box className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <AddCryptoForm 
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
export default AddCrypto ;