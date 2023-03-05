import React, { useState, useEffect } from 'react' ;

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { AddToken } from '../../../../redux/actions/dex/token';

import validate from 'validate.js';
import clsx from 'clsx';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import FileUpload from "react-mui-fileuploader"

import {
    Box, 
    TextField,
    Grid,
    Button,
    Input,
    InputLabel,
    Avatar,
    FormControl,
    Select,
    MenuItem
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    flex : {
        display : "flex" ,
        justifyContent : "center" ,
        alignItems : "center" ,
        flexDirection : "column",
    },
    root : {
        backgroundColor : 'white',
        paddingTop : "15px" ,
        paddingBottom : "15px" ,

        "& .MuiFormControl-root" : {
            marginBottom : "15px"
        } ,
        "& .MuiGrid-item" : {
            fontSize : "14px"
        }
    } , 
    title : {
        color : theme.palette.primary.main ,
        fontSize : "35px"
    } , 
    controls : {
        width : "80%"
    } ,
    advertise : {
        color : theme.palette.primary.main ,
        fontSize : "12px" ,
        marginBottom : "15px"
    },
    tablename : {
        fontSize : "20px",
        fontWeight : 600,
        
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },
    upload : {
        cursor : 'pointer',

        display : 'flex !important',
        alignItems : 'center !important',
        justifyContent : 'center !important',
        
        "&:hover" : {
            color : theme.palette.info.main
        },
        "& .MuiSvgIcon-root" : {
            fontSize : '30px',
            paddingRight : '5px'
        }
    }
}))

const schema = {
    name: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    symbol: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    decimal: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    pair: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    token_address : {
        presence: { allowEmpty: false, message: 'is required' },
        format : {
            pattern : /^(0x){1}[0-9a-fA-F]{40}$/i
        }
    },
    website_url : {
        presence: { allowEmpty: false, message: 'is required' },
        url : true
    },
    issuer : {
        presence: { allowEmpty: false, message: 'is required' },
    },
    email : {
        presence: { allowEmpty: false, message: 'is required' },
        email : true
    },
    deposit_fee: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    transfer_fee: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    logo : {
        presence: { allowEmpty: false, message: 'is required' },
    },
    paper : {
        presence: { allowEmpty: false, message: 'is required' },
    },
};

const AddTokenForm = (props) => {

    const classes = useStyles() ;

    const navigate = useNavigate() ;

    const {
        error,
        AddToken
    } = props ;
    
    const pairList = [
        {
            label : "USDT",
            value : "USDT"
        },
        {
            label : "ETH",
            value : "ETH"
        },
        {
            label : "USDT & ETH",
            value : "USDT,ETH"
        }
    ]

    const [logo, setLogo] = useState({ preview: "", raw: "" });
    const [paper, setPaper] = useState({ preview: "", raw: "" });

    const [formState, setFormState] = useState({
        isValid: false,
        values: {
            pair : pairList[0].value
        },
        touched: {},
        errors: {},
    });

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    const handleChange = event => {
    
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'file'
                    ? event.target.files[0]
                    : event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));
    };

    const handleChangeLogo = e => {
        handleChange(e) ;
        if (e.target.files.length) {
            setLogo({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };
    const handleChangePaper = e => {
        handleChange(e) ;
        if (e.target.files.length) {
            setPaper({
                preview: e.target.files[0].name,
                raw: e.target.files[0]
            });
        }
    }

    const handleAddToken = async () => {

        if(formState.isValid){
            AddToken(formState.values, navigate) ;
        }
    };

    useEffect(()=>{
        const errors = validate(formState.values, schema);
        
        setFormState(formState => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {},
        }));
    
    }, [formState.values] );

    return (
        <Box className={clsx( classes.root , classes.flex )}>
            <Box  className={classes.controls }>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Box className={classes.tablename} >
                            Add Token
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name={"name"}
                            label='Name'
                            size='small'

                            helperText={hasError('name') ? formState.errors.name[0] : null}
                            error={hasError('name')}
                            onChange={handleChange}
                            value={formState.values.name || ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name={"symbol"}
                            label='Symbol'
                            size='small'

                            helperText={hasError('symbol') ? formState.errors.symbol[0] : null}
                            error={hasError('symbol')}
                            onChange={handleChange}
                            value={formState.values.symbol || ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name={"decimal"}
                            type={'number'}
                            label='Decimal'
                            size='small'

                            helperText={hasError('decimal') ? formState.errors.decimal[0] : null}
                            error={hasError('decimal')}
                            onChange={handleChange}
                            value={formState.values.decimal || ''}

                            InputProps={{
                                inputProps : {
                                    min : 0
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Select
                                name={"pair"}
                                value={formState.values.pair || "USDT"}
                                onChange={handleChange}
                                size={"small"}
                            >
                                {
                                    pairList.map( (pair , index) => {
                                        return (
                                            <MenuItem value={pair.value} key={index}>{pair.label}</MenuItem>
                                        )
                                    } )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name={"token_address"}
                            label='Address'
                            size='small'

                            helperText={hasError('token_address') ? formState.errors.token_address[0] : null}
                            error={hasError('token_address')}
                            onChange={handleChange}
                            value={formState.values.token_address || ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name={"website_url"}
                            label='WebSite URL'
                            size='small'

                            helperText={hasError('website_url') ? formState.errors.website_url[0] : null}
                            error={hasError('website_url')}
                            onChange={handleChange}
                            value={formState.values.website_url || ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name={"issuer"}
                            label='Issuer'
                            size='small'

                            helperText={hasError('issuer') ? formState.errors.issuer[0] : null}
                            error={hasError('issuer')}
                            onChange={handleChange}
                            value={formState.values.issuer || ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name={"email"}
                            label='Email'
                            size='small'

                            helperText={hasError('email') ? formState.errors.email[0] : null}
                            error={hasError('email')}
                            onChange={handleChange}
                            value={formState.values.email || ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            name={"deposit_fee"}
                            label='Deposit Fee'
                            size='small'
                            type={'number'}

                            helperText={hasError('deposit_fee') ? formState.errors.deposit_fee[0] : null}
                            error={hasError('deposit_fee')}
                            onChange={handleChange}
                            value={formState.values.deposit_fee || ''}

                            InputProps={{
                                inputProps : {
                                    min : 0
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            name={"transfer_fee"}
                            label='Transfer Fee'
                            size='small'
                            type={'number'}

                            helperText={hasError('transfer_fee') ? formState.errors.transfer_fee[0] : null}
                            error={hasError('transfer_fee')}
                            onChange={handleChange}
                            value={formState.values.transfer_fee || ''}

                            InputProps={{
                                inputProps : {
                                    min : 0
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel htmlFor="upload-logo" className={classes.upload}>
                            {
                                logo.preview ? (
                                    <Avatar src={logo.preview} />
                                ) : (
                                    <>
                                        <CloudUploadIcon /> Upload Logo.
                                    </> 
                                )
                            }
                        </InputLabel>
                        <Input
                            type="file"
                            id="upload-logo"
                            name="logo"
                            style={{ display: "none" }}
                            onChange={handleChangeLogo}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <InputLabel htmlFor="upload-paper" className={classes.upload} >
                            {
                                paper.preview ? (
                                    paper.preview.slice(0 , 4) + "..." + paper.preview.slice(paper.preview.length - 10, paper.preview.length)
                                ) : (
                                    <>
                                        <CloudUploadIcon /> Upload WhitePaper.
                                    </> 
                                )
                            }
                        </InputLabel>
                        <Input
                            type="file"
                            id="upload-paper"
                            name='paper'
                            style={{ display: "none" }}
                            onChange={handleChangePaper}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button 
                            variant='contained' 
                            size='small'
                            onClick={() => handleAddToken()}
                            sx={{ pl : 2 , pr : 2 , mb : 3}} 
                            
                            fullWidth
                        >
                                Add Token
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
    error : state.dex.token.error
})
const mapDispatchToProps = {
    AddToken
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTokenForm) ;