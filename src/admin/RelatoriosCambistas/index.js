import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect, PureComponent } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import {
    Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { useParams } from "react-router";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import InboxIcon from '@material-ui/icons/Inbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import Taca from "../Home/taca.jpg";
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {images, auxCountry, auxItens, cc, api} from '../Constantes/index';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import PrintIcon from '@material-ui/icons/Print';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { pt } from 'date-fns/locale';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


export default function Dashboard() {

    let history = useHistory();
    let { campId } = useParams();
    var betsAll = "";
    const [open, setOpen] = useState(false);
    const [live, setLive] = useState([]);
    const [message, setMessage] = useState("");
    const [dateHour, setDateHour] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [dic, setDic] = useState({});
    const [competition, setCompetition] = useState([]);
    const [data, setData] = useState([]);
    const [ids, setIds] = useState([]);
    const [openNavB, setOpenNavB] = useState("");
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




    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

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
            "Pré-Jogo": 0,
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

    const handleClick = () => {
        setOpenNav(!openNav);
    };

    const handleClickA = (index) => {
        if (openNavA === index) {
            setOpenNavA("");
            setdrawerWidth(240);
        } else {
            setOpenNavA(index);
            setdrawerWidth(400);
        }
    };

    const handleClickB = (index) => {
        if (openNavB === index) {
            setOpenNavB("");
            setdrawerWidth(240);
        } else {
            setOpenNavB(index);
            setdrawerWidth(400);
        }
    };

    const handleDrawerOpen = () => {
        if (
            document.getElementById("drawer").style.display == "none" ||
            document.getElementById("drawer").style.display == ""
        ) {
            document.getElementById("drawer").style.display = "block";
            document.getElementById("drawer").style.marginLeft = "40px";
        } else if (document.getElementById("drawer").style.display == "block") {
            document.getElementById("drawer").style.display = "none";
            document.getElementById("drawer").style.marginLeft = "0px";
        }
    };

    const handleDrawerClose = () => {
        setOpenNav(false);
        setdrawerWidth(240);
        setOpenNavA("");
        setOpenNavB("");
        document.getElementById("drawer").style.display = "none";
    };

    const handleClickOpenURL = () => {
        setOpenURL(true);
    };

    const handleCloseURL = () => {
        setOpenURL(false);
    };

    const handleClickOpenLoading = () => {
        setOpenLoading(true);
    };

    const handleCloseLoading = () => {
        setOpenLoading(false);
    };


    function exit() {
        sessionStorage.removeItem('admin');
        history.push('/adm');
    }

    function loadBalanco() {



    }
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
            if(datas[0] == 'Pre-Jogo'){
                entradas += parseFloat(datas[4]);
                if (datas[3] == 'Aberto') {
                    abertos += parseFloat(datas[4]);
                } else if (datas[3] == 'Ganhou') {
                    ganhos += parseFloat(datas[7]);
                } else if (datas[3] == 'Perdeu') {
                    perdeu += parseFloat(datas[4]);
                }
                comissao += parseFloat(datas[5]);
            } else {
                entradasV += parseFloat(datas[4]);
                if (datas[3] == 'Aberto') {
                    abertosV += parseFloat(datas[4]);
                } else if (datas[3] == 'Ganhou') {
                    ganhosV += parseFloat(datas[7]);
                } else if (datas[3] == 'Perdeu') {
                    perdeuV += parseFloat(datas[4]);
                }
                comissaoV += parseFloat(datas[5]);
            }
            relatorios[0]['Pré-Jogo'] = entradas;
            relatorios[0]['Ao Vivo'] = entradasV;

            relatorios[1]['Pré-Jogo'] = abertos;
            relatorios[1]['Ao Vivo'] = abertosV;

            relatorios[2]['Pré-Jogo'] = ganhos;
            relatorios[2]['Ao Vivo'] = ganhosV;

            relatorios[3]['Pré-Jogo'] = comissao;
            relatorios[3]['Ao Vivo'] = comissaoV;

            relatorios[4]['Pré-Jogo'] = (((perdeu + (entradas - ganhos - comissao))));
            relatorios[4]['Ao Vivo'] = (((perdeuV + (entradasV - ganhosV - comissaoV))));
            b = ((perdeu+perdeuV) + ((entradas+entradasV)- (ganhos+ganhosV) - (comissao+comissaoV)));

            
            // setTotalEntradaP(totalEntradaP+entradas);
            // setEntradasAbertasP(entradasAbertasP+abertos);
            // setSaidasP(saidasP+ganhos);
            // setTotalP(((perdeu + (entradas - ganhos - comissao)))+totalP)
            // setComissoesP(comissoesP+comissao);

            // setTotalEntradaV(totalEntradaV+entradasV);
            // setEntradasAbertasV(entradasAbertasV+abertosV);
            // setSaidasV(saidasV+ganhosV);
            // setTotalV(((perdeuV + (entradasV - ganhosV - comissaoV)))+totalV)
            // setComissoesV(comissoesV+comissaoV);


            // setBalanco((perdeu+perdeuV) + ((entradas+entradasV)
            //     - (ganhos+ganhosV) - (comissao+comissaoV)));

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
            entradas += parseFloat(datas[4]);
            if (datas[3] == 'Aberto') {
                abertos += parseFloat(datas[4]);
            } else if (datas[3] == 'Ganhou') {
                ganhos += parseFloat(datas[7]);
            } else if (datas[3] == 'Perdeu') {
                perdeu += parseFloat(datas[4]);
            }


            comissao += parseFloat(datas[5]);
        }


        if((totalEntrada[banca]) != undefined) {
            totalEntrada[banca] = totalEntrada[banca]+entradas
           
            entradasAbertas[banca] = entradasAbertas[banca]+abertos;
          
            saidas[banca] = saidas[banca]+ganhos;
   
            comissoes[banca] = comissoes[banca]+comissao

            total[banca] = total[banca]+((perdeu + (entradas - ganhos - comissao)));

        } else {
            totalEntrada[banca]=entradas;
 
            entradasAbertas[banca]=abertos;

            saidas[banca]=ganhos;

            comissoes[banca]=comissao;

            total[banca]=((perdeu + (entradas - ganhos - comissao)));

        }




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
        
        if (sessionStorage.getItem('admin') == null || sessionStorage.getItem('admin') == "") {
            history.push('/adm')
        }

        let unmounted = false;

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
                                    b.valorDeSaida
                                ]);
                                dataAuxB.push([
                                    b.tipoDeJogo,
                                    b.nomeCliente,
                                    b.dataDaAposta,
                                    b.status,
                                    b.valorDeEntrada,
                                    b.comissao,
                                    b.cotacao,
                                    b.valorDeSaida
                                ]);
                                loadCaixa(b.nomeBanca);
                                loadBalanco();
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
        loadBalanco();

        return () => {
            unmounted = true;
        };


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
               
                    total[banca]=((perdeu + (entradas - ganhos - comissao)));
                  


            })


          

            api.get('/api/getbilhetesgerentedates/'+sessionStorage.getItem('manage')+'/'+auxDate1+'/'+auxDate2+'/'+n)
                .then(res => {
                    try {

                        if (res.data) {
                            //     ["SD76-KJ5G", "kakuzo", "07/04/2021 07:30:23", "Perdeu", "3.00", "0.30", "16.00",
                            //         "260.00", "M", "Agendado", <Button variant="contained" color="secondary"><CancelIcon /></Button>,
                            //         <Button variant="contained" color="primary"><PrintIcon /></Button>],
                            // ];
                            //console.log(auxDate1);
                            //console.log(res.data);

                            res.data.bilhetes.map((b) => {
                                entradas = 0;
                                abertos = 0;
                                ganhos = 0;
                                perdeu = 0;
                                comissao = 0;


                                entradas += parseFloat(b.valorDeEntrada);
                                if (b.status == 'Aberto') {
                                    abertos += parseFloat(b.valorDeEntrada);
                                } else if (b.status == 'Ganhou') {
                                    ganhos += parseFloat(b.valorDeSaida);
                                } else if (b.status == 'Perdeu') {
                                    perdeu += parseFloat(b.valorDeEntrada);

                                }
                                comissao += parseFloat(b.comissao);
                                soma += ((perdeu + (entradas - ganhos - comissao)));

                                if((totalEntrada[b.nomeBanca]) != undefined) {
                                    totalEntrada[b.nomeBanca] = totalEntrada[b.nomeBanca]+entradas
                             
                                    entradasAbertas[b.nomeBanca] = entradasAbertas[b.nomeBanca]+abertos;
                                    
                                    saidas[b.nomeBanca] = saidas[b.nomeBanca]+ganhos;
                                   
                                    comissoes[b.nomeBanca] = comissoes[b.nomeBanca]+comissao
                                   
                                    total[b.nomeBanca] = total[b.nomeBanca]+((perdeu + (entradas - ganhos - comissao)));
                                 


                                } else {

                                    totalEntrada[b.nomeBanca]=entradas;
                              
                                    entradasAbertas[b.nomeBanca]=abertos;
                         
                                    saidas[b.nomeBanca]=ganhos;
                                
                                    comissoes[b.nomeBanca]=comissao;
                               
                                    total[b.nomeBanca]=((perdeu + (entradas - ganhos - comissao)));
                            


                                }
                                if(b.tipoDeJogo == 'Pre-Jogo'){
                                    somaP += ((perdeu + (entradas - ganhos - comissao)));
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
                                    somaV += ((perdeu + (entradas - ganhos - comissao)));
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
                                b = soma;




                                setDataAux([]);

                            })

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
                                        {saidas > total ? <Typography variant="h5" align="center">
                                            Balanço: <b style={{ color: 'red' }}>R$ {(b).toFixed(2)}</b>
                                        </Typography> : <Typography variant="h5" align="center">
                                            Balanço: <b style={{ color: 'green' }}>R$ {(b).toFixed(2)}</b>
                                        </Typography>}
                                        <br />
                                        <Grid item>

                                                <ResponsiveContainer width='100%' height={400}>
                                                    <BarChart data={relatorios}>
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
                                                                    {saidas[banca] > total[banca] ? <Typography variant="h5">
                                                                        <b style={{ color: 'red' }}>R$ {Math.abs(total[banca]).toFixed(2)}</b>
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