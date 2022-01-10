import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import InboxIcon from '@material-ui/icons/Inbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { api, cotacao } from '../Constantes/index';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



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
    let { campId } = useParams();
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
            if(g.title == gerente){
                id = g.id;
                setNomeGerente(g.title);
                setG(g.id);
            }
        })

        if(bancas.length == 0){
            bancasAux.map((b) => {
                if(b.gerente == id){
                    c.push({'title': b.title, 'id': b.id});
                }
            })
        } else {
            bancas.map((b) => {
                if(b.gerente == id){
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
            if(b.title == banca){
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


    const onClickHandler = () => {
        
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
        sessionStorage.removeItem('admin');
        history.push('/adm');
    }

    let d = [];


    function deleteCotacao(id){
        api.delete('/api/deletecotacao/'+id)
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

    function criarCotacao(){
        if(titulo != '' && porcentagem != '' && porcentagem != 0){
            api.post('/api/addcotacao',{
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
        getDateAll();


        

        return () => {
            unmounted = true;
        };


    }, []);


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
                        <b>XBETS198</b>
                    </Typography>

                    <Typography component="h4" color="inherit" display="inline" style={{ marginRight: '-10px' }}>
                        <b>Gerencia:</b> eletronica <br />
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
                    <ListItem button component={Link} to={'/admin'}>
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
                    <ListItem button component={Link} to={'/caixacambistas'}>
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
                    <ListItem button component={Link} to={'/cotacao'}>
                        <ListItemIcon>
                            <MonetizationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cotação (Pre-Jogo)" />
                    </ListItem>
                    <ListItem button component={Link} to={'/cotacaoAovivo'}>
                        <ListItemIcon>
                            <MonetizationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cotação (Ao Vivo)" />
                    </ListItem>
                    <ListItem button component={Link} to={'/validarBilhete'}>
                        <ListItemIcon>
                            <FileCopyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Validar Bilhetes" />
                    </ListItem>
                    <ListItem button component={Link} to={'/cotacao'}>
                        <ListItemIcon>
                            <MonetizationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cotação" />
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
                <Container className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={2}>

                                    <Grid xs={12} md={9} sm={12} item>
                                        <Paper className={classes.paperX} style={{ padding: '10px' }}>
                                            <Grid container spacing={2} key={127}>

                                                <Grid item sm container align="center">
                                                    <Grid item container direction="column" spacing={2}>
                                                        <Grid item >


                                                            <Typography variant="h5">GERENCIAR COTAÇÕES PRE-JOGO</Typography>
                                                            <br />
                                                            <Grid container direction={'row'} justify="space-around">

                                                                <Grid item md={9} xs={12} ><Autocomplete

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
                                                                            variant="outlined" />}
                                                                />
                                                                    <br />
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
                                                                <Grid item md={9} xs={12} ><Autocomplete

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
                                                                            variant="outlined" />}
                                                                />
                                                                    <br />
                                                                </Grid>
                                                                <Grid item md={9} xs={12} ><Autocomplete

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
                                                                            variant="outlined" />}
                                                                />
                                                                    <br />
                                                                </Grid>

                                                            </Grid>

                                                            <br /><br />
                                                            <Button onClick={criarCotacao} variant="contained" color="primary">
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