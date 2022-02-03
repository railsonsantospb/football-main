import {images, api} from "../Constantes/index";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import React, {useState, useEffect} from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {useHistory, Link} from "react-router-dom";
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
import football from "../Home/football.png";
import Hidden from "@material-ui/core/Hidden";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Button from "@material-ui/core/Button";

export default function Menu(props) {
  const [country, setCountry] = useState([]);
  let history = useHistory();
    const theme = useTheme();
  
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [openNavB, setOpenNavB] = useState("");
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");
 
    
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
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


    useEffect(() => {

        async function getLoginAPI() {

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

        async function all() {
            let regioes = ['gb-eng','it','es','fr','de','nl','pt','ar'];
            let regioesAux = [];
            let index = [];
            let count = 0;
            api.get('/api/gethome').then(res => {

                try {
                    let l = []
                    res.data.home.modalidades[0].paises.map((f) => {

                        l.push(f);

                    });
                    setCountry(l);

                } catch (e) {
                    console.log(e);
                }
            }).catch(error => {
                console.log(error)
            });


        }
        all();
        if(sessionStorage.getItem('login') != null && sessionStorage.getItem('login') != "") {
            getLoginAPI();
        }


    },[])
    
    function exit(){
        sessionStorage.removeItem('login');
        history.push('/banca');
    }

  const drw = (<div >
        <Divider />
        <fieldset><List>
            <ListItem alignItems={"center"}>
                <ListItemIcon  >
                    <img src={football} width={160}
                         align="center"
                    />
                </ListItemIcon>
            </ListItem>
            <Divider />
            {sessionStorage.getItem('login') != null &&  sessionStorage.getItem('login') != "" ?
            <ListItem>
                <Typography component="h4" color="inherit" >
                    <b>Banca:</b> {nomeBanca} <br /><b>Simples:</b> R$ {saldoSimples.toFixed(2)} <br/><b> Geral:</b>  R$ {saldoGeral.toFixed(2)}
                </Typography>
            </ListItem> : ''}
            <Divider />
            <ListItem button component={Link} to={'/inicio'}>
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
                                    <ListItemText primary={id.nome} />
                                    {index === openNavA ? <ExpandLess /> : <ExpandMore />}

                                </ListItem>
                                <Collapse in={openNavA === index} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {id ? id.campeonatos.map((team, index) => {
                                            return (
                                                <ListItem key={team} button className={classes.nested} component={Link}
                                                          to={'/pre/campeonato/'+team.id}>
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
            {sessionStorage.getItem('login') != null &&  sessionStorage.getItem('login') != "" ?
            <ListItem button component={Link} to={'/caixa'}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Caixa" />
            </ListItem>: ''}
            {sessionStorage.getItem('login') != null &&  sessionStorage.getItem('login') != "" ?
            <ListItem button component={Link} to={'/bilhetes'}>
                <ListItemIcon>
                    <FileCopyIcon />
                </ListItemIcon>
                <ListItemText primary="Bilhetes" />
            </ListItem> : ''}
            {sessionStorage.getItem('login') != null &&  sessionStorage.getItem('login') != "" ?
            <ListItem button component={Link} to={'/clientes'}>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
            </ListItem> : ''}
            <ListItem button component={Link} to={'/regulamento'}>
                <ListItemIcon>
                <FileCopyIcon color="secondary"/>
                </ListItemIcon>
                <ListItemText primary="Regulamento" />
            </ListItem>
            <ListItem button component={Link} to={'/bilhete/all'}>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Conferir Bilhetes" />
            </ListItem>
            {sessionStorage.getItem('login') != null &&  sessionStorage.getItem('login') != "" ?
            <ListItem button component={Link} to={'/recuperarpin'}>
                <ListItemIcon>
                    <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Recuperar Pin" />
            </ListItem> : ''}
        </List>

        <Divider />

        <List>
            {sessionStorage.getItem('login') != null &&  sessionStorage.getItem('login') != "" ?
            <ListItem button component={Link} to={"/novasenha"}>
                <ListItemIcon>
                    <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Alterar Senha" />
            </ListItem> :  ''}
            {sessionStorage.getItem('login') != null &&  sessionStorage.getItem('login') != "" ?
            <ListItem button onClick={exit}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
            </ListItem> : <Button onClick={exit} style={{width: 230}}

                    variant="contained"
                    color="primary"
                >
                    ENTRAR
                </Button>}

        </List></fieldset>

    </div>);

  return (
        <div><AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
                        <b>SONHOBETS</b>
                    </Typography>
                    <AnchorLink href='#bl'><DescriptionIcon style={{marginLeft: 10, color: 'white'}}/></AnchorLink>

                </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}

                    >
                        {drw}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    
                        {drw}
                    
                   
                </Hidden>
        </nav></div>
    
  );
}
