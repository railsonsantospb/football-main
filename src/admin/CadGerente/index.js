import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {api} from '../Constantes/index';
import * as yup from 'yup';
import {useFormik} from 'formik';
import Menu from '../Menu/index';

//let aux = [];

export default function Dashboard() {

    let history = useHistory();
    const [date, setDate] = useState([]);
    const [day, setDay] = useState([]);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [ativaApostasCambistas, setAtivaApostasCambistas] = useState(false);
    const [nomeGerente, setNomeGerente] = useState("");
    const [limitG, setLimitG] = useState("");
    const [limitS, setLimitS] = useState("");
    const [telefone, setTelefone] = useState("");
    const [criarCambista, setCriarCambista] = useState(false);
    const [email, setEmail] = useState("");
    const [reiprimirApostas, setReiprimirApostas] = useState(false);
    const [alterarStatusCambista, setAlterarStatusCambista] = useState(false);
    const [alterarLimitesApostas, setAlterarLimitesApostas] = useState(false);
    const [cancelarApostaCambista, setCancelarApostasCambistas] = useState(false);
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


    const classes = useStyles();


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
            api.post('/api/addgerencia', {
                "nome": nomeGerente,
                "login": nomeGerente,
                "senha": values.password1,
                "telefone": telefone,
                "email": email,
                "criarCambista": criarCambista,
                "cancelarApostaCambista": cancelarApostaCambista,
                "reiprimirApostas": reiprimirApostas,
                "limiteApostaSimples": limitS,
                "limiteApostaGeral": limitG,
                "alterarStatusCambista": alterarStatusCambista,
                "ativaApostasCambistas": ativaApostasCambistas,
                "alterarLimitesApostas": alterarLimitesApostas,
                "status": status,

            })
                .then(res => {
                    try {
                        if (res.data.gerencias == "") {
                            alert('Nome do Gerente já existe');
                        } else {
                            history.push("/admin");
                        }
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });
        },
    });

    function handlerChangeCriarCambista() {

        if (criarCambista) {
            setCriarCambista(false);
        } else {
            setCriarCambista(true);
        }
    }

    function handlerChangeCancelarApostasCambistas() {
        if (cancelarApostaCambista) {
            setCancelarApostasCambistas(false);
        } else {
            setCancelarApostasCambistas(true);
        }
    }

    function handlerChangeReiprimir() {
        if (reiprimirApostas) {
            setReiprimirApostas(false);
        } else {
            setReiprimirApostas(true);
        }
    }

    function handlerChangeAlterarStatusCambista() {
        if (alterarStatusCambista) {
            setAlterarStatusCambista(false);
        } else {
            setAlterarStatusCambista(true);
        }
    }

    function handlerChangeStatus() {
        if (status) {
            setStatus(false);
        } else {
            setStatus(true);
        }
    }

    function handlerChangeAtivarApostaCambista() {
        if (ativaApostasCambistas) {
            setAtivaApostasCambistas(false);
        } else {
            setAtivaApostasCambistas(true);
        }
    }

    function handlerChangeAlterarLimitesApostas() {
        if (alterarLimitesApostas) {
            setAlterarLimitesApostas(false);
        } else {
            setAlterarLimitesApostas(true);
        }
    }


    useEffect(() => {

        if (sessionStorage.getItem('admin') == null || sessionStorage.getItem('admin') == "") {
            history.push('/adm')
        }

        let unmounted = false;


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


        return () => {
            unmounted = true
        };

    }, []);


    return (
        <div className={classes.root} onClick={close}>
            <CssBaseline/>

            <Menu/>

            <main className={classes.content}>

                <div className={classes.appBarSpacer}/>

                <Container maxWidth="lg" className={classes.container}>

                    <br/>
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Cadastrar Gerente
                        </Typography>
                        <form className={classes.form} onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={nomeGerente}
                                        required
                                        id="name"
                                        name="name"
                                        label="Nome"
                                        fullWidth
                                        autoComplete="given-name"
                                        onChange={e => setNomeGerente(e.target.value)}
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
                                    <br/>
                                    <br/>
                                    <TextField
                                        value={limitS}
                                        id="standard-number"
                                        label="Limite Aposta Simples (R$)"
                                        type="number"
                                        fullWidth
                                        onChange={e => setLimitS(e.target.value)}
                                    />
                                    <br/>
                                    <br/>

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
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes"
                                                           checked={criarCambista}
                                                           onClick={handlerChangeCriarCambista}/>}
                                        label="Habilitar Criar Cambista"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes"
                                                           checked={reiprimirApostas}
                                                           onClick={handlerChangeReiprimir}/>}
                                        label="Habilitar Reiprimir Bilhete"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes"
                                                           checked={alterarStatusCambista}
                                                           onClick={handlerChangeAlterarStatusCambista}/>}
                                        label="Habilitar Status Cambista"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes"
                                                           checked={alterarLimitesApostas}
                                                           onClick={handlerChangeAlterarLimitesApostas}/>}
                                        label="Alterar Limites"
                                    />

                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes"
                                                           checked={cancelarApostaCambista}
                                                           onClick={handlerChangeCancelarApostasCambistas}/>}
                                        label="Cancelar Apostas"
                                    />

                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes"
                                                           checked={ativaApostasCambistas}
                                                           onClick={handlerChangeAtivarApostaCambista}/>}
                                        label="Habilitar Apostas Cambista"
                                    />

                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress"
                                                           checked={status}
                                                           onClick={handlerChangeStatus}/>}
                                        label="Status"
                                    />
                                </Grid>
                                <Button variant="contained" color="primary" className={classes.submit}
                                        type="submit" disableElevation>
                                    CADASTRAR
                                </Button>


                            </Grid>
                        </form>
                    </React.Fragment>
                </Container>

                <div>
                    <ScrollUpButton/>
                </div>
            </main>


        </div>


    )

}