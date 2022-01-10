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
import AnchorLink from 'react-anchor-link-smooth-scroll';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export default function Menu(props) {
  const [country, setCountry] = useState([]);
  let history = useHistory();
    const theme = useTheme();
  
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let auxChamp = [];
    const [open, setOpen] = useState(false);
    const [openWith, setOpenWith] = useState(40);
    const [drawerWidth, setdrawerWidth] = useState(240);
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



    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',

        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
            marginLeft: '-30px'
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(1),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 240,
        },
        button: {
            width: 10,
        },
        drawer: {
            display: 'none',
            flexShrink: 0,
        }
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

    const handleDrawerOpen = () => {
        if (document.getElementById('drawer').style.display == 'none' || document.getElementById('drawer').style.display == '') {
            document.getElementById('drawer').style.display = 'block';
            document.getElementById('drawer').style.marginLeft = '40px';
        } else if (document.getElementById('drawer').style.display == 'block') {
            document.getElementById('drawer').style.display = 'none';
            document.getElementById('drawer').style.marginLeft = '0px';
        }
    };

    const handleDrawerClose = () => {
        setOpenNav(false);
        setdrawerWidth(240);
        setOpenNavA("");
        setOpenNavB("");
        document.getElementById('drawer').style.display = 'none';
    };

    
    function exit(){
        sessionStorage.removeItem('admin');
        history.push('/adm');
    }


  return (
        <div><AppBar position="fixed" id={"appbar"} className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, false && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" className={classes.title}
                onClick={handleDrawerOpen} style={{ cursor: 'pointer' }}>
                <b>SONHOBETS198</b>
            </Typography>

            <Typography component="h4" color="inherit" display="inline" style={{ marginRight: '-10px' }}>
                <b>Admin:</b> {sessionStorage.getItem('admin')} <br />
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

            <ListItem button component={Link} to={'/caixagerentes'}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Caixa Gerentes" />
            </ListItem>
            <ListItem button component={Link} to={'/caixacambistas'}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Caixa Cambistas" />
            </ListItem>
            <ListItem button component={Link} to={'/relatoriosc'}>
                <ListItemIcon>
                    <FileCopyIcon />
                </ListItemIcon>
                <ListItemText primary="Relatório" />
            </ListItem>
            <ListItem button component={Link} to={'/bilhetesA'}>
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
            <ListItem button component={Link} to={'/validarDados'}>
                <ListItemIcon>
                    <FileCopyIcon />
                </ListItemIcon>
                <ListItemText primary="Validar Dados" />
            </ListItem>
            <ListItem button component={Link} to={'/clientesA'}>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
            </ListItem>
            <ListItem button component={Link} to={'/bilheteA/all'}>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Conferir Bilhetes" />
            </ListItem>
        </List>

        <Divider />

        <List>
            <ListItem button component={Link} to={"/novasenhaadmin"}>
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

    </Drawer></div>
    
  );
}
