import React from 'react';
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
import {useHistory} from "react-router-dom";
import {api} from '../Constantes/index';
import CryptoJS from "crypto-js";

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
    user: yup
        .string('Entre com seu usuário')
        .required('O usuário é obrigatório'),
    password: yup
        .string('Entre com sua senha')
        .required('A senha é obrigatória'),
});


export default function SignInSideManage() {
    const classes = useStyles();
    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            user: sessionStorage.getItem("userAdmin") != null ? sessionStorage.getItem("userAdmin") : '',
            password: sessionStorage.getItem("senhaAdmin") != null ?
                JSON.parse(decryptData2(sessionStorage.getItem("senhaAdmin"))) + "" : '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {


            api.post('/api/getloginadmin', {"login": values.user, "senha": values.password})
                .then(res => {

                    try {
                        if (res.data) {
                            console.log(res.data);
                            sessionStorage.setItem('admin', res.data.admin.login);
                            sessionStorage.setItem("senhaAdmin", encryptData2(values.password));
                            sessionStorage.setItem("userAdmin", values.user);
                            history.push("/admin");

                        }
                    } catch (e) {
                        console.log(e);
                    }
                }).catch(error => {
                alert('Usuário ou senha inválido!');
                console.log(error)
            });
        },
    });

    function encryptData2(data) {
        //var Key = C.enc.Utf8.parse("6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0=");
        var Key = CryptoJS.enc.Utf8.parse("6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0=");  // 1. Replace C by CryptoJS
        var IV = CryptoJS.enc.Utf8.parse("0123456789ABCDEF");
        var encryptedText = CryptoJS.AES.encrypt(JSON.stringify(data), Key, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        //return encryptedText.toString(CryptoJS.format.Hex);
        return encryptedText.toString(CryptoJS.format.Base64);                              // 2. Use Base64 instead of Hex
    }


    function decryptData2(encryptedData, key) {
        var C = CryptoJS;
        //encryptedData = C.enc.Base64.parse(encryptedData);                                // 3. Remove line
        var Key = C.enc.Utf8.parse("6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0=");
        var IV = C.enc.Utf8.parse("0123456789ABCDEF");
        //var decryptedText = C.AES.encrypt(encryptedData, Key, {
        var decryptedText = C.AES.decrypt(encryptedData, Key, {                             // 4. Use decrypt instead of encrypt
            iv: IV,
            mode: C.mode.CBC,
            padding: C.pad.Pkcs7
        });
        //return encryptedData.toString(CryptoJS.enc.Utf8);
        return decryptedText.toString(CryptoJS.enc.Utf8);                                   // 5. Use decryptedText instead of encryptedData
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src={Conan} width="150"/>

                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="user"
                            name="user"
                            label="Administrador"
                            value={formik.values.user}
                            onChange={formik.handleChange}
                            error={formik.touched.user && Boolean(formik.errors.user)}
                            helperText={formik.touched.user && formik.errors.user}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Senha"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Entrar
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