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
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api} from '../Constantes/index';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {pt} from 'date-fns/locale';
import Menu from '../Menu/index';

let tab;
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

export default function Dashboard() {

    let history = useHistory();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [openNavB, setOpenNavB] = useState("");
    const [data, setData] = useState([]);
    const [totalEntrada, setTotalEntrada] = useState(0);
    const [entradasAbertas, setEntradasAbertas] = useState(0);
    const [saidas, setSaidas] = useState(0);
    const [comissoes, setComissoes] = useState(0);
    const [total, setTotal] = useState(0);
    const [dataAux, setDataAux] = useState([]);


    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);


    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: "none",
        },
        title: {
            flexGrow: 1,
            marginLeft: "-30px",
        },
        drawerPaper: {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            overflow: "auto",
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            display: "flex",
            overflow: "auto",
            flexDirection: "column",
        },
        fixedHeight: {
            height: 240,
        },
        button: {
            width: 10,
        },
        drawer: {
            display: "none",
            flexShrink: 0,
        },
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





    function close(e) {
        try {
            if (e.clientX > 250) {
                document.getElementById("drawer").style.display = "none";
            }
        } catch (e) {
            //console.log(e);
        }
    }

    let d = [];
    useEffect(() => {

        if (sessionStorage.getItem('admin') == null || sessionStorage.getItem('admin') == "") {
            history.push('/adm')
        }

        let unmounted = false;



        async function getBancasAPI() {
            document.getElementById("re").style.display = "none";
            document.getElementById("load").style.display = "block";
            api.get('/api/getbilhetesa')
                .then(res => {
                    try {
                        if (res.data) {
                            console.log(res.data)
                            let total = (res.data.bilhetes.totalEntrada.toFixed(2) -
                                res.data.bilhetes.saidas.toFixed(2) -
                                res.data.bilhetes.comissoes.toFixed(2));

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
                        console.log(e);

                    }
                }).catch(error => {
                console.log(error)
            });

        }

        setDataAux(d);
        getBancasAPI();


        return () => {
            unmounted = true;
        };


    }, []);


    return (
        <div className={classes.root} onClick={close}>
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
                                                        <Grid item>


                                                        </Grid>
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