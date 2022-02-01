import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Conan from './football.png';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Redirect, useHistory} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {api} from '../Constantes/index';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                SONHOBETS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        opacity: 0.2,
        backgroundImage: `url(${Conan})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundImage: `url(${Conan})`,
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationSchema = yup.object({
    password1: yup
        .string('Entre com seu usuário')
        .required('A nova senha é obrigatória'),
    password2: yup
        .string('Entre com sua senha')
        .required('A nova senha é obrigatória')
        .oneOf([yup.ref('password1'), null], 'As senhas estão diferentes'),

});


export default function SignInSide() {
    const classes = useStyles();
    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            password1: '',
            password2: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            api.put('/api/updategerentesenha/' + sessionStorage.getItem('manage'),
                {"senha": values.password1})
                .then(res => {

                    try {
                        if (res.data) {
                            console.log(res.data);


                            history.push("/gerente")
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }).catch(error => {
                console.log(error)
            });
        },
    });
    const [form, setForm] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem('manage') == null || sessionStorage.getItem('manage') == "") {
            history.push('/login');
        }

        async function loginAll() {

        }

        loginAll();


    }, [])

    try {
        if (form.user && form.password) {
            localStorage.setItem('manage', form.user);
            return <Redirect to="/gerente"/>
        }
    } catch (e) {

    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Button color={'primary'} href={'/#/gerente'}><ArrowBackIcon/> INÍCIO</Button>
                <div className={classes.paper}>
                    <img src={Conan} width="150"/>
                    <Typography variant="h4">
                        <b style={{textShadow: '5px 2px 2px black', color: '#428bca'}}>NOVA SENHA</b>
                    </Typography>
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="password1"
                            name="password1"
                            label="Nova Senha (Gerente)"
                            type="password"
                            value={formik.values.user}
                            onChange={formik.handleChange}
                            error={formik.touched.password1 && Boolean(formik.errors.password1)}
                            helperText={formik.touched.password1 && formik.errors.password1}
                        />
                        <TextField
                            fullWidth
                            id="password2"
                            name="password2"
                            label="Digite Novamente (Gerente)"
                            type="password"
                            value={formik.values.password2}
                            onChange={formik.handleChange}
                            error={formik.touched.password2 && Boolean(formik.errors.password2)}
                            helperText={formik.touched.password2 && formik.errors.password2}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Atualizar
                        </Button>
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

