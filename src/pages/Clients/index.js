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
import {images, auxCountry, auxItens, cc, api} from '../Constantes/index';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { pt } from 'date-fns/locale';
import PrintIcon from "@material-ui/icons/Print";
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
    let { campId } = useParams();
    var betsAll = "";
    const theme = useTheme();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
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
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");
    const [clientes, setClientes] = useState([]);
    const [comissao, setComissao] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [gerenteId, setGerenteId] = useState(0);
    const [bancaId, setBancaId] = useState(0);
    const [dataAux, setAux] = useState([]);
    const [dateAfter, setDateAfter] = useState('');
    const [country, setCountry] = useState([]);
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const container = window !== undefined ? () => window().document.body : undefined;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const columns = ["NOME", "","", "","", "EXCLUIR"];


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

    const [selectedDate1, handleDateChange1] = useState(new Date());
    const [selectedDate2, handleDateChange2] = useState(new Date());

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

    function exit() {
        localStorage.removeItem('login');
        history.push('/');
    }


    const onClickHandler = () => {
        let listAux = [];
        let init = 0;
        let auxDate1 = selectedDate1.getFullYear() + "-" + (selectedDate1.getMonth() + 1) + "-" + selectedDate1.getDate();
        let auxDate2 = selectedDate2.getFullYear() + "-" + (selectedDate2.getMonth() + 1) + "-" + selectedDate2.getDate();

        for (let dataAux of data) {
            let dateReverse = new Date((dataAux[0].split(' ')[0]).split('/').reverse().join('/'));
            if (dateReverse >= new Date(auxDate1) && dateReverse <= new Date(auxDate2)) {
                listAux.push(dataAux);
                init = 1;
            }
        }

        if (init == 0) {
            setData(dataAux);
        } else {
            setData(listAux);
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

    function deleteClient(id) {

        api.delete('/api/deletecliente/' + id)
            .then(res => {
                history.go(0);
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
                        }
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });

        }
        async function getClientAPI() {

            api.get('/api/getclientes/' + sessionStorage.getItem('login'))
                .then(res => {
                    let l = [];
                    try {
                        if (res.data) {
                            res.data.clientes.map((b) => {
                                l.push([b.nome, <Typography></Typography>, <Typography></Typography>,
                                    <Typography></Typography>, <Typography></Typography>,
                                    <Button variant="contained"
                                                          color="secondary" onClick={() => deleteClient(b.id)}><CancelIcon/></Button>]);
                            });
                        }
                        setAux(l);
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error);
            });

        }

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

        async function all() {
            let regioes = ['gb-eng','it','es','fr','de','nl','pt','ar'];
            let regioesAux = [];
            let index = [];
            let count = 0;
            axios.get('https://center6.wee.bet/v1/campeonatos/regioes?"\n' +
                '                            "sport_id=1&data_final='+dateAfter)
                .then(res => {
                    try {
                        if (res.data) {
                            let l = [];
                            let r = res.data.result;
                            for (let i of r){
                                if(i.sigla == 'br'){
                                    regioesAux.push(r[count]);
                                    break
                                }
                                count += 1;
                            }
                            count = 0;
                            for(let i of r){
                                if(i.sigla == 'ww'){
                                    regioesAux.push(r[count]);
                                }
                                count += 1;
                            }
                            count = 0;
                            for(let i of r){
                                if(i.sigla == 'eu'){
                                    regioesAux.push(r[count]);
                                }
                                count += 1;
                            }
                            count = 0;
                            for(let i of r){
                                if(regioes.indexOf(i.sigla) != -1){
                                    regioesAux.push(r[count]);
                                } else if(['br', 'ww', 'eu'].indexOf(i.sigla) == -1){
                                    index.push(r[count])
                                }
                                count += 1;
                            }
                            r = regioesAux.concat(index);


                            r.map((f) =>{
                                l.push(f);
                            });
                            setCountry(l);

                        }
                    } catch (e) {
                        console.log(e);
                    }
                }).catch(error => {
                console.log(error);
            });

        }
        all();
        getClientAPI();
        setData(dataAux);
        getLoginAPI();


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
                                                        <Grid item >


                                                            <Typography variant="h5">CLIENTES</Typography>
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
                                                                        value={selectedDate2}
                                                                        onChange={date2 => handleDateChange2(date2)}
                                                                        format="dd/MM/yyyy"
                                                                    />
                                                                </MuiPickersUtilsProvider>


                                                            </Grid>

                                                            <br />
                                                            <Button onClick={onClickHandler} variant="contained" color="primary">
                                                                BUSCAR
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
                        <Grid container>
                            <Grid item>

                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <React.Fragment>


                                    <MUIDataTable
                                        title={"Banca: eletronica"}
                                        data={dataAux}
                                        columns={columns}
                                        options={options}

                                    />
                                </React.Fragment>
                            </Grid>
                            <Grid item>

                            </Grid>
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


            </main>

        </div>

    );

}