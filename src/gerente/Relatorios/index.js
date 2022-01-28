import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {
    Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api} from '../Constantes/index';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { pt } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    const [done, setDone] = useState(0);
    const [graph, setGraph] = useState(0);
    const [selectedDate1, handleDateChange1] = useState(new Date());
    const [selectedDate2, handleDateChange2] = useState(new Date());

    const [nome, setNome] = React.useState('');
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



        let b = 0;

        let entradas = 0;
        let abertos = 0;
        let ganhos = 0;
        let perdeu = 0;
        let comissao = 0;
        let entradasV = 0;
        let abertosV = 0;
        let ganhosV = 0;
        let perdeuV = 0;
        let comissaoV = 0;
        for (let datas of dataAuxB) {

            let st = datas[3].replaceAll('{', '').replaceAll('}', '');
            let result = ((st.split(',').length == datas[8]));
            let valor = (result == true && st.indexOf('Aberto') != -1 ? 'Aberto' : 
            st.indexOf('Perdeu') != -1 ? 'Perdeu' : 
            st.indexOf('Perdeu') == -1 && st.indexOf('Aberto') == -1 && st.indexOf('Cancelado') == -1 ? 'Ganhou' :
            st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') == -1 && st.indexOf('Aberto') == -1 ? 'Cancelado' : 
            st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') != -1 || st.indexOf('Cacenlado') != -1 &&
            st.indexOf('Aberto') == -1 ? 'Ganhou' : 'Aberto');

            if(datas[0] == 'Pre-Jogo'){
                if(valor != 'Cancelado'){
                    entradas += parseFloat(datas[4]);
                    comissao += parseFloat(datas[5]);
                }
                if (valor == 'Aberto') {
                    abertos += parseFloat(datas[4]);
                } else if (valor == 'Ganhou') {
                    ganhos += parseFloat(datas[7]);
                } else if (valor == 'Perdeu') {
                    perdeu += parseFloat(datas[4]);
                }
                
            } else {
                if(valor != 'Cancelado'){
                    entradasV += parseFloat(datas[4]);
                    comissaoV += parseFloat(datas[5]);
                }
                if (valor == 'Aberto') {
                    abertosV += parseFloat(datas[4]);
                } else if (valor == 'Ganhou') {
                    ganhosV += parseFloat(datas[7]);
                } else if (valor == 'Perdeu') {
                    perdeuV += parseFloat(datas[4]);
                }
            }
            relatorios[0]['Pré-Jogo'] = entradas.toFixed(2);
            relatorios[0]['Ao Vivo'] = entradasV.toFixed(2);

            relatorios[1]['Pré-Jogo'] = abertos.toFixed(2);
            relatorios[1]['Ao Vivo'] = abertosV.toFixed(2);

            relatorios[2]['Pré-Jogo'] = ganhos.toFixed(2);
            relatorios[2]['Ao Vivo'] = ganhosV.toFixed(2);

            relatorios[3]['Pré-Jogo'] = comissao.toFixed(2);
            relatorios[3]['Ao Vivo'] = comissaoV.toFixed(2);

            relatorios[4]['Pré-Jogo'] = ((((entradas - ganhos - comissao)))).toFixed(2);
            relatorios[4]['Ao Vivo'] = ((((entradasV - ganhosV - comissaoV)))).toFixed(2);
            b = (((entradas+entradasV)- (ganhos+ganhosV) - (comissao+comissaoV)));

        }

    entradas = 0;
    abertos = 0;
    ganhos = 0;
    perdeu = 0;
    comissao = 0;

    function loadCaixa(banca) {
        entradas = 0;
        abertos = 0;
        ganhos = 0;
        perdeu = 0;
        comissao = 0;
        
        for (let datas of dataAux) {

            let st = datas[3].replaceAll('{', '').replaceAll('}', '');
            let result = ((st.split(',').length == datas[8]));
            let valor = (result == true && st.indexOf('Aberto') != -1 ? 'Aberto' : 
            st.indexOf('Perdeu') != -1 ? 'Perdeu' : 
            st.indexOf('Perdeu') == -1 && st.indexOf('Aberto') == -1 && st.indexOf('Cancelado') == -1 ? 'Ganhou' :
            st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') == -1 && st.indexOf('Aberto') == -1 ? 'Cancelado' : 
            st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') != -1 || st.indexOf('Cacenlado') != -1 &&
            st.indexOf('Aberto') == -1 ? 'Ganhou' : 'Aberto');
            
            if(valor != 'Cancelado'){
                entradas += parseFloat(datas[4]);
                comissao += parseFloat(datas[5]);
            }
            
            if (valor == 'Aberto') {
                abertos += parseFloat(datas[4]);
            } else if (valor == 'Ganhou') {
                ganhos += parseFloat(datas[7]);
            } else if (valor == 'Perdeu') {
                perdeu += parseFloat(datas[4]);
            }
            
        }

        if((totalEntrada[banca]) != undefined) {
            totalEntrada[banca] = totalEntrada[banca]+entradas
            setTotalEntrada(totalEntrada);
            entradasAbertas[banca] = entradasAbertas[banca]+abertos;
            setEntradasAbertas(entradasAbertas);
            saidas[banca] = saidas[banca]+ganhos;
            setSaidas(saidas);
            comissoes[banca] = comissoes[banca]+comissao
            setComissoes(comissoes);
            total[banca] = total[banca]+((entradas - ganhos - comissao));
            setTotal(total);
        } else {
            totalEntrada[banca]=entradas;
            setTotalEntrada(totalEntrada);
            entradasAbertas[banca]=abertos;
            setEntradasAbertas(entradasAbertas);
            saidas[banca]=ganhos;
            setSaidas(saidas);
            comissoes[banca]=comissao;
            setComissoes(comissoes);
            total[banca]=((entradas - ganhos - comissao));
            setTotal(total);
        }

        let v = 0;
        for(let i in total){
            v += total[i];
        }
        setDone(v);

    }



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
        
        if (sessionStorage.getItem('manage') == null || sessionStorage.getItem('manage') == "") {
            history.push('/login')
        }

        async function getDateAll() {
            axios.get('http://worldclockapi.com/api/json/utc/now',
                {

                }).then(res => {
                    try {

                        let d1 = Date.parse(res.data.currentDateTime);
                        d1 = new Date(d1);
                        d1 = d1.setDate(d1.getDate());

                        let d2 = Date.parse(res.data.currentDateTime);
                        d2 = new Date(d2);
                        d2 = d2.setDate(d2.getDate() + 1);

                        d1 = new Date(d1);
                        d2 = new Date(d2);


                        date = [d1.getFullYear() + "-" + (Number(d1.getMonth()) + 1 < 10 ? "0" + (Number(d1.getMonth()) + 1) :
                            Number(d1.getMonth()) + 1) + "-" + d1.getDate(), d2.getFullYear() + "-" +
                            (Number(d2.getMonth()) + 1 < 10 ? "0" + (Number(d2.getMonth()) + 1) :
                                Number(d2.getMonth()) + 1) + "-" + d2.getDate()];

                        localStorage.setItem("date", date);


                    } catch (e) {
                        console.log(e);
                    }
                }).catch(error => {
                    console.log(error);
                });
        }

        getDateAll();

        async function getBancasAPI() {

            api.get('/api/getbilhetesgerente/'+sessionStorage.getItem('manage'))
                .then(res => {
                    try {
                        if (res.data) {
                            //     ["SD76-KJ5G", "kakuzo", "07/04/2021 07:30:23", "Perdeu", "3.00", "0.30", "16.00",
                            //         "260.00", "M", "Agendado", <Button variant="contained" color="secondary"><CancelIcon /></Button>,
                            //         <Button variant="contained" color="primary"><PrintIcon /></Button>],
                            // ];

                            res.data.bilhetes.map((b) => {
                                console.log(b);
                                nomesBancas.add(b.nomeBanca);
                                nomesAux.add(b.nomeBanca);
                                
                                dataAux.push([
                                    b.tipoDeJogo,
                                    b.nomeCliente,
                                    b.dataDaAposta,
                                    b.status,
                                    b.valorDeEntrada,
                                    b.comissao,
                                    b.cotacao,
                                    b.valorDeSaida,
                                    b.quantidadeJogos
                                ]);
                                dataAuxB.push([
                                    b.tipoDeJogo,
                                    b.nomeCliente,
                                    b.dataDaAposta,
                                    b.status,
                                    b.valorDeEntrada,
                                    b.comissao,
                                    b.cotacao,
                                    b.valorDeSaida,
                                    b.quantidadeJogos
                                ]);
                                loadCaixa(b.nomeBanca);
                             
                                dataAux.pop();
                            })
                            setNomesBancas(nomesBancas);
                            setNomeAux(nomesAux);
                        }
                    } catch (e) {
                        console.log(e);

                    }
                }).catch(error => {
                console.log(error)
            });

        }

        setNomesBancas(d);
        setNomeAux(d);
        setDataCambista(d);
        setDataAux(d);
        getBancasAPI();


    }, []);




    const getDatas = () => {
        entradas = 0;
        abertos = 0;
        ganhos = 0;
        perdeu = 0;
        comissao = 0;
        let somaP = 0;
        let soma = 0;
        let entradasP = 0;
        let abertosP = 0;
        let saidaP = 0;
        let totalP = 0;
        let comissaoP = 0;
        setBalanco(0);
        setTotalEntradaP(0);
        setEntradasAbertasP(0);
        setSaidasP(0);
        setTotalP(0);
        setComissoesP(0);
        let somaV = 0;
        let entradasV = 0;
        let abertosV = 0;
        let saidaV = 0;
        let totalV = 0;
        let comissaoV = 0;
        setTotalEntradaV(0);
        setEntradasAbertasV(0);
        setSaidasV(0);
        setTotalV(0);
        setComissoesV(0);

        let n = '';
        let auxDate1 = selectedDate1.getFullYear() + "-" + (selectedDate1.getMonth() + 1) + "-" + selectedDate1.getDate();
        let auxDate2 = selectedDate2.getFullYear() + "-" + (selectedDate2.getMonth() + 1) + "-" + selectedDate2.getDate();

        if(new Date(auxDate1) <= new Date(auxDate2)){
            if(nome != '' && nome != 'Todas'){

                nomesBancas.clear();
                nomesBancas.add(nome);
                n = nome;
            } else {

                [...nomesAux].map((b)=>{
                    nomesBancas.add(b);
                });
                n = 'empty';
            }
            [...nomesBancas].map((banca) => {

                    totalEntrada[banca]=entradas;
              
                    entradasAbertas[banca]=abertos;
         
                    saidas[banca]=ganhos;
                
                    comissoes[banca]=comissao;
               
                    total[banca]=((entradas - ganhos - comissao));
                    setDone(total[banca]);


            })



          

            api.get('/api/getbilhetesgerentedates/'+sessionStorage.getItem('manage')+'/'+auxDate1+'/'+auxDate2+'/'+n)
                .then(res => {
                    try {
                        console.log(res.data);

                        if (res.data) {

                            res.data.bilhetes.map((b) => {
                                entradas = 0;
                                abertos = 0;
                                ganhos = 0;
                                perdeu = 0;
                                comissao = 0;

                                let st = b.status.replaceAll('{', '').replaceAll('}', '');
                                let result = ((st.split(',').length == b.quantidadeJogos));
                                let valor = (result == true && st.indexOf('Aberto') != -1 ? 'Aberto' : 
                                st.indexOf('Perdeu') != -1 ? 'Perdeu' : 
                                st.indexOf('Perdeu') == -1 && st.indexOf('Aberto') == -1 && st.indexOf('Cancelado') == -1 ? 'Ganhou' :
                                st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') == -1 && st.indexOf('Aberto') == -1 ? 'Cancelado' : 
                                st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') != -1 || st.indexOf('Cacenlado') != -1 &&
                                st.indexOf('Aberto') == -1 ? 'Ganhou' : 'Aberto');


                                if(valor != 'Cancelado'){
                                    entradas += parseFloat(b.valorDeEntrada);
                                    comissao += parseFloat(b.comissao);
                                }
                                if (valor == 'Aberto') {
                                    abertos += parseFloat(b.valorDeEntrada);
                                } else if (valor == 'Ganhou') {
                                    ganhos += parseFloat(b.valorDeSaida);
                                } else if (valor == 'Perdeu') {
                                    perdeu += parseFloat(b.valorDeEntrada);

                                }
                                
                                soma += ((entradas - ganhos - comissao));

                                if((totalEntrada[b.nomeBanca]) != undefined) {
                                    totalEntrada[b.nomeBanca] = totalEntrada[b.nomeBanca]+entradas
                             
                                    entradasAbertas[b.nomeBanca] = entradasAbertas[b.nomeBanca]+abertos;
                                    
                                    saidas[b.nomeBanca] = saidas[b.nomeBanca]+ganhos;
                                   
                                    comissoes[b.nomeBanca] = comissoes[b.nomeBanca]+comissao
                                   
                                    total[b.nomeBanca] = total[b.nomeBanca]+((entradas - ganhos - comissao));
                                   


                                } else {

                                    totalEntrada[b.nomeBanca]=entradas;
                              
                                    entradasAbertas[b.nomeBanca]=abertos;
                         
                                    saidas[b.nomeBanca]=ganhos;
                                
                                    comissoes[b.nomeBanca]=comissao;
                               
                                    total[b.nomeBanca]=((entradas - ganhos - comissao));
                                                                        


                                }
                              
                                setDone(soma);
                                if(b.tipoDeJogo == 'Pre-Jogo'){
                                    somaP += ((entradas - ganhos - comissao));
                                    entradasP += entradas;
                                    abertosP += abertos;
                                    comissaoP += comissao;
                                    saidaP += ganhos;

                                    // setTotalEntradaP(entradasP);
                                    // setEntradasAbertasP(abertosP);
                                    // setSaidasP(saidaP);
                                    // setTotalP(somaP);
                                    // setComissoesP(comissaoP);
                                    relatorios[0]['Pré-Jogo'] = entradasP;
                                    relatorios[1]['Pré-Jogo'] = abertosP;
                                    relatorios[2]['Pré-Jogo'] = saidaP;
                                    relatorios[3]['Pré-Jogo'] = comissaoP;
                                    relatorios[4]['Pré-Jogo'] = somaP;
                                 
                                    
                                    
                                } else {
                                    somaV += ((entradas - ganhos - comissao));
                                    entradasV += entradas;
                                    abertosV += abertos;
                                    comissaoV += comissao;
                                    saidaV += ganhos;
                                    relatorios[0]['Ao Vivo'] = entradasV;
                                    relatorios[1]['Ao Vivo'] = abertosV;
                                    relatorios[2]['Ao Vivo'] = saidaV;
                                    relatorios[3]['Ao Vivo'] = comissaoV;
                                    relatorios[4]['Ao Vivo'] = somaV;

                                    // setTotalEntradaV(entradasV);
                                    // setEntradasAbertasV(abertosV);
                                    // setSaidasV(saidaV);
                                    // setTotalP(somaV);
                                    // setComissoesV(comissaoV);
                                }
                                



                               

                            })
                            setGraph(relatorios);
                        }
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
            <CssBaseline />
            <Menu/>    
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
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
                                                        <Grid item >


                                                            <Typography variant="h5">RELATÓRIO</Typography>
                                                            <Grid container justify="space-around">

                                                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt}>
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
                                                                <InputLabel id="demo-controlled-open-select-label">Selecione uma Banca</InputLabel>
                                                                <Select
                                                                    labelId="demo-controlled-open-select-label"
                                                                    id="demo-controlled-open-select"
                                                                    open={openS}
                                                                    onClose={handleCloseS}
                                                                    onOpen={handleOpenS}
                                                                    value={nome}
                                                                    onChange={handleChangeS}
                                                                    style={{ width: '280px' }}
                                                                >
                                                                    <MenuItem value="Todas">
                                                                        <em>Todas</em>
                                                                    </MenuItem>
                                                                    {[...nomesAux].map((n)=>(
                                                                        <MenuItem value={n}>{n}</MenuItem>
                                                                    ))}

                                                                </Select>
                                                            </FormControl>
                                                            <br />
                                                            <br />
                                                            <Button onClick={getDatas} variant="contained" color="primary">
                                                                BUSCAR
                                                            </Button>
                                                            <br />
                                                            <br />
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                        <br />
                                        {done < 0 ? <Typography variant="h5" align="center">
                                            Balanço: <b style={{ color: 'red' }}>R$ {done.toFixed(2)}</b>
                                        </Typography> : <Typography variant="h5" align="center">
                                            Balanço: <b style={{ color: 'green' }}>R$ {done.toFixed(2)}</b>
                                        </Typography>}
                                        <br />
                                        <Grid item>

                                                <ResponsiveContainer width='100%' height={400}>
                                                    <BarChart data={graph == 0 ? relatorios : graph}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="Pré-Jogo" fill="#8884d8" />
                                                        <Bar dataKey="Ao Vivo" fill="#82ca9d" />
                                                    </BarChart>
                                                </ResponsiveContainer>

                                        </Grid>
                                        <br />
                                        <br />
                                        <Grid item>
                                            <TableContainer component={Paper}>

                                                <Table stickyHeader aria-label="sticky table" >
                                                    <TableHead >
                                                        <TableRow>
                                                            <StyledTableCell align={"center"}><b>BANCA</b></StyledTableCell>
                                                            <StyledTableCell align={"center"}><b>TOTAL DE ENTRADAS</b></StyledTableCell>
                                                            <StyledTableCell align={"center"}><b>ENTRADAS EM ABERTO</b></StyledTableCell>
                                                            <StyledTableCell align={"center"}><b>SAÍDAS</b></StyledTableCell>
                                                            <StyledTableCell align={"center"}><b>COMISSÕES</b></StyledTableCell>
                                                            <StyledTableCell align={"center"}><b>TOTAL</b></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>

                                                        {[...nomesBancas].map((banca) => (
                                                            console.log(saidas[banca], total[banca] ),
                                                            <StyledTableRow >
                                                                <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                                    <Typography variant="h5">
                                                                        {banca}
                                                                    </Typography>
                                                                </StyledTableCell>
                                                                <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                                    <Typography variant="h5">
                                                                        R$ {totalEntrada[banca].toFixed(2)}
                                                                    </Typography>
                                                                </StyledTableCell>
                                                                <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                                    <Typography variant="h5">
                                                                        R$ {entradasAbertas[banca].toFixed(2)}
                                                                    </Typography>
                                                                </StyledTableCell>
                                                                <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                                    <Typography variant="h5">
                                                                        R$ {saidas[banca].toFixed(2)}
                                                                    </Typography>
                                                                </StyledTableCell>
                                                                <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                                    <Typography variant="h5">
                                                                        R$ {comissoes[banca].toFixed(2)}
                                                                    </Typography>
                                                                </StyledTableCell>
                                                                <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                                    {saidas[banca] > totalEntrada[banca] ? <Typography variant="h5">
                                                                        <b style={{ color: 'red' }}>R$ -{Math.abs(total[banca]).toFixed(2)}</b>
                                                                    </Typography> : <Typography variant="h5">
                                                                        <b style={{ color: 'green' }}>R$ {Math.abs(total[banca]).toFixed(2)}</b>
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

                        </Grid>
                        {/* Recent Deposits */}

                        {/* Recent Orders */}


                    </Grid>

                    <Dialog style={{ wordWrap: 'break-word' }}
                        open={openURL} onClose={handleCloseURL} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{ color: 'red' }}>AVISO!</DialogTitle>
                        <DialogContent >
                            <div className={classes.paper} style={{ fontSize: '18px' }}>

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
                        <DialogTitle id="form-dialog-title" style={{ color: 'red' }}></DialogTitle>
                        <DialogContent>
                            <div className={classes.paper}>
                                <CircularProgress color="secondary" />
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