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
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { api } from '../Constantes/index';
import * as yup from 'yup';
import {useFormik} from 'formik';

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
    const [nomeBanca, setNomeBanca] = useState("");
    const [limitG, setLimitG] = useState("");
    const [limitS, setLimitS] = useState("");
    const [telefone, setTelefone] = useState("");
    const [comissaoAoVivo, setComissaoAoVivo] = useState("");
    const [email, setEmail] = useState("");
    const [comissaoPreJogo, setComissaoPreJogo] = useState("");
    const [senha, setSenha] = useState("");
    const [apostasAoVivo, setApostasAoVivo] = useState(false);
    const [apostasPreJogo, setApostasPreJogo] = useState(false);
    const [imprimir, setImprimir] = useState(false);
    const [apostas, setApostas] = useState(false);
    const [status, setStatus] = useState(false);

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

    const dataAux = [
        ["ELETRONICA", "R$ 1000.00", "R$ 1000.00", "1:5;5:10", "1:5;5:10",
            <Button variant="outlined" style={{ color: 'green', borderColor: 'green' }}><CheckCircleIcon /></Button>,
            <Button variant="outlined" style={{ color: 'green', borderColor: 'green' }}><CheckCircleIcon /></Button>,
            <Button variant="outlined" style={{ color: 'green', borderColor: 'green' }}><CheckCircleIcon /></Button>,
            <Button variant="outlined" style={{ color: 'green', borderColor: 'green' }}><CheckCircleIcon /></Button>,
            <Button variant="outlined" style={{ color: 'blue', borderColor: 'blue' }}><EditIcon /></Button>,],
    ];

    const columns = ["NOME", "LIMITE GERAL", "LIMITE SIMPLES", "COMISSÕES PRÉ-JOGO", "COMISSÕES AO VIVO",
        "APOSTAS", "STATUS", "PRÉ-JOGO", "AO VIVO", "EDITAR"];


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

    const validationSchema = yup.object({
        password1: yup
        .string().min(4, 'Digite no minimo 4 digitos').required(),
        password2: yup
            .string().min(4, 'Digite no minimo 4 digitos').required()
            .oneOf([yup.ref('password1'), ''], 'As senhas estão diferentes'),
            
    });

    function exit() {
        sessionStorage.removeItem('manage');
        history.push('/login');
    }

    const formik = useFormik({
        initialValues: {
            password1: '',
            password2: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            api.post('/api/addbanca', {
                "nome": nomeBanca,
                "login": nomeBanca,
                "senha": values.password1,
                "telefone": telefone,
                "email": email,
                "comissaoPreJogo": comissaoPreJogo,
                "comissaoAoVivo": comissaoAoVivo,
                "saldoSimples": limitS,
                "saldoGeral": limitG,
                "ativarApostasAoVivos": apostasAoVivo,
                "ativarApostasPreJogo": apostasPreJogo,
                "ativarApostas": apostas,
                "status": status,
                "gerente_id": sessionStorage.getItem('manage'),
    
            })
                .then(res => {
                    try {
                        if (res.data) {
                            history.push("/gerente");
                        }   
                    } catch (e) {
    
                    }
                }).catch(error => {
                    console.log(error)
                });
        },
    });

    function handlerChangeApostasAovivo() {
        if(apostasAoVivo){
            setApostasAoVivo(false);
        } else {
            setApostasAoVivo(true);
        }
    }

    function handlerChangeApostasPreJogo(){
        if(apostasPreJogo){
            setApostasPreJogo(false);
        } else {
            setApostasPreJogo(true);
        }
    }

    function handlerChangeImprimir(){
        if(imprimir){
            setImprimir(false);
        } else {
            setImprimir(true);
        }
    }

    function handlerChangeAposta(){
        if(apostas){
            setApostas(false);
        } else {
            setApostas(true);
        }
    }

    function handlerChangeStatus(){
        if(status){
            setStatus(false);
        } else {
            setStatus(true);
        }
    }


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
            axios.get('http://worldclockapi.com/api/json/utc/now',
                {
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    }
                }).then(res => {
                    try {
                        let d = Date.parse(res.data.currentDateTime);
                        d = new Date(d);
                        d = d.setDate(d.getDate());


                        let d1 = Date.parse(res.data.currentDateTime);
                        d1 = new Date(d1);
                        d1 = d1.setDate(d1.getDate() + 1);

                        let d2 = Date.parse(res.data.currentDateTime);
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
                        }



                    } catch (e) {
                        console.log(e);
                    }
                }).catch(error => {
                    console.log(error)
                });
        }

        getDateAll();
        homeAll();
        competitionAll();


        return () => {
            unmounted = true
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
                        <Typography variant="h6" gutterBottom>
                            Cadastrar Cambista
                        </Typography>
                        <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={nomeBanca}
                                    required
                                    id="name"
                                    name="name"
                                    label="Nome"
                                    fullWidth
                                    autoComplete="given-name"
                                    onChange={e => setNomeBanca(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={email}
                                    id="email"
                                    name="email"
                                    label="E-mail"
                                    fullWidth
                                    autoComplete="family-name"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={telefone}
                                    required
                                    id="telefone"
                                    name="telefone"
                                    label="Telefone"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    onChange={e => setTelefone(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={limitG}
                                    id="standard-number"
                                    label="Limite Aposta Geral (R$)"
                                    type="number"
                                    fullWidth
                                    onChange={e => setLimitG(e.target.value)}
                                />
                                <br />
                                <br />
                                <TextField
                                    value={limitS}
                                    id="standard-number"
                                    label="Limite Aposta Simples (R$)"
                                    type="number"
                                    fullWidth
                                    onChange={e => setLimitS(e.target.value)}
                                />
                                <br />
                                <br />

                                <TextField
                                    value={comissaoPreJogo}
                                    id="filled-multiline-static"
                                    label="Comissão (Pré-Jogo)"
                                    multiline
                                    rows={5}
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    placeholder="- Observação:
                                    * 1 jogo 5% de comissão, colocar 1:5;
                                    * 2 jogos 6% de comissão, colocar 2:6, separados por (;)
                                    * Para quantidade de jogos acima do ultimo valor na lista sará considerada a última comissão.
                                    *  Exemplo: 1:5;5:10;10:20"
                                    fullWidth
                                    onChange={e => setComissaoPreJogo(e.target.value)}
                                />
                                <br />
                                <br />
                                <TextField
                                    value={comissaoAoVivo}
                                    id="filled-multiline-static"
                                    label="Comissão (Ao Vivo)"
                                    multiline
                                    rows={5}
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    placeholder="- Observação:
                                    * 1 jogo 5% de comissão, colocar 1:5;
                                    * 2 jogos 6% de comissão, colocar 2:6, separados por (;)
                                    * Para quantidade de jogos acima do ultimo valor na lista sará considerada a última comissão.
                                    * Exemplo: 1:5;5:10;10:20"
                                    fullWidth
                                    onChange={e => setComissaoAoVivo(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    id="password1"
                                    name="password1"
                                    label="Nova Senha"
                                    type="password"
                                    value={formik.values.password1}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password1 && Boolean(formik.errors.password1)}
                                    helperText={formik.touched.password1 && formik.errors.password1}
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="password2"
                                    name="password2"
                                    label="Digite Novamente"
                                    type="password"
                                    value={formik.values.password2}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password2 && Boolean(formik.errors.password2)}
                                    helperText={formik.touched.password2 && formik.errors.password2}
                                    autoComplete="shipping address-level2"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveAddress" value="yes" checked={apostasAoVivo} 
                                    onClick={handlerChangeApostasAovivo}/>}
                                    label="Habilitar Apostas Ao Vivo" 
                                />
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveAddress" value="yes" checked={apostasPreJogo}
                                    onClick={handlerChangeApostasPreJogo} />}
                                    label="Habilitar Apostas Pre-Jogo"
                                />
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveAddress" value="yes" checked={imprimir}
                                    onClick={handlerChangeImprimir} />}
                                    label="Habilitar Imprimir Bilhete"
                                />
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveAddress" value="yes" checked={apostas}
                                    onClick={handlerChangeAposta} />}
                                    label="Apostas Ativas"
                                />
                                
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveAddress"  checked={status}
                                    onClick={handlerChangeStatus} />}
                                    label="Status"
                                />
                            </Grid>
                            <Button variant="contained" color="primary" className={classes.submit}
                             type="submit" disableElevation >
                                CADASTRAR
                            </Button>
                            
                            
                        </Grid>
                        </form>
                    </React.Fragment>
                </Container>

                <div>
                    <ScrollUpButton />
                </div>
            </main>


        </div>


    )

}