import {withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect, useRef } from 'react';
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
import { images, auxCountry, auxItens, api } from '../Constantes/index';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import PrintIcon from '@material-ui/icons/Print';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { pt } from 'date-fns/locale';
import { useReactToPrint } from "react-to-print";
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import football from "../Home/football";
import Hidden from "@material-ui/core/Hidden";
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


export default function Dashboard(props) {

    let history = useHistory();
    let { codigoBilhete } = useParams();
    let reg = new RegExp('^[0-9a-zA-Z]+[-]+[0-9a-zA-Z]+$');
    const theme = useTheme();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    var betsAll = "";
    const [open, setOpen] = useState(false);
    const [live, setLive] = useState([]);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState("");
    const [dateHour, setDateHour] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [dic, setDic] = useState({});
    const [competition, setCompetition] = useState([]);
    const [data, setData] = useState([]);
    const [ids, setIds] = useState([]);
    const [openNavB, setOpenNavB] = useState("");
    const [status, setStatus] = useState("");
    const [validCodigo, setValidCodigo] = useState(false);
    const [dataAux, setAux] = useState([]);
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [bilhetes, setBilhetes] = useState("");
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");
    const [clientes, setClientes] = useState([]);
    const [comissao, setComissao] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [gerenteId, setGerenteId] = useState(0);
    const [country, setCountry] = useState([]);
    const [dateAfter, setDateAfter] = useState(''); 
    const [bancaId, setBancaId] = useState(0);
    const [statusB, setStatusB] = useState([]);
    const [impressao, setImpressao] = useState([]);
    const container = window !== undefined ? () => window().document.body : undefined;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


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

    const columns = ["CUPOM", "CLIENTE", "DATA", "SITUAÇÃO", "VALOR DA APOSTA", "COMISSÕES", "COTAÇÃO", "RETORNO",
        "TIPO", "APOSTA", "CANCELAR", "IMPRIMIR"];


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
        } else {
            setOpenNavA(index);
        }
    };

    const handleClickB = (index) => {
        if (openNavB === index) {
            setOpenNavB("");
        } else {
            setOpenNavB(index);
        }
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
        if(impressao == 1){
            handlePrint();
        } else {
            alert('Sem permissão para imprimir. Fale com seu gerente!');
        }
    }

    function getCodigo(e) {
        document.getElementById('header').innerHTML = '';
        document.getElementById('bilhete').innerHTML = '';
        document.getElementById('footer').innerHTML = '';
        bilhete(e.target.value);
    }

    function exit() {
        sessionStorage.removeItem('login');
        history.push('/');
    }

    let nb = 0;
    function bilhete(codigo) {
        try {
            api.get('/api/getbilhetebanca/' + codigo + '/' + sessionStorage.getItem('login'))
                .then(res => {
                    let l = [];
                    try {
                        if (res.data) {
                            setBilhetes(res.data);
                    
                            document.getElementById('header').innerHTML = '\n' +
                                '                    <div >\n' +
                                '\n' +
                                '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;">SONHOBETS198</h4></center>\n' +
                                '\n' +
                                '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;">8399104-6816</h4></center>\n' +
                                '\n' +
                                '                        <hr style="width: 100%;border: 0;border-bottom: 2px dashed #292323;">\n' +
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
                                '                        <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">APOSTA</span></div>\n' +
                                '\n' +
                                '                        <div style="display: inline-block; width: 45%; text-align: right;"><span style="display: inline-block">COTAÇÃO</span></div>\n' +
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
                                // setStatusB(statusB);
                                


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
                                    '                                    <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">' + jogo.tipoDeCotacao.split('--')[1] + '</span></div>\n' +
                                    '\n' +
                                    '                                    <div style="display: inline-block; width: 45%; text-align: right;"><span style="display: inline-block">' + jogo.cotacao.toFixed(2) + '</span></div>\n' +
                                    '\n' +
                                    '                                    <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">Status:</span></div>\n' +
                                    '                                    <div style="display: inline-block; width: 45%; text-align: right;"><span style="display: inline-block">' + jogo.status + '</span></div>\n' +
                                    '\n' +
                                    '                                    <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                                    '\n' +
                                    '                                </div>\n'
                            });
                            
                            document.getElementById('status').innerHTML = (statusB.indexOf('Aberto') != -1 ?
                        "<b style='color: blue'>Aberto</b>" : (statusB.filter((x) => x == 'Ganhou' || x == 'Cancelado').length) == statusB.length ?
                        (statusB.filter((x) =>  x == 'Cancelado').length) == statusB.length ? 
                        "<b style='color: gold'>Cancelado</b>" : "<b style='color: green'>Ganhou</b>" : statusB.indexOf('Perdeu') != -1 ?
                                "<b style='color: red'>Perdeu</b>" : "<b style='color: gold'>Cancelado</b>");

                        }
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });
            try {

                api.get('/api/getbilhetebanca/' + codigo + '/' + sessionStorage.getItem('login'))
                    .then(res => {
                        try {
                            if (res.data) {
                                document.getElementById('footer').innerHTML = '                            \n' +
                                    '                                \n' +
                                    '                            \n' +
                                    '\n' +
                                    '                        <div>\n' +
                                    '                            <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">Quantidade de Jogos:</span></div>\n' +
                                    '                            <div style="display: inline-block; width: 45%; text-align: right;"><span style="display: inline-block">' + res.data.bilhete[0].quantidadeJogos + '</span></div>\n' +
                                    '                            \n' +
                                    '                            <div>\n' +
                                    '                            <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">Cotação:</span></div>\n' +
                                    '                            <div style="display: inline-block; width: 45%; text-align: right;"><span  style="display: inline-block">R$ ' + res.data.bilhete[0].cotacao.toFixed(2) + '</span></div>\n' +
                                    '\t\t\t\t\t\t\t</div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">Total Apostado:</span></div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 45%; text-align: right;"><span id="conteudo_txtTotalApostado" style="display: inline-block">R$ ' + res.data.bilhete[0].valorDeEntrada.toFixed(2) + '</span></div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">Possível Retorno:</span></div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 45%; text-align: right;"><span style="display: inline-block">R$ ' + res.data.bilhete[0].valorDeSaida.toFixed(2) + '</span></div>\n' +
                                    '                            \n' +
                                    '                            <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                                    '                        </div>\n' +
                                    '\n' +
                                    '                        <div>\n' +
                                    '                            <div style="display: inline-block; width: 100%; text-align: center;"><span style="display: inline-block">BILHETE</span></div>\n' +
                                    '                            <div style="display: inline-block; width: 100%; text-align: center;">\n' +
                                    '                                <h4 style="font-weight:bold" class="H3">'+codigo+'</h4>                  \n' +
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
                        history.push('/bilhetes');
                    }
                } catch (e) {

                }
            }).catch(error => {
            console.log(error)
        });

    }


    useEffect(() => {

        if ( sessionStorage.getItem('login') == null ||  sessionStorage.getItem('login') == "" ||
            (new Date().getMinutes() - sessionStorage.getItem('minutos')) >= 10) {
            history.push('/')
        } else {
            sessionStorage.setItem('minutos', new Date().getMinutes());
        }

        let unmounted = false;


        async function getLoginAPI() {

            api.get('/api/getbanca/' + sessionStorage.getItem('login'))
                .then(res => {
                    try {
                        if (res.data) {
                            setSaldoSimples(res.data.bancas.saldoSimples);
                            setSaldoGeral(res.data.bancas.saldoGeral);
                            setNomeBanca(res.data.bancas.nome);
                            setGerenteId(res.data.bancas.gerente);
                            setComissao(res.data.bancas.comissaoPreJogo.split(';'));
                            setBancaId(res.data.bancas.id);
                            setImpressao(res.data.bancas.habilitarImpressao);
                        }
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });

        }

        getLoginAPI();

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
        <div className={classes.root}>
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

                                                            
                                                            <br /><br />
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

                    <Dialog style={{ wordWrap: 'break-word' }}
                        open={openURL} onClose={handleCloseURL} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{ color: 'red' }}>AVISO!</DialogTitle>
                        <DialogContent>
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

                <React.Fragment>
                    <Grid container>

                        <Grid item xs={12} md={4} sm={12}>

                        </Grid>
                        <Grid item xs={12} md={4} sm={12}>
                            
                            <div style={{
                                width: 'calc(100% - 50px)',
                                
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
                <Typography variant={"h4"} align={"center"} style={{marginRight: 40}}>
                    <p id='status'></p>
                </Typography>
            </main>

        </div>

    );

}