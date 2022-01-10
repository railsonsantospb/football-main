import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InboxIcon from '@material-ui/icons/Inbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DescriptionIcon from '@material-ui/icons/Description';
import { images } from '../Constantes/index';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { api } from '../Constantes/index';
import LinearProgress from '@material-ui/core/LinearProgress';

//let aux = [];

export default function ValidarBilhete() {

    let history = useHistory();
    const [ids, setIds] = useState([]);
    const [dic, setDic] = useState({});
    const [date, setDate] = useState([]);
    const [dataAux, setDataAux] = useState([]);
    const [day, setDay] = useState([]);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [openNavB, setOpenNavB] = useState("");
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("500px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

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
        appBarSpacer: {
            marginTop: 20,
        },
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
   

    const columns = ["JOGO", "TIPO DE COTACAO",
     "GANHOU", "PERDEU", "CANCELADO", "STATUS"];


    const classes = useStyles();

    const handleClick = () => {
        setOpenNav(!openNav);
    };

    const handleClickA = index => {
        if (openNavA === index) {
            setOpenNavA("");
            setdrawerWidth(240);
        } else {
            setOpenNavA(index);
            setdrawerWidth(400);
        }
    }

    const handleClickB = index => {
        if (openNavB === index) {
            setOpenNavB("");
            setdrawerWidth(240);
        } else {
            setOpenNavB(index);
            setdrawerWidth(400);
        }
    }



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

    function close(e) {

        try {
            if (e.clientX > 250) {
                document.getElementById('drawer').style.display = 'none';
            }
        } catch (e) {
            //console.log(e);
        }
    }

    function exit() {
        sessionStorage.removeItem('admin');
        history.push('/adm');
    }


    function setStatusJogo(jogo, cotacao, status) {

        api.put('/api/validarjogo', 
            {
                'nomeDosTimes': jogo,
                'tipoDeCotacao': cotacao,
                'status': status
            })
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

    let d = [];
    useEffect(() => {

        if (sessionStorage.getItem('admin') == null || sessionStorage.getItem('admin') == "") {
            history.push('/adm');
        }

        let unmounted = false;



        async function getDateAll() {
            
                try {
                    let d = Date.parse(new Date());
                    d = new Date(d);
                    d = d.setDate(d.getDate());


                    let d1 = Date.parse(new Date());
                    d1 = new Date(d1);
                    d1 = d1.setDate(d1.getDate() + 1);

                    let d2 = Date.parse(new Date());
                    d2 = new Date(d2);
                    d2 = d2.setDate(d2.getDate() + 2);

                    d = new Date(d);
                    d1 = new Date(d1);
                    d2 = new Date(d2);


                    setDate([d.getFullYear() + "-" + Number(d.getMonth() + 1) + "-" +
                        d.getDate(), d1.getFullYear() + "-" + Number(d1.getMonth() + 1) + "-" +
                    d1.getDate(), d2.getFullYear() + "-" + Number(d2.getMonth() + 1) + "-" +
                    d2.getDate()]);

                    if (!unmounted) {
                        setDay([d.getDay(), d1.getDay(), d2.getDay()]);
                        console.log([d.getDay(), d1.getDay(), d2.getDay()]);
                    }



                } catch (e) {
                    console.log(e);
                }
                
        }
        
        async function getBancasAPI() {
            let dict = {};
            api.get('/api/getjogos')
                .then(res => {
                    try {
                 
                        if (res.data) {
                           
                            res.data.jogos.map((b) => {
                                let valor = (b.nomeDosTimes+""+b.tipoDeCotacao);
                                dict[valor] = [

                                    <Typography style={{cursor: 'pointer'}} onClick={() => window.open( 'https://www.google.com/search?q='+b.nomeDosTimes)}>{b.nomeDosTimes}</Typography>, 
                                    b.tipoDeCotacao,
                                    <Button variant="outlined" style={{ color: 'green', borderColor: 'green' }} onClick={() => setStatusJogo(b.nomeDosTimes, b.tipoDeCotacao, 'Ganhou')}><CheckCircleIcon /></Button>,
                                    <Button variant="outlined" style={{ color: 'red', borderColor: 'red' }} onClick={() => setStatusJogo(b.nomeDosTimes, b.tipoDeCotacao, 'Perdeu')}><CancelIcon /></Button>,
                                    <Button variant="outlined" style={{ color: 'gold', borderColor: 'gold' }} onClick={() => setStatusJogo(b.nomeDosTimes, b.tipoDeCotacao, 'Cancelado')}><CancelIcon /></Button>,
                                    b.status]
                                
                            })
                            for(let i in dict){
                                dataAux.push(dict[i]);
                            }
                            setDataAux(dataAux);
                            
                        }
                    } catch (e) {
                        console.log(e);
                       
                    }
                }).catch(error => {
                    console.log(error)
                });

        }
        
        setDataAux(d);
        getBancasAPI();
        getDateAll();



        return () => {
            unmounted = true
        };

    }, []);

    function atualizarApostasAoVivo(id, apostasAoVivo){
        if(apostasAoVivo){
            apostasAoVivo = false;
        } else {
            apostasAoVivo = true;
        }
        api.put('/api/updatebanca/'+id, {
            "ativarApostasAoVivos": apostasAoVivo,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarAtivarApostasPreJogo(id, ativarApostasPreJogo){
        if(ativarApostasPreJogo){
            ativarApostasPreJogo = false;
        } else {
            ativarApostasPreJogo = true;
        }
        api.put('/api/updatebanca/'+id, {
            "ativarApostasPreJogo": ativarApostasPreJogo,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarAtivarApostas(id, ativarApostas){
        if(ativarApostas){
            ativarApostas = false;
        } else {
            ativarApostas = true;
        }
        api.put('/api/updatebanca/'+id, {
            "ativarApostas": ativarApostas,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarStatus(id, status){
        if(status){
            status = false;
        } else {
            status = true;
        }
        api.put('/api/updatebanca/'+id, {
            "status": status,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    

    const fixedHeightPaper = clsx(classes.paper);


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
                        className={clsx(classes.menuButton, false && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" className={classes.title}
                        onClick={handleDrawerOpen} style={{ cursor: 'pointer' }}>
                        <b>XBETS198</b>
                    </Typography>

                    <Typography component="h4" color="inherit" display="inline" style={{ marginRight: '-10px' }}>
                        <b>Gerencia:</b> {sessionStorage.getItem('manage')} <br />
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

                <Container maxWidth="lg" className={classes.container}>

                    <br />
                    {dataAux.length > 0 ? 
                    <React.Fragment>
                        <MUIDataTable
                            title={'VALIDAR BILHETES'}
                            data={dataAux}
                            columns={columns}
                            options={options}

                        />
                    </React.Fragment> : <LinearProgress />}
                </Container>

                <div>
                    <ScrollUpButton />
                </div>
            </main>


        </div>


    )

}