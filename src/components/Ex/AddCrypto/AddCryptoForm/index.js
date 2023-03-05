import React, { useState, useEffect } from 'react' ;

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { AddCrypto, BaseCryptoList } from '../../../../redux/actions/ex/crypto';

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
    FormGroup,
    FormControlLabel,
    Checkbox,
    Autocomplete
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
    },
    pdfPreview : {
        fontWeight : 600,
        paddingLeft : 15,
        paddingRight : 15,
        borderBottom : '2px solid gray'
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
    deposit_fee: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    transfer_fee: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    withdraw_fee : {
        presence : { allowEmpty : false, message : 'is required'}
    },
    transaction_fee : {
        presence : { allowEmpty : false, message : 'is required'}
    },
    is_base : {
        presence : { allowEmpty : false, message : 'is required'}
    },
    is_deposit : {
        presence : { allowEmpty : false, message : 'is required'}
    },
    is_withdraw : {
        presence : { allowEmpty : false, message : 'is required'}
    },
    logo : {
        presence: { allowEmpty: false, message: 'is required' },
    },
    paper : {
        presence: { allowEmpty: false, message: 'is required' },
    },
};

const AddCryptoForm = (props) => {

    const classes = useStyles() ;

    const navigate = useNavigate() ;

    const {
        error,
        handleImagePreview, handlePdfPreview,
        baseCryptoList,
        AddCrypto,
        BaseCryptoList
    } = props ;
    
    const [logo, setLogo] = useState({ preview: "", raw: "" });
    const [paper, setPaper] = useState({ preview: "", raw: "" });
    const [ pairList, setPairList ] = useState([]) ;

    const [formState, setFormState] = useState({
        isValid: false,
        values: {
            is_base : false,
            is_deposit : false,
            is_withdraw : false,
            address : null
        },
        touched: {},
        errors: {},
    });

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    const handlePairListChange = async (value) => {
        setPairList(value) ;
    }

    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'file'
                    ? event.target.files[0] 
                    : event.target.type === 'checkbox'
                    ? event.target.checked
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

            handleImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleChangePaper = e => {
        handleChange(e) ;
        if (e.target.files.length) {
            setPaper({
                preview: e.target.files[0].name,
                raw: e.target.files[0]
            });

            handlePdfPreview(URL.createObjectURL(e.target.files[0])) ;
        }
    }

    const handleAddCrypto = async () => {

        if(formState.isValid){
            AddCrypto({
                ...formState.values,
                pair_list : pairList
            }, navigate) ;
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

    useEffect(() => {
        BaseCryptoList() ;
    }, []) ;

    useEffect(() => {
        if(baseCryptoList) handlePairListChange(baseCryptoList);
    }, [baseCryptoList]);

    return (
        <Box className={clsx( classes.root , classes.flex )}>
            <Box  className={classes.controls }>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Box className={classes.tablename} >
                            Add Crypto
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
                            
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name={"address"}
                            label='Address'
                            size='small'

                            helperText={hasError('address') ? formState.errors.address[0] : null}
                            error={hasError('address')} 
                            onChange={handleChange}
                            value={formState.values.address || ''}

                            fullWidth
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

                            fullWidth
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

                            fullWidth
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

                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            name={"withdraw_fee"}
                            label='Withdraw Fee'
                            size='small'
                            type={'number'}

                            helperText={hasError('withdraw_fee') ? formState.errors.withdraw_fee[0] : null}
                            error={hasError('withdraw_fee')}
                            onChange={handleChange}
                            value={formState.values.withdraw_fee || ''}

                            InputProps={{
                                inputProps : {
                                    min : 0
                                }
                            }}

                            fullWidth
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

                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            name={"transaction_fee"}
                            label='Transaction Fee'
                            size='small'
                            type={'number'}

                            helperText={hasError('transaction_fee') ? formState.errors.transaction_fee[0] : null}
                            error={hasError('transaction_fee')}
                            onChange={handleChange}
                            value={formState.values.transaction_fee || ''}

                            InputProps={{
                                inputProps : {
                                    min : 0
                                }
                            }}

                            fullWidth
                        />
                    </Grid>
                    {
                        ( baseCryptoList && baseCryptoList.length )  ? <Grid item xs={12}>
                                                <Autocomplete
                                                    multiple
                                                    id="tags-standard"
                                                    options={baseCryptoList}
                                                    getOptionLabel={(option) => option.symbol}
                                                    isOptionEqualToValue ={(option,value) => option.symbol === value.symbol}
                                                    defaultValue={[baseCryptoList[0]]}
                                                    onChange={(e, value) => handlePairListChange(value)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Pair"
                                                            placeholder="Symbol"
                                                            size='small'
                                                        />
                                                    )}
                                                />
                                            </Grid> : <></>
                    }
                    
                    <Grid item xs={12}>
                            <Grid item xs={12} >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                name="is_base"
                                                color="primary"
                                                onChange={handleChange}
                                                checked={formState.values.is_base}
                                            />
                                        }
                                        label={
                                            <Box component={'span'}>
                                                Base Coin
                                            </Box>
                                        }
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                name="is_deposit"
                                                color="primary"
                                                onChange={handleChange}
                                                checked={formState.values.is_deposit || false}
                                            />
                                        }
                                        label={
                                            <Box component={'span'}>
                                                Deposit Coin
                                            </Box>
                                        }
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                name="is_withdraw"
                                                color="primary"
                                                onChange={handleChange}
                                                checked={formState.values.is_withdraw || false}
                                            />
                                        }
                                        label={
                                            <Box component={'span'}>
                                                Withdraw Coin
                                            </Box>
                                        }
                                    />
                                </FormGroup>
                            </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel htmlFor="upload-logo" className={classes.upload}>
                            {
                                logo.preview ? (
                                    <>
                                        <Avatar src={logo.preview} />
                                    </>
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
                                    <Box className={classes.pdfPreview}>
                                        {paper.preview}
                                    </Box>
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
                            onClick={() => handleAddCrypto()}
                            sx={{ pl : 2 , pr : 2 , mb : 3}} 
                            
                            fullWidth
                        >
                                Edit Crypto
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

AddCryptoForm.propTypes = {
    BaseCryptoList : PropTypes.func.isRequired,
    AddCrypto : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    error : state.ex.crypto.error,
    baseCryptoList : state.ex.crypto.baseCryptoList
})
const mapDispatchToProps = {
    AddCrypto,
    BaseCryptoList
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCryptoForm) ;