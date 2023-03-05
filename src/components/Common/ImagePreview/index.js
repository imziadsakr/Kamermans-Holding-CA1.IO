import React,{ useState } from 'react' ;

import {
    Box,
    Avatar
} from '@mui/material' ;

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',

        background : 'white',

        padding : 10,
        height : 120,

        "& .MuiSvgIcon-root" : {
            marginRight : 10
        }
    }
})) ;

const ImagePreview = (props) => {

    const classes = useStyles() ;

    const {
        previewUrl
    } = props ;

    return (
        <Box className={classes.root}>
            {
                previewUrl ? (
                    <Box component={'img'} src={previewUrl} width={100} height={100}/>
                ) : (
                    <>
                        <CloudUploadIcon /> Upload Logo.
                    </> 
                )
            }
        </Box>
    )
}

export default ImagePreview ;