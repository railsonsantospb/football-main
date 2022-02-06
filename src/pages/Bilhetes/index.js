import {makeStyles, useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {Link, useHistory} from 'react-router-dom';
import {useParams} from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';
import {api} from '../Constantes/index';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {pt} from 'date-fns/locale';
import Menu from '../Menu/index';
import {DataGrid, GridToolbar, ptBR} from '@mui/x-data-grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CancelIcon from '@material-ui/icons/Cancel';

let tab;
let date = [];
const themeG = createTheme(
    {
        palette: {
            primary: {main: '#1976d2'},
        },
    },
    ptBR,
);


export default function Dashboard(props) {

    let history = useHistory();
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [ids, setIds] = useState([]);
    const [openNavB, setOpenNavB] = useState("");
    const [bilhetes, setBilhetes] = useState("");
    const [gerenteId, setGerenteId] = useState(0);
    const [bancaId, setBancaId] = useState(0);
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");
    const [dataB, setDataB] = useState([]);
    const [comissao, setComissao] = useState([]);
    const [dataAux, setAux] = useState([]);
    const [count, setCount] = useState([]);
    const [responsive, setResponsive] = useState("horizontal");
    const [dateAfter, setDateAfter] = useState('');
    const container = window !== undefined ? () => window().document.body : undefined;


    // const columns = ["CUPOM", "CLIENTE", "DATA", "SITUAÇÃO", "ENTRADA", "COMISSÕES", "COTAÇÃO", "RETORNO",
    //     "TIPO", "APOSTA"];
	
    function setStatusBilhete(codigoBilhete) {                                                                          api.put('/api/updatebilhete/' + codigoBilhete,  { status: 'Cancelado'})                                               .then(res => {
                try {                                                       if (res.data) {                                             history.go(0);                                      }                                                   } catch (e) {                                                                                                   }
            }).catch(error => {                                     console.log(error)
        });                                                                                                         }



    let s = {'Perdeu': 'red', 'Ganhou': 'green', 'Cancelado': 'gold', 'Aberto': 'blue'}
    const columns = [
        {
            field: 'Cupom', headerName: 'Cupom', width: 120, align: 'center',
            renderCell: (params) => (<Button variant="contained" color="primary"
                                             component={Link} to={'/bilhete/' + params.value}>{params.value}</Button>)
        },

        {
            field: 'Cliente', headerName: 'Cliente', width: 80, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Data', headerName: 'Data', width: 140, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Situacao', headerName: 'Situação', width: 115, align: 'center',
            renderCell: (params) => (<Button variant="contained" style={{background: s[params.value], width: 115}}>
                <p style={{color: 'white'}}>{params.value}</p></Button>)
        },

        {
            field: 'Entrada', headerName: 'Entrada', width: 80, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Comissao', headerName: 'Comissão', width: 90, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Cotacao', headerName: 'Cotação', width: 90, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Retorno', headerName: 'Retorno', width: 90, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Tipo', headerName: 'Tipo', width: 70, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Aposta', headerName: 'Aposta', width: 90, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },
	
	{                                                           field: 'Cancelar', headerName: 'Cancelar', width: 100, align: 'center',                                         renderCell: (params) => (params.value != 0 ? <Button onClick={() =>                                                 setStatusBilhete(params.value)}                                                                          variant="contained" color="secondary">                         <CancelIcon/></Button> : <Button disabled                                                                                                        variant="contained" color="secondary"> <CancelIcon/></Button>)         },

    ];


    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },

        appBarSpacer: theme.mixins.toolbar,
    }));
    const [selectedDate1, handleDateChange1] = useState(new Date());
    const [selectedDate2, handleDateChange2] = useState(new Date());

    const classes = useStyles();

    const handleCloseURL = () => {
        setOpenURL(false);
    };


    const handleCloseLoading = () => {
        setOpenLoading(false);
    };



    function custom_sort(a, b) {
        let d1 = new Date(a.dataDaAposta.split(' ')[0].split('/')[1] + '/' +
            a.dataDaAposta.split(' ')[0].split('/')[0] + '/' +
            a.dataDaAposta.split(' ')[0].split('/')[2] + " " + a.dataDaAposta.split(' ')[1]);

        let d2 = new Date(b.dataDaAposta.split(' ')[0].split('/')[1] + '/' +
            b.dataDaAposta.split(' ')[0].split('/')[0] + '/' +
            b.dataDaAposta.split(' ')[0].split('/')[2] + " " + b.dataDaAposta.split(' ')[1]);

        return d1.getTime() - d2.getTime();
    }




    useEffect(() => {



        let unmounted = false;


        async function getLoginAPI() {

            api.get('/api/getbanca/' + sessionStorage.getItem('login'))
                .then(res => {
                    try {
                        if (res.data) {
                            setSaldoSimples(res.data.bancas.saldoSimples);
                            setSaldoGeral(res.data.bancas.saldoGeral);
                            setNomeBanca(res.data.bancas.nome);
                            setGerenteId(res.data.bancas.gerente);
                            setComissao(res.data.bancas.comissaoPreJogo.split(';'));
                            setBancaId(res.data.bancas.id);
                        }
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error)
            });

        }

        async function getBilhetesAPI() {

            api.get('/api/getbilhetesb/' + sessionStorage.getItem('login'))
                .then(res => {
                    let l = [];
                    let ax = [];

                    try {
                        let bh = res.data.bilhetes.slice();
                        bh.sort(custom_sort);
                        if (res.data) {
                            setBilhetes(res.data);
                            bh.map((b) => {
                                let d1 = new Date(b.dataDaAposta.split(' ')[0].split('/')[1] + '/' +
                                    b.dataDaAposta.split(' ')[0].split('/')[0] + '/' +
                                    b.dataDaAposta.split(' ')[0].split('/')[2] + " " + b.dataDaAposta.split(' ')[1]);

                                let d2 = new Date(sessionStorage.getItem('date').split(' ')[0].split('/')[1] + '/' +
                                    sessionStorage.getItem('date').split(' ')[0].split('/')[0] + '/' +
                                    sessionStorage.getItem('date').split(' ')[0].split('/')[2] + " " +
                                    sessionStorage.getItem('date').split(' ')[1]);

                                var difference = d2.getTime() - d1.getTime();

				                let minutes = Math.floor((d2 - d1) / 1000 / 60);



                                    l.push({
                                        id: b.id,
                                        Banca: b.nomeBanca,
                                        Cupom: b.codigo,
                                        Cliente: b.nomeCliente,
                                        Data: b.dataDaAposta,
                                        Situacao: b.status,
                                        Entrada: b.valorDeEntrada.toFixed(2),
                                        Comissao: b.comissao.toFixed(2),
                                        Cotacao: b.cotacao.toFixed(2),
                                        Retorno: b.valorDeSaida.toFixed(2),
                                        Tipo: b.tipoSimplesouMultiplo,
                                        Aposta: b.tipoDeJogo,
                                        Cancelar: minutes <= Number(sessionStorage.getItem('configTime'))
                                        && b.tipoDeJogo != "Ao Vivo" ? b.codigo : 0,
                                    });

                                ax.push({
                                    id: b.id, Cupom: b.codigo,
                                    Banca: b.nomeBanca,
                                    Cliente: b.nomeCliente,
                                    Data: b.dataDaAposta,
                                    Situacao: b.status,
                                    Entrada: b.valorDeEntrada.toFixed(2),
                                    Comissao: b.comissao.toFixed(2),
                                    Cotacao: b.cotacao.toFixed(2),
                                    Retorno: b.valorDeSaida.toFixed(2),
                                    Tipo: b.tipoSimplesouMultiplo,
                                    Aposta: b.tipoDeJogo,
                                    Cancelar: minutes <= Number(sessionStorage.getItem('configTime'))
                                    && b.tipoDeJogo != "Ao Vivo" ? b.codigo : 0,
                                });

                            });


                        }
                        l.reverse();
                        setAux(l);
                        setCount(ax);


                    } catch (e) {
                        console.log(e);
                    }
                }).catch(error => {
                console.log(error);
            });

        }

        async function getDateAfter() {
            api.get('/api/getdateafter').then(res => {

                try {

                    setDateAfter(res.data.date);

                } catch (e) {
                    console.log(e);
                }
            }).catch(error => {
                console.log(error)
            });
        }

        getDateAfter();


        getLoginAPI();
        getBilhetesAPI();

        return () => {
            unmounted = true;
        };


    }, []);


    return (
        <div className={classes.root}>
            <CssBaseline/>

            <Menu/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={2}>

                                    <Grid xs={12} md={12} sm={12} item>
                                        <Paper className={classes.paperX}>
                                            <Grid container spacing={2} key={127}>

                                                <Grid item sm container align="center">
                                                    <Grid item container direction="column" spacing={2}>
                                                        <Grid item>


                                                            <Typography variant="h5">BILHETES</Typography>


                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>

                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>
                        {/* Recent Deposits */}

                        {/* Recent Orders */}

                    </Grid>

                    <Dialog style={{wordWrap: 'break-word'}}
                            open={openURL} onClose={handleCloseURL} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{color: 'red'}}>AVISO!</DialogTitle>
                        <DialogContent>
                            <div className={classes.paper} style={{fontSize: '18px'}}>

                                {message.split('<br/>')}

                            </div>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseURL} color="primary">
                                Fechar
                            </Button>

                        </DialogActions>
                    </Dialog>

                    <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={openLoading} onClose={handleCloseLoading} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{color: 'red'}}></DialogTitle>
                        <DialogContent>
                            <div className={classes.paper}>
                                <CircularProgress color="secondary"/>
                            </div>

                        </DialogContent>
                        <DialogActions>

                        </DialogActions>
                    </Dialog>
                </Container>
                <br/>
                <ThemeProvider theme={themeG}>
                    <div style={{height: 900, width: '100%',}}>
                        <DataGrid
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            density="compact"
                            rows={dataAux}
                            columns={columns}
                            pageSize={20}
                            rowsPerPageOptions={[20]}
                            // checkboxSelection
                        />
                    </div>
                </ThemeProvider>

            </main>

        </div>

    );

}
