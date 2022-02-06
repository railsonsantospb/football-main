import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {Link, useHistory} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api} from '../Constantes/index';
import CancelIcon from '@material-ui/icons/Cancel';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {pt} from 'date-fns/locale';
import {DataGrid, GridToolbar, ptBR} from '@mui/x-data-grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Menu from '../Menu/index';

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
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [bilhetes, setBilhetes] = useState("");
    const [dataAux, setAux] = useState([]);
    const [count, setCount] = useState([]);
    const [dateAfter, setDateAfter] = useState('');


    let s = {'Perdeu': 'red', 'Ganhou': 'green', 'Cancelado': 'gold', 'Aberto': 'blue'}
    const columns = [
        {
            field: 'Banca', headerName: 'Banca', width: 150, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Cupom', headerName: 'Cupom', width: 120, align: 'center',
            renderCell: (params) => (<Button variant="contained" color="primary"
                                             component={Link}
                                             to={'/bilheteA/' + params.value}>{params.value}</Button>)
        },

        {
            field: 'Cliente', headerName: 'Cliente', width: 100, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Data', headerName: 'Data', width: 150, align: 'center',
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
            field: 'Retorno', headerName: 'Retorno', width: 80, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Tipo', headerName: 'Tipo', width: 60, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Aposta', headerName: 'Aposta', width: 80, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>)
        },

        {
            field: 'Cancelar', headerName: 'Cancelar', width: 100, align: 'center',
            renderCell: (params) => (<Button onClick={() =>
                setStatusBilhete(params.value)}
                                                                 variant="contained" color="secondary">
                <CancelIcon/></Button>)
        },

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


    function setStatusBilhete(codigoBilhete) {

        api.put('/api/updatebilhete/' + codigoBilhete, {status: 'Cancelado'})
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


        async function getBilhetesAPI() {

            api.get('/api/getbilhetesg')
                .then(res => {
                    let l = [];
                    let ax = [];
                    try {
                        console.log(res.data);
                        let bh = res.data.bilhetes.slice();
                        bh.sort(custom_sort);
                        if (res.data) {
                            setBilhetes(res.data);
                            bh.map((b) => {



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
                                        Aposta: b.tipoDeJogo, Cancelar: b.codigo,
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
                                    Aposta: b.tipoDeJogo, Cancelar: b.codigo,
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

        getBilhetesAPI();

    }, []);

    function close(e) {

        try {
            if (e.clientX > 250) {
                document.getElementById('drawer').style.display = 'none';
            }
        } catch (e) {
            //console.log(e);
        }

    }

    return (
        <div className={classes.root} onClick={close}>
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