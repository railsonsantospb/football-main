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
import {useParams} from "react-router";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { api } from '../Constantes/index';
import * as yup from 'yup';
import {useFormik} from 'formik';
import Menu from '../Menu/index';

export default function ValidarDados() {
    let {id} = useParams();


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
    const [valorDeEntrada, setValorDeEntrada] = useState(0);
    const [valorDeSaida, setValorDeSaida] = useState(0);
    const [limitG, setLimitG] = useState(0);
    const [limitS, setLimitS] = useState(0);
    const [cotacao, setCotacao] = useState(0);
    const [cotacaoMin, setCotacaoMin] = useState(0);
    const [cotaMax, setCotaMax] = useState(0);
    const [cotaMin, setCotaMin] = useState(0);
    const [comissaoPreJogo, setComissaoPreJogo] = useState("");
    const [senha, setSenha] = useState("");
    const [apostasAoVivo, setApostasAoVivo] = useState(false);
    const [apostasPreJogo, setApostasPreJogo] = useState(false);
    const [imprimir, setImprimir] = useState(false);
    const [apostas, setApostas] = useState(false);
    const [status, setStatus] = useState(false);
    const [idCambista, setidCambista] = useState(0);
    

    





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

    
    const validationSchema = yup.object({
        password1: yup
        .string().min(4, 'Digite no minimo 4 digitos'),
        password2: yup
            .string().min(4, 'Digite no minimo 4 digitos')
            .oneOf([yup.ref('password1'), ''], 'As senhas estão diferentes'),
            
    });


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

    const formik = useFormik({
        initialValues: {
            password1: '',
            password2: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            api.put('/api/updateadmin', {
                "valorDeEntrada": valorDeEntrada,
                "valorDeSaida": valorDeSaida,
                "limiteApostaSimples": limitS,
                "limiteApostaGeral": limitG,
                "cotacao": cotacao,
                "cotacaoMin": cotacaoMin,
                "cotaMax": cotaMax,
                "cotaMin": cotaMin,
    
            })
                .then(res => {
                    try {
                        if (res.data) {
                            history.go(0);
                            alert('Atualizado com Sucesso!');
                        }   
                    } catch (e) {
                        alert('Erro ao Atualizar!');
                    }
                }).catch(error => {
                    console.log(error)
                });
        },
    });


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

        async function getAdminAPI() {

            api.get('/api/getadmin')
                .then(res => {
                    try {
                        if (res.data) {
                            console.log(res.data);
                            setValorDeSaida(res.data.admin[0].valorDeSaida);
                            setValorDeEntrada(res.data.admin[0].valorDeEntrada);
                            setLimitG(res.data.admin[0].limiteApostaGeral);
                            setLimitS(res.data.admin[0].limiteApostaSimples);
                            setCotacao(res.data.admin[0].cotacao);
                            setCotacaoMin(res.data.admin[0].cotacaoMin);
                            setCotaMin(res.data.admin[0].cotaMin);
                            setCotaMax(res.data.admin[0].cotaMax);
                        }   
                    } catch (e) {

                    }
                }).catch(error => {
                    console.log(error)
                });

        }

        getAdminAPI();
        getDateAll();


        return () => {
            unmounted = true
        };

    }, []);

    
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

    function deleteCambista(){
        
        api.delete('/api/deletebanca/'+idCambista)
            .then(res => {
                try {
                    if (res.data) {
                        history.push("/gerenteReload");
                    }   
                } catch (e) {
                    history.push("/gerenteReload");
                }
            }).catch(error => {
                history.push("/gerenteReload");
                console.log(error);
                
            });
    
    }

    


    return (
        <div className={classes.root} onClick={close}>
            <CssBaseline />

            <Menu/>

            <main className={classes.content}>

                <div className={classes.appBarSpacer} />

                <Container maxWidth="lg" className={classes.container}>

                    <br />
                   
                        <Typography variant="h6" gutterBottom>
                            Configurar Valores 
                        </Typography>
                        <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={valorDeEntrada}
                                    required
                                    type="number"
                                    id="limiteEntrada"
                                    name="limiteEntrada"
                                    label="Valor Mínimo de Aposta (R$)"
                                    fullWidth
                                    autoComplete="given-name"
                                    onChange={e => setValorDeEntrada(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={valorDeSaida}
                                    required
                                    id="limiteSaida"
                                    type="number"
                                    name="limiteSaida"
                                    label="Valor Máximo de Aposta (R$)"
                                    fullWidth
                                    autoComplete="family-name"
                                    onChange={e => setValorDeSaida(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={cotaMin}
                                    required
                                    type="number"
                                    id="cotaMin"
                                    name="cotaMin"
                                    label="Valor de Cota Mínima (R$)"
                                    fullWidth
                                    autoComplete="given-name"
                                    onChange={e => setCotaMin(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={cotaMax}
                                    required
                                    id="cotaMax"
                                    type="number"
                                    name="cotaMax"
                                    label="Valor de Cota Máxima (R$)"
                                    fullWidth
                                    autoComplete="family-name"
                                    onChange={e => setCotaMax(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={cotacaoMin}
                                    required
                                    id="cotacaoMin"
                                    type="number"
                                    name="cotacaoMin"
                                    label="Valor Mínimo do Multiplicador ou Cotação (R$)"
                                    fullWidth
                                    autoComplete="family-name"
                                    onChange={e => setCotacaoMin(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={cotacao}
                                    required
                                    id="cotacao"
                                    type="number"
                                    name="cotacao"
                                    label="Valor Máximo do Multiplicador ou Cotação (R$)"
                                    fullWidth
                                    autoComplete="family-name"
                                    onChange={e => setCotacao(e.target.value)}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    value={limitG}
                                    required
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
                                    required
                                    id="standard-number"
                                    label="Limite Aposta Simples (R$)"
                                    type="number"
                                    fullWidth
                                    onChange={e => setLimitS(e.target.value)}
                                />
                                <br />
                                <br />

                                
                            </Grid>
                            

                            {/* <Grid item xs={12}>
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
                            </Grid> */}
                            <Button variant="contained" color="primary" className={classes.submit}
                             type="submit" disableElevation >
                                ATUALIZAR
                            </Button>
                            
                        </Grid>
                        </form>
                  
                </Container>

                <div>
                    <ScrollUpButton />
                </div>
            </main>


        </div>


    )

}