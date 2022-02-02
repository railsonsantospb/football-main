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
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {useHistory} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useReactToPrint} from 'react-to-print';
import {api, cc} from '../Constantes/index';
import Menu from '../Menu/index';
import useWindowDimensions from '../Size/index';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


export default function Dashboard(props) {

    const codigo = cc.generate().split('-').slice(1).join('-');
    let tab = false;

    let betsAll = "";
    let history = useHistory();
    const [live, setLive] = useState([]);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState("");
    const [openURL, setOpenURL] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");
    const [bilhetes, setBilhetes] = useState([]);
    const [gerenteId, setGerenteId] = useState(0);
    const [bancaId, setBancaId] = useState(0);
    const [clientes, setClientes] = useState([]);
    const [entrada, setEntrada] = useState([]);
    const {height, width} = useWindowDimensions();
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState("");


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
        button: {
            width: 10,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,

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


    function InitOdds() {
        localStorage.setItem("retorno", "");
        localStorage.setItem("valorIn", "");
        if (localStorage.getItem("betsAll") === null) {
            localStorage.setItem("betsAll", "");
            localStorage.setItem('displayBets', 'none');
            try {
                noneBets();
            } catch (e) {
            }

        } else {
            let bets = localStorage.getItem("betsAll");
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
        let bets = localStorage.getItem("betsAll");

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

    let initInterval = setInterval(() => {
        if (localStorage.getItem('delete') !== null) {
            let team = localStorage.getItem('delete');
            try {
                document.getElementById(team.split('-')[1] + team.split('-')[0]).style.background = "";
            } catch (e) {
                localStorage.setItem(team.split('-')[0], "");
                localStorage.setItem(team.split('-')[0] + 'x', "");
                localStorage.removeItem(team.split('-')[0]);
                localStorage.removeItem(team.split('-')[0] + 'x');
                betsAll = localStorage.getItem("betsAll");
                betsAll = betsAll.replace(team.split('-')[0] + "-" + team.split('-')[1] + "=", "");
                localStorage.setItem("betsAll", betsAll);
                geraBilhete();
            }
            localStorage.setItem(team.split('-')[0], "");
            localStorage.setItem(team.split('-')[0] + 'x', "");
            localStorage.removeItem(team.split('-')[0]);
            localStorage.removeItem(team.split('-')[0] + 'x');
            betsAll = localStorage.getItem("betsAll");
            betsAll = betsAll.replace(team.split('-')[0] + "-" + team.split('-')[1] + "=", "");
            localStorage.setItem("betsAll", betsAll);
            geraBilhete();
        }
        localStorage.removeItem('delete');
        if (localStorage.getItem('click') != null && localStorage.getItem('click') != '') {
            onClickHandler();
            localStorage.removeItem('click');
        }
        InitOdds();



    }, 100);


    function noneBets() {
        localStorage.setItem('displayBets', 'none');
        document.getElementById('valuesBets').style.display = 'none';
        document.getElementById('value').style.display = 'none';
        document.getElementById('clients').style.display = 'none';
        document.getElementById('done').style.display = 'none';
        document.getElementById('fieldClient').style.display = 'none';
        document.getElementById('buttonClient').style.display = 'none';
        document.getElementById('resetField1').value = '';

    }

    function blockBets() {
        localStorage.setItem('displayBets', 'block');
        document.getElementById('value').style.display = 'block';
        document.getElementById('clients').style.display = 'block';
        document.getElementById('done').style.display = 'block';
        document.getElementById('fieldClient').style.display = 'block';
        document.getElementById('buttonClient').style.display = 'block';
        document.getElementById('valuesBets').style.display = 'block';
    }


    function geraBilhete() {
        if (localStorage.getItem('betsAll') == "") {
            noneBets();
        }

        try {
            document.getElementById("bilhete").innerHTML = '';
            localStorage.getItem('betsAll').split('=').slice(0, -1).map((b) => {
                let campeonato = localStorage.getItem(b.split('-')[0] + 'x').split(',')[6];
                let times = localStorage.getItem(b.split('-')[0] + 'x').split(',')[5].replace('-', 'x');
                let data = localStorage.getItem(b.split('-')[0] + 'x').split(',')[7];
                let typeBets = localStorage.getItem(b.split('-')[0] + 'x').split(',')[1].split('--')[0];
                let bets = localStorage.getItem(b.split('-')[0] + 'x').split(',')[1].split('--')[1];
                let value = localStorage.getItem(b.split('-')[0] + 'x').split(',')[4];
                let date = "delete";

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
        let prejogo = localStorage.getItem('betsAll');
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
            '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;" class="H3">' + ((localStorage.getItem('betsAll').split("=").length - 1) > 1 ? 'Aposta Multipla' : 'Aposta Simples') + '</h4></center>\n' +
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
            '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Quant. Jogos:</span></div>\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">' + (localStorage.getItem('betsAll').split("=").length - 1) + '</span></div>\n' +
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
                let qtd = parseFloat(localStorage.getItem('betsAll').split("=").length - 1);

                for (let valores of bilhetes) {

                    if (qtd >= parseFloat(valores.split(':')[0])) {
                        comissaoValor = parseFloat(valores.split(':')[1]) / 100;

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
                        "tipoDeJogo": "Ao Vivo",
                        "quantidadeJogos": qtd,
                        "tipoSimplesouMultiplo": qtd > 1 ? "M" : "S",
                        "comissao": (parseFloat(entrada) * comissaoValor).toFixed(2),
                        "status": "Aberto"

                    })
                    .then(res => {
                        let prejogo = localStorage.getItem('betsAll');
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
                                                localStorage.setItem('betsAll', localStorage.getItem('betsAll').replace(b + '=', ''));
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
            var id = localStorage.getItem('betsAll').split('=');

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

    function valueBetsHandler(e) {
        var value = e.target.value;
        
        let cotacao = Number(document.getElementById('cotacao').innerHTML);
        if (1) {

                setEntrada(value);

                document.getElementById('retorno').innerHTML =
                    ((cotacao * Number(value)).toFixed(2)) > parseFloat("10000") ? parseFloat("10000").toFixed(2) :
                        ((cotacao * Number(value)).toFixed(2));

                localStorage.setItem("retorno", ((cotacao * Number(value)).toFixed(2)) > parseFloat("10000") ? parseFloat("10000").toFixed(2) :
                    ((cotacao * Number(value)).toFixed(2)));

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
        setValue(e.target.value);

    }

    function addClient() {
        if (value.length > 3) {
            if (getClient() == false) {
                api.post('/api/addcliente', {
                    'nome': value,
                    'banca': sessionStorage.getItem('login'),
                    'gerenteId': sessionStorage.getItem('gerenteId'),
                    'nomeBanca': sessionStorage.getItem('nomeBanca')
                })
                    .then(res => {
                        try {
                            let nomes = [];
                            if (res.data) {
                                setMessage(`Cliente cadastrado com sucesso!`);
                                handleClickOpenURL();
                                api.get('/api/getclientes/' + sessionStorage.getItem('login'))
                                    .then(res => {
                                        try {
                                            if (res.data) {
                                                res.data.clientes.map((c) =>{
                                                    nomes.push(c.nome);
                                                });
                                            }
                                        } catch (e) {

                                        }
                                        setClientes((nomes));
                                    }).catch(error => {
                                    console.log(error);
                                });
                            }
                        } catch (e) {

                        }
                        setValue("");
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
        clientes.map((f) => {
            console.log(f);
            if (f == client) {
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


    function validIn(){

        let valorMax = sessionStorage.getItem('valorDeSaida');                                                          let valorMin = sessionStorage.getItem('valorDeEntrada');                                                
        if (parseFloat(entrada) >= valorMin && parseFloat(entrada) <= valorMax) {                                               betsDone();                          
        } else if (parseFloat(entrada) < valorMin) {

         document.getElementById('retorno').innerHTML = '0.00';
                setMessage("O valor mínimo permitido<br/> por aposta é de R$ " + parseFloat(valorMin).toFixed(2)
);                                                                handleClickOpenURL();
        } else {                                                    setMessage("O valor máximo permitido<br/> por aposta é de R$ " + parseFloat(valorMax).toFixed(2));
          handleClickOpenURL();                                 }                                                   }


    function betsDone() {
        let qtd = localStorage.getItem('betsAll2').split("=").length-1;
        let qtdJogos = sessionStorage.getItem("qtdJogos");
        if(qtd <= qtdJogos) {
        handleClickOpenLoading();


        setTimeout(function () {

            let valid1 = false;
            let valid2 = true;
            let valid3 = false;
            let oddValue = false;
            let teams = [];
            let cotacaoAux = 1;
            let cotAux = parseFloat(document.getElementById('cotacao').innerHTML);
            let betsAll = localStorage.getItem("betsAll").split("=");
            var id = localStorage.getItem('betsAll').split('=');

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


                api.get('/api/getmaison/' + id)
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
                                                var id = localStorage.getItem('betsAll').split('=');

                                                if (id !== null && id[0] !== '') {
                                                    for (let n in id.slice(0, id.length - 1)) {
                                                        resultCotaca *= parseFloat(localStorage.getItem(id[n].split('-')[0] + 'x').split(',')[4]);

                                                    }
                                                } else {
                                                    resultCotaca = 0;
                                                }
                                                let r = parseFloat(document.getElementById('retorno').innerHTML);
                                                if(resultCotaca != r && resultCotaca <= 10000){
                                                    document.getElementById('retorno').innerHTML = ' ' +
                                                        Number(resultCotaca * Number(document.getElementById('resetField1').value)).toFixed(2);
                                                    setMessage(`A cotação escolhida alterou de: R$ ${cotacaoAux.toFixed(2)} <br/> para: R$ ${resultCotaca.toFixed(2)} . Clique novamente para confirmar a aposta!`);
                                                } else {
                                                    setMessage(`Algumas apostas foram alteradas, pode finalizar sua aposta!`);
                                                }
                                                handleClickOpenURL();


                                            }
                                            if (getClient() && !valid1 && !valid2 && !valid3) {
                                                let qtd = localStorage.getItem('betsAll').split("=").length - 1;
                                                let auxSaldo = qtd > 1 ? saldoGeral : saldoSimples;

                                                if (auxSaldo >= parseFloat(entrada)) {
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
        } else {
            alert('Você selecionou ' + qtd + ' jogos, o máximo é ' + qtdJogos);
        }
    }


    function onClickHandler() {
        document.getElementById('resetField1').value = '';
        if(sessionStorage.getItem('login') != null && sessionStorage.getItem('login') != "") {
            localStorage.removeItem("valorIn");
            if (1) {
                sessionStorage.setItem('minutos', new Date().getMinutes());
                document.getElementById('bilheteP').innerHTML = '';
                const team = localStorage.getItem('click');
                document.getElementById("retorno").innerHTML = '0.00';
                try {
                    let betsGame = team.split("=");

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
                        betsAll = localStorage.getItem("betsAll");
                        betsAll = betsAll.replace(
                            betsGame.slice(-1)[0] + "-" + betsGame[2] + "=",
                            ""
                        );
                        localStorage.setItem("betsAll", betsAll);
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
                        betsAll = localStorage.getItem("betsAll");
                        betsAll = betsAll.replace(
                            betsGame.slice(-1)[0] +
                            "-" +
                            localStorage.getItem(betsGame.slice(-1)[0]) +
                            "=",
                            ""
                        );
                        localStorage.setItem(betsGame.slice(-1)[0], betsGame[2]);
                        betsAll = betsAll + betsGame.slice(-1)[0] + "-" + betsGame[2] + "=";
                        localStorage.setItem("betsAll", betsAll);
                        geraBilhete();
                        cotacaoHandler();
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    };

    useEffect(() => {

        let cancel = true;



        async function getLoginAPI() {
            if (Number(new Date().getMinutes() - Number(sessionStorage.getItem('minutos'))) >= 10) {
                history.push('/');
            }

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
                            console.log(res.data.bancas.ativarApostasAoVivos == false);
                            if (res.data.bancas.ativarApostasAoVivos == true) {

                                let l = [];
                                let cotacao = {};
                                api.get('/api/getlive')
                                    .then(res => {

                                        try {
                                            document.getElementById('aoVivo').innerHTML = '';
                                            res.data.live.campeonatos.map((c) => {
                                                try {
                                                    res.data.cotacao.map((o) => {
                                                        cotacao[o.tipoDeCotacao] = [o.status, o.porcentagem];
                                                    })


                                                    c.eventos.map((live) => {

                                                        if (live.periodo != "Não Iniciado") {
                                                            let idCasa = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ?
                                                                (live.subeventos.length >= 3 ?
                                                                    ('VencedordoEncontro' +
                                                                        live.subeventos[0].aposta +
                                                                        live.subeventos[0].idOpcao + live.id).replace(/[^0-9a-z]/gi, '') : '') : '');

                                                            let idEmpate = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ?
                                                                (live.subeventos.length >= 3 ?
                                                                    ('VencedordoEncontro' +
                                                                        live.subeventos[1].aposta +
                                                                        live.subeventos[1].idOpcao + live.id).replace(/[^0-9a-z]/gi, '') : '') : '');

                                                            let idFora = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ?
                                                                (live.subeventos.length >= 3 ?
                                                                    ('VencedordoEncontro' +
                                                                        live.subeventos[2].aposta +
                                                                        live.subeventos[2].idOpcao + live.id).replace(/[^0-9a-z]/gi, '') : '') : '');

                                                            let casa = ('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                                                    live.subeventos[0].aposta : '') + "=" + "Vencedor do Encontro--"
                                                                + live.subeventos[0].aposta + "=" +
                                                                (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[0].aposta + live.subeventos[0].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                                                + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                                                    'VencedordoEncontro' + live.subeventos[0].aposta : '') + "=" +
                                                                (live.subeventos.length >= 3 ? (live.subeventos[0].cotacao / 100).toFixed(2) >
                                                                parseFloat(sessionStorage.getItem('cotaMax')) ?
                                                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (live.subeventos[0].cotacao / 100).toFixed(2) : 0)
                                                                + "=" + (live.casa + ' x ' + live.fora) + "="
                                                                + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                                                "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')

                                                            let empate = ('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                                                    live.subeventos[1].aposta : '') + "=" + "Vencedor do Encontro--"
                                                                + live.subeventos[1].aposta + "=" +
                                                                (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[1].aposta + live.subeventos[1].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                                                + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                                                    'VencedordoEncontro' + live.subeventos[1].aposta : '') + "=" +
                                                                (live.subeventos.length >= 3 ? (live.subeventos[1].cotacao / 100).toFixed(2) >
                                                                parseFloat(sessionStorage.getItem('cotaMax')) ?
                                                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (live.subeventos[1].cotacao / 100).toFixed(2) : 0)
                                                                + "=" + (live.casa + ' x ' + live.fora) + "="
                                                                + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                                                "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')

                                                            let fora = ('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                                                    live.subeventos[2].aposta : '') + "=" + "Vencedor do Encontro--"
                                                                + live.subeventos[2].aposta + "=" +
                                                                (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[2].aposta + live.subeventos[2].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                                                + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                                                    'VencedordoEncontro' + live.subeventos[2].aposta : '') + "=" +
                                                                (live.subeventos.length >= 3 ? (live.subeventos[2].cotacao / 100).toFixed(2) >
                                                                parseFloat(sessionStorage.getItem('cotaMax')) ?
                                                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (live.subeventos[2].cotacao / 100).toFixed(2) : 0)
                                                                + "=" + (live.casa + ' x ' + live.fora) + "="
                                                                + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                                                "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')

                                                            let valorCasa = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (cotacao['Vencedor do Encontro'] != undefined && cotacao['Vencedor do Encontro'] < 0 ?
                                                                ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                                live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                                                                && (cotacao['Vencedor do Encontro'] != undefined ? cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                                    (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                            ? sessionStorage.getItem('cotaMax') : (live.subeventos[0].cotacao / 100)) +
                                                                        parseFloat(cotacao['Vencedor do Encontro'] != undefined ?
                                                                            ((live.subeventos[0].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                    : '<b style="color:red">0<b>') : '<b style="color:red">0<b>')

                                                            let valorEmpate = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (cotacao['Vencedor do Encontro'] != undefined && cotacao['Vencedor do Encontro'] < 0 ?
                                                                ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                                live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                                                                && (cotacao['Vencedor do Encontro'] != undefined ? cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                                    (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                            ? sessionStorage.getItem('cotaMax') : (live.subeventos[1].cotacao / 100)) +
                                                                        parseFloat(cotacao['Vencedor do Encontro'] != undefined ?
                                                                            ((live.subeventos[1].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                    : '<b style="color:red">0<b>') : '<b style="color:red">0<b>')

                                                            let valorFora = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (cotacao['Vencedor do Encontro'] != undefined && cotacao['Vencedor do Encontro'] < 0 ?
                                                                ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                                live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                                                                && (cotacao['Vencedor do Encontro'] != undefined ? cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                                    (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                            ? sessionStorage.getItem('cotaMax') : (live.subeventos[2].cotacao / 100)) +
                                                                        parseFloat(cotacao['Vencedor do Encontro'] != undefined ?
                                                                            ((live.subeventos[2].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                    : '<b style="color:red">0<b>') : '<b style="color:red">0<b>')

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
                                                            if (width > 600) {
                                                                document.getElementById('aoVivo')
                                                                    .innerHTML += '<tr id="zebra">' +
                                                                    '<td class="times">' + live.casa + ' X ' + live.fora + '<br/>' +
                                                                    c.pais + ': ' + c.nome + '<br/>' +
                                                                    '<b>(' + live.placar.split(':')[0] + ' - ' + live.placar.split(':')[1] + ')</b><br/>' +
                                                                    '<b>' + (live.periodo == 'INT' ? 'Intervalo' : live.periodo) + ' - ' + live.tempoDecorridoMin + 'min</b>' +
                                                                    '</td>' +
                                                                    '<td id="ocultar" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + casa + '\')">' +
                                                                    '<b class="button" id="' + (valorCasa[0] == '&' ? '' : idCasa) + '">' + valorCasa + '</b></td>' +

                                                                    '<td id="ocultar" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + empate + '\')">' +
                                                                    '<b class="button" id="' + (valorEmpate[0] == '&' ? '' : idEmpate) + '">' + valorEmpate + '</b></td>' +

                                                                    '<td id="ocultar" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + fora + '\')">' +
                                                                    '<b class="button" id="' + (valorFora[0] == '&' ? '' : idFora) + '">' + valorFora + '</b></td>' +

                                                                    '<td id="ocultar" ><a href="/#/maisaovivo/' + live.id + '"' +
                                                                    'class="buttonM"><p style="font-size: 26px;">' + "+" + '</p></a></td>' +
                                                                    '</tr>'
                                                            } else {

                                                                document.getElementById('aoVivo')
                                                                    .innerHTML += '<tr id="bets1">' +
                                                                    '<td class="times"><a style="text-decoration: none; color: black" href="/#/maisaovivo/' + live.id + '"' +
                                                                    '>' + live.casa + ' X ' + live.fora + '</a><br/>' +
                                                                    c.pais + ': ' + c.nome + '<br/>' +
                                                                    '<b>(' + live.placar.split(':')[0] + ' - ' + live.placar.split(':')[1] + ')</b><br/>' +
                                                                    '<b>' + (live.periodo == 'INT' ? 'Intervalo' : live.periodo) + '<br/>' + live.tempoDecorridoMin + 'min</b>' +
                                                                    '</td>' +
                                                                    '<td id="bets2">' +
                                                                    '<span id="' + (valorCasa[0] == '&' ? '' : idCasa) + '" class="button" style="margin-left: 52px;" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + casa + '\')">' +
                                                                    '<b>' + valorCasa + '</b></span>' +

                                                                    '<span id="' + (valorEmpate[0] == '&' ? '' : idEmpate) + '" class="button" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + empate + '\')">' +
                                                                    '<b>' + valorEmpate + '</b></span>' +


                                                                    '<span id="' + (valorFora[0] == '&' ? '' : idFora) + '" class="button" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + fora + '\')">' +
                                                                    '<b>' + valorFora + '</b></span>' + '</td>' +

                                                                    '</tr>'
                                                            }
                                                        }

                                                    })


                                                } catch (e) {

                                                }

                                            })

                                        } catch (e) {
                                            // console.log(e);
                                        }
                                        setLive(l);

                                    }).catch(error => {
                                    // console.log(error);
                                });

                            } else {
                                document.getElementById('aoVivo')
                                    .innerHTML = '<center>Apostas Ao Vivo Desativadas. Fale com seu gerente!</center>';
                            }

                        }
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });

        }

        async function getClienteAPI() {
            let nomes = [];
            api.get('/api/getclientes/' + sessionStorage.getItem('login'))
                .then(res => {
                    try {

                        if (res.data) {

                            res.data.clientes.map((c) =>{
                                nomes.push(c.nome);

                            })
                        }
                    } catch (e) {

                    }
                    setClientes(nomes);

                }).catch(error => {
                console.log(error);
            });

        }

        async function gamesLivre(){
            if (Number(new Date().getMinutes() - Number(sessionStorage.getItem('minutos'))) >= 10) {
                history.push('/');
            }
            let l = [];
            let cotacao = {};
            api.get('/api/getlive')
                .then(res => {

                    try {
                        document.getElementById('aoVivo').innerHTML = '';
                        res.data.live.campeonatos.map((c) => {
                            try {
                                res.data.cotacao.map((o) => {
                                    cotacao[o.tipoDeCotacao] = [o.status, o.porcentagem];
                                })


                                c.eventos.map((live) => {

                                    if (live.periodo != "Não Iniciado") {
                                        let idCasa = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ?
                                            (live.subeventos.length >= 3 ?
                                                ('VencedordoEncontro' +
                                                    live.subeventos[0].aposta +
                                                    live.subeventos[0].idOpcao + live.id).replace(/[^0-9a-z]/gi, '') : '') : '');

                                        let idEmpate = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ?
                                            (live.subeventos.length >= 3 ?
                                                ('VencedordoEncontro' +
                                                    live.subeventos[1].aposta +
                                                    live.subeventos[1].idOpcao + live.id).replace(/[^0-9a-z]/gi, '') : '') : '');

                                        let idFora = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ?
                                            (live.subeventos.length >= 3 ?
                                                ('VencedordoEncontro' +
                                                    live.subeventos[2].aposta +
                                                    live.subeventos[2].idOpcao + live.id).replace(/[^0-9a-z]/gi, '') : '') : '');

                                        let casa = ('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                                live.subeventos[0].aposta : '') + "=" + "Vencedor do Encontro--"
                                            + live.subeventos[0].aposta + "=" +
                                            (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[0].aposta + live.subeventos[0].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                            + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                                'VencedordoEncontro' + live.subeventos[0].aposta : '') + "=" +
                                            (live.subeventos.length >= 3 ? (live.subeventos[0].cotacao / 100).toFixed(2) >
                                            parseFloat(sessionStorage.getItem('cotaMax')) ?
                                                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (live.subeventos[0].cotacao / 100).toFixed(2) : 0)
                                            + "=" + (live.casa + ' x ' + live.fora) + "="
                                            + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                            "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')

                                        let empate = ('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                                live.subeventos[1].aposta : '') + "=" + "Vencedor do Encontro--"
                                            + live.subeventos[1].aposta + "=" +
                                            (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[1].aposta + live.subeventos[1].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                            + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                                'VencedordoEncontro' + live.subeventos[1].aposta : '') + "=" +
                                            (live.subeventos.length >= 3 ? (live.subeventos[1].cotacao / 100).toFixed(2) >
                                            parseFloat(sessionStorage.getItem('cotaMax')) ?
                                                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (live.subeventos[1].cotacao / 100).toFixed(2) : 0)
                                            + "=" + (live.casa + ' x ' + live.fora) + "="
                                            + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                            "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')

                                        let fora = ('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                                live.subeventos[2].aposta : '') + "=" + "Vencedor do Encontro--"
                                            + live.subeventos[2].aposta + "=" +
                                            (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[2].aposta + live.subeventos[2].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                            + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                                'VencedordoEncontro' + live.subeventos[2].aposta : '') + "=" +
                                            (live.subeventos.length >= 3 ? (live.subeventos[2].cotacao / 100).toFixed(2) >
                                            parseFloat(sessionStorage.getItem('cotaMax')) ?
                                                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (live.subeventos[2].cotacao / 100).toFixed(2) : 0)
                                            + "=" + (live.casa + ' x ' + live.fora) + "="
                                            + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                            "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')

                                        let valorCasa = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (cotacao['Vencedor do Encontro'] != undefined && cotacao['Vencedor do Encontro'] < 0 ?
                                            ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                            live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                                            && (cotacao['Vencedor do Encontro'] != undefined ? cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                        ? sessionStorage.getItem('cotaMax') : (live.subeventos[0].cotacao / 100)) +
                                                    parseFloat(cotacao['Vencedor do Encontro'] != undefined ?
                                                        ((live.subeventos[0].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                : '<b style="color:red">0<b>') : '<b style="color:red">0<b>')

                                        let valorEmpate = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (cotacao['Vencedor do Encontro'] != undefined && cotacao['Vencedor do Encontro'] < 0 ?
                                            ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                            live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                                            && (cotacao['Vencedor do Encontro'] != undefined ? cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                        ? sessionStorage.getItem('cotaMax') : (live.subeventos[1].cotacao / 100)) +
                                                    parseFloat(cotacao['Vencedor do Encontro'] != undefined ?
                                                        ((live.subeventos[1].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                : '<b style="color:red">0<b>') : '<b style="color:red">0<b>')

                                        let valorFora = (parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (cotacao['Vencedor do Encontro'] != undefined && cotacao['Vencedor do Encontro'] < 0 ?
                                            ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                            live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                                            && (cotacao['Vencedor do Encontro'] != undefined ? cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                        ? sessionStorage.getItem('cotaMax') : (live.subeventos[2].cotacao / 100)) +
                                                    parseFloat(cotacao['Vencedor do Encontro'] != undefined ?
                                                        ((live.subeventos[2].cotacao / 100) * (cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                : '<b style="color:red">0<b>') : '<b style="color:red">0<b>')

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
                                        if (width > 600) {
                                            document.getElementById('aoVivo')
                                                .innerHTML += '<tr id="zebra">' +
                                                '<td class="times">' + live.casa + ' X ' + live.fora + '<br/>' +
                                                c.pais + ': ' + c.nome + '<br/>' +
                                                '<b>(' + live.placar.split(':')[0] + ' - ' + live.placar.split(':')[1] + ')</b><br/>' +
                                                '<b>' + (live.periodo == 'INT' ? 'Intervalo' : live.periodo) + ' - ' + live.tempoDecorridoMin + 'min</b>' +
                                                '</td>' +
                                                '<td id="ocultar" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + casa + '\')">' +
                                                '<b class="button" id="' + (valorCasa[0] == '&' ? '' : idCasa) + '">' + valorCasa + '</b></td>' +

                                                '<td id="ocultar" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + empate + '\')">' +
                                                '<b class="button" id="' + (valorEmpate[0] == '&' ? '' : idEmpate) + '">' + valorEmpate + '</b></td>' +

                                                '<td id="ocultar" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + fora + '\')">' +
                                                '<b class="button" id="' + (valorFora[0] == '&' ? '' : idFora) + '">' + valorFora + '</b></td>' +

                                                '<td id="ocultar" ><a href="/#/maisaovivo/' + live.id + '"' +
                                                'class="buttonM"><p style="font-size: 26px;">' + "+" + '</p></a></td>' +
                                                '</tr>'
                                        } else {

                                            document.getElementById('aoVivo')
                                                .innerHTML += '<tr id="bets1">' +
                                                '<td class="times"><a style="text-decoration: none; color: black" href="/#/maisaovivo/' + live.id + '"' +
                                                '>' + live.casa + ' X ' + live.fora + '</a><br/>' +
                                                c.pais + ': ' + c.nome + '<br/>' +
                                                '<b>(' + live.placar.split(':')[0] + ' - ' + live.placar.split(':')[1] + ')</b><br/>' +
                                                '<b>' + (live.periodo == 'INT' ? 'Intervalo' : live.periodo) + '<br/>' + live.tempoDecorridoMin + 'min</b>' +
                                                '</td>' +
                                                '<td id="bets2">' +
                                                '<span id="' + (valorCasa[0] == '&' ? '' : idCasa) + '" class="button" style="margin-left: 52px;" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + casa + '\')">' +
                                                '<b>' + valorCasa + '</b></span>' +

                                                '<span id="' + (valorEmpate[0] == '&' ? '' : idEmpate) + '" class="button" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + empate + '\')">' +
                                                '<b>' + valorEmpate + '</b></span>' +


                                                '<span id="' + (valorFora[0] == '&' ? '' : idFora) + '" class="button" onclick="localStorage.setItem(\'' + 'click' + '\', \'' + fora + '\')">' +
                                                '<b>' + valorFora + '</b></span>' + '</td>' +

                                                '</tr>'
                                        }
                                    }

                                })


                            } catch (e) {

                            }

                        })

                    } catch (e) {
                        // console.log(e);
                    }
                    setLive(l);

                }).catch(error => {
                // console.log(error);
            });
        }

        setTimeout(() => {
            if(sessionStorage.getItem('login') == null || sessionStorage.getItem('login') == "") {
                gamesLivre();
            } else {
                getLoginAPI();
            }
        }, 1000);

        if (cancel) {
            getLoginAPI();
            getClienteAPI();
        }

        let maisAovivo = setInterval(() => {

            if(sessionStorage.getItem('login') == null || sessionStorage.getItem('login') == "") {
                gamesLivre();
            } else {
                if (cancel) {
                    getLoginAPI();
                    getClienteAPI();
                }
            }
        }, 10000);

        if (cancel) {
            geraBilhete();
        }


        return () => {
            // clean up
            clearInterval(maisAovivo);
            clearInterval(initInterval);
            maisAovivo = null;
            cancel = false;
            initInterval = null;
        };


    }, []);


    const fixedHeightPaper = clsx(classes.paper);
    return (
        <div className={classes.root}>
            <CssBaseline/>

            <Menu/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container className={classes.container}>
                    <Grid container spacing={3} justify="flex-start">
                        {/* Chart */}
                        <Grid item xs={12} md={12} lg={8}>
                            <Grid>
                                <Grid container justify="center" spacing={2}>

                                    <Grid xs={12} md={12} sm={6} item>
                                        <Paper className={classes.paperX}>
                                            <Grid container spacing={2} key={127}>

                                                <Grid item sm container align="center">
                                                    <Grid item container direction="column" spacing={2}>
                                                        <Grid item>

                                                            <Typography>

                                                            </Typography>
                                                            <Typography gutterBottom variant="h4">
                                                                AO VIVO
                                                            </Typography>
                                                            <Typography variant="body2" gutterBottom>

                                                            </Typography>
                                                            <Typography gutterBottom variant="subtitle1">

                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>

                                        <TableContainer component={Paper}>


                                            <Table stickyHeader aria-label="sticky table">

                                                <TableHead>
                                                    <TableRow>

                                                        <StyledTableCell align={"center"}
                                                                         id='font'><b>JOGO</b></StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{width: 15}}
                                                                         id='ocultar'><b>CASA</b></StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{width: 15}}
                                                                         id='ocultar'><b>EMPATE</b></StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{width: 15}}
                                                                         id='ocultar'><b>FORA</b></StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{width: 15}}
                                                                         id='ocultar'><b>MAIS</b></StyledTableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody id='aoVivo'>
                                                    <LinearProgress/>
                                                </TableBody>

                                            </Table>

                                        </TableContainer>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={9} lg={4} id='bl'>
                            <div id='font'>
                                <Paper className={fixedHeightPaper}>
                                    <Typography variant="h6" gutterBottom align="center">
                                        <b>AO VIVO</b>
                                    </Typography>
                                    <Divider/><br/>
                                    <div id={"bilhete"}></div>
                                    <Divider/>
                                    <br style={{marginBottom: '10px'}}/>
                                    <Typography align="center" style={{
                                        lineHeight: '120%',

                                    }}
                                                id={"valuesBets"}>
                                        Cotação: R$ <b id={"cotacao"}></b><br/>
                                        Possível Retorno:
                                        R$ <b id={"retorno"}>0.00</b><br/>
                                        Valor da Aposta:<b>{localStorage.getItem("valorIn") != null &&
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
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
                                                }}
                                                variant="filled"
                                            /></div>
                                    </center>

                                    <br style={{marginBottom: '10px'}}/>
                                    <div id={"clients"}>
                                        <Autocomplete
                                            id="controllable-states-demo"
                                            value={client}
                                            onChange={(event, newValue) => {
                                                setClient(newValue);
                                            }}
                                            inputValue={inputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setInputValue(newInputValue);
                                            }}
                                            options={clientes}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}

                                                    label="Nome do Cliente"
                                                    variant="outlined"/>}
                                        /></div>

                                    <br style={{marginBottom: '10px'}}/>
                                    <Button id={"done"}
                                            onClick={validIn} variant="contained" color="secondary">
                                        <b>FINALIZAR APOSTA</b>
                                    </Button>

                                    <br style={{marginBottom: '10px'}}/>
                                    <center>
                                        <div id={"fieldClient"}>
                                            <TextField
                                                id={"resetField3"}
                                                value={value}
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
