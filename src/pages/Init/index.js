import {makeStyles} from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import {Dialog, DialogActions, DialogContent, DialogTitle,} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {useParams} from "react-router";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {useReactToPrint} from "react-to-print";
import {api, cc} from "../Constantes/index";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Menu from '../Menu/index';
import Jogos from './Jogos/index';
import ReactDOMServer from "react-dom/server";
import LockIcon from '@mui/icons-material/Lock';
import {useHistory} from "react-router-dom";


let date = [];

export default function Dashboard(props) {
    const codigo = cc.generate().split('-').slice(1).join('-');
    let {dateId} = useParams();
    var betsAll = "";
    let history = useHistory();
    const [message, setMessage] = useState("");
    const [client, setClient] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [bilhetes, setBilhetes] = useState([]);
    const [gerenteId, setGerenteId] = useState(0);
    const [bancaId, setBancaId] = useState(0);
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");
    const [datas, setDatas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [campeonato, setCampeonato] = useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState("");
    const [entrada, setEntrada] = useState(0)
    const [apostasPreJogo, setApostasPreJogo] = useState(false);
    const [cotacoes, setCotacoes] = useState({});
    const html = <LockIcon style={{fontSize: 14}}/>;
    const load = ReactDOMServer.renderToStaticMarkup(<LinearProgress/>);


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

    function InitOdds() {

        if (localStorage.getItem("betsAll2") === null) {
            localStorage.setItem("betsAll2", "");
            noneBets();
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
            document.getElementById("resetField1").value = '';

            document.getElementById("retorno").innerHTML = '0.00';
            let team = localStorage.getItem('delete2');
            try {
                document.getElementById("resetField1").value = '';
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
            document.getElementById("resetField1").value = '';
        }
        localStorage.removeItem('delete2');

        InitOdds();
        //console.log(localStorage.getItem('delete'));
    }, 200);


    function noneBets() {
        try {
            localStorage.setItem('displayBets2', 'none');
            document.getElementById('valuesBets').style.display = 'none';
            document.getElementById('value').style.display = 'none';
            document.getElementById('clients').style.display = 'none';
            document.getElementById('done').style.display = 'none';
            document.getElementById('fieldClient').style.display = 'none';
            document.getElementById('buttonClient').style.display = 'none';
            document.getElementById('resetField1').value = '';
        } catch (e) {
            console.log(e);
        }

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
            if (sessionStorage.getItem("pin") != "" && sessionStorage.getItem("pin") != null) {
                document.getElementById("resetField1").value = sessionStorage.getItem("valorIn");
                setEntrada(sessionStorage.getItem("valorIn"));
                document.getElementById("retorno").innerHTML = sessionStorage.getItem("retorno");

                sessionStorage.setItem("pin", "");
            }

            localStorage.getItem('betsAll2').split('=').slice(0, -1).map((b) => {
                let campeonato = localStorage.getItem(b.split('-')[0] + 'x').split(',')[6];
                let times = localStorage.getItem(b.split('-')[0] + 'x').split(',')[5].replace('-', 'x');
                let data = Number.isInteger(
                    parseInt(localStorage.getItem(b.split('-')[0] + 'x').split(',')[7][0])
                ) ? localStorage.getItem(b.split('-')[0] + 'x').split(',')[7] :
                    localStorage.getItem(b.split('-')[0] + 'x').split(',')[8];
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
                    '    <span style="margin-left: 5px;">Cota????o: </span>' + '<b style="float: right;">' + value + '</b>\n' +
                    '</div>\n' +
                    '\n' +
                    '</div>'

                blockBets();


            });

            cotacaoHandler();

        } catch (e) {
            // setBilhetes("");
        }
        if (sessionStorage.getItem('login') == null || sessionStorage.getItem('login') == "") {

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
            '                        <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">COTA????O</span></div>\n' +
            '\n' +
            '                        <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
            '\n';

        prejogo.split('=').slice(0, -1).map((b) => {

            let campeonato = localStorage.getItem(b.split('-')[0] + 'x').split(',')[6];
            let times = localStorage.getItem(b.split('-')[0] + 'x').split(',')[5].replace('-', 'x');
            let data = Number.isInteger(
                parseInt(localStorage.getItem(b.split('-')[0] + 'x').split(',')[7][0])
            ) ? localStorage.getItem(b.split('-')[0] + 'x').split(',')[7] :
                localStorage.getItem(b.split('-')[0] + 'x').split(',')[8];
            let typeBets = localStorage.getItem(b.split('-')[0] + 'x').split(',')[1]
            let value = localStorage.getItem(b.split('-')[0] + 'x').split(',')[4];


            document.getElementById('bilheteP').innerHTML +=
                '<div id="conteudo_divBilheteImpressao">\n' +
                '<div>\n' +
                '\n' +
                '                                    <b><span style="display: inline-block; text-align: left;">Futebol - ' + data + '</span></b><br>\n' +
                '\n' +
                '                                    <span style="display: inline-block;  text-align: left;">' + campeonato + '</span><br>\n' +
                '\n' +
                '                                    <span style="display: inline-block; text-align: left;">' + times + '</span><br>\n' +
                '\n' +
                '                                    <b><span style="display: inline-block;  text-align: left;">' + typeBets.split('--')[0] + '</span></b><br>\n' +
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
            '                            <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">' + (localStorage.getItem('betsAll2').split("=").length - 1) + '</span></div>\n' +
            '                            \n' +
            '                            <div>\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Cota????o:</span></div>\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: right;"><span  style="display: inline-block">' + parseFloat(document.getElementById('cotacao').innerHTML).toFixed(2) + '</span></div>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Total Apostado:</span></div>\n' +
            '\n' +
            '                            <div style="display: inline-block; width: 47%; text-align: right;"><span id="conteudo_txtTotalApostado" style="display: inline-block">R$ ' + parseFloat(entrada).toFixed(2) + '</span></div>\n' +
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
            '                            <span>Ao realizar apostas na SONHOBETS, voc?? concorda com todos os termos e regras do site. Boa Sorte!</span>\n' +
            '                        </div>\n' +
            '\n' +
            '                    </div>\n' +
            '                </div>';

        api.get('/api/getdate')
            .then(res => {
                d = (res.data.date);

                let comissaoValor = 0;


                let qtd = parseFloat(localStorage.getItem('betsAll2').split("=").length - 1);

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
                        "tipoDeJogo": "Pre-Jogo",
                        "quantidadeJogos": qtd,
                        "tipoSimplesouMultiplo": qtd > 1 ? "M" : "S",
                        "comissao": (parseFloat(entrada) * comissaoValor).toFixed(2),
                        "status": "Aberto",


                    })
                    .then(res => {
                        let prejogo = localStorage.getItem('betsAll2');
                        try {
                            prejogo.split('=').slice(0, -1).map((b) => {
                                let campeonato = localStorage.getItem(b.split('-')[0] + 'x').split(',')[6];
                                let times = localStorage.getItem(b.split('-')[0] + 'x').split(',')[5].replace('-', 'x');
                                let data = Number.isInteger(
                                    parseInt(localStorage.getItem(b.split('-')[0] + 'x').split(',')[7][0])
                                ) ? localStorage.getItem(b.split('-')[0] + 'x').split(',')[7] :
                                    localStorage.getItem(b.split('-')[0] + 'x').split(',')[8];
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
                                        // "idEvento": b.split('-')[0],
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
                            
                            setEntrada(0);
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
            // console.log(cotacao < resultCotaca);   
            document.getElementById('cotacao').innerHTML = parseFloat(resultCotaca > Number(cotacao) ?
                Number(cotacao) : resultCotaca).toFixed(2);
        } catch (e) {

        }

    }

    // {(retorno*cotacaoValue).toFixed(2) > 10000.00 ? 10000.00 :
    //     (retorno*cotacaoValue).toFixed(2)}

    function valueBetsHandler(e) {
        var value = e.target.value;
        let cotacao = Number(document.getElementById('cotacao').innerHTML);
        if (value) {

            setEntrada(value);

            document.getElementById('retorno').innerHTML =
                ((cotacao * Number(value)).toFixed(2)) > parseFloat("10000") ? parseFloat("10000").toFixed(2) :
                    ((cotacao * Number(value)).toFixed(2));

            sessionStorage.setItem("retorno", ((cotacao * Number(value)).toFixed(2)) > parseFloat("10000") ? parseFloat("10000").toFixed(2) :
                ((cotacao * Number(value)).toFixed(2)));


        } else {
            document.getElementById('retorno').innerHTML = '0.00';
            setEntrada(0);
            sessionStorage.removeItem("retorno")
            handleCloseURL();
        }

        sessionStorage.setItem('valorIn', value);

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
                                if (res.data.clientes == false) {
                                    handleClickOpenURL();
                                    setMessage(`J?? possui um cliente com esse nome!`);
                                } else {
                                    handleClickOpenURL();
                                    setMessage(`Cliente cadastrado com sucesso!`);
                                    api.get('/api/getclientes/' + sessionStorage.getItem('login'))
                                        .then(res => {
                                            try {
                                                if (res.data) {
                                                    res.data.clientes.map((c) => {
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
                            }
                        } catch (e) {

                        }
                        setValue("");

                    }).catch(error => {
                    console.log(error);
                });
            } else {
                setMessage(`Cliente j?? existe nessa banca!`);
                handleClickOpenURL();
            }
        } else {
            setMessage(`O nome deve conter mais de 3 letras!`);
            handleClickOpenURL();
        }
    }


    function getClient() {
        let r = false;
        if (sessionStorage.getItem('login') != null && sessionStorage.getItem('login') != "") {
            clientes.map((f) => {

                if (f == client) {
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

    }


    function validIn() {

        let valorMax = sessionStorage.getItem('valorDeSaida');
        let valorMin = sessionStorage.getItem('valorDeEntrada');

        if (parseFloat(entrada) >= valorMin && parseFloat(entrada) <= valorMax) {
            betsDone();
        } else if (parseFloat(entrada) < valorMin) {

            document.getElementById('retorno').innerHTML = '0.00';
            setMessage("O valor m??nimo permitido<br/> por aposta ?? de R$ " + parseFloat(valorMin).toFixed(2));
            handleClickOpenURL();
        } else {
            setMessage("O valor m??ximo permitido<br/> por aposta ?? de R$ " + parseFloat(valorMax).toFixed(2));
            handleClickOpenURL();
        }
    }


    function betsDone() {

        let qtd = localStorage.getItem('betsAll2').split("=").length - 1;
        let qtdJogos = sessionStorage.getItem("qtdJogos");
        if (qtd <= qtdJogos) {
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
                                                    let aux = (m.titulo + "--" + ' (' + e.nome + ')')
                                                    if (m.titulo + "--" + ((m.titulo != 'Vencedor do Encontro') ?
                                                        (e.titulo + ' (' + e.nome + ')') : e.nome) == auxBets[1] ||
                                                        aux == auxBets[1]) {

                                                        let cotacoes = JSON.parse(sessionStorage.getItem("cotacoes"));
                                                        try {
                                                            oddValue = true;
                                                            valid2 = false;
                                                            let cot = (Number(e.cotacao / 100) +
                                                                (Number(e.cotacao / 100) *
                                                                    (cotacoes[m.titulo][1] / 100))).toFixed(2);
                                                            if (Number(auxBets[4]) == 15 &&
                                                                Number(auxBets[4]) > cot) {
                                                                valid1 = true;
                                                                auxBets[4] = cot;
                                                                localStorage.setItem((bets.split('-')[0] + "x"),
                                                                    auxBets.join(','));
                                                                geraBilhete();
                                                            } else if (Number(auxBets[4]) != cot) {
                                                                valid1 = true;
                                                                auxBets[4] = cot;
                                                                localStorage.setItem((bets.split('-')[0] + "x"),
                                                                    auxBets.join(','));
                                                                geraBilhete();
                                                            }

                                                        } catch (e) {
                                                            console.log(e)
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
                                                    setMessage(`Por favor adicione um cliente v??lido!`);
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
                                                    let r = parseFloat(document.getElementById('retorno').innerHTML);
                                                    if (resultCotaca != r && resultCotaca <= 10000) {
                                                        document.getElementById('retorno').innerHTML = ' ' +
                                                            Number(resultCotaca * Number(document.getElementById('resetField1').value)).toFixed(2);
                                                        setMessage(`A cota????o escolhida alterou de: R$ ${cotacaoAux.toFixed(2)} <br/> para: R$ ${resultCotaca.toFixed(2)} . Clique novamente para confirmar a aposta!`);
                                                    } else {
                                                        setMessage(`Algumas apostas foram alteradas, pode finalizar sua aposta!`);
                                                    }
                                                    handleClickOpenURL();


                                                }
                                                if (sessionStorage.getItem('login') == null || sessionStorage.getItem('login') == "") {
                                                    if (!valid1 && !valid2 && !valid3) {
                                                        let qtd = localStorage.getItem('betsAll2').split("=").length - 1;


                                                        if (500 >= parseFloat(entrada)) {
                                                            //salvarBilhete();
                                                            localStorage.setItem("valorIn", sessionStorage.getItem("valorIn"));
                                                            localStorage.setItem("retorno", sessionStorage.getItem("retorno"));
                                                            let codigoPIn = Math.ceil(Math.random() * Math.pow(10, 6));
                                                            api.post('/api/addbilhetetemporario', {
                                                                'codigoPin': codigoPIn,
                                                                'bilhete': {...localStorage}
                                                            })
                                                                .then(res => {
                                                                    if (res.data) {
                                                                        noneBets();
                                                                        clearOdds();
                                                                        localStorage.clear();
                                                                        sessionStorage.setItem("retorno", "");
                                                                        sessionStorage.setItem("valorIn", "");
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

                                                        if (auxSaldo >= parseFloat(entrada)) {

                                                            salvarBilhete();

                                                            noneBets();
                                                            clearOdds();
                                                            geraBilhete();
                                                            sessionStorage.setItem("retorno", "");
                                                            sessionStorage.setItem("valorIn", "");
                                                            sessionStorage.setItem("pin", "");
                                                            var top = window.screen.height - 300;
                                                            top = top > 0 ? top/2 : 0;

                                                            var left = window.screen.width - 400;
                                                            left = left > 0 ? left/2 : 0;

                                                            const WinPrint = window.open('', '_blank', 'width=800,height=900,scrollbars=0, top=' + top + ',left=' + left + '' );
                                                            WinPrint.document.write('<button class="block2" onclick="whatsapp()" id="print1"><b>WHATSAPP</b></button><br>' +
                                                                '<button class="block1" onclick="imprimir()" id="print2"><b>IMPRIMIR</b></button>' + document.getElementById("dialogBilhete").innerHTML+'<style>' +
                                                                'body {background-color: rgb(248, 236, 194); color: black;  font-size: 12px}' +
                                                                'span {font-size: 12px}' +
                                                                '.block1 {' +
                                                                'display: block;' +
                                                                'width: 100%;' +
                                                                'border: none;' +
                                                                'background-color: #3f51b5;' +
                                                                'color: white;' +
                                                                'padding: 14px 28px;' +
                                                                'font-size: 26px;' +
                                                                'cursor: pointer;' +
                                                                'text-align: center;' +
                                                                '}' +
                                                                '.block2 {' +
                                                                'display: block;' +
                                                                'width: 100%;' +
                                                                'border: none;' +
                                                                'background-color: #04AA6D;' +
                                                                'color: white;' +
                                                                'padding: 14px 28px;' +
                                                                'font-size: 26px;' +
                                                                'cursor: pointer;' +
                                                                'text-align: center;' +
                                                                '}' +
                                                                '</style>'+

                                                                '<script>' +
                                                                'function imprimir(){document.getElementById("print1").style.display = "none";' +
                                                                'document.getElementById("print2").style.display = "none";' +
                                                                'setTimeout(function () { window.print(); }, 500);window.onfocus = function () { ' +
                                                                'setTimeout(function () { window.close(); }, 500); };' +
                                                                '};' +
                                                                'function whatsapp(){window.location.href=' +
                                                                '"whatsapp://send?text=Link+para+seu+bilhete%3a%0d%0a%0d%0' +
                                                                'ahttps%3A%2F%2Fwww.sonhobets.com.br%2F%23%2FverificarBilhete%2F' + codigo + '";}</script>');

                                                        } else {
                                                            alert('Sem limite para apostar!');
                                                        }

                                                    }
                                                }
                                            } else {
                                                setMessage('A cota????o m??nima ?? de R$ ' + parseFloat(sessionStorage.getItem('cotacaoAdminMin'))
                                                    .toFixed(2));
                                                handleClickOpenURL();
                                            }
                                        } else {
                                            setMessage('Por favor insira um valor de no m??nimo R$ ' + sessionStorage.getItem('valorDeEntrada') + ',00');
                                            handleClickOpenURL();
                                        }
                                        handleCloseLoading();
                                    }
                                }


                            } catch (e) {
                                alert('O seguinte jogo indispon??vel: ' + auxBets[5]);
                                handleCloseLoading();
                                console.log(e);
                                valid1 = true;
                                valid2 = true;
                            }
                        }).catch(error => {
                        alert('O seguinte jogo indispon??vel: ' + auxBets[5]);
                        handleCloseLoading();
                    });


                });


            }, 0);
        } else {
            alert('Voc?? selecionou ' + qtd + ' jogos, o m??ximo ?? ' + qtdJogos);
        }
    }

    function onClickHandler(e) {
        let d = new Date()

        let d1 = new Date(parseInt(d.getMonth())+1 + '/' + d.getDate() + '/' + d.getFullYear() + " " +
            (d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()));

        let d2 = new Date(sessionStorage.getItem('date').split(' ')[0].split('/')[1] + '/' +
            sessionStorage.getItem('date').split(' ')[0].split('/')[0] + '/' +
            sessionStorage.getItem('date').split(' ')[0].split('/')[2] + " " +
            sessionStorage.getItem('date').split(' ')[1]);

        var difference = d2.getTime() - d1.getTime();

        let minutes = Math.abs(Math.floor((d2 - d1) / 1000 / 60));
        console.log(minutes)
        if(minutes >= 30){
            history.push("/banca")
        }

        document.getElementById('resetField1').value = '';



        if (1) {
            document.getElementById('bilheteP').innerHTML = '';
            const team = e.target.getAttribute("data-item");
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
        } else {
            alert('Voc?? passou o n??mero m??ximo de 20 jogos por apostas!');
        }
    }

    async function getDateAll() {
        api.get('/api/getdate').then(res => {

            try {
                sessionStorage.setItem('date', res.data.date);

            } catch (e) {
                console.log(e);
            }
        }).catch(error => {
            console.log(error)
        });
    }

    async function getLoginAPI() {
        // document.getElementById('initJogos')
        //         .innerHTML = '';


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
                        let ativaAposta = res.data.bancas.ativarApostasPreJogo;

                        let c = {};
                        api.get('/api/getcotacaoprejogo/' + res.data.bancas.gerente + '/' + res.data.bancas.nome).then(res => {

                            try {

                                res.data.cotacoes.map((o) => {

                                    c[o.tipoDeCotacao] = [o.status, o.porcentagem];
                                })
                                setCotacoes(c);
                            } catch (e) {
                                c[res.data.cotacoes.tipoDeCotacao] =
                                    [res.data.cotacoes.status, res.data.cotacoes.porcentagem];

                            }
                            sessionStorage.setItem("cotacoes", JSON.stringify(c))


                            if (ativaAposta) {
                                let d2 = new Date();
                                d2 = (d2.getFullYear() + "-" + (Number(d2.getMonth()) + 1 < 10 ? "0" +
                                        (Number(d2.getMonth()) + 1) : Number(d2.getMonth()) + 1) +
                                    "-" + ((Number(d2.getDate())) < 10 ? "0" + d2.getDate() : d2.getDate()));
                                api.get('/api/getprejogodata/' + (dateId == undefined ? d2 : dateId)).then(res => {

                                    setCampeonato(res.data);


                                }).catch(error => {
                                    console.log(error)
                                });

                            } else {
                                document.getElementById('preJogos')
                                    .innerHTML = '<center>Apostas Pre-Jogo Desativadas. Fale com seu gerente!</center>';
                            }
                        }).catch(error => {
                            console.log(error)
                        });

                    }

                } catch (e) {
                    console.log(e);
                }
            }).catch(error => {
            console.log(error)
        });

    }


    useEffect(() => {

        getDateAll();

        async function getLoginAPIoFF() {
            // document.getElementById('initJogos')
            //         .innerHTML = '';

            try {
                let d2 = new Date();
                d2 = (d2.getFullYear() + "-" + (Number(d2.getMonth()) + 1 < 10 ? "0" +
                        (Number(d2.getMonth()) + 1) : Number(d2.getMonth()) + 1) +
                    "-" + ((Number(d2.getDate())) < 10 ? "0" + d2.getDate() : d2.getDate()));
                console.log(d2)
                api.get('/api/getprejogodata/' + (dateId == undefined ? d2 : dateId)).then(res => {
                    console.log(res.data)
                    setCampeonato(res.data);


                }).catch(error => {
                    console.log(error)
                });


            } catch (e) {
                console.log(e);
            }


        }

        if (sessionStorage.getItem('login') == null || sessionStorage.getItem('login') == "") {
            getLoginAPIoFF();
        }


        async function getClienteAPI() {
            let nomes = [];
            api.get('/api/getclientes/' + sessionStorage.getItem('login'))
                .then(res => {
                    try {

                        if (res.data) {

                            res.data.clientes.map((c) => {
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


        setDatas([]);
        if (sessionStorage.getItem('login') != null && sessionStorage.getItem('login') != "") {
            getLoginAPI();
            getClienteAPI();
        }
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
                                            <Grid container spacing={2} key={127}>
                                                <Grid item sm container align="center">
                                                    <Grid item container direction="column" spacing={2}>
                                                        <Grid item>
                                                            <Typography></Typography>
                                                            <Typography
                                                                gutterBottom
                                                                variant="h6"
                                                            ></Typography>
                                                            <Typography
                                                                variant="body2"
                                                                gutterBottom
                                                            ></Typography>
                                                            <Typography
                                                                gutterBottom
                                                                variant="subtitle1"
                                                            ></Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>

                                        <Jogos campeonato={campeonato} cotacao={cotacoes}
                                               onClickHandler={onClickHandler}/>


                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Recent Deposits */}

                        <Grid item xs={12} md={9} lg={4} id='bl'>
                            <div id='font'>
                                <Paper className={fixedHeightPaper}>
                                    <Typography variant="h6" gutterBottom align="center">
                                        <b>PR??-JOGO</b>
                                    </Typography>
                                    <Divider/><br/>
                                    <div id={"bilhete"}></div>

                                    <br style={{marginBottom: '10px'}}/>
                                    <Typography align="center" style={{
                                        lineHeight: '120%',

                                    }}
                                                id={"valuesBets"}>
                                        Cota????o: R$ <b id={"cotacao"}></b><br/>
                                        Poss??vel Retorno:
                                        R$ <b id={"retorno"}></b><br/>
                                        Valor da Aposta:<br/><br/>
                                    </Typography>
                                    <center>
                                        <div id={"value"}>
                                            <TextField
                                                fullWidth
                                                id={"resetField1"}

                                                label="Digite um Valor"
                                                type="text"

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
                        {/* Recent Orders */}
                    </Grid>
                    <Dialog
                        style={{wordWrap: "break-word"}}
                        open={openURL}
                        onClose={handleCloseURL}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title" style={{color: "red"}}>
                            AVISO!
                        </DialogTitle>
                        <DialogContent>
                            <div className={classes.paper} style={{fontSize: "18px"}}>
                                {message.split("<br/>")}
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
                        open={openLoading}
                        onClose={handleCloseLoading}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle
                            id="form-dialog-title"
                            style={{color: "red"}}
                        ></DialogTitle>
                        <DialogContent>
                            <div>
                                <CircularProgress color="secondary"/>
                            </div>
                        </DialogContent>
                        <DialogActions></DialogActions>
                    </Dialog>
                </Container>

                <div>
                    <ScrollUpButton/>
                </div>
                <div style={{display: 'none'}}>


                        <div  id="dialogBilhete">

                            <div id="header"></div>
                            <div id="bilheteP"></div>
                            <div id="footer"></div>

                        </div>


                </div>
            </main>
        </div>
    );
}
