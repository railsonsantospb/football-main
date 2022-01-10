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
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import InboxIcon from '@material-ui/icons/Inbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { images, auxCountry, auxItens, cc } from '../Constantes/index';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import PrintIcon from '@material-ui/icons/Print';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { pt } from 'date-fns/locale';
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
    let { campId } = useParams();
    var betsAll = "";
    const [open, setOpen] = useState(false);
    const [live, setLive] = useState([]);
    const [message, setMessage] = useState("");
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
    const [bilhetes, setBilhetes] = useState("");
    const [dataAux, setAux] = useState([]);
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

    const columns = ["CUPOM", "BANCA", "DATA", "SITUAÇÃO", "ENTRADA", "COMISSÕES", "COTAÇÃO", "RETORNO",
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

    function exit() {
        sessionStorage.removeItem('manage');
        history.push('/login');
    }


    const onClickHandler = () => {
        let listAux = [];
        let init = 0;
        let auxDate1 = selectedDate1.getFullYear() + "-" + (selectedDate1.getMonth() + 1) + "-" + selectedDate1.getDate();
        let auxDate2 = selectedDate2.getFullYear() + "-" + (selectedDate2.getMonth() + 1) + "-" + selectedDate2.getDate();

        for (let datas of dataAux) {

            let d = datas[2].split(' ')[0].split('/');
            d[2] = "20"+d[2]
            let dateReverse = new Date(d.reverse().join('/'));

            if (dateReverse >= new Date(auxDate1) && dateReverse <= new Date(auxDate2)) {
                listAux.push(datas);
                init = 1;
            }
        }

        if (init == 0) {
            setAux(dataAux);
        } else {
            setAux(listAux);
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

    function setStatusBilhete(id) {

        api.put('/api/updatebilhete/' + id, {status: 'Cancelado'})
            .then(res => {
                try {
                    if (res.data) {
                        history.go(0);
                    }
                } catch (e) {

                }
            }).catch(error => {
            console.log(error)
        });

    }



    useEffect(() => {

        if (sessionStorage.getItem('manage') == null || sessionStorage.getItem('manage') == "") {
            history.push('/')
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

        async function getBilhetesBancas() {

            api.get('/api/getbilhetesgerente/' + sessionStorage.getItem('manage'))
                .then(res => {
                    let l = [];
                    try {
                        if (res.data) {
                            setBilhetes(res.data);
                            res.data.bilhetes.map((b) => {
                                l.push([<Button component={Link} to={'/bilhetegerente/'+b.codigo}>{b.codigo}</Button>,
                                    b.nomeBanca,
                                    b.dataDaAposta,
                                    b.status == 'Aberto' ? <b style={{color: 'blue'}}>{b.status}</b> :
                                        b.status == 'Cancelado' ? <b style={{color: 'gold'}}>{b.status}</b> :
                                            b.status == 'Perdeu' ? <b style={{color: 'red'}}>{b.status}</b> :
                                                b.status == 'Ganhou' ? <b style={{color: 'green'}}>{b.status}</b> : b.status,
                                    b.valorDeEntrada.toFixed(2),
                                    b.comissao.toFixed(2),
                                    b.cotacao.toFixed(2),
                                    b.valorDeSaida.toFixed(2),
                                    b.tipoSimplesouMultiplo,
                                    b.tipoDeJogo]);
                            });
                        }
                        l.reverse();
                        setAux(l);
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error);
            });

        }
        getDateAll();
        getBilhetesBancas();

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
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
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


                                                            <Typography variant="h5">BILHETES</Typography>
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
                            {1 > 0 ? '' : <LinearProgress />}
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
                <React.Fragment>


                    <MUIDataTable
                       
                        data={dataAux}
                        columns={columns}
                        options={options}

                    />
                </React.Fragment>

            </main>

        </div>

    );

}