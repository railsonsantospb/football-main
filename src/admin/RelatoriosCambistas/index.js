import {makeStyles, withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
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
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Select from '@material-ui/core/Select';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
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
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


export default function Dashboard() {

    let history = useHistory();
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [totalEntrada, setTotalEntrada] = useState({});
    const [totalEntradaP, setTotalEntradaP] = useState(0);
    const [totalEntradaV, setTotalEntradaV] = useState(0);
    const [entradasAbertas, setEntradasAbertas] = useState({});
    const [entradasAbertasP, setEntradasAbertasP] = useState(0);
    const [entradasAbertasV, setEntradasAbertasV] = useState(0);
    const [saidas, setSaidas] = useState({});
    const [saidasP, setSaidasP] = useState(0);
    const [saidasV, setSaidasV] = useState(0);
    const [comissoes, setComissoes] = useState({});
    const [comissoesP, setComissoesP] = useState(0);
    const [comissoesV, setComissoesV] = useState(0);
    const [nomesBancas, setNomesBancas] = useState(new Set());
    const [nomesAux, setNomeAux] = useState(new Set());
    const [total, setTotal] = useState({});
    const [totalP, setTotalP] = useState(0);
    const [totalV, setTotalV] = useState(0);
    const [dataCambista, setDataCambista] = useState([]);
    const [dataAux, setDataAux] = useState([]);
    const [dataAuxB, setDataAuxB] = useState([]);
    const [balanco, setBalanco] = useState(0);
    const [gerentes, setGerentes] = useState({});
    const [done, setDone] = useState(0);
    const [graph, setGraph] = useState(0);
    const [selectedDate1, handleDateChange1] = useState(new Date());
    const [selectedDate2, handleDateChange2] = useState(new Date());

    const [nome, setNome] = React.useState('Todas');
    const [openS, setOpenS] = React.useState(false);

    const handleChangeS = (event) => {
        setNome(event.target.value);
    };

    const handleCloseS = () => {
        setOpenS(false);
    };

    const handleOpenS = () => {
        setOpenS(true);
    };

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

    const relatorios = [
        {
            "name": "Entradas",
            "Pré-Jogo": totalEntradaP,
            "Ao Vivo": totalEntradaV,

        },
        {
            "name": "Entradas Abertas",
            "Pré-Jogo": entradasAbertasP,
            "Ao Vivo": entradasAbertasV,

        },
        {
            "name": "Saídas",
            "Pré-Jogo": saidasP,
            "Ao Vivo": saidasV,

        },
        {
            "name": "Comissões",
            "Pré-Jogo": comissoesP,
            "Ao Vivo": comissoesV,

        },
        {
            "name": "Total",
            "Pré-Jogo": totalP,
            "Ao Vivo": totalV,

        }
    ]


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

        async function gerenteAPI(){
            api.get('/api/getgerencia')
                .then(res => {
                    if(res.data){
                        res.data.gerencias.map((g) =>{
                            gerentes[g.nome] = g.id;
                            nomesAux.add(g.nome);
                        })
                    }
                    setNomeAux(nomesAux);
                }).catch(error => {
                console.log(error)
            });
        }


        async function getBancasAPI() {
            document.getElementById("re").style.display = "none";
            document.getElementById("tb").style.display = "none";
            document.getElementById("load").style.display = "block";
            api.get('/api/getbilhetesgerentecaixaAdmin')
                .then(res => {
                    try {
                        let bancas = [];
                        let entradas = 0;
                        let abertos = 0;
                        let ganhos = 0;
                        let comissao = 0;
                        let entradasV = 0;
                        let abertosV = 0;
                        let ganhosV = 0;
                        let comissaoV = 0;
                        let totalPP = 0;
                        let totalVV = 0;
                        let b = 0;
                        if (res.data) {


                            entradas += res.data.bilhetes.totalEntrada[0];
                            entradasV += res.data.bilhetes.totalEntrada[1];


                            abertos += res.data.bilhetes.entradasAberto[0];
                            abertosV += res.data.bilhetes.entradasAberto[1];

                            ganhos += res.data.bilhetes.saidas[0];
                            ganhosV += res.data.bilhetes.saidas[1];

                            comissao += res.data.bilhetes.comissoes[0];
                            comissaoV += res.data.bilhetes.comissoes[1];

                            totalPP += res.data.bilhetes.total[0];
                            totalVV += res.data.bilhetes.total[1];

                            setDone((((entradas + entradasV) -
                                (ganhos + ganhosV) -
                                (comissao + comissaoV))));
                            setTotalEntradaP(entradas);
                            setTotalEntradaV(entradasV);
                            setEntradasAbertasP(abertos);
                            setEntradasAbertasV(abertosV);
                            setSaidasP(ganhos);
                            setSaidasV(ganhosV);
                            setComissoesP(comissao);
                            setComissoesV(comissaoV);
                            setTotalEntradaP(totalPP);
                            setTotalEntradaV(totalVV);

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

        gerenteAPI();

        getBancasAPI();


    }, []);


    const getDatas = () => {
        let entradas = 0;
        let abertos = 0;
        let ganhos = 0;
        let comissao = 0;
        let entradasV = 0;
        let abertosV = 0;
        let ganhosV = 0;
        let comissaoV = 0;
        let totalPP = 0;
        let totalVV = 0;
        setDone(0);
        setTotalEntradaP(entradas);
        setTotalEntradaV(entradasV);
        setEntradasAbertasP(abertos);
        setEntradasAbertasV(abertosV);
        setSaidasP(ganhos);
        setSaidasV(ganhosV);
        setComissoesP(comissao);
        setComissoesV(comissaoV);
        setTotalEntradaP(totalPP);
        setTotalEntradaV(totalVV);

        let n = '';
        let auxDate1 = selectedDate1.getFullYear() + "-" + (selectedDate1.getMonth() + 1) + "-" + selectedDate1.getDate();
        let auxDate2 = selectedDate2.getFullYear() + "-" + (selectedDate2.getMonth() + 1) + "-" + selectedDate2.getDate();

        if (new Date(auxDate1) <= new Date(auxDate2)) {

            document.getElementById("re").style.display = "none";
            document.getElementById("load").style.display = "block";

            api.get('/api/getbilhetesgerentedatesA/' + gerentes[nome] +
                '/' + auxDate1 + '/' + auxDate2 + '/all' )
                .then(res => {
                    let bancas = [];
                    try {


                        if (res.data) {

                            for(let b in res.data.bilhetes) {

                                bancas.push(b);

                                totalEntrada[b] = res.data.bilhetes[b].totalEntrada[0]+res.data.bilhetes[b].totalEntrada[1];
                                setTotalEntrada(totalEntrada);
                                entradasAbertas[b] = res.data.bilhetes[b].entradasAberto[0]+res.data.bilhetes[b].entradasAberto[1];
                                setEntradasAbertas(entradasAbertas);
                                saidas[b] = res.data.bilhetes[b].saidas[0]+res.data.bilhetes[b].saidas[1];
                                setSaidas(saidas);
                                comissoes[b] = res.data.bilhetes[b].comissoes[0]+res.data.bilhetes[b].comissoes[1];
                                setComissoes(comissoes);
                                total[b] = res.data.bilhetes[b].total[0]+res.data.bilhetes[b].total[1];
                                setTotal(total);

                                entradas += res.data.bilhetes[b].totalEntrada[0];
                                entradasV += res.data.bilhetes[b].totalEntrada[1];


                                abertos += res.data.bilhetes[b].entradasAberto[0];
                                abertosV += res.data.bilhetes[b].entradasAberto[1];

                                ganhos += res.data.bilhetes[b].saidas[0];
                                ganhosV += res.data.bilhetes[b].saidas[1];

                                comissao += res.data.bilhetes[b].comissoes[0];
                                comissaoV += res.data.bilhetes[b].comissoes[1];

                                totalPP += res.data.bilhetes[b].total[0];
                                totalVV += res.data.bilhetes[b].total[1];

                                setDone((((entradas + entradasV) -
                                    (ganhos + ganhosV) -
                                    (comissao + comissaoV))));
                                setTotalEntradaP(entradas);
                                setTotalEntradaV(entradasV);
                                setEntradasAbertasP(abertos);
                                setEntradasAbertasV(abertosV);
                                setSaidasP(ganhos);
                                setSaidasV(ganhosV);
                                setComissoesP(comissao);
                                setComissoesV(comissaoV);
                                setTotalEntradaP(totalPP);
                                setTotalEntradaV(totalVV);
                            }
                        }
                        document.getElementById("re").style.display = "block";
                        document.getElementById("tb").style.display = "block";
                        document.getElementById("load").style.display = "none";
                        setNomesBancas(bancas);

                    } catch (e) {
                        console.log(e);
                    }
                }).catch(error => {
                console.log(error)
            });
            setNomesBancas(nomesBancas);
            setDataAux([]);
        }


    }


    return (
        <div className={classes.root} onClick={close}>
            <CssBaseline/>
            <Menu/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container className={classes.container}>
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


                                                            <Typography variant="h5">RELATÓRIO</Typography>
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
                                                                        value={selectedDate2}
                                                                        onChange={date2 => handleDateChange2(date2)}
                                                                        format="dd/MM/yyyy"
                                                                    />
                                                                </MuiPickersUtilsProvider>


                                                            </Grid>
                                                            <FormControl className={classes.formControl}>
                                                                <InputLabel id="demo-controlled-open-select-label">Selecione
                                                                    uma Gerencia</InputLabel>
                                                                <Select
                                                                    labelId="demo-controlled-open-select-label"
                                                                    id="demo-controlled-open-select"
                                                                    open={openS}
                                                                    onClose={handleCloseS}
                                                                    onOpen={handleOpenS}
                                                                    value={nome}
                                                                    onChange={handleChangeS}
                                                                    style={{width: '280px'}}
                                                                >
                                                                    <MenuItem value="Todas">
                                                                        <em>Todas</em>
                                                                    </MenuItem>
                                                                    {[...nomesAux].map((n) => (
                                                                        <MenuItem value={n}>{n}</MenuItem>
                                                                    ))}

                                                                </Select>
                                                            </FormControl>
                                                            <br/>
                                                            <br/>
                                                            <Button onClick={getDatas} variant="contained"
                                                                    color="primary">
                                                                BUSCAR
                                                            </Button>
                                                            <br/>
                                                            <br/>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                        <br/>
                                        <div id="re">
                                            {done < 0 ? <Typography variant="h5" align="center">
                                                Balanço: <b style={{color: 'red'}}>R$ {done.toFixed(2)}</b>
                                            </Typography> : <Typography variant="h5" align="center">
                                                Balanço: <b style={{color: 'green'}}>R$ {done.toFixed(2)}</b>
                                            </Typography>}
                                            <br/>
                                            <Grid item>

                                                <ResponsiveContainer width='100%' height={400}>
                                                    <BarChart data={graph == 0 ? relatorios : graph}>
                                                        <CartesianGrid strokeDasharray="3 3"/>
                                                        <XAxis dataKey="name"/>
                                                        <YAxis/>
                                                        <Tooltip/>
                                                        <Legend/>
                                                        <Bar dataKey="Pré-Jogo" fill="#8884d8"/>
                                                        <Bar dataKey="Ao Vivo" fill="#82ca9d"/>
                                                    </BarChart>
                                                </ResponsiveContainer>

                                            </Grid>
                                            <br/>
                                            <br/>
                                            <Grid item>
                                                <TableContainer component={Paper} id="tb">

                                                    <Table stickyHeader aria-label="sticky table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell
                                                                    align={"center"}><b>BANCA</b></StyledTableCell>
                                                                <StyledTableCell align={"center"}><b>TOTAL DE
                                                                    ENTRADAS</b></StyledTableCell>
                                                                <StyledTableCell align={"center"}><b>ENTRADAS EM ABERTO</b></StyledTableCell>
                                                                <StyledTableCell
                                                                    align={"center"}><b>SAÍDAS</b></StyledTableCell>
                                                                <StyledTableCell
                                                                    align={"center"}><b>COMISSÕES</b></StyledTableCell>
                                                                <StyledTableCell
                                                                    align={"center"}><b>TOTAL</b></StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>

                                                        <TableBody>

                                                            {[...nomesBancas].map((banca) => (
                                                                console.log(saidas[banca], total[banca]),
                                                                    <StyledTableRow>
                                                                        <StyledTableCell align={"center"}
                                                                                         style={{width: '10px'}}>
                                                                            <Typography variant="h5">
                                                                                {banca}
                                                                            </Typography>
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align={"center"}
                                                                                         style={{width: '10px'}}>
                                                                            <Typography variant="h5">
                                                                                R$ {totalEntrada[banca].toFixed(2)}
                                                                            </Typography>
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align={"center"}
                                                                                         style={{width: '10px'}}>
                                                                            <Typography variant="h5">
                                                                                R$ {entradasAbertas[banca].toFixed(2)}
                                                                            </Typography>
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align={"center"}
                                                                                         style={{width: '10px'}}>
                                                                            <Typography variant="h5">
                                                                                R$ {saidas[banca].toFixed(2)}
                                                                            </Typography>
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align={"center"}
                                                                                         style={{width: '10px'}}>
                                                                            <Typography variant="h5">
                                                                                R$ {comissoes[banca].toFixed(2)}
                                                                            </Typography>
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align={"center"}
                                                                                         style={{width: '10px'}}>
                                                                            {total[banca] < 0 ?
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
                                            </Grid></div><div id="load" style={{textAlign: 'center'}}>Carregando...</div>

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