import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, {useEffect, useRef, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {useParams} from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import {api} from '../Constantes/index';
import PrintIcon from '@material-ui/icons/Print';
import {useReactToPrint} from "react-to-print";
import TextField from '@material-ui/core/TextField';
import Menu from '../Menu/index';


export default function Dashboard(props) {

    let {codigoBilhete} = useParams();
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [dataAux, setAux] = useState([]);
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [bilhetes, setBilhetes] = useState("");
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");
    const [comissao, setComissao] = useState([]);
    const [codigoB, setCodigo] = useState(codigoBilhete);
    const [gerenteId, setGerenteId] = useState(0);
    const [bancaId, setBancaId] = useState(0);
    const [statusB, setStatusB] = useState([]);
    const [impressao, setImpressao] = useState([]);


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


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const classes = useStyles();


    const handleCloseURL = () => {
        setOpenURL(false);
    };


    const handleCloseLoading = () => {
        setOpenLoading(false);
    };


    function print() {
        handlePrint();

    }

    function getCodigo(e) {
        document.getElementById('header').innerHTML = '';
        document.getElementById('bilhete').innerHTML = '';
        document.getElementById('footer').innerHTML = '';
        bilhete(e.target.value);
        setCodigo(e.target.value);
    }

    function custom_sort(a, b) {
        let d1 = new Date(a.dataDoJogo.split(' ')[0].split('/')[2] + '/' +
            a.dataDoJogo.split(' ')[0].split('/')[1] + '/' +
            a.dataDoJogo.split(' ')[0].split('/')[0] + " " + a.dataDoJogo.split(' ')[2]);

        let d2 = new Date(b.dataDoJogo.split(' ')[0].split('/')[2] + '/' +
            b.dataDoJogo.split(' ')[0].split('/')[1] + '/' +
            b.dataDoJogo.split(' ')[0].split('/')[0] + " " + b.dataDoJogo.split(' ')[2]);

        return Date.parse(d1) - Date.parse(d2);
    }

    let nb = 0;

    function bilhete(codigo) {
        document.getElementById('status').innerHTML = '';
        try {
            api.get('/api/getbilhete/' + codigo)
                .then(res => {
                    let l = [];
                    try {
                        if (res.data) {
                            setBilhetes(res.data);

                            document.getElementById('header').innerHTML = '\n' +
                                '                    <div >\n' +
                                '\n' +
                                '                        <center><h2 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;">SONHOBETS</h2></center>\n' +
                                '\n' +
                                '\n' +
                                '                        <hr style="width: 100%;border: 0;border-bottom: 2px dashed #292323;">\n' +
                                '\n' +
                                '                        <center><h4 style="display: block;margin-block-start: 1.33em;margin-block-end: 1.33em;margin-inline-start: 0px;margin-inline-end: 0px;font-weight: bold;" class="H3">' + (res.data.bilhete[0].tipoSimplesouMultiplo == 'M' ? 'Aposta Multipla' : 'Aposta Simples') + '</h4></center>\n' +
                                '\n' +
                                '                        <span style="display: inline-block; text-align: left;">DATA:</span> <span id="conteudo_txtDataBilhete" style="display: inline-block"> ' + res.data.bilhete[0].dataDaAposta + '</span><br>\n' +
                                '\n' +
                                '                        <span style="display: inline-block">COLABORADOR:</span> <span style="display: inline-block">' + res.data.bilhete[0].nomeBanca + '</span><br>\n' +
                                '\n' +
                                '                        <span style="display: inline-block">CLIENTE:</span> <span style="display: inline-block">' + res.data.bilhete[0].nomeCliente + '</span><br>\n' +
                                '\n' +
                                '                        <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                                '\n' +
                                '                        <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">APOSTA</span></div>\n' +
                                '\n' +
                                '                        <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">COTA????O</span></div>\n' +
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
                            let jg = res.data.jogo.slice();
                            jg.sort(custom_sort);
                            jg.map((jogo) => {
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
                                    '                                    <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">' + jogo.tipoDeCotacao.split('--')[1] + '</span></div>\n' +
                                    '\n' +
                                    '                                    <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">' + jogo.cotacao.toFixed(2) + '</span></div>\n' +
                                    '\n' +
                                    '                                    <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Status:</span></div>\n' +
                                    '                                    <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">' + jogo.status + '</span></div>\n' +
                                    '\n' +
                                    '                                    <hr style="width: 100%;border: 0;border-bottom: 1px dashed #292323;">\n' +
                                    '\n' +
                                    '                                </div>\n'
                            });


                            document.getElementById('status').innerHTML = statusB.indexOf('Perdeu') != -1 ?
                                "<b style='color: white' class='buttonRed'>Perdeu</b>" : (statusB.indexOf('Aberto') != -1 ?
                                    "<b style='color: white' class='buttonBlue'>Aberto</b>" : (statusB.filter((x) => x == 'Ganhou' || x == 'Cancelado').length) == statusB.length ?
                                        (statusB.filter((x) => x == 'Cancelado').length) == statusB.length ?
                                            "<b style='color: white;' class='buttonGold'>Cancelado</b>" : "<b style='color: white' class='buttonGreen'>Ganhou</b>" : "<b style='color: white' class='buttonGold'>Cancelado</b>");

                        }
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error);
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
                                    '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Quantidade de Jogos:</span></div>\n' +
                                    '                            <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">' + res.data.bilhete[0].quantidadeJogos + '</span></div>\n' +
                                    '                            \n' +
                                    '                            <div>\n' +
                                    '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Cota????o:</span></div>\n' +
                                    '                            <div style="display: inline-block; width: 47%; text-align: right;"><span  style="display: inline-block">R$ ' + res.data.bilhete[0].cotacao.toFixed(2) + '</span></div>\n' +
                                    '\t\t\t\t\t\t\t</div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Total Apostado:</span></div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 47%; text-align: right;"><span id="conteudo_txtTotalApostado" style="display: inline-block">R$ ' + res.data.bilhete[0].valorDeEntrada.toFixed(2) + '</span></div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 47%; text-align: left;"><span style="display: inline-block">Poss??vel Retorno:</span></div>\n' +
                                    '\n' +
                                    '                            <div style="display: inline-block; width: 47%; text-align: right;"><span style="display: inline-block">R$ ' + res.data.bilhete[0].valorDeSaida.toFixed(2) + '</span></div>\n' +
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
                                    '                            <span>Ao realizar apostas na SONHOBETS, voc?? concorda ' +
                                    ' com todos os termos e regras do site. Boa Sorte!</span>\n' +
                                    '                        </div>\n' +
                                    '\n' +
                                    '                    </div>\n' +
                                    '                </div>';
                            }
                        } catch (e) {

                        }
                    }).catch(error => {
                    console.log(error);
                });


            } catch (e) {
            }
        } catch (e) {
            document.getElementById('header').innerHTML = '';
            document.getElementById('bilhete').innerHTML = '';
            document.getElementById('footer').innerHTML = '';
        }
    }


    useEffect(() => {




        if (codigoBilhete != 'all') {
            bilhete(codigoBilhete);
        } else {
            // console.log('bbbbb');
        }


    }, []);


    return (
        <div className={classes.root}>
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

                                                            <br/>
                                                            <TextField id="outlined-basic" label="C??digo do Bilhete"
                                                                       variant="outlined"
                                                                       onChange={getCodigo}/>
                                                            <Grid container justify="space-around">

                                                            </Grid>

                                                            <br/>

                                                            <Button onClick={print} style={{margin: '10px'}}
                                                                    variant="contained"
                                                                    color="primary">
                                                                <PrintIcon/>
                                                            </Button>
                                                            <Button type="Link"
                                                                    href={"whatsapp://send?text=Link+para+seu+bilhete%3a%0d%0a%0d%0ahttps%3A%2F%2Fwww.sonhobets.com.br%2F%23%2FverificarBilhete%2F" + codigoB}
                                                                    variant="contained"
                                                                    style={{color: 'white', backgroundColor: 'green'}}>
                                                                <WhatsAppIcon/>
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
                    <Grid container style={{marginLeft: 20}}>

                        <Grid item xs={12} md={4} sm={12}>

                        </Grid>
                        <Grid item xs={12} md={4} sm={12}>

                            <div style={{
                                width: 'calc(100% - 15%)',
                                fontSize: 12,
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
                <Typography variant={"h4"} align={"center"}>
                    <p id='status'></p>
                </Typography>
            </main>

        </div>

    );

}