import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import LockIcon from '@material-ui/icons/Lock';
import { useHistory, Link } from 'react-router-dom';
import { useParams } from "react-router";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useReactToPrint } from 'react-to-print';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InboxIcon from '@material-ui/icons/Inbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {images, auxCountry, auxItens, cc, api} from '../Constantes/index';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { pt } from 'date-fns/locale';
import CancelIcon from '@material-ui/icons/Cancel';
import PrintIcon from '@material-ui/icons/Print';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";



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
    const [live, setLive] = useState([]);
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [dic, setDic] = useState({});
    const [competition, setCompetition] = useState([]);
    const [regionName, setRegionName] = useState([]);
    const [ids, setIds] = useState([]);
    const [openNavB, setOpenNavB] = useState("");
    const [data, setData] = useState([]);
    const [totalEntrada, setTotalEntrada] = useState({});
    const [entradasAbertas, setEntradasAbertas] = useState({});
    const [saidas, setSaidas] = useState({});
    const [comissoes, setComissoes] = useState({});
    const [nomesBancas, setNomesBancas] = useState(new Set());
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


    let entradas = 0;
    let abertos = 0;
    let ganhos = 0;
    let perdeu = 0;
    let comissao = 0;
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

    function exit() {
        sessionStorage.removeItem('manage');
        history.push('/login');
    }

    let d = [];
    useEffect(() => {

        if (sessionStorage.getItem('manage') == null || sessionStorage.getItem('manage') == "") {
            history.push('/login')
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

                                dataAux.push([
                                    b.codigo,
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
        //loadCaixa();

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
        let auxDate1 = selectedDate1.getFullYear() + "-" + (selectedDate1.getMonth() + 1) + "-" + selectedDate1.getDate();
        let auxDate2 = selectedDate2.getFullYear() + "-" + (selectedDate2.getMonth() + 1) + "-" + selectedDate2.getDate();
        
        
        if(new Date(auxDate1) < new Date(auxDate2)){
            [...nomesBancas].map((banca) => {
                if((totalEntrada[banca]) != undefined) {
                    totalEntrada[banca] = totalEntrada[banca]+entradas
                    setTotalEntrada(totalEntrada);
                    entradasAbertas[banca] = entradasAbertas[banca]+abertos;
                    setEntradasAbertas(entradasAbertas);
                    saidas[banca] = saidas[banca]+ganhos;
                    setSaidas(saidas);
                    comissoes[banca] = comissoes[banca]+comissao
                    setComissoes(comissoes);
                    total[banca] = total[banca]+((perdeu + (entradas - ganhos - comissao)));
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
                    total[banca]=((perdeu + (entradas - ganhos - comissao)));
                    setTotal(total);
                }
            })

        
        api.get('/api/getbilhetesgerentedates/'+sessionStorage.getItem('manage')+'/'+auxDate1+'/'+auxDate2)
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

                            entradas += parseFloat(b.valorDeEntrada);
                            let st = b.replaceAll('{', '').replaceAll('}', '');
                            let result = ((st.split(',').length == b.quantidadeJogos));
                            let valor = (b.status != 'Cancelado' ?
                            (result == true && st != 'Aberto' ?
                            (st.indexOf('Perdeu') != -1 ? 'Perdeu' : 'Ganhou') : 'Aberto') :
                            'Cancelado');
                            if (valor == 'Aberto') {
                                abertos += parseFloat(b.valorDeEntrada);
                            } else if (valor == 'Ganhou') {
                                ganhos += parseFloat(b.valorDeSaida);
                            } else if (valor == 'Perdeu') {
                                perdeu += parseFloat(b.valorDeEntrada);
                            }
                            comissao += parseFloat(b.comissao);
                            console.log(total);
                            if((totalEntrada[b.nomeBanca]) != undefined) {
                                totalEntrada[b.nomeBanca] = totalEntrada[b.nomeBanca]+entradas
                                setTotalEntrada(totalEntrada);
                                entradasAbertas[b.nomeBanca] = entradasAbertas[b.nomeBanca]+abertos;
                                setEntradasAbertas(entradasAbertas);
                                saidas[b.nomeBanca] = saidas[b.nomeBanca]+ganhos;
                                setSaidas(saidas);
                                comissoes[b.nomeBanca] = comissoes[b.nomeBanca]+comissao
                                setComissoes(comissoes);
                                total[b.nomeBanca] = total[b.nomeBanca]+((perdeu -  ganhos - comissao));
                                setTotal(total);
                            } else {
                                totalEntrada[b.nomeBanca]=entradas;
                                setTotalEntrada(totalEntrada);
                                entradasAbertas[b.nomeBanca]=abertos;
                                setEntradasAbertas(entradasAbertas);
                                saidas[b.nomeBanca]=ganhos;
                                setSaidas(saidas);
                                comissoes[b.nomeBanca]=comissao;
                                setComissoes(comissoes);
                                total[b.nomeBanca]=((perdeu - ganhos - comissao));
                                setTotal(total);
                            }


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

            <AppBar position="fixed" id={"appbar"} className={clsx(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" className={classes.title}
                        onClick={handleDrawerOpen} style={{ cursor: 'pointer' }}>
                        <b>SONHOBETS198</b>
                    </Typography>

                    <Typography component="h4" color="inherit" display="inline" style={{ marginRight: '-10px' }}>
                       {sessionStorage.getItem('nomeGerente')} <br />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                id={"drawer"}
                onEscapeKeyDown={handleDrawerClose}
                onBackdropClick={handleDrawerClose}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button component={Link} to={'/gerente'}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Início" />
                    </ListItem>

                    <ListItem button component={Link} to={'/caixagerente'}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Caixa" />
                    </ListItem>
                    <ListItem button component={Link} to={'/caixagerentecambistas'}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Caixa Cambistas" />
                    </ListItem>
                    <ListItem button component={Link} to={'/relatorios'}>
                        <ListItemIcon>
                            <FileCopyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Relatório" />
                    </ListItem>
                    <ListItem button component={Link} to={'/bilhetesgerente'}>
                        <ListItemIcon>
                            <FileCopyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bilhetes" />
                    </ListItem>
                    <ListItem button component={Link} to={'/clientesgerente'}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clientes" />
                    </ListItem>
                    <ListItem button component={Link} to={'/bilhetegerente/all'}>
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Conferir Bilhetes" />
                    </ListItem>
                </List>

                <Divider />

                <List>
                    <ListItem button component={Link} to={"/novasenhagerente"}>
                        <ListItemIcon>
                            <VpnKeyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Alterar Senha" />
                    </ListItem>
                    <ListItem button onClick={exit}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </ListItem>

                </List>
               
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
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
                                                        <Grid item >



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
                                                                        placeholder="2018/10/10"
                                                                        value={selectedDate2}
                                                                        onChange={date2 => handleDateChange2(date2)}
                                                                        format="dd/MM/yyyy"
                                                                    />
                                                                </MuiPickersUtilsProvider>


                                                            </Grid>

                                                            <br />
                                                            <Button onClick={getDatas} variant="contained" color="primary">
                                                                BUSCAR
                                                            </Button>
                                                            <br /><br />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>

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