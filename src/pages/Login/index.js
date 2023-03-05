
import React, { useState, useEffect } from 'react' ;

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import ReCAPTCHA from 'react-google-recaptcha' ;
import validate from 'validate.js';

import { SignInEx } from '../../redux/actions/ex/auth' ;
import { SignInDex } from '../../redux/actions/dex/auth' ;

import clsx from 'clsx' ;

import { makeStyles } from '@mui/styles';

import {
    Box,
    Grid,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button
} from '@mui/material' ;

const useStyles = makeStyles((theme) => ({
    root : {
        height : '100vh',

        overflow : 'hidden',
        overflowY : 'scroll' ,
        
        "& .MuiGrid-item" : {
            textAlign : 'center'
        }
    },
    panel : {
        paddingLeft : '5%',
        paddingRight : '5%',
        paddingTop : "20px",
        paddingBottom : '20px',
        width : '50%' ,
        backgroundColor : 'white'
    },
    title : {
        paddingBottom : '10px',
        color : theme.palette.primary.main,
        fontSize : '30px',
        fontWeight : 600
    },
    description : {
        paddingBottom : '20px',
        fontWeight : '600' ,
        fontSize : '40px'
    },
    label : {
        textAlign : 'left',
        color : 'gray'
    },
    flex : {
        display : 'flex' ,
        alignItems : 'center' ,
        justifyContent : 'center',
    }
}))

const schema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
        maximum: 300,
        },
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
        minimum: 8,
        },
    },
};

const Login = (props) => {
    
    const classes = useStyles() ;

    const navigate = useNavigate() ;
    const {
        to,
        exAuthenticated,
        dexAuthenticated,
        SignInEx,
        SignInDex
    } = props ;

    const [captcha, setCaptcha] = useState(true);

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));
    };

    const handleSubmit = async () => {
        if(formState.isValid){
            if(to === "ex") {
                await SignInEx(formState.values, navigate) ;
            }
            if(to === "dex") {
                await SignInDex(formState.values, navigate) ;
            }
        }
    }

    const onHandleRecaptcha = (value) => {
        setCaptcha(value);
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
        if(to) {
            switch(to) {
                case "ex" :
                    if(exAuthenticated) navigate('/ex/user');
                    break ;
                case "dex":
                    if(dexAuthenticated) navigate('/dex/token') ;
                 default :
                    break;
            }
        }
    }, [to]) ;

    return (
        <Box className={clsx(classes.root, classes.flex)}>
            <Box className={clsx(classes.panel, classes.flex)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.title}>
                        CA1 Blockchain App Admin
                    </Grid>
                    <Grid item xs={12} className={classes.description}>
                        Login to
                        {
                            to === "ex" && ' EX'
                        }
                        {
                            to === "dex" && ' DEX'
                        }
                        {
                            to === "swap" && ' Swap'
                        }
                        {
                            to === "remit" && ' Remit'
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.label}>
                            Enter your email
                        </Box>
                        <TextField
                            name={"email"}
                            type="email"
                            size={'small'}
                            placeholder={'E-mail'}
                            fullWidth
                            
                            helperText={hasError('email') ? formState.errors.email[0] : null}
                            error={hasError('email')}
                            onChange={handleChange}
                            value={formState.values.email || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.label}>
                            Enter your password
                        </Box>
                        <TextField
                            name={"password"}
                            type={"password"}
                            size={'small'}
                            placeholder={'Password'}
                            fullWidth
                            
                            helperText={
                                hasError('password') ? formState.errors.password[0] : null
                            }
                            error={hasError('password')}
                            onChange={handleChange}
                            value={formState.values.password || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ReCAPTCHA 
                            sitekey='6LeKxQwaAAAAAGPOpMltsXMf5Jv5s8_iuIPgn7jA'
                            onChange={onHandleRecaptcha}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name='is_check'
                                    />
                                }
                                label={
                                    <Box component={'span'}>
                                        Remember me on this device
                                    </Box>
                                }
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant={'contained'} size={'medium'} fullWidth onClick={handleSubmit}>Login</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
    exAuthenticated : state.ex.auth.isAuthenticated,
    dexAuthenticated : state.dex.auth.isAuthenticated
})
const mapDispatchToProps = {
    SignInEx,
    SignInDex
}

export default connect(mapStateToProps, mapDispatchToProps)(Login) ;