import {images, api} from "../Constantes/index";
import {withStyles, makeStyles, useTheme} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, {useState, useEffect, useRef, useMemo} from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import axios from "axios";
import LockIcon from "@material-ui/icons/Lock";
import {useHistory, Link} from "react-router-dom";
import {useParams} from "react-router";
import LinearProgress from "@material-ui/core/LinearProgress";
import {Box} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {useReactToPrint} from "react-to-print";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import InboxIcon from "@material-ui/icons/Inbox";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DescriptionIcon from "@material-ui/icons/Description";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import Taca from "../Home/taca.jpg";
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import football from "../Home/football";
import Hidden from "@material-ui/core/Hidden";
import paramsData from "../parametros.json";

export default function Menu() {
  const [country, setCountry] = useState([]);
  let history = useHistory();
    const theme = useTheme();
  
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let auxChamp = [];
    const [open, setOpen] = useState(false);
    const [openWith, setOpenWith] = useState(40);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [openNavB, setOpenNavB] = useState("");
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");
    const [datas, setDatas] = useState([]);
    const [dateD, setDateD] = useState('');
    const [dateAfter, setDateAfter] = useState('');
    
    const [apostasPreJogo, setApostasPreJogo] = useState(false);
    const container = window !== undefined ? () => window().document.body : undefined;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const StyledTableRow = withStyles((theme) => ({
        root: {
            "&:nth-of-type(odd)": {
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
            padding: theme.spacing(3),
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

    function getLoginAPI() {

            api.get('/api/getbanca/' + sessionStorage.getItem('login'))
                .then(res => {
                    try {
                        if (res.data) {
                            setSaldoSimples(res.data.bancas.saldoSimples);
                            setSaldoGeral(res.data.bancas.saldoGeral);
                            setNomeBanca(res.data.bancas.nome);
                        }
                    } catch (e) {

                    }
                }).catch(error => {
                    console.log(error)
                });

        }
        getLoginAPI();

    function getDateAfter() {
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


  function all() {
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
        function exit(){
            sessionStorage.removeItem('login');
            history.push('/');
        }

  return (
    <div>
      <Divider />
        <List>
            <ListItem alignItems={"center"}>
                <ListItemIcon >
                    <img src={football} width={120}
                         align="center"
                    />
                </ListItemIcon>
            </ListItem>
            <Divider />
            <ListItem>
                <Typography component="h4" color="inherit" >
                    <b>Banca:</b> {nomeBanca} <br /><b>Simples:</b> R$ {saldoSimples.toFixed(2)} <br/><b> Geral:</b>  R$ {saldoGeral.toFixed(2)}
                </Typography>
            </ListItem>
            <Divider />
            <ListItem button component={Link} to={'/home'}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Início" />
            </ListItem>
            <ListItem button component={Link} to={'/aovivo'}>
                <ListItemIcon>
                    <LiveTvIcon />
                </ListItemIcon>
                <ListItemText primary="Ao Vivo" />
            </ListItem>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <SportsSoccerIcon />
                </ListItemIcon>
                <ListItemText primary="Futebol" />
                {openNav ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openNav} timeout="auto" unmountOnExit>

                <List component="div" disablePadding>

                    {country.map((id, index) => {
                        return (
                            <div>

                                <ListItem key={id} button className={classes.nested} onClick={() => {
                                    handleClickA(index)
                                }}>

                                    {images[id.siglas] !== undefined ?

                                        <ListItemIcon>

                                            <img src={images[id][0]} width="20px" height="12"
                                                 alt={id} />
                                        </ListItemIcon> : ''}
                                    <ListItemText primary={id._id} />
                                    {index === openNavA ? <ExpandLess /> : <ExpandMore />}

                                </ListItem>
                                <Collapse in={openNavA === index} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {id ? id.campeonatos.map((team, index) => {
                                            return (
                                                <ListItem key={team} button className={classes.nested} component={Link}
                                                          to={'/campeonato/'+team._id}>
                                                    <ListItemIcon>
                                                        <img src={Taca} width="20px"
                                                             height="12"
                                                             align="center"
                                                             alt={team} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={team.nome} />
                                                </ListItem>

                                            )
                                        }) : ''}
                                    </List>
                                </Collapse></div>

                        )
                    })}

                </List>
            </Collapse>
            <ListItem button component={Link} to={'/caixa'}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Caixa" />
            </ListItem>
            <ListItem button component={Link} to={'/bilhetes'}>
                <ListItemIcon>
                    <FileCopyIcon />
                </ListItemIcon>
                <ListItemText primary="Bilhetes" />
            </ListItem>
            <ListItem button component={Link} to={'/clientes'}>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
            </ListItem>
            <ListItem button component={Link} to={'/bilhete/all'}>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Conferir Bilhetes" />
            </ListItem>
        </List>

        <Divider />

        <List>
            <ListItem button component={Link} to={"/novasenha"}>
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
    </div>
  );
}
