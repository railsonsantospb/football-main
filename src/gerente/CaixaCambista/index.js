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
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [totalEntrada, setTotalEntrada] = useState({});
    const [entradasAbertas, setEntradasAbertas] = useState({});
    const [saidas, setSaidas] = useState({});
    const [comissoes, setComissoes] = useState({});
    const [nomesBancas, setNomesBancas] = useState([]);
    const [total, setTotal] = useState({});
    const [dataCambista, setDataCambista] = useState([]);
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


    let entradas = 0;
    let abertos = 0;
    let ganhos = 0;
    let perdeu = 0;
    let comissao = 0;





    let d = [];
    useEffect(() => {

        if (sessionStorage.getItem('manage') == null || sessionStorage.getItem('manage') == "") {
            history.push('/login')
        }



        async function getBancasAPI() {

            api.get('/api/getbilhetesgerentecaixa/' + sessionStorage.getItem('manage'))
                .then(res => {
                    try {
                        let bancas = [];
                        if (res.data) {
                            console.log(res.data.bilhetes);
                            for(let b in res.data.bilhetes){
                                bancas.push(b);
                                totalEntrada[b] = res.data.bilhetes[b].totalEntrada;
                                setTotalEntrada(totalEntrada);
                                entradasAbertas[b] = res.data.bilhetes[b].entradasAberto;
                                setEntradasAbertas(entradasAbertas);
                                saidas[b] = res.data.bilhetes[b].saidas;
                                setSaidas(saidas);
                                comissoes[b] = res.data.bilhetes[b].comissoes;
                                setComissoes(comissoes);
                                total[b] = res.data.bilhetes[b].total;
                                setTotal(total);

                            }

                            setNomesBancas(bancas);
                        }
                    } catch (e) {
                        console.log(e);

                    }
                }).catch(error => {
                console.log(error)
            });

        }

        setNomesBancas(d);
        setDataCambista(d);
        setDataAux(d);
        getBancasAPI();


    }, []);


    const getDatas = () => {

        let auxDate1 = selectedDate1.getFullYear() + "-" + (selectedDate1.getMonth() + 1) + "-" + selectedDate1.getDate();
        let auxDate2 = selectedDate2.getFullYear() + "-" + (selectedDate2.getMonth() + 1) + "-" + selectedDate2.getDate();


        if (new Date(auxDate1) < new Date(auxDate2)) {


            api.get('/api/getbilhetesgerentedates2/' + sessionStorage.getItem('manage') + '/' + auxDate1 + '/' + auxDate2)
                .then(res => {
                    try {


                        let bancas = [];
                        if (res.data) {
                            for(let b in res.data.bilhetes){
                                bancas.push(b);
                                totalEntrada[b] = res.data.bilhetes[b].totalEntrada;
                                setTotalEntrada(totalEntrada);
                                entradasAbertas[b] = res.data.bilhetes[b].entradasAberto;
                                setEntradasAbertas(entradasAbertas);
                                saidas[b] = res.data.bilhetes[b].saidas;
                                setSaidas(saidas);
                                comissoes[b] = res.data.bilhetes[b].comissoes;
                                setComissoes(comissoes);
                                total[b] = res.data.bilhetes[b].total;
                                setTotal(total);

                            }

                            setNomesBancas(bancas);

                        }
                    } catch (e) {
                        console.log(e);
                    }
                }).catch(error => {
                console.log(error)
            });

        }

    }

    return (
        <div className={classes.root} >
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


                                                            <Grid container justify="space-around">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}
                                                                                         locale={pt}>
                                                                    <KeyboardDatePicker
                                                                        label="Data Início"
                                                                        value={selectedDate1}
                                                                        onChange={date1 => handleDateChange1(date1)}
                                                                        format="dd/MM/yyyy"
                                                                    />

                                                                    <KeyboardDatePicker
                                                                        label="Data Final"
                                                                        placeholder="2018/10/10"
                                                                        value={selectedDate2}
                                                                        onChange={date2 => handleDateChange2(date2)}
                                                                        format="dd/MM/yyyy"
                                                                    />
                                                                </MuiPickersUtilsProvider>


                                                            </Grid>

                                                            <br/>
                                                            <Button onClick={getDatas} variant="contained"
                                                                    color="primary">
                                                                BUSCAR
                                                            </Button>
                                                            <br/><br/>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>

                                        <TableContainer component={Paper}>

                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align={"center"}><b>BANCA</b></StyledTableCell>
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

                                                    {nomesBancas.map((banca) => (
                                                        <StyledTableRow>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5">
                                                                    {banca}
                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5">
                                                                    R$ {totalEntrada[banca].toFixed(2)}
                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5">
                                                                    R$ {entradasAbertas[banca].toFixed(2)}
                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5">
                                                                    R$ {saidas[banca].toFixed(2)}
                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                <Typography variant="h5">
                                                                    R$ {comissoes[banca].toFixed(2)}
                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align={"center"} style={{width: '10px'}}>
                                                                {saidas[banca] > totalEntrada[banca] ?
                                                                    <Typography variant="h5">
                                                                        <b style={{color: 'red'}}>R$
                                                                            -{Math.abs(total[banca]).toFixed(2)}</b>
                                                                    </Typography> : <Typography variant="h5">
                                                                        <b style={{color: 'green'}}>R$ {Math.abs(total[banca]).toFixed(2)}</b>
                                                                    </Typography>}

                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>

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