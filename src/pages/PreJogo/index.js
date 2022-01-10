import {withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
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
import { useHistory, Link, NavLink } from 'react-router-dom';
import { useParams } from "react-router";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useReactToPrint } from 'react-to-print';
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
import { images, auxCountry, auxItens, cc, api } from '../Constantes/index';
import Alert from "@material-ui/lab/Alert";
import football from "../Home/football";
import Hidden from "@material-ui/core/Hidden";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useWindowDimensions from '../Size/index';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Menu2 from '../Menu2/index';

let date = [];
let tab;

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        
    },
}))(TableCell);



export default function Dashboard1(props) {
    const codigo = cc.generate().split('-').slice(1).join('-');
    let history = useHistory();
    let { campId } = useParams();
    const theme = useTheme();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let dataAux = [];
    var betsAll = "";
    const [open, setOpen] = useState(false);
    const [live, setLive] = useState([]);
    const [cotacaoValue, setCotacaoValue] = useState(1);
    const [retorno, setRetorno] = useState(0);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [dic, setDic] = useState({});
    const [competition, setCompetition] = useState([]);
    const [regionName, setRegionName] = useState([]);
    const [ids, setIds] = useState([]);
    const [openNavB, setOpenNavB] = useState("");
    const [bilhetes, setBilhetes] = useState([]);
    const [gerenteId, setGerenteId] = useState(0);
    const [bancaId, setBancaId] = useState(0);
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [dateAfter, setDateAfter] = useState('');
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");
    const [clientes, setClientes] = useState([]);
    const [apostasPreJogo, setApostasPreJogo] = useState(true);
    const [campeonato, setCampeonato] = useState([]);
    // const [cotacao, setCotacao] = useState([]);
    const { height, width } = useWindowDimensions();

    const [titulo, setTitulo] = useState([]);
    const container = window !== undefined ? () => window().document.body : undefined;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


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
        },
        button: {
            width: 10,
        },
        paper: {
            padding: theme.spacing(1),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        appBarSpacer: theme.mixins.toolbar,
    }));

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

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    setTimeout(() => {
        cotacaoHandler();
    }, 1000);

    // var events = ['click', 'keypress'];
    // events.forEach(function(event) {
    //     window.addEventListener(event, setActive);
    // });
    // function setActive(){
    //     history.push('/');
    // }


    function InitOdds() {

        if (localStorage.getItem("betsAll2") === null) {
            localStorage.setItem("betsAll2", "");
            localStorage.setItem('displayBets2', 'none');
        } else {
            let bets = localStorage.getItem("betsAll2");

            for (var n in bets.split('=').slice(0, bets.split('=').length - 1)) {
                try {

                    if (document.getElementById(bets.split('=')[n].split('-')[1] +
                        bets.split('=')[n].split('-')[0]).innerHTML.indexOf('/svg>') === -1) {

                        document.getElementById(bets.split('=')[n].split('-')[1] +
                            bets.split('=')[n].split('-')[0]).style.background = "red";

                    }
                } catch (e) {

                }
            }
        }
    }

    function clearOdds() {
        let bets = localStorage.getItem("betsAll2");

        for (var n in bets.split('=').slice(0, bets.split('=').length - 1)) {

            try {


                if (document.getElementById(bets.split('=')[n].split('-')[1] +
                    bets.split('=')[n].split('-')[0]).innerHTML.indexOf('/svg>') === -1) {

                    document.getElementById(bets.split('=')[n].split('-')[1] +
                        bets.split('=')[n].split('-')[0]).style.background = "";


                }

            } catch (e) {

            }
        }
    }


    setInterval(() => {
        if (localStorage.getItem('delete2') !== null) {
            let team = localStorage.getItem('delete2');
            try {
                document.getElementById(team.split('-')[1] + team.split('-')[0]).style.background = "";
            } catch (e) {
                localStorage.setItem(team.split('-')[0], "");
                localStorage.setItem(team.split('-')[0] + 'x', "");
                localStorage.removeItem(team.split('-')[0]);
                localStorage.removeItem(team.split('-')[0] + 'x');
                betsAll = localStorage.getItem("betsAll2");
                betsAll = betsAll.replace(team.split('-')[0] + "-" + team.split('-')[1] + "=", "");
                localStorage.setItem("betsAll2", betsAll);
                geraBilhete();
            }
            localStorage.setItem(team.split('-')[0], "");
            localStorage.setItem(team.split('-')[0] + 'x', "");
            localStorage.removeItem(team.split('-')[0]);
            localStorage.removeItem(team.split('-')[0] + 'x');
            betsAll = localStorage.getItem("betsAll2");
            betsAll = betsAll.replace(team.split('-')[0] + "-" + team.split('-')[1] + "=", "");
            localStorage.setItem("betsAll2", betsAll);
            geraBilhete();
        }
        localStorage.removeItem('delete2');
        if(localStorage.getItem('click2') != null && localStorage.getItem('click2') != ''){
            onClickHandler();
            localStorage.removeItem('click2');
        }
        InitOdds();
        //console.log(localStorage.getItem('delete'));
    }, 200);


    function noneBets() {
        localStorage.setItem('displayBets2', 'none');
        document.getElementById('valuesBets').style.display = 'none';
        document.getElementById('value').style.display = 'none';
        document.getElementById('clients').style.display = 'none';
        document.getElementById('done').style.display = 'none';
        document.getElementById('fieldClient').style.display = 'none';
        document.getElementById('buttonClient').style.display = 'none';
        document.getElementById('resetField1').value = '';
    }

    function blockBets() {
        localStorage.setItem('displayBets2', 'block');
        document.getElementById('value').style.display = 'block';
        document.getElementById('clients').style.display = 'block';
        document.getElementById('done').style.display = 'block';
        document.getElementById('fieldClient').style.display = 'block';
        document.getElementById('buttonClient').style.display = 'block';
        document.getElementById('valuesBets').style.display = 'block';
    }



    function geraBilhete() {
        if (localStorage.getItem('betsAll2') == "") {
            noneBets();
        }

        try {
            document.getElementById("bilhete").innerHTML = '';
            localStorage.getItem('betsAll2').split('=').slice(0, -1).map((b) => {
                
                let campeonato = localStorage.getItem(b.split('-')[0] + 'x').split(',')[6];
                let times = localStorage.getItem(b.split('-')[0] + 'x').split(',')[5].replace('-', 'x');
                let data = localStorage.getItem(b.split('-')[0] + 'x').split(',')[7];
                let typeBets = localStorage.getItem(b.split('-')[0] + 'x').split(',')[1].split('--')[0];
                let bets = localStorage.getItem(b.split('-')[0] + 'x').split(',')[1].split('--')[1];
                let value = localStorage.getItem(b.split('-')[0] + 'x').split(',')[4];
                let date = "delete2";

                document.getElementById("bilhete").innerHTML += '<div>\n' +
                    '\t\n' +
                    '    <div style="width: calc(100% - 20px); margin: 10px; padding: 10px; background-color: rgb(248, 236, 194); color: black; box-sizing: border-box;">\n' +
                    '    <div style="font-family:\'Roboto Condensed\',sans-serif !important;">\n' +
                    '        <span >' + bets + '</span>\n' +
                    '        <span onclick="localStorage.setItem(\'' + date + '\', \'' + b + '\')"\n' +
                    ' id-item="1" style="float:right; margin-top:-5px; color: black; width: 20px; cursor: pointer"><b>X</b></span>\n' +

                    '    </div>\n' +
                    '<hr style="width: 100%; border: 0; border-bottom: 1px dashed #292323; margin-bottom: 10px">\n' +
                    '    <span style="margin-left: 5px; display: block;"><b>Futebol - ' + data + '</b></span>\n' +
                    '    <span style="margin-left: 5px; display: block;">' + campeonato + '</span>\n' +
                    '    <span style="margin-left: 5px; display: block;">' + times + '</span>\n' +
                    '    <span style="margin-left: 5px; display: block;"><b>' + typeBets + '</b></span>\n' +
                    '    <span style="margin-left: 5px;">Cotação: </span>' + '<b style="float: right;">' + value + '</b>\n' +
                    '</div>\n' +
                    '\n' +
                    '</div>'

                blockBets();



            });

            cotacaoHandler();

        } catch (e) {
            // setBilhetes("");
        }
    }




    function salvarBilhete() {


        let d = "";
        let prejogo = localStorage.getItem('betsAll2');
        let dx = new Date();
        let dateHour = dx.getDate() + '/' + (parseInt(dx.getMonth())+1) + '/' + dx.getFullYear() + ' ' + dx.getHours() + ':' + dx.getMinutes() + ':' + dx.getSeconds();

        document.getElementById('header').innerHTML = '\n' +
            '                    <div >\n' +
            '\n' +
            '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;">XBETS198</h4></center>\n' +
            '\n' +
            '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;">8399104-6816</h4></center>\n' +
            '\n' +
            '                        <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
            '\n' +
            '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;" class="H3">' + ((localStorage.getItem('betsAll2').split("=").length - 1) > 1 ? 'Aposta Multipla' : 'Aposta Simples') + '</h4></center>\n' +
            '\n' +
            '                        <span style="display: inline-block; text-align: left;">DATA:</span> <span id="conteudo_txtDataBilhete" style="display: inline-block"> ' + dateHour + '</span><br>\n' +
            '\n' +
            '                        <span style="display: inline-block">COLABORADOR:</span> <span style="display: inline-block">'+ nomeBanca +'</span><br>\n' +
            '\n' +
            '                        <span style="display: inline-block">CLIENTE:</span> <span style="display: inline-block">' + client + '</span><br>\n' +
            '\n' +
            '                        <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
            '\n' +
            '                        <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">APOSTA</span></div>\n' +
            '\n' +
            '                        <div style="display: inline-block; width: 45%; text-align: right;"><span style="display: inline-block">COTAÇÃO</span></div>\n' +
            '\n' +
            '                        <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
        '\n';

        prejogo.split('=').slice(0, -1).map((b) => {

            let campeonato = localStorage.getItem(b.split('-')[0] + 'x').split(',')[6];
            let times = localStorage.getItem(b.split('-')[0] + 'x').split(',')[5].replace('-', 'x');
            let data = localStorage.getItem(b.split('-')[0] + 'x').split(',')[7];
            let typeBets = localStorage.getItem(b.split('-')[0] + 'x').split(',')[1]
            let value = localStorage.getItem(b.split('-')[0] + 'x').split(',')[4];


            document.getElementById('bilheteP').innerHTML +=
                '<div id="conteudo_divBilheteImpressao">\n' +
                '<div>\n' +
                '\n' +
                '                                    <b><span>Futebol - ' + data + '</span></b><br>\n' +
                '\n' +
                '                                    <span>' + campeonato + '</span><br>\n' +
                '\n' +
                '                                    <span>' + times + '</span><br>\n' +
                '\n' +
                '                                    <b><span>' + typeBets.split('--')[0] + '</span></b><br>\n' +
                '\n' +
                '                                    <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">' + typeBets.split('--')[1] + '</span></div>\n' +
                '\n' +
                '                                    <div style="display: inline-block; width: 45%; text-align: right;"><span style="display: inline-block">' + value + '</span></div>\n' +
                '\n' +
                '                                    <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">Status:</span></div>\n' +
                '                                    <div style="display: inline-block; width: 45%; text-align: right;"><span style="display: inline-block">' + "Aberto" + '</span></div>\n' +
                '\n' +
                '                                    <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                '\n' +
                '                                </div>\n'

        });

        document.getElementById('footer').innerHTML = '                            \n' +
            '                                \n' +
            '                            \n' +
            '\n' +
            '                        <div>\n' +
            '                            <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">Quantidade de Jogos:</span></div>\n' +
            '                            <div style="display: inline-block; width: 45%; text-align: right;"><span style="display: inline-block">' + (localStorage.getItem('betsAll2').split("=").length - 1) + '</span></div>\n' +
            '                            \n' +
            '                            <div>\n' +
            '                            <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">Cotação:</span></div>\n' +
            '                            <div style="display: inline-block; width: 45%; text-align: right;"><span  style="display: inline-block">' + parseFloat(document.getElementById('cotacao').innerHTML).toFixed(2) + '</span></div>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '                            <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">Total Apostado:</span></div>\n' +
            '\n' +
            '                            <div style="display: inline-block; width: 45%; text-align: right;"><span id="conteudo_txtTotalApostado" style="display: inline-block">R$ ' + parseFloat(localStorage.getItem('valorIn')).toFixed(2) + '</span></div>\n' +
            '\n' +
            '                            <div style="display: inline-block; width: 45%; text-align: left;"><span style="display: inline-block">Possível Retorno:</span></div>\n' +
            '\n' +
            '                            <div style="display: inline-block; width: 45%; text-align: right;"><span style="display: inline-block">R$ ' + parseFloat(document.getElementById('retorno').innerHTML).toFixed(2) + '</span></div>\n' +
            '                            \n' +
            '                            <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
            '                        </div>\n' +
            '\n' +
            '                        <div>\n' +
            '                            <div style="display: inline-block; width: 100%; text-align: center;"><span style="display: inline-block">BILHETE</span></div>\n' +
            '                            <div style="display: inline-block; width: 100%; text-align: center;">\n' +
            '                                <h4 style="font-weight:bold" class="H3">' + codigo + '</h4>                  \n' +
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

        api.get('/api/getdate')
            .then(res => {
                d = (res.data.date);
            
                let comissaoValor = 0;
                let qtd = localStorage.getItem('betsAll2').split("=").length - 1;
                for (let valores of bilhetes.sort()) {
                    if (qtd <= valores.split(':')[0]) {
                        comissaoValor = parseFloat(valores.split(':')[1]) / 100;
                        break
                    }
                }
            


                api.post('/api/addbilhete',
                    {
                        "codigo": codigo,
                        "bancaId": bancaId,
                        "gerenteId": gerenteId,
                        "nomeCliente": client,
                        "nomeBanca": nomeBanca,
                        "dataDaAposta": d,
                        "valorDeEntrada": parseFloat(localStorage.getItem('valorIn')),
                        "valorDeSaida": parseFloat(document.getElementById('retorno').innerHTML),
                        "cotacao": parseFloat(document.getElementById('cotacao').innerHTML),
                        "tipoDeJogo": "Pre-Jogo",
                        "quantidadeJogos": qtd,
                        "tipoSimplesouMultiplo": qtd > 1 ? "M" : "S",
                        "comissao": (parseFloat(localStorage.getItem('valorIn')) * comissaoValor).toFixed(2),
                        "status": "Aberto"

                    })
                    .then(res => {
                        let prejogo = localStorage.getItem('betsAll2');
                        try {
                            prejogo.split('=').slice(0, -1).map((b) => {
                                let campeonato = localStorage.getItem(b.split('-')[0] + 'x').split(',')[6];
                                let times = localStorage.getItem(b.split('-')[0] + 'x').split(',')[5].replace('-', 'x');
                                let data = localStorage.getItem(b.split('-')[0] + 'x').split(',')[7];
                                let typeBets = localStorage.getItem(b.split('-')[0] + 'x').split(',')[1]
                                let value = localStorage.getItem(b.split('-')[0] + 'x').split(',')[4];
                                api.post('/api/addjogo',
                                    {
                                        "codigoBilhete": codigo,
                                        "dataDoJogo": data,
                                        "nomeDoCampeonato": campeonato,
                                        "nomeDosTimes": times,
                                        "tipoDeCotacao": typeBets,
                                        "cotacao": parseFloat(value),
                                        "status": "Aberto",
                                    })
                                    .then(res => {
                                        try {
                                            if (res.data) {
                                                localStorage.removeItem(b.split('-')[0] + 'x');
                                                localStorage.removeItem(b.split('-')[0]);
                                                clearOdds();
                                                localStorage.setItem('betsAll2', localStorage.getItem('betsAll2').replace(b + '=', ''));
                                                geraBilhete();
                                                document.getElementById("retorno").innerHTML = '0.00';
                                            }
                                        } catch (e) {
                                            console.log(e);
                                        }

                                    }).catch(error => {
                                        console.log(error);
                                    });

                            });

                        } catch (e) {

                        }

                    }).catch(error => {
                        console.log(error);
                    });
                
            }).catch(error => {
                console.log(error);
            });

    }

    function cotacaoHandler() {
        try {
            var resultCotaca = 1;
            var id = localStorage.getItem('betsAll2').split('=');

            if (id !== null && id[0] !== '') {
                for (let n in id.slice(0, id.length - 1)) {
                    resultCotaca *= parseFloat(localStorage.getItem(id[n].split('-')[0] + 'x').split(',')[4]);

                }
            } else {
                resultCotaca = 0;
            }
           
            let cotacao = sessionStorage.getItem('cotacaoAdmin');    
            document.getElementById('cotacao').innerHTML = (resultCotaca > cotacao ? cotacao : resultCotaca).toFixed(2);
        } catch (e) {

        }

    }

    // {(retorno*cotacaoValue).toFixed(2) > 10000.00 ? 10000.00 :
    //     (retorno*cotacaoValue).toFixed(2)}

    function valueBetsHandler(e) {
        var value = e.target.value;
        let valorMax = sessionStorage.getItem('valorDeSaida');
        let valorMin = sessionStorage.getItem('valorDeEntrada');
        let cotacao = Number(document.getElementById('cotacao').innerHTML);
        if (value) {
         
            if (parseFloat(value) >= valorMin && parseFloat(value) <= valorMax) {
                handleCloseURL();
                document.getElementById('retorno').innerHTML = ((cotacao * Number(value)).toFixed(2));
            } else if (parseFloat(value) < valorMin) {
                document.getElementById('retorno').innerHTML = '0.00';
                setMessage("O valor mínimo permitido<br/> por aposta é de R$ " + parseFloat(valorMin).toFixed(2));
                handleClickOpenURL();
            } else {
                setMessage("O valor máximo permitido<br/> por aposta é de R$ " + parseFloat(valorMax).toFixed(2));
                handleClickOpenURL();
            }

        } else {
            document.getElementById('retorno').innerHTML = '0.00';
            handleCloseURL();
        }

        localStorage.setItem('valorIn', value);

    }

    function addVeiryClient(e) {
        setClient(e.target.value);

    }

    function addClient() {
        if (client.length > 3) {
            if (getClient() == false) {
                api.post('/api/addcliente', { 'nome': client,
                    'banca': sessionStorage.getItem('login'),
                    'gerenteId' : sessionStorage.getItem('gerenteId'),
                    'nomeBanca' : sessionStorage.getItem('nomeBanca')})
                    .then(res => {
                        try {
                            if (res.data) {
                                setMessage(`Cliente cadastrado com sucesso!`);
                                handleClickOpenURL();
                                api.get('/api/getclientes/' + sessionStorage.getItem('login'))
                                    .then(res => {
                                        try {
                                            if (res.data) {
                                                setClientes(res.data);
                                            }
                                        } catch (e) {

                                        }
                                    }).catch(error => {
                                        console.log(error);
                                    });
                            }
                        } catch (e) {

                        }

                    }).catch(error => {
                        console.log(error);

                    });
            } else {
                setMessage(`Cliente já existe nessa banca!`);
                handleClickOpenURL();
            }
        } else {
            setMessage(`O nome deve conter mais de 3 letras!`);
            handleClickOpenURL();
        }
    }


    function getClient() {
        let r = false;
        clientes.clientes.map((f) => {
            console.log(f);
            if (f.nome == client) {
                r = true;
            }
        });
        return r;
    }

    function verifyClientHandler(e) {

        let auxClient =
            typeof e.target.value === "string" ? e.target.value : e.target.innerText &&
                e.target.innerText.length > 0 ? e.target.innerText : '';
        setClient(auxClient);

    }


    function betsDone() {
        handleClickOpenLoading();


        setTimeout(function () {

            let valid1 = false;
            let valid2 = true;
            let valid3 = false;
            let oddValue = false;
            let teams = [];
            let cotacaoAux = 1;
            let cotAux = parseFloat(document.getElementById('cotacao').innerHTML);
            let betsAll = localStorage.getItem("betsAll2").split("=");
            var id = localStorage.getItem('betsAll2').split('=');

            if (id !== null && id[0] !== '') {
                for (let n in id.slice(0, id.length - 1)) {
                    cotacaoAux *= parseFloat(localStorage.getItem(id[n].split('-')[0] + 'x').split(',')[4]);

                }
            }
            betsAll = betsAll.slice(0, betsAll.length - 1);
            let i = 0;
            betsAll.map((bets) => {
               
                let auxBets = localStorage.getItem(bets.split('-')[0] + "x").split(',');
                let id = auxBets.slice(-1)[0];
                let opcao = auxBets[0].split(':')[0];
                let key = auxBets[0].split(':')[1];


                api.get('/api/getmaispre/'+id)
                .then(res => {
                   
                    try {

                        

                        i++;
                       
                      

                        if (res.data) {
                            res.data.mais.modalidades.map((m) => {
                                m.cotacoes.map((c) => {
                                    if(c.subeventos != null){
                                     c.subeventos.map((e) => {
                                        if(m.titulo + "--" +
                                        ((m.titulo.indexOf('Handicap') != -1) ? 
                                            (e.titulo + ' (' + e.nome + ')') : e.nome) == auxBets[1]){
                                            

                                            oddValue = true;
                                            valid2 = false;
                                          
                                            if (Number(auxBets[4]) == 15 && 
                                            Number(auxBets[4]) > Number((e.cotacao/100).toFixed(2))) {
                                                valid1 = true;
                                                auxBets[4] = (e.cotacao/100).toFixed(2);
                                                localStorage.setItem((bets.split('-')[0] + "x"),
                                                    auxBets.join(','));
                                                geraBilhete();
                                            } else if(Number(auxBets[4]) != Number((e.cotacao/100).toFixed(2))){
                                                valid1 = true;
                                                auxBets[4] = (e.cotacao/100).toFixed(2);
                                                localStorage.setItem((bets.split('-')[0] + "x"),
                                                    auxBets.join(','));
                                                geraBilhete();
                                            }
                                        }
                                    }) }
                                })
                            })
                            
                            
                                
                            if (betsAll.length == i) {
                                
                                

                                if (Number(document.getElementById('retorno').innerHTML) > 0) {
                                    if(cotacaoAux > parseFloat(sessionStorage.getItem('cotacaoAdminMin'))) {
                                    if (getClient() == false) {
                                        setMessage(`Por favor adicione um cliente válido!`);
                                        handleClickOpenURL();
                                    } else if (valid2) {
                                        setMessage(`Algumas apostas foram suspenas, aguarde um momento e confirme sua aposta!`);
                                        handleClickOpenURL();
                                    } else if (valid1) {

                                        var resultCotaca = 1;
                                        var id = localStorage.getItem('betsAll2').split('=');

                                        if (id !== null && id[0] !== '') {
                                            for (let n in id.slice(0, id.length - 1)) {
                                                resultCotaca *= parseFloat(localStorage.getItem(id[n].split('-')[0] + 'x').split(',')[4]);

                                            }
                                        } else {
                                            resultCotaca = 0;
                                        }
                                        setMessage(`A cotação escolhida alterou de: R$ ${cotacaoAux.toFixed(2)} <br/> para: R$ ${resultCotaca.toFixed(2)} . Clique novamente para confirmar a aposta!`);



                                            document.getElementById('retorno').innerHTML = ' ' +
                                                Number(resultCotaca * Number(document.getElementById('resetField1').value)).toFixed(2);

                                        handleClickOpenURL();


                                    }
                                    if (getClient() && !valid1 && !valid2 && !valid3) {
                                        let qtd = localStorage.getItem('betsAll2').split("=").length - 1;
                                        let auxSaldo = qtd > 1 ? saldoGeral : saldoSimples;

                                        if(auxSaldo  >= parseFloat(localStorage.getItem('valorIn'))){
                                            salvarBilhete();
                                            handlePrint();
                                            noneBets();
                                            clearOdds();
                                            geraBilhete();
                                        } else {
                                            alert('Sem limite para apostar!');
                                        }


                                    }
                                } else {
                                    setMessage('A cotação mínima é de R$ '+ parseFloat(sessionStorage.getItem('cotacaoAdminMin'))
                                    .toFixed(2));
                                    handleClickOpenURL();
                                }
                                } else {
                                    setMessage('Por favor insira um valor de no mínimo R$ '+ sessionStorage.getItem('valorDeEntrada') + ',00');
                                    handleClickOpenURL();
                                }
                                handleCloseLoading();
                            }
                        }



                    } catch (e) {
                        alert('O seguinte jogo indisponível: ' + auxBets[5]);
                        handleCloseLoading();
                        console.log(e);
                        valid1 = true;
                        valid2 = true;
                    }
                }).catch(error => {
                    alert('O seguinte jogo indisponível: ' + auxBets[5]);
                    handleCloseLoading();
            });


            });
            

        }, 0);
    }




    function onClickHandler () {
        
        document.getElementById('bilheteP').innerHTML = '';
        const team = localStorage.getItem('click2');
                document.getElementById("retorno").innerHTML = '0.00';
        try {
            let betsGame = team.split("=");
            console.log(betsGame);
            console.log(betsGame[2] + betsGame.slice(-1)[0]);

            console.log(betsGame);
            var date = new Date(Date.parse(betsGame[7].replace("Z", "+00:00")));
            var hourMinute =
                ((date.getHours() + "").length === 1
                    ? "0" + date.getHours()
                    : date.getHours()) +
                ":" +
                ((date.getMinutes() + "").length === 1
                    ? "0" + date.getMinutes()
                    : date.getMinutes());

            var monthDate =
                date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            betsGame[7] = monthDate + "  " + hourMinute;

            if (
                localStorage.getItem(betsGame.slice(-1)[0]) === betsGame[2] &&
                document
                    .getElementById(betsGame[2] + betsGame.slice(-1)[0])
                    .innerHTML.indexOf("/svg>") === -1
            ) {
                document.getElementById(
                    betsGame[2] + betsGame.slice(-1)[0]
                ).style.background = "";
                localStorage.setItem(betsGame.slice(-1)[0], "");
                localStorage.setItem(betsGame.slice(-1)[0] + "x", "");
                localStorage.removeItem(betsGame.slice(-1)[0]);
                localStorage.removeItem(betsGame.slice(-1)[0] + "x");
                betsAll = localStorage.getItem("betsAll2");
                betsAll = betsAll.replace(
                    betsGame.slice(-1)[0] + "-" + betsGame[2] + "=",
                    ""
                );
                localStorage.setItem("betsAll2", betsAll);
                geraBilhete();
                cotacaoHandler();

            } else if (
                document
                    .getElementById(betsGame[2] + betsGame.slice(-1)[0])
                    .innerHTML.indexOf("/svg>") === -1
            ) {

                document.getElementById(
                    betsGame[2] + betsGame.slice(-1)[0]
                ).style.background = "red";
                if (localStorage.getItem(betsGame.slice(-1)[0])) {
                    document.getElementById(
                        localStorage.getItem(betsGame.slice(-1)[0]) + betsGame.slice(-1)[0]
                    ).style.background = "";
                }
                localStorage.setItem(betsGame.slice(-1)[0] + "x", betsGame);
                betsAll = localStorage.getItem("betsAll2");
                betsAll = betsAll.replace(
                    betsGame.slice(-1)[0] +
                    "-" +
                    localStorage.getItem(betsGame.slice(-1)[0]) +
                    "=",
                    ""
                );
                localStorage.setItem(betsGame.slice(-1)[0], betsGame[2]);
                betsAll = betsAll + betsGame.slice(-1)[0] + "-" + betsGame[2] + "=";
                localStorage.setItem("betsAll2", betsAll);
                geraBilhete();
                cotacaoHandler();
            }
        } catch (e) {
            console.log(e);
        }
    
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

    function exit() {
        sessionStorage.removeItem('login');
        history.push('/');
    }

    
    useEffect(() => {

        if ( sessionStorage.getItem('login') == null ||  sessionStorage.getItem('login') == "" ||
            (new Date().getMinutes() - sessionStorage.getItem('minutos')) >= 10) {
            history.push('/')
        } else {
            sessionStorage.setItem('minutos', new Date().getMinutes());
        }


        async function getDateAll() {
            api.get("/api/getdate")
                .then((res) => {
                    try {
                        let d1 = Date(res.data.date);
                        d1 = new Date(d1);
                        d1 = d1.setDate(d1.getDate());

                        let d2 = Date(res.data.date);
                        d2 = new Date(d2);
                        d2 = d2.setDate(d2.getDate() + 1);

                        d1 = new Date(d1);
                        d2 = new Date(d2);

                        date = [
                            d1.getFullYear() +
                            "-" +
                            (Number(d1.getMonth()) + 1 < 10
                                ? "0" + (Number(d1.getMonth()) + 1)
                                : Number(d1.getMonth()) + 1) +
                            "-" +
                            ((Number(d1.getDate())) < 10 ? "0" + d1.getDate() : d1.getDate()),
                            d2.getFullYear() +
                            "-" +
                            (Number(d2.getMonth()) + 1 < 10
                                ? "0" + (Number(d2.getMonth()) + 1)
                                : Number(d2.getMonth()) + 1) +
                            "-" +
                            ((Number(d2.getDate())) < 10 ? "0" + d2.getDate() : d2.getDate()),
                        ];

                        localStorage.setItem("date", date);


                    } catch (e) {
                        console.log(e);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getDateAll();

        async function getDateAfter() {
            api.get('/api/getdateafter').then(res => {

                try {

                    setDateAfter(res.data.date);

                } catch (e) {
                    console.log(e);
                }
            }).catch(error => {
                console.log(error)
            });
        }
        getDateAfter();

        



        async function getLoginAPI() {

            api.get('/api/getbanca/' + sessionStorage.getItem('login'))
                .then(res => {
                    try {
                        if (res.data) {
                            setSaldoSimples(res.data.bancas.saldoSimples);
                            setSaldoGeral(res.data.bancas.saldoGeral);
                            setNomeBanca(res.data.bancas.nome);
                            setGerenteId(res.data.bancas.gerente);
                            setBilhetes(res.data.bancas.comissaoPreJogo.split(';'));
                            setBancaId(res.data.bancas.id);
                            setApostasPreJogo(res.data.bancas.ativarApostasPreJogo);
                            console.log(res.data.bancas.ativarApostasPreJogo);
                            let cotacao = {};
                            api.get('/api/getcotacaoprejogo/'+res.data.bancas.gerente+'/'+res.data.bancas.id).then(res => {

                                        try {
                                            res.data.cotacoes.map((o) =>{
                                                cotacao[o.tipoDeCotacao] = [o.status, o.porcentagem];
                                            })
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }).catch(error => {
                                        console.log(error)
                                    });
                            if(res.data.bancas.ativarApostasPreJogo == true){
                                    
                                    api.get('/api/getprejogo').then(res => {

                                        try {
                                            let l = [];
                                            let camp = [];
                                            document.getElementById('preJogos').innerHTML = ''; 
                                            if(res.data.prejogo.campeonatos.length > 0){
                                                res.data.prejogo.campeonatos.map((c) => {
                                                    if(c.id == campId){
                                                        camp.push(c);
                                                    }
                                                })
                                                camp[0].momentos.map((e) =>{
                                                    e.eventos.map((live) =>{

                                                        let idCasa =  (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao/100) ? 
                                                         (live.subeventos.length >= 3 ?
                                                    ('VencedordoEncontro'+
                                                        live.subeventos[0].aposta+
                                                        live.subeventos[0].idOpcao+live.id).replace(/[^0-9a-z]/gi, '') : ''):'');
        
                                                    let idEmpate =  (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao/100) ?
                                                    (live.subeventos.length >= 3 ?
                                                                ('VencedordoEncontro'+
                                                                    live.subeventos[1].aposta+
                                                                    live.subeventos[1].idOpcao+live.id).replace(/[^0-9a-z]/gi, '') : '') : '');
        
                                                    let idFora =  (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao/100) ?
                                                    (live.subeventos.length >= 3 ?
                                                                ('VencedordoEncontro'+
                                                                    live.subeventos[2].aposta+
                                                                    live.subeventos[2].idOpcao+live.id).replace(/[^0-9a-z]/gi, '') : '') : '');
        
                                                    let casa = ('Vencedor do Encontro:' + (live.subeventos.length >= 3  ?
                                                                live.subeventos[0].aposta : '') + "=" + "Vencedor do Encontro--"
                                                                +live.subeventos[0].aposta + "=" +
                                                                (live.subeventos.length >= 3 ? ('VencedordoEncontro'+live.subeventos[0].aposta+live.subeventos[0].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                                                + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                                                 'VencedordoEncontro'+live.subeventos[0].aposta : '') + "=" +
                                                                (live.subeventos.length >= 3 ? (live.subeventos[0].cotacao/100).toFixed(2) >
                                                                parseFloat(sessionStorage.getItem('cotaMax')) ? 
                                                                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (live.subeventos[0].cotacao/100).toFixed(2) : 0)
                                                                + "=" + (live.casa + ' x ' + live.fora) + "=" 
                                                                + (camp[0].pais + ': '+camp[0].nome) + "=" + new Date(live.data) + "=" +
                                                                "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')
        
                                                    let empate = ('Vencedor do Encontro:' + (live.subeventos.length >= 3  ?
                                                                live.subeventos[1].aposta : '') + "=" + "Vencedor do Encontro--"
                                                                +live.subeventos[1].aposta + "=" +
                                                                (live.subeventos.length >= 3 ? ('VencedordoEncontro'+live.subeventos[1].aposta+live.subeventos[1].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                                                + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                                                 'VencedordoEncontro'+live.subeventos[1].aposta : '') + "=" +
                                                                (live.subeventos.length >= 3 ? (live.subeventos[1].cotacao/100).toFixed(2) >
                                                                parseFloat(sessionStorage.getItem('cotaMax')) ? 
                                                                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (live.subeventos[1].cotacao/100).toFixed(2) : 0)
                                                                + "=" + (live.casa + ' x ' + live.fora) + "=" 
                                                                + (camp[0].pais + ': '+camp[0].nome) + "=" + new Date(live.data) + "=" +
                                                                "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')
        
                                                    let fora = ('Vencedor do Encontro:' + (live.subeventos.length >= 3  ?
                                                                live.subeventos[2].aposta : '') + "=" + "Vencedor do Encontro--"
                                                                +live.subeventos[2].aposta + "=" +
                                                                (live.subeventos.length >= 3 ? ('VencedordoEncontro'+live.subeventos[2].aposta+live.subeventos[2].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                                                + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                                                 'VencedordoEncontro'+live.subeventos[2].aposta : '') + "=" +
                                                                (live.subeventos.length >= 3 ? (live.subeventos[2].cotacao/100).toFixed(2) >
                                                                parseFloat(sessionStorage.getItem('cotaMax')) ? 
                                                                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (live.subeventos[2].cotacao/100).toFixed(2) : 0)
                                                                + "=" + (live.casa + ' x ' + live.fora) + "=" 
                                                                + (camp[0].pais + ': '+camp[0].nome) + "=" + new Date(live.data) + "=" +
                                                                "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')
        
                                                    let valorCasa = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao/100) ? (cotacao['Vencedor do Encontro'] != undefined && cotacao['Vencedor do Encontro'] < 0 ? 
                                                                    ((live.subeventos[0].cotacao/100) - (((live.subeventos[0].cotacao/100) * (cotacao['Vencedor do Encontro'][1]/100))*-1)) :
                                                                        live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0 
                                                                        &&  (cotacao['Vencedor do Encontro'] != undefined ? cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                                                (parseFloat((live.subeventos[0].cotacao/100) > parseFloat(sessionStorage.getItem('cotaMax')) 
                                                                                ? sessionStorage.getItem('cotaMax') : (live.subeventos[0].cotacao/100)) + 
                                                                                parseFloat(cotacao['Vencedor do Encontro'] != undefined ?
                                                                                    ((live.subeventos[0].cotacao/100) * (cotacao['Vencedor do Encontro'][1]/100)) : 0)).toFixed(2) 
                                                                                 : '&#x1F512;') : '&#x1F512;')
        
                                                    let valorEmpate = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao/100) ? (cotacao['Vencedor do Encontro'] != undefined && cotacao['Vencedor do Encontro'] < 0 ? 
                                                                    ((live.subeventos[1].cotacao/100) - (((live.subeventos[1].cotacao/100) * (cotacao['Vencedor do Encontro'][1]/100))*-1)) :
                                                                        live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0 
                                                                        &&  (cotacao['Vencedor do Encontro'] != undefined ? cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                                                (parseFloat((live.subeventos[1].cotacao/100) > parseFloat(sessionStorage.getItem('cotaMax')) 
                                                                                ? sessionStorage.getItem('cotaMax') : (live.subeventos[1].cotacao/100)) + 
                                                                                parseFloat(cotacao['Vencedor do Encontro'] != undefined ?
                                                                                    ((live.subeventos[1].cotacao/100) * (cotacao['Vencedor do Encontro'][1]/100)) : 0)).toFixed(2) 
                                                                                 : '&#x1F512;') : '&#x1F512;')
        
                                                    let valorFora = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao/100) ? (cotacao['Vencedor do Encontro'] != undefined && cotacao['Vencedor do Encontro'] < 0 ? 
                                                                    ((live.subeventos[2].cotacao/100) - (((live.subeventos[2].cotacao/100) * (cotacao['Vencedor do Encontro'][1]/100))*-1)) :
                                                                        live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0 
                                                                        &&  (cotacao['Vencedor do Encontro'] != undefined ? cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                                                (parseFloat((live.subeventos[2].cotacao/100) > parseFloat(sessionStorage.getItem('cotaMax')) 
                                                                                ? sessionStorage.getItem('cotaMax') : (live.subeventos[2].cotacao/100)) + 
                                                                                parseFloat(cotacao['Vencedor do Encontro'] != undefined ?
                                                                                    ((live.subeventos[2].cotacao/100) * (cotacao['Vencedor do Encontro'][1]/100)) : 0)).toFixed(2) 
                                                                                 : '&#x1F512;') : '&#x1F512;')

                                                        let date = (new Date(live.data).getDate() < 10
                                                                    ? "0" + new Date(live.data).getDate()
                                                                    : new Date(live.data).getDate()) +
                                                                "/" +
                                                                (Number(new Date(live.data).getMonth()) + 1 < 10
                                                                    ? "0" +
                                                                    (Number(new Date(live.data).getMonth()) + 1)
                                                                    : Number(new Date(live.data).getMonth()) + 1) +
                                                                "/" +
                                                                new Date(live.data).getFullYear() +
                                                                " " +
                                                                (new Date(live.data).getHours() < 10
                                                                    ? "0" + new Date(live.data).getHours()
                                                                    : new Date(live.data).getHours()) +
                                                                ":" +
                                                                (Number(new Date(live.data).getMinutes() + "") === 0
                                                                    ? "00"
                                                                    : Number(new Date(live.data).getMinutes() + "") >=
                                                                    10
                                                                        ? new Date(live.data).getMinutes() + ""
                                                                        : "0" + (new Date(live.data).getMinutes() + ""))
                                                        if(width > 600){        
                                                            document.getElementById('preJogos')
                                                            .innerHTML += '<tr id="zebra" >' +
                                                            '<td class="times">'+live.casa + ' X ' + live.fora+
                                                            '<p>'+date+'</p>'+
                                                            '</td>'+
                                                            '<td id="ocultar" onclick="localStorage.setItem(\'' + 'click2' + '\', \'' + casa + '\')">'+
                                                            '<b class="button" id="'+idCasa+'">'+valorCasa+'</b></td>'+

                                                            '<td id="ocultar" onclick="localStorage.setItem(\'' + 'click2' + '\', \'' + empate + '\')">'+
                                                            '<b class="button" id="'+idEmpate+'">'+valorEmpate+'</b></td>'+

                                                            '<td id="ocultar" onclick="localStorage.setItem(\'' + 'click2' + '\', \'' + fora + '\')">'+
                                                            '<b class="button" id="'+idFora+'">'+valorFora+'</b></td>'+

                                                            '<td id="ocultar" ><a href="/sonhobets/#/maispre/'+live.id+'-'+live.data+'"'+ 
                                                            'class="buttonM"><p style="font-size: 26px;">'+"+"+'</p></a></td>'+
                                                            '</tr>'
                                                        }else{

                                                            document.getElementById('preJogos')
                                                            .innerHTML += '<tr id="bets1">' +
                                                            '<td class="times"><a style="text-decoration: none; color: black" href="/sonhobets/#/maispre/'+live.id+'-'+live.data+'"'+ 
                                                            '>'+live.casa + '<br/>' + live.fora+ '</a><br/>'+
                                                            '<p>'+date.split(' ')[0]+'</p>'+
                                                            '<p>'+date.split(' ')[1]+'</p>'+
                                                            '</td>'+
                                                            '<td id="bets3">'+
                                                            '<span id="'+idCasa+'" class="button" style="margin-left: 112px;" onclick="localStorage.setItem(\'' + 'click2' + '\', \'' + casa + '\')">'+
                                                            '<b>'+valorCasa+'</b></span>'+

                                                            '<span id="'+idEmpate+'" class="button" onclick="localStorage.setItem(\'' + 'click2' + '\', \'' + empate + '\')">'+
                                                            '<b>'+valorEmpate+'</b></span>'+

                                                            '<span id="'+idFora+'" class="button" onclick="localStorage.setItem(\'' + 'click2' + '\', \'' + fora + '\')">'+
                                                            '<b>'+valorFora+'</b></span>'+
                                                            '</td>'+
                                                            '</tr>'
                                                        }
                                                    })
                                                })
                                             
                                      
                                                
                                                setTitulo([camp[0].pais, camp[0].nome]);
                                               
                                               
                                                
                                            } else {
                                                setCampeonato([]);
                                            }
                                            
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }).catch(error => {
                                        console.log(error)
                                    });

                            } else {
                                document.getElementById('preJogos')
                                                            .innerHTML = '<center>Apostas Pre-Jogo Desativadas. Fale com seu gerente!</center>';
                            }

                            
                        }
                    } catch (e) {

                    }
                }).catch(error => {
                    console.log(error)
                });

        }

        

        async function getClienteAPI() {

            api.get('/api/getclientes/' + sessionStorage.getItem('login'))
                .then(res => {
                    try {
                        if (res.data) {
                            setClientes(res.data);
                        }
                    } catch (e) {

                    }
                }).catch(error => {
                    console.log(error);
                });

        }

        
            //all();
            getLoginAPI();
            getClienteAPI();
            geraBilhete();
            setCampeonato([]);

    }, []);

    const fixedHeightPaper = clsx(classes.paper);
    return (
        <div className={classes.root}>
            <CssBaseline />

            <Menu2/>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={12} lg={8}>
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={2}>

                                    <Grid xs={12} md={12} sm={6} item>
                                        <Paper className={classes.paperX}>
                                            <Grid container spacing={2} key={127}>

                                                <Grid item sm container align="center">
                                                    <Grid item container direction="column" spacing={2}>
                                                        <Grid item >
                                                            <div id='titulo'></div>
                                                            <Typography variant={"h5"} >
                                                                {titulo.length > 0 ? titulo[0]: ''}
                                                            </Typography>

                                                            <Typography variant="h6" gutterBottom>
                                                                {titulo.length > 0 ? titulo[1]: ''}
                                                            </Typography>
                                                            <Typography gutterBottom variant="subtitle1">

                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                        
                                        <TableContainer component={Paper}>

                                            <Table stickyHeader aria-label="sticky table" >
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align={"center"} id='font'><b>JOGO</b><br/></StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{width: 15}} id='ocultar'><b>CASA</b></StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{width: 15}} id='ocultar'><b>EMPATE</b></StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{width: 15}} id='ocultar'><b>FORA</b></StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{width: 15}} id='ocultar'><b>MAIS</b></StyledTableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody id='preJogos'>
                                                    <LinearProgress/>    
                                                </TableBody>
                                                
                                            </Table>
                                            
                                        </TableContainer>

                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={9} lg={4} id='bl'>
                            <div id='font'>
                            <Paper className={fixedHeightPaper}>
                                <Typography variant="h6" gutterBottom align="center">
                                    <b>PRÉ-JOGO</b>
                                </Typography>
                                <Divider /><br />
                                <div id={"bilhete"}></div>
                                <Divider />
                                <br style={{ marginBottom: '10px' }} />
                                <Typography align="center" style={{
                                    lineHeight: '120%',

                                }}
                                    id={"valuesBets"}>
                                    Cotação: R$ <b id={"cotacao"}></b><br />
                                    Possível Retorno:
                                    R$ <b id={"retorno"}></b><br />
                                    Valor da Aposta:<b></b><br /><br />
                                </Typography>
                                <center><div id={"value"} >
                                    <TextField
                                        fullWidth
                                        id={"resetField1"}
                                        label="Digite um Valor"
                                        type="number"

                                        onChange={valueBetsHandler}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onInput={(e) => {
                                            e.target.value = e.target.value
                                        }}
                                        variant="filled"
                                    /> </div></center>

                                <br style={{ marginBottom: '10px' }} />
                                <div id={"clients"} >
                                    <Autocomplete
                                        id={"resetField2"}
                                        freeSolo
                                        onChange={verifyClientHandler}
                                        options={clientes.clientes}
                                        getOptionLabel={(option) => option.nome}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}

                                                label="Nome do Cliente"
                                                variant="outlined" />}
                                    /></div>

                                <br style={{ marginBottom: '10px' }} />
                                <Button id={"done"}
                                    onClick={betsDone} variant="contained" color="secondary">
                                    <b>FINALIZAR APOSTA</b>
                                </Button>

                                <br style={{ marginBottom: '10px' }} />
                                <center><div id={"fieldClient"}>
                                    <TextField
                                        id={"resetField3"}
                                        label="Cadastrar Cliente"
                                        type="search"
                                        fullWidth
                                        onChange={addVeiryClient}
                                        variant="outlined" /></div></center>

                                <br style={{ marginBottom: '10px' }} />

                                <Button id={"buttonClient"}
                                    variant="contained"
                                    onClick={addClient}
                                    color="secondary">
                                    <b>CADASTRAR CLIENTE</b>
                                </Button>
                                <br style={{ marginBottom: '10px' }} />
                            </Paper>
                            </div>
                        </Grid>
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
                <div>
                    <ScrollUpButton />
                </div>
                <div style={{ display: 'none' }}>

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
                            <div id="bilheteP"></div>
                            <div id="footer"></div>
                        </div>

                    </Grid>

                </div>

            </main>

        </div>

    );



}