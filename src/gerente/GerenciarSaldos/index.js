import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useRef } from 'react';
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
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { api } from '../Constantes/index';
//let aux = [];

export default function Dashboard() {

    let history = useHistory();
    const [ids, setIds] = useState([]);
    const [dic, setDic] = useState({});
    const [date, setDate] = useState([]);
    const [day, setDay] = useState([]);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [openNavB, setOpenNavB] = useState("");
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [dataAux, setDataAux] = useState([]);
    const [saldoS, setSaldoS] = useState(0.0);
    const [saldoG, setSaldoG] = useState(0.0);

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



    const columns = ["BANCA", "LIMITE GERAL", "LIMITE SIMPLES", "SALVAR"];


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
        sessionStorage.removeItem('manage');
        history.push('/login');
    }

    let d = [];

    useEffect(() => {

        if (sessionStorage.getItem('manage') == null || sessionStorage.getItem('manage') == "") {
            history.push('/login')
        }

        let unmounted = false;
        async function homeAll() {


            axios.get('https://cds-api.sportingbet.com/bettingoffer/counts?x-bwin-accessid=MjcxNjZlZTktOGZkNS00NWJjLTkzYzgtODNkNThkNzZhZDg2&lang=pt-br&country=BR&userCountry=BR&state=PreMatch&tagTypes=Region&sortBy=Tags&extendedTags=&sportIds=4',
                {
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    }
                }).then(res => {
                    try {

                        res.data.map(fix => {


                            dic[fix.tag.id] = fix.tag.name.value;


                        });
                        if (!unmounted) {
                            setDic(dic);
                        }



                    } catch (e) {
                    }
                }).catch(error => {
                    console.log(error)
                });

        }


        async function competitionAll() {


            axios.get('https://cds-api.sportingbet.com/bettingoffer/counts?x-bwin-accessid=' +
                'MjcxNjZlZTktOGZkNS00NWJjLTkzYzgtODNkNThkNzZhZDg2&lang=pt-br&country=BR&userCountry=' +
                'BR&state=PreMatch&tagTypes=Competition&sportIds=4&sortBy=Tags&extendedTags=',
                {
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    },
                }).then(res => {
                    let a = res.data;
                    a.map(fix => {
                        if ([42, 6, 7, 9, 11, 234, 233].indexOf(fix.tag.parentId) !== -1 && images[6][1].indexOf(fix.tag.name.value) === -1 &&
                            (fix.tag.name.value.includes('Simulated') + '') !== 'true' && (fix.tag.name.value.includes('Price Boost') + '') !== 'true' &&
                            (fix.tag.name.value.includes('Combi+') + '') !== 'true' && images[6][2].indexOf(fix.tag.id) === -1 && fix.preMatch > 0
                            && fix.tag.statistics === true) {
                            images[6][1].push(fix.tag.name.value.replace('Woman', 'Feminino')
                                .replace('South Zone', 'Zona Sul').replace('North Zone', 'Zona Norte').replace('U21', 'Sub-21'));
                            images[6][2].push(fix.tag.id);

                        }
                        if (images[fix.tag.parentId] && (fix.tag.name.value.includes('Simulated') + '') !== 'true' && (fix.tag.name.value.includes('Price Boost') + '') !== 'true' &&
                            (fix.tag.name.value.includes('Combi+') + '') !== 'true' && fix.tag.statistics === true) {
                            if (images[fix.tag.parentId][1].indexOf(fix.tag.name.value) === -1 &&
                                images[fix.tag.parentId][2].indexOf(fix.tag.id) === -1 && fix.tag.parentId !== 6) {
                                images[fix.tag.parentId][1].push(fix.tag.name.value);
                                images[fix.tag.parentId][2].push(fix.tag.id);
                            }

                        }
                        if (ids.indexOf(fix.tag.parentId) === -1 && [42, 6, 7, 9, 11, 234, 233].indexOf(fix.tag.parentId) === -1) {
                            ids.push(fix.tag.parentId);
                        }

                    });
                    if (!unmounted) {
                        setIds(ids);
                    }

                }).catch(error => {
                    console.log(error)
                });

        }


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
            
            api.get('/api/getbancas/'+sessionStorage.getItem('manage'))
                .then(res => {
                    try {
                        if (res.data) {
                           
                            res.data.bancas.map((b) => {
                                console.log(b);
                                dataAux.push([b.nome, <TextField
                                id="saldoG"
                                label="Saldo (R$)"
                                type="number"      
                                defaultValue={b.saldoGeral}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setSaldoG(e.target.value)}
                                variant="filled"
                            />, <TextField
                                    id="saldoS"
                                    label="Saldo (R$)"
                                    type="number"
                                    defaultValue={b.saldoSimples}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => setSaldoS(e.target.value)}
                                    variant="filled"
                                />,
                                <Button variant="outlined"
                                 style={{ color: 'blue', borderColor: 'blue' }}
                                 onClick={() => updateSaldos(b.id)}><SaveIcon /></Button>,],);   
                            })
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
        getDateAll();
        getBancasAPI(); 
        homeAll();
        competitionAll();


        return () => {
            unmounted = true
        };

    }, []);

    function updateSaldos(id, limiteS, limiteG){
        console.log(saldoG);
        // api.put('/api/updatebanca/'+id, {
        //     "saldoSimples": limiteS,
        //     "saldoGeral": limiteG,
        // })
        //     .then(res => {
        //         try {
        //             if (res.data) {
        //                 console.log(res.data);
        //                 history.push("/gerente");
        //             }   
        //         } catch (e) {

        //         }
        //     }).catch(error => {
        //         console.log(error)
        //     });
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
                    <ListItem button component={Link} to={'/caixa'}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Caixa Cambistas" />
                    </ListItem>
                    <ListItem button component={Link} to={'/caixa'}>
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

            </Drawer>

            <main className={classes.content}>

                <div className={classes.appBarSpacer} />

                <Container maxWidth="lg" className={classes.container}>

                    <br />
                    <React.Fragment>
                        <MUIDataTable
                            title='Saldos dos Cambistas'
                            data={dataAux}
                            columns={columns}
                            options={options}

                        />
                    </React.Fragment>
                </Container>

                <div>
                    <ScrollUpButton />
                </div>
            </main>


        </div>


    )

}