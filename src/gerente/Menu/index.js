import {makeStyles, useTheme} from "@material-ui/core/styles";
import React, {useState} from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Link, useHistory} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import InboxIcon from "@material-ui/icons/Inbox";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DescriptionIcon from "@material-ui/icons/Description";
import clsx from 'clsx';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import football from "./football.png";

export default function Menu(props) {

    let history = useHistory();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [drawerWidth, setdrawerWidth] = useState(240);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',

        }, nested: {
            paddingLeft: theme.spacing(4),
        }, toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        }, toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px', ...theme.mixins.toolbar,
        }, appBar: {
            zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
            }),
        }, appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
            }),
        }, menuButton: {
            marginRight: 36,
        }, menuButtonHidden: {
            display: 'none',
        }, title: {
            flexGrow: 1, marginLeft: '-30px'
        }, drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
            }),
        }, drawerPaperClose: {
            overflowX: 'hidden', transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
            }), width: theme.spacing(7), [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }, appBarSpacer: theme.mixins.toolbar, content: {
            flexGrow: 1, overflow: 'auto',
        }, container: {
            paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4),

        }, paper: {
            padding: theme.spacing(1), display: 'flex', overflow: 'auto', flexDirection: 'column',
        }, fixedHeight: {
            height: 240,
        }, button: {
            width: 10,
        }, drawer: {
            display: 'none', flexShrink: 0,
        }
    }));

    const classes = useStyles();


    function exit() {
        sessionStorage.removeItem('manage');
        history.push('/login');
    }


    return (<div><AppBar position="fixed" id={"appbar"} className={clsx(classes.appBar)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    className={clsx(classes.menuButton, false && classes.menuButtonHidden)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" className={classes.title}
                            onClick={handleDrawerToggle} style={{cursor: 'pointer'}}>
                    <b>SONHOBETS</b>
                </Typography>

                <Typography component="h4" color="inherit" display="inline" style={{marginRight: '-10px'}}>
                    {sessionStorage.getItem('nomeGerente')} <br/>
                </Typography>


            </Toolbar>
        </AppBar>
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

                <List>
                    <ListItem alignItems={"center"}>
                        <ListItemIcon>
                            <img src={football} width={160}
                                 align="center"
                            />
                        </ListItemIcon>
                    </ListItem>
                    <Divider/>
                    <ListItem button component={Link} to={'/gerente'}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Início"/>
                    </ListItem>

                    <ListItem button component={Link} to={'/caixagerente'}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Caixa"/>
                    </ListItem>
                    <ListItem button component={Link} to={'/caixagerentecambistas'}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Caixa Cambistas"/>
                    </ListItem>
                    <ListItem button component={Link} to={'/relatorios'}>
                        <ListItemIcon>
                            <FileCopyIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Relatório"/>
                    </ListItem>
                    <ListItem button component={Link} to={'/bilhetesgerente'}>
                        <ListItemIcon>
                            <FileCopyIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Bilhetes"/>
                    </ListItem>
                    <ListItem button component={Link} to={'/clientesgerente'}>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Clientes"/>
                    </ListItem>
                    <ListItem button component={Link} to={'/bilhetegerente/all'}>
                        <ListItemIcon>
                            <DescriptionIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Conferir Bilhetes"/>
                    </ListItem>
                </List>

                <Divider/>

                <List>
                    <ListItem button component={Link} to={"/novasenhagerente"}>
                        <ListItemIcon>
                            <VpnKeyIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Alterar Senha"/>
                    </ListItem>
                    <ListItem button onClick={exit}>
                        <ListItemIcon>
                            <ExitToAppIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Sair"/>
                    </ListItem>

                </List>

            </Drawer></div>

    );
}
