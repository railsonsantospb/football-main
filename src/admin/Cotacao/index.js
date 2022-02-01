import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {useHistory} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api, cotacao} from '../Constantes/index';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Menu from '../Menu/index';

export default function Dashboard() {

    let history = useHistory();
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [data, setData] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [porcentagem, setPorcentagem] = useState(0);
    const [bancas, setBancas] = useState([]);
    const [bancasAux, setBancasAux] = useState([]);
    const [gerentes, setGerentes] = useState([]);
    const [ba, setB] = useState(-1);
    const [ge, setG] = useState(-1);
    const [nomeBanca, setNomeBanca] = useState("Todos");
    const [nomeGerente, setNomeGerente] = useState({});
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");


    const columns = ["NOME COTACÃO", "+/- COTAÇÃO (%)", "GERENTE", "BANCA", "EXCLUIR"];


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


    const classes = useStyles();


    const handleCloseURL = () => {
        setOpenURL(false);
    };

    const handleCloseLoading = () => {
        setOpenLoading(false);
    };


    function verifyClientHandler(e) {

        let auxClient =
            typeof e.target.value === "string" ? e.target.value : e.target.innerText &&
            e.target.innerText.length > 0 ? e.target.innerText : '';
        setTitulo(auxClient);

    }

    function verifyGerenteHandler(e) {
        let id = 0;
        let c = [];
        let gerente =
            typeof e.target.value === "string" ? e.target.value : e.target.innerText &&
            e.target.innerText.length > 0 ? e.target.innerText : '';

        gerentes.map((g) => {
            if (g.title == gerente) {
                id = g.id;
                setNomeGerente(g.title);
                setG(g.id);
            }
        })

        if (bancas.length == 0) {
            bancasAux.map((b) => {
                if (b.gerente == id) {
                    c.push({'title': b.title, 'id': b.id});
                }
            })
        } else {
            bancas.map((b) => {
                if (b.gerente == id) {
                    c.push({'title': b.title, 'id': b.id});
                }
            })
        }


        console.log(bancasAux);
        setBancas(c);

    }

    function verifyBancaHandler(e) {

        let banca =
            typeof e.target.value === "string" ? e.target.value : e.target.innerText &&
            e.target.innerText.length > 0 ? e.target.innerText : '';

        bancasAux.map((b) => {
            if (b.title == banca) {
                setNomeBanca(b.title);
                setB(b.id);
            }
        })


    }

    function valorHandler(e) {

        let auxClient =
            typeof e.target.value === "string" ? e.target.value : e.target.innerText &&
            e.target.innerText.length > 0 ? e.target.innerText : '';
        setPorcentagem(auxClient);

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


    function deleteCotacao(id) {
        api.delete('/api/deletecotacao/' + id)
            .then(res => {
                try {
                    console.log(res.data);
                    history.go(0);
                } catch (e) {

                }
            }).catch(error => {
            console.log(error);
            history.go(0);
        });
    }

    function criarCotacao() {
        if (titulo != '' && porcentagem != '' && porcentagem != 0) {
            api.post('/api/addcotacao', {
                "tipoDeCotacao": titulo,
                "porcentagem": porcentagem,
                "tipo": "prejogo",
                "status": true,
                "gerente": ge,
                "banca": ba,
                "nomeGerente": nomeGerente,
                "nomeBanca": nomeBanca,
            }).then(res => {
                try {
                    console.log(res.data);
                    history.go(0);
                } catch (e) {

                }
            }).catch(error => {
                console.log(error);
                history.go(0);
            });
        } else {
            alert('Por favor, preencha os campos corretamete!');
        }
    }

    useEffect(() => {

        if (sessionStorage.getItem('admin') == null || sessionStorage.getItem('admin') == "") {
            history.push('/adm');
        }


        async function getCotacaoAPI() {

            api.get('/api/getcotacao/prejogo')
                .then(res => {
                    try {
                        let l = [];
                        console.log(bancasAux);
                        res.data.cotacoes.map((c) => {
                            l.push([c.tipoDeCotacao, c.porcentagem == 1 ?
                                <b style={{color: 'red'}}>{'Bloqueada'}</b> :
                                <b style={{color: 'green'}}>{c.porcentagem + '%'}</b>,
                                c.nomeGerente, c.nomeBanca,
                                <Button variant='contained' color='secondary'
                                        onClick={() => deleteCotacao(c.id)}><CancelIcon/></Button>]);
                        })
                        setData(l);
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });

        }

        async function getBancaAPI() {
            let l = [];
            let c = {};
            api.get('/api/getbancas')
                .then(res => {
                    try {
                        res.data.bancas.map((b) => {
                            l.push({'title': b.nome, 'gerente': b.gerente, 'id': b.id})
                            c[b.id] = b.nome;
                        })

                    } catch (e) {

                    }

                    setBancasAux(l);
                }).catch(error => {
                console.log(error)
            });

        }

        getBancaAPI();
        getCotacaoAPI();

        async function getGerenteAPI() {
            let l = []
            api.get('/api/getgerencia')
                .then(res => {
                    try {
                        res.data.gerencias.map((b) => {
                            l.push({'title': b.nome, 'id': b.id})
                        })
                    } catch (e) {

                    }
                    setGerentes(l);
                }).catch(error => {
                console.log(error)
            });

        }

        getGerenteAPI();

    }, []);


    return (
        <div className={classes.root} onClick={close}>
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

                                    <Grid xs={12} md={9} sm={12} item>
                                        <Paper className={classes.paperX} style={{padding: '10px'}}>
                                            <Grid container spacing={2} key={127}>

                                                <Grid item sm container align="center">
                                                    <Grid item container direction="column" spacing={2}>
                                                        <Grid item>


                                                            <Typography variant="h5">GERENCIAR COTAÇÕES
                                                                PRE-JOGO</Typography>
                                                            <br/>
                                                            <Grid container direction={'row'} justify="space-around">

                                                                <Grid item md={9} xs={12}><Autocomplete

                                                                    id={"resetField2"}
                                                                    freeSolo
                                                                    fullWidth
                                                                    onChange={verifyClientHandler}
                                                                    options={cotacao}
                                                                    getOptionLabel={(option) => option.title}
                                                                    renderInput={(params) =>
                                                                        <TextField
                                                                            {...params}

                                                                            label="Nome da Cotação"
                                                                            variant="outlined"/>}
                                                                />
                                                                    <br/>
                                                                </Grid>

                                                                <Grid item md={3}>
                                                                    <TextField

                                                                        id="valorCotacao"
                                                                        onChange={valorHandler}
                                                                        label="Valor Cotação (%)"
                                                                        type="number"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        variant="filled"
                                                                    />

                                                                </Grid>
                                                                <Grid item md={9} xs={12}><Autocomplete

                                                                    id={"resetField2"}
                                                                    freeSolo
                                                                    fullWidth
                                                                    onChange={verifyGerenteHandler}
                                                                    options={gerentes}
                                                                    getOptionLabel={(option) => option.title}
                                                                    renderInput={(params) =>
                                                                        <TextField
                                                                            {...params}

                                                                            label="Gerente"
                                                                            variant="outlined"/>}
                                                                />
                                                                    <br/>
                                                                </Grid>
                                                                <Grid item md={9} xs={12}><Autocomplete

                                                                    id={"resetField2"}
                                                                    freeSolo
                                                                    fullWidth
                                                                    onChange={verifyBancaHandler}
                                                                    options={bancas}
                                                                    getOptionLabel={(option) => option.title}
                                                                    renderInput={(params) =>
                                                                        <TextField
                                                                            {...params}

                                                                            label="Banca"
                                                                            variant="outlined"/>}
                                                                />
                                                                    <br/>
                                                                </Grid>

                                                            </Grid>

                                                            <br/><br/>
                                                            <Button onClick={criarCotacao} variant="contained"
                                                                    color="primary">
                                                                SALVAR
                                                            </Button>


                                                        </Grid>

                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Paper>

                                    </Grid>

                                </Grid>
                            </Grid>
                            <br/>
                            <React.Fragment>


                                <MUIDataTable

                                    data={data}
                                    columns={columns}
                                    options={options}

                                />
                            </React.Fragment>
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


            </main>

        </div>

    );

}