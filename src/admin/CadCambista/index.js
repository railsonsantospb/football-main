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
import Autocomplete from '@material-ui/lab/Autocomplete';
//let aux = [];

export default function Dashboard() {

    let history = useHistory();
    const [date, setDate] = useState([]);
    const [day, setDay] = useState([]);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [nomeBanca, setNomeBanca] = useState("");
    const [bancas, setBancas] = useState("");
    const [limitG, setLimitG] = useState("");
    const [limitS, setLimitS] = useState("");
    const [telefone, setTelefone] = useState("");
    const [comissaoAoVivo, setComissaoAoVivo] = useState("");
    const [email, setEmail] = useState("");
    const [comissaoPreJogo, setComissaoPreJogo] = useState("");
    const [apostasAoVivo, setApostasAoVivo] = useState(false);
    const [apostasPreJogo, setApostasPreJogo] = useState(false);
    const [imprimir, setImprimir] = useState(false);
    const [apostas, setApostas] = useState(false);
    const [status, setStatus] = useState(false);
    const [manage, setManage] = useState({});
    const [ba, setB] = useState(-1);

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
                "habilitarImpressao": imprimir,
                "comissaoPreJogo": comissaoPreJogo,
                "comissaoAoVivo": comissaoAoVivo,
                "saldoSimples": limitS,
                "saldoGeral": limitG,
                "ativarApostasAoVivos": apostasAoVivo,
                "ativarApostasPreJogo": apostasPreJogo,
                "ativarApostas": apostas,
                "status": status,
                "gerente_id": ba,

            })
                .then(res => {
                    try {
                        if (res.data) {
                            if (res.data.bancas == "") {
                                alert('Nome da banca já existe!');
                            } else {
                                history.push("/cadastrarbancadmin");
                            }

                        }
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });
        },
    });

    function verifyBancaHandler(e) {

        let banca =
            typeof e.target.value === "string" ? e.target.value : e.target.innerText &&
            e.target.innerText.length > 0 ? e.target.innerText : '';

        bancas.map((b) => {
            if (b.nome == banca) {
                setB(manage[b.nome]);
            }
        })


    }

    function handlerChangeApostasAovivo() {
        if (apostasAoVivo) {
            setApostasAoVivo(false);
        } else {
            setApostasAoVivo(true);
        }
    }

    function handlerChangeApostasPreJogo() {
        if (apostasPreJogo) {
            setApostasPreJogo(false);
        } else {
            setApostasPreJogo(true);
        }
    }

    function handlerChangeImprimir() {
        if (imprimir) {
            setImprimir(false);
        } else {
            setImprimir(true);
        }
    }

    function handlerChangeAposta() {
        if (apostas) {
            setApostas(false);
        } else {
            setApostas(true);
        }
    }

    function handlerChangeStatus() {
        if (status) {
            setStatus(false);
        } else {
            setStatus(true);
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

        async function getGerenteAPI() {
            let gerentes = {};
            let ba = [];
            api.get('/api/getgerencia')
                .then(res => {
                    try {
                        if (res.data) {

                            res.data.gerencias.map((b) => {
                                gerentes[b.nome] = b.id;
                                ba.push({'nome': b.nome});
                                console.log(ba);
                            });


                            setBancas(ba);
                            setManage(gerentes);
                        }

                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });

        }

        getGerenteAPI();


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
                                    <Autocomplete

                                        id={"resetField2"}
                                        freeSolo
                                        fullWidth
                                        onChange={verifyBancaHandler}
                                        options={bancas}
                                        getOptionLabel={(option) => option.nome}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}

                                                label="Gerente"
                                                variant="outlined"/>}
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
                                    <br/>
                                    <br/>
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
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes"
                                                           checked={apostasAoVivo}
                                                           onClick={handlerChangeApostasAovivo}/>}
                                        label="Habilitar Apostas Ao Vivo"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes"
                                                           checked={apostasPreJogo}
                                                           onClick={handlerChangeApostasPreJogo}/>}
                                        label="Habilitar Apostas Pre-Jogo"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes"
                                                           checked={imprimir}
                                                           onClick={handlerChangeImprimir}/>}
                                        label="Habilitar Imprimir Bilhete"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes"
                                                           checked={apostas}
                                                           onClick={handlerChangeAposta}/>}
                                        label="Apostas Ativas"
                                    />

                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress" checked={status}
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