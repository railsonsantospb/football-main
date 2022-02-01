import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {useHistory} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useParams} from "react-router";
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useReactToPrint} from 'react-to-print';
import {api, cc} from '../Constantes/index';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Menu from '../Menu/index';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        padding: 5,
    },
}))(TableCell);


export default function Dashboard(props) {
    let history = useHistory();
    let {id} = useParams();
    let idCamp = id.split('-')[0];
    let horario = id.split('-')[1];
    const codigo = cc.generate().split('-').slice(1).join('-');
    var betsAll = "";
    const [bilhetes, setBilhetes] = useState([]);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState("ii");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");
    const [gerenteId, setGerenteId] = useState(0);
    const [bancaId, setBancaId] = useState(0);
    const [entrada, setEntrada] = useState(0);
    const [clientes, setClientes] = useState([]);
    const [nomeTime, setNomeTime] = useState('');
    const [cotacao, setCotacao] = useState([]);
    const [cotacaoJogos, setCotacaoJogos] = useState([]);
    const [apostasPreJogo, setApostasPreJogo] = useState(true);



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
            try{
                if(localStorage.getItem("retorno") != null && localStorage.getItem("retorno") != ""){
                    document.getElementById('retorno').innerHTML = localStorage.getItem("retorno");
                }
            } catch (e) {

            }
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
        InitOdds();
        //console.log(localStorage.getItem('delete'));
    }, 1000);


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
        if(sessionStorage.getItem('login') == null ||  sessionStorage.getItem('login') == "") {

            document.getElementById('clients').style.display = 'none';
            document.getElementById('fieldClient').style.display = 'none';
            document.getElementById('buttonClient').style.display = 'none';
            document.getElementById('resetField1').value = '';
        }
    }


    function salvarBilhete() {


        let d = "";
        let prejogo = localStorage.getItem('betsAll2');
        let dx = new Date();
        let dateHour = dx.getDate() + '/' + (parseInt(dx.getMonth()) + 1) + '/' + dx.getFullYear() + ' ' + dx.getHours() + ':' + dx.getMinutes() + ':' + dx.getSeconds();

        document.getElementById('header').innerHTML = '\n' +
            '                    <div >\n' +
            '\n' +
            '                        <center><h2 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;">SONHOBETS</h2></center>\n' +
            '\n' +
            '\n' +
            '                        <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
            '\n' +
            '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;" class="H3">' + ((localStorage.getItem('betsAll2').split("=").length - 1) > 1 ? 'Aposta Multipla' : 'Aposta Simples') + '</h4></center>\n' +
            '\n' +
            '                        <span style="display: inline-block; text-align: left;">DATA:</span> <span id="conteudo_txtDataBilhete" style="display: inline-block"> ' + dateHour + '</span><br>\n' +
            '\n' +
            '                        <span style="display: inline-block">COLABORADOR:</span> <span style="display: inline-block">' + nomeBanca + '</span><br>\n' +
            '\n' +
            '                        <span style="display: inline-block">CLIENTE:</span> <span style="display: inline-block">' + client + '</span><br>\n' +
            '\n' +
            '                        <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
            '\n' +
            '                        <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">APOSTA</span></div>\n' +
            '\n' +
            '                        <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">COTAÇÃO</span></div>\n' +
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
                '                                    <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">' + typeBets.split('--')[1] + '</span></div>\n' +
                '\n' +
                '                                    <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">' + value + '</span></div>\n' +
                '\n' +
                '                                    <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Status:</span></div>\n' +
                '                                    <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">' + "Aberto" + '</span></div>\n' +
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
            '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Quant. de Jogos:</span></div>\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">' + (localStorage.getItem('betsAll2').split("=").length - 1) + '</span></div>\n' +
            '                            \n' +
            '                            <div>\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Cotação:</span></div>\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: right;"><span  style="display: inline-block">' + parseFloat(document.getElementById('cotacao').innerHTML).toFixed(2) + '</span></div>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Total Apostado:</span></div>\n' +
            '\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: right;"><span id="conteudo_txtTotalApostado" style="display: inline-block">R$ ' + parseFloat(localStorage.getItem('valorIn')).toFixed(2) + '</span></div>\n' +
            '\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Poss. Retorno:</span></div>\n' +
            '\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">R$ ' + parseFloat(document.getElementById('retorno').innerHTML).toFixed(2) + '</span></div>\n' +
            '                            \n' +
            '                            <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
            '                        </div>\n' +
            '\n' +
            '                        <div>\n' +
            '                            <div style="display: inline-block; width: 100%; text-align: center;"><span style="display: inline-block">BILHETE</span></div>\n' +
            '                            <div style="display: inline-block; width: 100%; text-align: center;">\n' +
            '                                <h2 style="font-weight:bold" class="H3">' + codigo + '</h2>                  \n' +
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
                        "valorDeEntrada": parseFloat(entrada),
                        "valorDeSaida": parseFloat(document.getElementById('retorno').innerHTML),
                        "cotacao": parseFloat(document.getElementById('cotacao').innerHTML),
                        "tipoDeJogo": "Pre-Jogo",
                        "quantidadeJogos": qtd,
                        "tipoSimplesouMultiplo": qtd > 1 ? "M" : "S",
                        "comissao": (parseFloat(entrada) * comissaoValor).toFixed(2),
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

                                        }

                                    }).catch(error => {
                                    console.log(error);
                                });

                            });
                            setEntrada(0);
                            localStorage.setItem("retorno", "");
                            setClient("");
                            addVeiryClient("");

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
            document.getElementById('cotacao').innerHTML = parseFloat(resultCotaca > Number(cotacao) ?
                Number(cotacao) : resultCotaca).toFixed(2);
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
                setEntrada(value);
                localStorage.setItem("retorno", (cotacao * Number(value)).toFixed(2));
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
            setEntrada(0);
            localStorage.setItem("retorno", "");
            localStorage.setItem('valorIn', "");
            handleCloseURL();
        }

        localStorage.setItem('valorIn', value);

    }

    function addVeiryClient(e) {
        setClient(e);
    }

    function addClient() {
        if (client.length > 3) {
            if (getClient() == false) {
                api.post('/api/addcliente', {
                    'nome': client,
                    'banca': sessionStorage.getItem('login'),
                    'gerenteId': sessionStorage.getItem('gerenteId'),
                    'nomeBanca': sessionStorage.getItem('nomeBanca')
                })
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
        if(sessionStorage.getItem('login') != null && sessionStorage.getItem('login') != "") {
            clientes.clientes.map((f) => {
                console.log(f);
                if (f.nome == client) {
                    r = true;
                }
            });
        } else {
            r = true;
        }
        return r;
    }

    function verifyClientHandler(e) {

        let auxClient =
            typeof e.target.value === "string" ? e.target.value : e.target.innerText &&
            e.target.innerText.length > 0 ? e.target.innerText : '';
        setClient(auxClient);
        addVeiryClient(auxClient);

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


                api.get('/api/getmaispre/' + id)
                    .then(res => {

                        let valores = new Set();
                        let cotacoes = {};


                        try {


                            i++;


                            if (res.data) {
                                res.data.mais.modalidades.map((m) => {
                                    m.cotacoes.map((c) => {
                                        if (c.subeventos != null) {
                                            c.subeventos.map((e) => {
                                                if (m.titulo + "--" +
                                                    ((m.titulo.indexOf('Handicap') != -1) ?
                                                        (e.titulo + ' (' + e.nome + ')') : e.nome) == auxBets[1]) {


                                                    oddValue = true;
                                                    valid2 = false;

                                                    if (Number(auxBets[4]) == 15 &&
                                                        Number(auxBets[4]) > Number((e.cotacao / 100).toFixed(2))) {
                                                        valid1 = true;
                                                        auxBets[4] = (e.cotacao / 100).toFixed(2);
                                                        localStorage.setItem((bets.split('-')[0] + "x"),
                                                            auxBets.join(','));
                                                        geraBilhete();
                                                    } else if (Number(auxBets[4]) != Number((e.cotacao / 100).toFixed(2))) {
                                                        valid1 = true;
                                                        auxBets[4] = (e.cotacao / 100).toFixed(2);
                                                        localStorage.setItem((bets.split('-')[0] + "x"),
                                                            auxBets.join(','));
                                                        geraBilhete();
                                                    }
                                                }
                                            })
                                        }
                                    })
                                })


                                if (betsAll.length == i) {

                                    console.log(client+"cccc");
                                    if (Number(document.getElementById('retorno').innerHTML) > 0) {
                                        if (cotacaoAux > parseFloat(sessionStorage.getItem('cotacaoAdminMin'))) {
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
                                            if(sessionStorage.getItem('login') == null || sessionStorage.getItem('login') == "") {
                                                if (!valid1 && !valid2 && !valid3) {
                                                    let qtd = localStorage.getItem('betsAll2').split("=").length - 1;


                                                    if (500 >= parseFloat(localStorage.getItem('valorIn'))) {
                                                        //salvarBilhete();
                                                        let codigoPIn = Math.ceil(Math.random() * Math.pow(10,6));
                                                        api.post('/api/addbilhetetemporario', {
                                                            'codigoPin': codigoPIn,
                                                            'bilhete': {...localStorage}
                                                        })
                                                            .then(res => {
                                                                if(res.data){
                                                                    noneBets();
                                                                    clearOdds();
                                                                    localStorage.removeItem("valorIn");
                                                                    localStorage.clear();

                                                                    document.getElementById("bilhete").innerHTML =
                                                                        "<center><h1>" + codigoPIn + "</h1></center>";
                                                                }
                                                                clearOdds();
                                                            }).catch(error => {
                                                            console.log(error)
                                                        });

                                                    } else {
                                                        alert('Sem limite para apostar!');
                                                    }

                                                }
                                            } else {
                                                if (getClient() && !valid1 && !valid2 && !valid3) {
                                                    let qtd = localStorage.getItem('betsAll2').split("=").length - 1;
                                                    let auxSaldo = qtd > 1 ? saldoGeral : saldoSimples;

                                                    if (auxSaldo >= parseFloat(localStorage.getItem('valorIn'))) {
                                                        salvarBilhete();
                                                        handlePrint();
                                                        noneBets();
                                                        clearOdds();
                                                        localStorage.setItem("valorIn", "");
                                                        geraBilhete();

                                                    } else {
                                                        alert('Sem limite para apostar!');
                                                    }

                                                }
                                            }
                                        } else {
                                            setMessage('A cotação mínima é de R$ ' + parseFloat(sessionStorage.getItem('cotacaoAdminMin'))
                                                .toFixed(2));
                                            handleClickOpenURL();
                                        }
                                    } else {
                                        setMessage('Por favor insira um valor de no mínimo R$ ' + sessionStorage.getItem('valorDeEntrada') + ',00');
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


    const onClickHandler = (e) => {
        localStorage.removeItem("valorIn");
        if (apostasPreJogo == true) {
            let qtd = localStorage.getItem('betsAll2').split("=").length;
            let qtdJogos = sessionStorage.getItem("qtdJogos");

            if (qtd <= qtdJogos) {
                document.getElementById('bilheteP').innerHTML = '';
                const team = e.target.getAttribute("data-item");
                document.getElementById("retorno").innerHTML = '0.00';
                try {
                    let betsGame = team.split("=");
                    if (betsGame[4] != 0) {
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
                            localStorage.removeItem("valorIn");
                            localStorage.removeItem("retorno");
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
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                alert('Você passou o número máximo de 20 jogos por apostas!');
            }
        }
    };

    useEffect(() => {


        async function getLoginAPI() {

            api.get('/api/getbanca/' + sessionStorage.getItem('login'))
                .then(res => {
                    try {
                        if (res.data) {
                            let c = {};
                            setSaldoSimples(res.data.bancas.saldoSimples);
                            setSaldoGeral(res.data.bancas.saldoGeral);
                            setNomeBanca(res.data.bancas.nome);
                            setGerenteId(res.data.bancas.gerente);
                            setBilhetes(res.data.bancas.comissaoPreJogo.split(';'));
                            setBancaId(res.data.bancas.id);
                            setApostasPreJogo(res.data.bancas.ativarApostasPreJogo);

                            api.get('/api/getcotacaoprejogo/' + res.data.bancas.gerente + '/' + res.data.bancas.id).then(res => {

                                try {
                                    res.data.cotacoes.map((o) => {
                                        c[o.tipoDeCotacao] = [o.status, o.porcentagem];
                                    })
                                    setCotacao(c);
                                    if(sessionStorage.getItem('login') == null ||
                                        sessionStorage.getItem('login') == "") {
                                        setCotacao({});
                                    }
                                } catch (e) {
                                    console.log(e);
                                }
                            }).catch(error => {
                                console.log(error)
                            });
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


        async function getMaisAPI() {

            api.get('/api/getmaispre/' + idCamp)
                .then(res => {
                    let l = [];


                    try {
                        let mais = res.data.mais.modalidades.slice();
                        if(mais[2] != undefined && mais[2].titulo == 'Resultado Certo'){
                            let l = [];
                            mais[2].cotacoes.map((f) =>{

                                f.subeventos.map((s) =>{

                                    if(l.indexOf(s.nome) != -1){

                                        s.nome = s.nome.split('-')[1]+'-'+s.nome.split('-')[0]
                                    }
                                    l.push(s.nome);

                                })

                            })
                        }
                        mais.map((m) => {
                            l.push(m)
                        });
                        setNomeTime([res.data.mais.nomeEvento,
                            res.data.mais.idEvento, res.data.mais.pais,
                            res.data.mais.campeonato]);

                        setCotacaoJogos(l);
                    } catch (e) {
                        console.log(e);
                    }
                }).catch(error => {
                console.log(error);
            });

        }

        if(sessionStorage.getItem('login') != null &&  sessionStorage.getItem('login') != "") {
            getLoginAPI();
            getClienteAPI();
        }
        getMaisAPI();

        geraBilhete();


    }, []);


    const fixedHeightPaper = clsx(classes.paper);
    return (
        <div className={classes.root}>
            <CssBaseline/>

            <Menu/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={12} lg={8}>
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={2}>

                                    <Grid xs={12} md={12} sm={6} item>
                                        <Paper className={classes.paperX}>
                                            <Grid container spacing={2}>

                                                <Grid item sm container align="center">
                                                    <Grid item container direction="column" spacing={2}>
                                                        <Grid item>
                                                            <Typography variant="h4" gutterBottom>
                                                                {nomeTime[2]}
                                                            </Typography>
                                                            <Typography variant="h5" gutterBottom>
                                                                {nomeTime[0]}
                                                            </Typography>
                                                            <Typography gutterBottom variant="subtitle1">
                                                                {nomeTime[3]}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                        {cotacaoJogos.length > 0 ? cotacaoJogos.map((nome) => (

                                            <TableContainer component={Paper}>


                                                <Table id="preJogos">


                                                    <TableHead>
                                                        {cotacaoJogos.length != undefined && cotacaoJogos.length > 0 ?
                                                            <TableRow>
                                                                <StyledTableCell align={"left"}
                                                                                 id='font'><b>{nome.titulo}</b></StyledTableCell>
                                                                <StyledTableCell align="right" id='font'
                                                                                 style={{width: '10%'}}><b>COTAÇÃO</b></StyledTableCell>
                                                            </TableRow> : ''}
                                                    </TableHead>

                                                    <TableBody>


                                                        {nome.cotacoes.length != undefined && nome.cotacoes.length > 0 ? nome.cotacoes.map((bet) => (
                                                            (bet.subeventos != null ? bet.subeventos.map((n) => (


                                                                    ( '+3 +4 +5 +6 +7 -3 -4 -5 -6 -7'.indexOf(n.nome) == -1 ? <tr  >

                                                                        <StyledTableCell id='font'>
                                                                            <b >{(nome.titulo.indexOf('Handicap') != -1) ? (n.titulo + ' (' + n.nome + ')') : n.nome}</b>
                                                                        </StyledTableCell>

                                                                        <td align="right" id='font'>
                                                                           <span onClick={onClickHandler}

                                                                                 variant="contained" color={"primary"} class="buttonPlus"
                                                                                 id={(parseFloat(sessionStorage.getItem('cotaMin')) < (n.cotacao/100).toFixed(2) ?  ((nome.titulo+((nome.titulo.indexOf('Handicap') != -1) ?
                                                                                     (n.titulo + ' (' + n.nome + ')') : n.nome))
                                                                                     .replace(/[^0-9a-z]/gi, '')+n.idOpcao+nomeTime[1]):'')}

                                                                                 data-item={nome.titulo + ':' + ((nome.titulo.indexOf('Handicap') != -1) ? (n.titulo + ' (' + n.nome + ')') : n.nome) + '=' + nome.titulo + "--" +
                                                                                     ((nome.titulo.indexOf('Handicap') != -1) ? (n.titulo + ' (' + n.nome + ')') : n.nome) + "=" + ((nome.titulo+((nome.titulo.indexOf('Handicap') != -1) ? (n.titulo + ' (' + n.nome + ')') : n.nome)).replace(/[^0-9a-z]/gi, '')+n.idOpcao) +
                                                                                     "=" + nomeTime[1] + "-" + (nome.titulo+((nome.titulo.indexOf('Handicap') != -1) ? (n.titulo + ' (' + n.nome + ')') : n.nome)).replace(/[^0-9a-z]/gi, '') + "=" +
                                                                                     ((n.cotacao/100).toFixed(2) < parseFloat(sessionStorage.getItem('cotaMax')) ?
                                                                                         (n.cotacao/100).toFixed(2) : parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2)) + "=" + nomeTime[0].replace(/,/g, '') +
                                                                                     "=" + nomeTime[3].replace(/,/g, '') + "=" + new Date(parseInt(horario)) + "=" + "Aberto" + "=" + nomeTime[1]}>

                                                                        <b data-item={nome.titulo + ':' + ((nome.titulo.indexOf('Handicap') != -1) ? (n.titulo + ' (' + n.nome + ')') : n.nome) + '=' + nome.titulo + "--" +
                                                                            ((nome.titulo.indexOf('Handicap') != -1) ? (n.titulo + ' (' + n.nome + ')') : n.nome) + "=" + ((nome.titulo+((nome.titulo.indexOf('Handicap') != -1) ? (n.titulo + ' (' + n.nome + ')') : n.nome)).replace(/[^0-9a-z]/gi, '')+n.idOpcao) +
                                                                            "=" + nomeTime[1] + "-" + ((nome.titulo+((nome.titulo.indexOf('Handicap') != -1) ? (n.titulo + ' (' + n.nome + ')') : n.nome)).replace(/[^0-9a-z]/gi, '')) + "=" +
                                                                            ((n.cotacao/100).toFixed(2) < parseFloat(sessionStorage.getItem('cotaMax')) ?
                                                                                (n.cotacao/100).toFixed(2) : parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2)) + "=" + nomeTime[0].replace(/,/g, '') +
                                                                            "=" + nomeTime[3].replace(/,/g, '') + "=" + new Date(parseInt(horario)) + "=" + "Aberto" + "=" + nomeTime[1]}>

                                                                            {(parseFloat(sessionStorage.getItem('cotaMin')) < (n.cotacao/100).toFixed(2) ? (cotacao[nome.titulo] != undefined && cotacao[nome.titulo] < 0 ?
                                                                                (((n.cotacao/100).toFixed(2)) - ((((n.cotacao/100).toFixed(2)) * (cotacao[nome.titulo][1]/100))*-1)) :
                                                                                n.cotacao > 0
                                                                                &&  (cotacao[nome.titulo] != undefined ? cotacao[nome.titulo][0] : true) == true ?
                                                                                    (parseFloat(((n.cotacao/100).toFixed(2)) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                                            ? sessionStorage.getItem('cotaMax') : ((n.cotacao/100).toFixed(2))) +
                                                                                        parseFloat(cotacao[nome.titulo] != undefined ?
                                                                                            (((n.cotacao/100).toFixed(2)) * (cotacao[nome.titulo][1]/100)) : 0)).toFixed(2)
                                                                                    : <span style={{color:"red"}}>0</span>) : <span style={{color:"red"}}>0</span>)}</b>
                                                                    </span>
                                                                        </td>

                                                                    </tr> : '')
                                                            )) : '')
                                                        )) : <LinearProgress/>}


                                                    </TableBody>

                                                </Table>
                                            </TableContainer>

                                        )) : <LinearProgress/>}

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
                                    <Divider/><br/>
                                    <div id={"bilhete"}></div>
                                    <br style={{marginBottom: '10px'}}/>
                                    <Typography align="center" style={{
                                        lineHeight: '120%',

                                    }}
                                                id={"valuesBets"}>
                                        Cotação: R$ <b id={"cotacao"}></b><br/>
                                        Possível Retorno:
                                        R$ <b id={"retorno"}>0.00</b><br/>
                                        Valor da Aposta:<b >{localStorage.getItem("valorIn") != null &&
                                    localStorage.getItem("valorIn") != "" ?
                                        localStorage.getItem("valorIn") : ""
                                    }</b><br/><br/>
                                    </Typography>
                                    <center>
                                        <div id={"value"}>
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
                                                /></div>
                                    </center>

                                    <br style={{marginBottom: '10px'}}/>
                                    <div id={"clients"}>
                                        <Autocomplete
                                            id={"resetField2"}
                                            freeSolo
                                            onChange={verifyClientHandler}
                                            options={clientes.clientes}
                                            getOptionLabel={(option) => option.nome}
                                            value={client}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    id={"auto"}

                                                    value={client}
                                                    label="Nome do Cliente"
                                                    variant="outlined"/>}
                                        /></div>

                                    <br style={{marginBottom: '10px'}}/>

                                    <Button id={"done"}
                                            onClick={betsDone} variant="contained" color="secondary">
                                        <b>FINALIZAR APOSTA</b>
                                    </Button>

                                
                                    <br style={{marginBottom: '10px'}}/>
                                    <center>
                                        <div id={"fieldClient"}>
                                            <TextField
                                                id={"resetField3"}
                                                label="Cadastrar Cliente"
                                                type="search"
                                                fullWidth
                                                onChange={addVeiryClient}
                                                variant="outlined"/></div>
                                    </center>

                                    <br style={{marginBottom: '10px'}}/>

                                    <Button id={"buttonClient"}
                                            variant="contained"
                                            onClick={addClient}
                                            color="secondary">
                                        <b>CADASTRAR CLIENTE</b>
                                    </Button>
                                    <br style={{marginBottom: '10px'}}/>
                                </Paper>
                            </div>
                        </Grid>
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
                <div>
                    <ScrollUpButton/>
                </div>
                <div style={{display: 'none'}}>

                    <Grid item xs={12} md={4} sm={12}>
                        <div style={{
                            width: 'calc(100% - 15%)',
                            fontSize: 12,
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