import React, { useEffect, useState } from 'react' ;

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { TokenList, DeleteToken } from '../../../../redux/actions/dex/token';

import * as config from '../../../../static/constants';

import TableLoading from '../../../Common/TableLoading';
import EmptyDataRow from '../../../Common/EmptyDataRow';
import swal from 'sweetalert' ;

import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ConstructionIcon from '@mui/icons-material/Construction';

import {
    Box,
    Grid,
    TableContainer,
    TablePagination,
    TableFooter,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Stack,
    TextField,
    ButtonGroup,
    Button,
    Tooltip
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        padding : '20px',

        backgroundColor : 'white',

        "& .MuiTableHead-root" : {
            "& .MuiTableCell-root" : {
                backgroundColor : 'lightgray'
            }
        },
        "& .MuiTableCell-root" :{
            padding : "0px !important",
            paddingTop : "5px !important",
            paddingBottom : "5px !important",
            textAlign : "center",
            fontSize : "14px" ,
            cursor : "pointer" ,
            fontFamily : [
                'Inter',
                '-apple-system',
                'BlinkMacSystemFont',
                'San Francisco',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'sans-serif'
            ].join(',')
        },
        "& .MuiTablePagination-root" : {
            "& .MuiTablePagination-selectLabel" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            },
            "& .MuiTablePagination-displayedRows" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            }
        }
    },
    tablecontainer : {
        border : '1px solid lightgray'
    },
    tablename : {
        fontSize : "20px",
        fontWeight : 600,

        cursor : 'pointer',
        
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    }
}))

const Token = (props) => {
    const classes = useStyles();

    const {
        tokenList,
        TokenList,
        DeleteToken
    } = props ;

    const headFields = [
        "Name",
        "Symbol",
        "Pair",
        "Address",
        "Decimal",
        "Deposit Fee",
        "Transfer Fee",
        "Logo",
        "WhitePaper",
        <SettingsOutlinedIcon />,
        <ConstructionIcon />
    ]

    const [page, setPage] = useState(0) ;
    const [rowsPerPage, setRowsPerPage] = useState(5) ;
    const [searchkey, setSearchKey] = useState('') ;
    const navigate = useNavigate() ;


    const handleSearchKey = (key) => {
        setSearchKey(key) ;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleAddToken = () => {
        navigate('/dex/addtoken') ;
    }

    const handleDeleteRow = async (_id) => {

        const isOk = await swal({
            title: "Are you sure?",
            text: "Are you sure you wish to delete this token?",
            icon: "warning",
            buttons: [
              'No, I am not sure!',
              'Yes, I am sure!'
            ],
        }) ;

        if(isOk) {
            let result = await DeleteToken(_id) ;

            if(result) TokenList() ;
        }
    }

    useEffect(() => {
        TokenList() ;
    },[]);

    return (
        <Box className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.tablename}>
                    CA1DEX  TOKEN LIST
                </Grid>
                <Grid item xs={12} >
                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                        <TextField 
                            size='small'
                            value={searchkey}
                            placeholder={'Search by token name or symbol or address.'}
                            onChange={(e) => handleSearchKey(e.target.value)}
                        />
                        <Box sx={{cursor : 'pointer'}}>
                            <Tooltip
                                title={'Add Token'}
                            >
                                <Button size='medium' variant='contained' color='info'
                                    startIcon={
                                        <AddTaskIcon /> 
                                    }
                                    onClick={() => handleAddToken()}
                                >
                                    Add Token
                                </Button>
                            </Tooltip>  
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer className={classes.tablecontainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {
                                        headFields.map((field, index) => {
                                            return (
                                                <TableCell key={index}>
                                                    { field }
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tokenList ? tokenList.length ? tokenList.filter(list => list.name.toLowerCase().search(searchkey) >= 0 || list.symbol.toLowerCase().search(searchkey) >= 0).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return(
                                            <TableRow key={index}>
                                                <TableCell sx={{minWidth : '90px'}}>{row.name}</TableCell>
                                                <TableCell sx={{minWidth : '50px'}}>{row.symbol}</TableCell>
                                                <TableCell sx={{minWidth : '70px'}}>{row.pair}</TableCell>
                                                <TableCell sx={{minWidth : '400px'}}>{row.token_address}</TableCell>
                                                <TableCell sx={{minWidth : '100px'}}>{row.decimal}</TableCell>
                                                <TableCell sx={{minWidth : '100px'}}>{row.deposit_fee}</TableCell>
                                                <TableCell sx={{minWidth : '100px'}}>{row.transfer_fee}</TableCell>
                                                <TableCell sx={{minWidth : '50px'}}>
                                                    <Box    
                                                        component={'img'} 
                                                        src={`${config.PUBLIC_CA1DEX_ADMIN_API}${row.logo}`} 
                                                        width={30} 
                                                        height={30}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{minWidth : '500px'}}>
                                                    <a 
                                                        href={`${config.PUBLIC_CA1DEX_ADMIN_API}${row.whitepaper}`} 
                                                        target='_blank'
                                                    >
                                                        {`${config.PUBLIC_CA1DEX_ADMIN_API}${row.whitepaper}`}
                                                    </a>
                                                </TableCell>
                                                <TableCell sx={{minWidth : '300px'}}>
                                                    <ButtonGroup>
                                                        <Button variant='contained' size='small' color='primary'>on Listing</Button>
                                                        <Button variant='contained' size='small' color='success'>Approve</Button>
                                                        <Button variant='contained' size='small' color='info'>Deny</Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                                <TableCell sx={{minWidth : '150px'}}>
                                                    <ButtonGroup>
                                                        <Button variant='contained' size='small' color='info'>Edit</Button>
                                                        <Button variant='contained' size='small' color='secondary'
                                                            onClick={() => handleDeleteRow(row._id)}
                                                        >Delete</Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }) : <EmptyDataRow colSpan={9} />:
                                    <TableLoading colSpan={9} />
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={tokenList ? tokenList.length : 1}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({
    tokenList : state.dex.token.tokenList
})
const mapDispatchToProps = {
    TokenList,
    DeleteToken
}
export default connect(mapStateToProps, mapDispatchToProps)(Token) ;