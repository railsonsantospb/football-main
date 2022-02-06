import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {useHistory} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api} from '../Constantes/index';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {pt} from 'date-fns/locale';
import Menu from '../Menu/index';

let date = [];

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#3f51b5",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default function Dashboard(props) {

    let history = useHistory();
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [dateAfter, setDateAfter] = useState('');
    const [nomeBanca, setNomeBanca] = useState("");
    const [count, setCount] = useState([]);
    const [dataAux, setDataAux] = useState([]);
    // let dataAux = [];

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },

        appBarSpacer: theme.mixins.toolbar,
    }));

    const [selectedDate1, handleDateChange1] = useState(new Date());
    const [selectedDate2, handleDateChange2] = useState(new Date());


    const classes = useStyles();

    const handleCloseURL = () => {
        setOpenURL(false);
    };


    const handleCloseLoading = () => {
        setOpenLoading(false);
    };



    useEffect(() => {


        let unmounted = false;




        async function getLoginAPI() {

            api.get('/api/getbanca/' + sessionStorage.getItem('login'))
                .then(res => {
                    try {
                        if (res.data) {
                            setSaldoSimples(res.data.bancas.saldoSimples);
                            setSaldoGeral(res.data.bancas.saldoGeral);
                            setNomeBanca(res.data.bancas.nome);
                        }
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });

        }

        async function getBilhetesAPI() {
            document.getElementById("re").style.display = "none";
            document.getElementById("load").style.display = "block";
            api.get('/api/getbilhetes/' + sessionStorage.getItem('login'))
                .then(res => {
                    try {
                        if (res.data) {
                            let total = res.data.bilhetes.totalEntrada.toFixed(2) -
                                res.data.bilhetes.saidas.toFixed(2) -
                                res.data.bilhetes.comissoes.toFixed(2);

                            document.getElementById('entradas').innerText = 'R$ ' +
                                res.data.bilhetes.totalEntrada.toFixed(2);
                            document.getElementById('abertos').innerText = 'R$ ' +
                                res.data.bilhetes.entradasAberto.toFixed(2);
                            document.getElementById('ganhos').innerText = 'R$ ' +
                                res.data.bilhetes.saidas.toFixed(2);
                            document.getElementById('comissao').innerText = 'R$ ' +
                                res.data.bilhetes.comissoes.toFixed(2);

                            if(total >= 0){
                                document.getElementById('total').innerHTML = '<b style="color: green">R$ ' +
                                    res.data.bilhetes.total.toFixed(2) + '</b>';
                            } else {
                                document.getElementById('total').innerHTML = '<b style="color: red">R$ ' +
                                    res.data.bilhetes.total.toFixed(2) + '</b>';
                            }



                        }
                        document.getElementById("re").style.display = "block";
                        document.getElementById("load").style.display = "none";
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });

        }



        getBilhetesAPI();
        getLoginAPI();
        setDataAux([])

        return () => {
            unmounted = true;
        };


    }, []);



    return (
        <div className={classes.root}>
            <CssBaseline/>

            <Menu/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={2}>

                                    <Grid xs={12} md={12} sm={12} item>
                                        <Paper className={classes.paperX}>
                                            <Grid container spacing={2} key={127}>

                                                <Grid item sm container align="center">
                                                    <Grid item container direction="column" spacing={2}>

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <div id="load" style={{textAlign: 'center'}}>Carregando...</div>
                                        </Paper>
                                        <div id="re">
                                            <TableContainer component={Paper}>

                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell
                                                                align={"center"}><b>BANCA</b></StyledTableCell>
                                                            <StyledTableCell align={"center"}><b>TOTAL DE
                                                                ENTRADAS</b></StyledTableCell>
                                                            <StyledTableCell align={"center"}><b>ENTRADAS EM
                                                                ABERTO</b></StyledTableCell>
                                                            <StyledTableCell
                                                                align={"center"}><b>SAÍDAS</b></StyledTableCell>
                                                            <StyledTableCell
                                                                align={"center"}><b>COMISSÕES</b></StyledTableCell>
                                                            <StyledTableCell align={"center"}><b>TOTAL</b></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>

                                                        <StyledTableRow>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5">
                                                                    {nomeBanca}
                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5" id="entradas">

                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5" id="abertos">

                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5" id="ganhos">

                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5" id="comissao">

                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5" id="total">
                                                                </Typography>
                                                            </StyledTableCell>
                                                        </StyledTableRow>

                                                    </TableBody>
                                                </Table>
                                            </TableContainer></div>

                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Recent Deposits */}

                        {/* Recent Orders */}

                    </Grid>
                    <Dialog style={{wordWrap: 'break-word'}}
                            open={openURL} onClose={handleCloseURL} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{color: 'red'}}>AVISO!</DialogTitle>
                        <DialogContent>
                            <div className={classes.paper} style={{fontSize: '18px'}}>

                                {message.split('<br/>')}

                            </div>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseURL} color="primary">
                                Fechar
                            </Button>

                        </DialogActions>
                    </Dialog>

                    <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={openLoading} onClose={handleCloseLoading} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{color: 'red'}}></DialogTitle>
                        <DialogContent>
                            <div className={classes.paper}>
                                <CircularProgress color="secondary"/>
                            </div>

                        </DialogContent>
                        <DialogActions>

                        </DialogActions>
                    </Dialog>
                </Container>

            </main>

        </div>

    );

}