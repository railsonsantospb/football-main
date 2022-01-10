import {withStyles, makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, {useState, useEffect, useRef} from 'react';
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
import {useHistory, Link} from 'react-router-dom';
import {useParams} from "react-router";
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
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {images, auxCountry, auxItens, cc} from '../Constantes/index';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import PrintIcon from '@material-ui/icons/Print';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {pt} from 'date-fns/locale';
import {useReactToPrint} from "react-to-print";
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {api} from "../../pages/Constantes";


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
    let {codigoBilhete} = useParams();
    let reg = new RegExp('^[0-9a-zA-Z]+[-]+[0-9a-zA-Z]+$');
    var betsAll = "";
    const [open, setOpen] = useState(false);
    const [live, setLive] = useState([]);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState("");
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
    const [codigo, setCodigo] = useState("");
    const [bilhetes, setBilhetes] = useState("");
    const [status, setStatus] = useState("");
    const [validCodigo, setValidCodigo] = useState(false);
    const [dataAux, setAux] = useState([]);
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [statusB, setStatusB] = useState([]);

    const columns = ["CUPOM", "CLIENTE", "DATA", "SITUAÇÃO", "VALOR DA APOSTA", "COMISSÕES", "COTAÇÃO", "RETORNO",
        "TIPO", "APOSTA"];


    const options = {
        rowsPerPage: 50,
        filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        selectableRows: false,
        onRowClick: (rowData, rowMeta) => {
            const dataToState = rowData;
            console.log(dataToState);
        }
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

    const [selectedDate1, handleDateChange1] = useState(new Date());
    const [selectedDate2, handleDateChange2] = useState(new Date());

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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


    const onClickHandler = () => {

        document.getElementById('bilhete').innerHTML = '';
        handleClickOpenLoading();
         if (codigo == dataAux[0]) {
            setValidCodigo(true);
            bilhete();
        } else {
            document.getElementById('header').innerHTML = '';
            document.getElementById('bilhete').innerHTML = '';
            document.getElementById('footer').innerHTML = '';
            setValidCodigo(false);
        }


        handleCloseLoading();
    };

    function close(e) {
        try {
            if (e.clientX > 250) {
                document.getElementById("drawer").style.display = "none";
            }
        } catch (e) {
            //console.log(e);
            //handlePrint();
        }
    }

    function print() {
        handlePrint();
    }

    function getCodigo(e) {
        document.getElementById('header').innerHTML = '';
        document.getElementById('bilhete').innerHTML = '';
        document.getElementById('footer').innerHTML = '';
        bilhete(e.target.value);
    }

    function exit(){
        sessionStorage.removeItem('manage');
        history.push('/login');
    }

    let nb = 0;
    function bilhete(codigo) {
        try {
            api.get('/api/getbilhete/' + codigo)
                .then(res => {
                    let l = [];
                    try {
                        if (res.data) {
                            setBilhetes(res.data);
                            console.log(res.data);
                            document.getElementById('header').innerHTML = '\n' +
                                '                    <div >\n' +
                                '\n' +
                                '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;">XBETS198</h4></center>\n' +
                                '\n' +
                                '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;">8399104-6816</h4></center>\n' +
                                '\n' +
                                '                        <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                                '\n' +
                                '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;" class="H3">'+ (res.data.bilhete[0].tipoSimplesouMultiplo == 'M' ? 'Aposta Multipla' : 'Aposta Simples') +'</h4></center>\n' +
                                '\n' +
                                '                        <span style="display: inline-block; text-align: left;">DATA:</span> <span id="conteudo_txtDataBilhete" style="display: inline-block"> ' + res.data.bilhete[0].dataDaAposta + '</span><br>\n' +
                                '\n' +
                                '                        <span style="display: inline-block">COLABORADOR:</span> <span style="display: inline-block">' + res.data.bilhete[0].nomeBanca + '</span><br>\n' +
                                '\n' +
                                '                        <span style="display: inline-block">CLIENTE:</span> <span style="display: inline-block">' + res.data.bilhete[0].nomeCliente + '</span><br>\n' +
                                '\n' +
                                '                        <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                                '\n' +
                                '                        <div style="display: inline-block; width: 49%; text-align: left;"><span style="display: inline-block">APOSTA</span></div>\n' +
                                '\n' +
                                '                        <div style="display: inline-block; width: 49%; text-align: right;"><span style="display: inline-block">COTAÇÃO</span></div>\n' +
                                '\n' +
                                '                        <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                                '\n';
                        }
                        setAux(l);
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error);
            });
            let b = 0;

            api.get('/api/getjogo/' + codigo)
                .then(res => {

                    try {
                        if (res.data) {
                            res.data.jogo.map((jogo) => {
                                nb = jogo.length;
                                statusB.push(jogo.status);
                                document.getElementById('bilhete').innerHTML +=
                                    '<div id="conteudo_divBilheteImpressao">\n' +
                                    '<div>\n' +
                                    '\n' +
                                    '                                    <b><span>Futebol - ' + jogo.dataDoJogo + '</span></b><br>\n' +
                                    '\n' +
                                    '                                    <span>' + jogo.nomeDoCampeonato + '</span><br>\n' +
                                    '\n' +
                                    '                                    <span>' + jogo.nomeDosTimes + '</span><br>\n' +
                                    '\n' +
                                    '                                    <b><span>' + jogo.tipoDeCotacao.split('--')[0] + '</span></b><br>\n' +
                                    '\n' +
                                    '                                    <div style="display: inline-block; width: 80%; text-align: left;"><span style="display: inline-block">' + jogo.tipoDeCotacao.split('--')[1] + '</span></div>\n' +
                                    '\n' +
                                    '                                    <div style="display: inline-block; width: 18%; text-align: right;"><span style="display: inline-block">' + jogo.cotacao.toFixed(2) + '</span></div>\n' +
                                    '\n' +
                                    '                                    <div style="display: inline-block; width: 50%; text-align: left;"><span style="display: inline-block">Status:</span></div>\n' +
                                    '                                    <div style="display: inline-block; width: 48%; text-align: right;"><span style="display: inline-block">' + jogo.status + '</span></div>\n' +
                                    '\n' +
                                    '                                    <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                                    '\n' +
                                    '                                </div>\n'
                                    document.getElementById('status').innerHTML = (statusB.indexOf('Aberto') != -1 ?
                        "<b style='color: blue'>Aberto</b>" : (statusB.filter((x) => x == 'Ganhou').length) == statusB.length ?
                            "<b style='color: green'>Ganhou</b>" : statusB.indexOf('Perdeu') != -1 ?
                                "<b style='color: red'>Perdeu</b>" : 'Cancelado');
                            });

                        }
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });
            try {

                api.get('/api/getbilhete/' + codigo)
                    .then(res => {
                        try {
                            if (res.data) {
                                document.getElementById('footer').innerHTML = '                            \n' +
                                    '                                \n' +
                                    '                            \n' +
                                    '\n' +
                                    '                        <div>\n' +
                                    '                            <div style="display: inline-block; width: 49%; text-align: left;"><span style="display: inline-block">Quantidade de Jogos:</span></div>\n' +
                                    '                            <div style="display: inline-block; width: 49%; text-align: right;"><span style="display: inline-block">' + res.data.bilhete[0].quantidadeJogos + '</span></div>\n' +
                                    '                            \n' +
                                    '                            <div>\n' +
                                    '                            <div style="display: inline-block; width: 49%; text-align: left;"><span style="display: inline-block">Cotação:</span></div>\n' +
                                    '                            <div style="display: inline-block; width: 49%; text-align: right;"><span  style="display: inline-block">R$ ' + res.data.bilhete[0].cotacao.toFixed(2) + '</span></div>\n' +
                                    '\t\t\t\t\t\t\t</div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 49%; text-align: left;"><span style="display: inline-block">Total Apostado:</span></div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 49%; text-align: right;"><span id="conteudo_txtTotalApostado" style="display: inline-block">R$ ' + res.data.bilhete[0].valorDeEntrada.toFixed(2) + '</span></div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 49%; text-align: left;"><span style="display: inline-block">Possível Retorno:</span></div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 49%; text-align: right;"><span style="display: inline-block">R$ ' + res.data.bilhete[0].valorDeSaida.toFixed(2) + '</span></div>\n' +
                                    '                            \n' +
                                    '                            <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                                    '                        </div>\n' +
                                    '\n' +
                                    '                        <div>\n' +
                                    '                            <div style="display: inline-block; width: 100%; text-align: center;"><span style="display: inline-block">BILHETE</span></div>\n' +
                                    '                            <div style="display: inline-block; width: 100%; text-align: center;">\n' +
                                    '                                <h4 style="font-weight:bold" class="H3">'+res.data.bilhete[0].codigo+'</h4>                  \n' +
                                    '                            </div>\n' +
                                    '                            <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                                    '                        </div>\n' +
                                    '\n' +
                                    '                        \n' +
                                    '\n' +
                                    '                        <div>\n' +
                                    '                            <span>Boa Sorte!</span>\n' +
                                    '                        </div>\n' +
                                    '\n' +
                                    '                    </div>\n' +
                                    '                </div>';
                            }
                        } catch (e) {

                        }
                    }).catch(error => {
                    console.log(error)
                });


            } catch (e) {
                console.log(e);
            }
        } catch (e) {
            document.getElementById('header').innerHTML = '';
            document.getElementById('bilhete').innerHTML = '';
            document.getElementById('footer').innerHTML = '';
        }
    }

    function setStatusBilhete() {

        api.put('/api/updatebilhete/' + codigoBilhete, {status: 'Cancelado'})
            .then(res => {
                try {
                    if (res.data) {
                        history.push('/bilhetesgerente');
                    }
                } catch (e) {

                }
            }).catch(error => {
            console.log(error)
        });

    }


    useEffect(() => {

        if (sessionStorage.getItem('manage') == null || sessionStorage.getItem('manage') == "") {
            history.push('/login')
        }

        let unmounted = false;

        async function getDateAll() {
            axios.get('http://worldclockapi.com/api/json/utc/now',
                {}).then(res => {
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



        if (codigoBilhete != 'all') {
            bilhete(codigoBilhete);
        } else {
            console.log('bbbbb');
        }

        return () => {
            unmounted = true;
        };


    }, []);


    return (
        <div className={classes.root} onClick={close}>
            <CssBaseline/>

            <AppBar position="fixed" id={"appbar"} className={clsx(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
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
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
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


                                                            <Typography variant="h5">BILHETES</Typography>
                                                            <br />
                                                            <TextField id="outlined-basic" label="Código do Bilhete"
                                                                variant="outlined"
                                                                onChange={getCodigo} />
                                                            <Grid container justify="space-around">

                                                            </Grid>

                                                            <br />

                                                            <Button onClick={print} style={{ margin: '10px' }}
                                                                variant="contained"
                                                                color="primary">
                                                                <PrintIcon/>
                                                            </Button>
                                                            <Button onClick={() => setStatusBilhete()}
                                                                    variant="contained" color="secondary">
                                                                <CancelIcon />
                                                            </Button>

                                                            <br/><br/>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>

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
                <React.Fragment>
                    <Grid container>

                        <Grid item xs={12} md={4} sm={12}>
                        </Grid>
                        <Grid item xs={12} md={4} sm={12}>
                            <div style={{
                                width: 'calc(100% - 20px)',
                                margin: '10px',
                                padding: '10px',
                                backgroundColor: 'rgb(248, 236, 194)',
                                color: 'black',
                                boxSizing: 'border-box'
                            }} ref={componentRef}>
                                <div id="header"></div>
                                <div id="bilhete"></div>
                                <div id="footer"></div>
                            </div>

                        </Grid>
                        <Grid item xs={12} md={4} sm={12}></Grid>
                    </Grid>
                </React.Fragment>
                <fieldset><Typography variant={"h4"} align={"center"}>
                    <p id='status'></p>
                </Typography></fieldset>

            </main>

        </div>

    );

}