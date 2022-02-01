import {makeStyles} from '@material-ui/core/styles';
import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {api} from '../Constantes/index';
import * as yup from 'yup';
import {useFormik} from 'formik';
import Menu from '../Menu/index';

export default function Dashboard() {

    let history = useHistory();
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [nomeBanca, setNomeBanca] = useState("");
    const [telefone, setTelefone] = useState("");
    const [comissaoAoVivo, setComissaoAoVivo] = useState("");
    const [email, setEmail] = useState("");
    const [comissaoPreJogo, setComissaoPreJogo] = useState("");
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


    const dataAux = [
        ["ELETRONICA", "R$ 1000.00", "R$ 1000.00", "1:5;5:10", "1:5;5:10",
            <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}><CheckCircleIcon/></Button>,
            <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}><CheckCircleIcon/></Button>,
            <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}><CheckCircleIcon/></Button>,
            <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}><CheckCircleIcon/></Button>,
            <Button variant="outlined" style={{color: 'blue', borderColor: 'blue'}}><EditIcon/></Button>,],
    ];

    const columns = ["NOME", "LIMITE GERAL", "LIMITE SIMPLES", "COMISSÕES PRÉ-JOGO", "COMISSÕES AO VIVO",
        "APOSTAS", "STATUS", "PRÉ-JOGO", "AO VIVO", "EDITAR"];


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
        limitGeneral: yup
            .number().required()
            .min(1000, 'O valor é de no mínimo R$ 1000.00')
            .max(parseFloat(sessionStorage.getItem('limiteApostaGeral'), 'O valor é de no máximo R$ '
                + parseFloat(sessionStorage.getItem('limiteApostaGeral')))),
        limitSimple: yup
            .number().required()
            .min(1000, 'O valor é de no mínimo R$ 1000.00')
            .max(parseFloat(sessionStorage.getItem('limiteApostaSimples'), 'O valor é de no máximo R$ '
                + parseFloat(sessionStorage.getItem('limiteApostaSimples')))),

    });

    function exit() {
        sessionStorage.removeItem('manage');
        history.push('/login');
    }

    const formik = useFormik({
        initialValues: {
            password1: '',
            password2: '',
            limitGeneral: '',
            limitSimple: '',
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
                "saldoSimples": values.limitSimple,
                "saldoGeral": values.limitGeneral,
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

                                        id="limitGeneral"
                                        name="limitGeneral"
                                        label="Limite Aposta Geral (R$)"
                                        type="number"
                                        value={formik.values.limitGeneral}
                                        onChange={formik.handleChange}
                                        error={formik.touched.limitGeneral && Boolean(formik.errors.limitGeneral)}
                                        helperText={formik.touched.limitGeneral && formik.errors.limitGeneral}
                                        fullWidth

                                    />
                                    <br/>
                                    <br/>
                                    <TextField
                                        id="limitSimple"
                                        name="limitSimple"
                                        label="Limite Aposta Simples (R$)"
                                        type="number"
                                        value={formik.values.limitSimple}
                                        onChange={formik.handleChange}
                                        error={formik.touched.limitSimple && Boolean(formik.errors.limitSimple)}
                                        helperText={formik.touched.limitSimple && formik.errors.limitSimple}
                                        fullWidth
                                    />
                                    <br/>
                                    <br/>

                                    <TextField
                                        value={comissaoPreJogo}
                                        id="filled-multiline-static"
                                        label="Comissão (Pré-Jogo)"
                                        multiline
                                        rows={5}

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