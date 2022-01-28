import {withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {
    Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useHistory, Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { api } from '../Constantes/index';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { pt } from 'date-fns/locale';
import Menu from '../Menu/index';

let date = [];

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#3f51b5",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default function Dashboard(props) {

    let history = useHistory();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [openNavB, setOpenNavB] = useState("");
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [dateAfter, setDateAfter] = useState('');
    const [nomeBanca, setNomeBanca] = useState("");
    const [count, setCount] = useState([]);
    const [dataAux, setDataAux] = useState([]);
    // let dataAux = [];

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

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

    
    const onClickHandler = () => {
        let init = 0;
        
        let entradas = 0;
        let abertos = 0;
        let ganhos = 0;
        let perdeu = 0;
        let comissao = 0;
        let auxDate1 = selectedDate1.getFullYear() + "-" + (selectedDate1.getMonth() + 1) + "-" + selectedDate1.getDate();
        let auxDate2 = selectedDate2.getFullYear() + "-" + (selectedDate2.getMonth() + 1) + "-" + selectedDate2.getDate();
        
        for (let datas of dataAux) {
            
            let d = datas[2].split(' ')[0].split('/');
            d.reverse();
            
            let dateReverse = new Date(d.join('-'));

            console.log(dateReverse);
            
            let st = datas[3].replaceAll('{', '').replaceAll('}', '');
            let result = ((st.split(',').length == datas[10]));

            let valor = (result == true && st.indexOf('Aberto') != -1 ? 'Aberto' : 
            st.indexOf('Perdeu') != -1 ? 'Perdeu' : 
            st.indexOf('Perdeu') == -1 && st.indexOf('Aberto') == -1 && st.indexOf('Cancelado') == -1 ? 'Ganhou' :
            st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') == -1 && st.indexOf('Aberto') == -1 ? 'Cancelado' : 
            st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') != -1 || st.indexOf('Cacenlado') != -1 &&
            st.indexOf('Aberto') == -1 ? 'Ganhou' : 'Aberto');

            if (dateReverse >= new Date(auxDate1) && dateReverse <= new Date(auxDate2)) {
                console.log(valor);
                if(valor != 'Cancelado'){
                    entradas += parseFloat(datas[4]);
                    comissao += parseFloat(datas[5]);
                }
                console.log(entradas);
                if (valor == 'Aberto') {
                    abertos += parseFloat(datas[4]);
                } else if (valor == 'Ganhou') {
                    ganhos += parseFloat(datas[7]);
                } else if (valor == 'Perdeu') {
                    perdeu += parseFloat(datas[4]);
                }
                
                init = 1;
                document.getElementById('entradas').innerText = 'R$ '+entradas.toFixed(2);
                document.getElementById('abertos').innerText = 'R$ '+abertos.toFixed(2);
                document.getElementById('ganhos').innerText = 'R$ '+ganhos.toFixed(2);
                document.getElementById('comissao').innerText = 'R$ '+comissao.toFixed(2);
                if(entradas > ganhos){
                    document.getElementById('total').innerHTML = '<span style="color: green">R$ '+
                    (entradas - ganhos - comissao).toFixed(2)+'</span>';
                } else {
                    document.getElementById('total').innerHTML = '<span style="color: red">R$ '+
                    (entradas - ganhos - comissao).toFixed(2)+'</span>';
                }
                
            }
        }

        if(dataAux.length != count.length){
            setDataAux(count);
        }
    
    

        if (init == 0) {
            
           
        } else {
            
        }
    };

    function close(e) {
        try {
            if (e.clientX > 250) {
                document.getElementById("drawer").style.display = "none";
            }
        } catch (e) {
            //console.log(e);
        }
    }

    function exit() {
        sessionStorage.removeItem('login');
        history.push('/');
    }


    useEffect(() => {

        if ( sessionStorage.getItem('login') == null ||  sessionStorage.getItem('login') == "" ||
            (new Date().getMinutes() - sessionStorage.getItem('minutos')) >= 10) {
            history.push('/')
        } else {
            sessionStorage.setItem('minutos', new Date().getMinutes());
        }

        let unmounted = false;

        async function getDateAll() {
            api.get("/api/getdate")
                .then((res) => {
                    try {
                        let d1 = Date.parse(res.data.date);
                        d1 = new Date(d1);
                        d1 = d1.setDate(d1.getDate());

                        let d2 = Date.parse(res.data.date);
                        d2 = new Date(d2);
                        d2 = d2.setDate(d2.getDate() + 1);

                        d1 = new Date(d1);
                        d2 = new Date(d2);

                        date = [
                            d1.getFullYear() +
                            "-" +
                            (Number(d1.getMonth()) + 1 < 10
                                ? "0" + (Number(d1.getMonth()) + 1)
                                : Number(d1.getMonth()) + 1) +
                            "-" +
                            ((Number(d1.getDate())) < 10 ? "0" + d1.getDate() : d1.getDate()),
                            d2.getFullYear() +
                            "-" +
                            (Number(d2.getMonth()) + 1 < 10
                                ? "0" + (Number(d2.getMonth()) + 1)
                                : Number(d2.getMonth()) + 1) +
                            "-" +
                            ((Number(d2.getDate())) < 10 ? "0" + d2.getDate() : d2.getDate()),
                        ];

                        localStorage.setItem("date", date);

                    } catch (e) {
                        console.log(e);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getDateAll();


        async function getLoginAPI() {

            api.get('/api/getbanca/'+sessionStorage.getItem('login'))
                .then(res => {
                    try {
                        if (res.data) {
                            setSaldoSimples(res.data.bancas.saldoSimples);
                            setSaldoGeral(res.data.bancas.saldoGeral);
                            setNomeBanca(res.data.bancas.nome);
                        }
                    } catch (e) {

                    }
                }).catch(error => {
                    console.log(error)
                });

        }

        async function getBilhetesAPI() {

            api.get('/api/getbilhetes/'+sessionStorage.getItem('login'))
                .then(res => {
                    
                    try {
                        if (res.data) {
                            
                            res.data.bilhetes.map((b) =>{
                                dataAux.push([b.codigo, b.nomeCliente, b.dataDaAposta, b.status, b.valorDeEntrada, b.comissao, b.cotacao, b.valorDeSaida,
                                b.tipoSimplesouMultiplo, b.tipoDeJogo, b.quantidadeJogos]);

                                
                            
                            });
                            setDataAux(dataAux);
                            setCount(dataAux);
                            
                        }
                    } catch (e) {

                    }
                }).catch(error => {
                    console.log(error)
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
        getLoginAPI();
        setDataAux([])

        return () => {
            unmounted = true;
        };


    }, []);

    let entradas = 0;
    let abertos = 0;
    let ganhos = 0;
    let perdeu = 0;
    let comissao = 0;

    for (let datas of dataAux) {
        let d1 = new Date(datas[2].split(' ')[0].split('/')[1] + '/' +
        datas[2].split(' ')[0].split('/')[0] + '/' +
        datas[2].split(' ')[0].split('/')[2]);

        let d2 = new Date(sessionStorage.getItem('date').split('/')[1] + '/' +
        sessionStorage.getItem('date').split('/')[0] + '/' + 
        sessionStorage.getItem('date').split('/')[2]);

        var difference= d2.getTime()-d1.getTime();
        let days = difference/(1000 * 3600 * 24);

        if(days <= 6 && d2.getDay() >= d1.getDay()){
            let st = datas[3].replaceAll('{', '').replaceAll('}', '');
            let result = ((st.split(',').length == datas[10]));

            let valor = (result == true && st.indexOf('Aberto') != -1 ? 'Aberto' : 
            st.indexOf('Perdeu') != -1 ? 'Perdeu' : 
            st.indexOf('Perdeu') == -1 && st.indexOf('Aberto') == -1 && st.indexOf('Cancelado') == -1 ? 'Ganhou' :
            st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') == -1 && st.indexOf('Aberto') == -1 ? 'Cancelado' : 
            st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') != -1 || st.indexOf('Cacenlado') != -1 &&
            st.indexOf('Aberto') == -1 ? 'Ganhou' : 'Aberto');

            if(valor != 'Cancelado'){
                entradas += parseFloat(datas[4]);
                comissao += parseFloat(datas[5]);
            }
            
            if (valor == 'Aberto') {
                abertos += parseFloat(datas[4]);
            } else if (valor == 'Ganhou') {
                ganhos += parseFloat(datas[7]);
            } else if (valor == 'Perdeu') {
                perdeu += parseFloat(datas[4]);
            }
        }
        
        
   
        
    }
                                


    return (
        <div className={classes.root}>
            <CssBaseline />

            <Menu/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
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
                                                        <Grid item >



                                                            <Grid container justify="space-around">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt}>
                                                                    <KeyboardDatePicker
                                                                        label="Data Início"
                                                                        value={selectedDate1}
                                                                        onChange={date1 => handleDateChange1(date1)}
                                                                        format="dd/MM/yyyy"
                                                                    />

                                                                    <KeyboardDatePicker
                                                                        label="Data Final"
                                                                        placeholder="2018/10/10"
                                                                        value={selectedDate2}
                                                                        onChange={date2 => handleDateChange2(date2)}
                                                                        format="dd/MM/yyyy"
                                                                    />
                                                                </MuiPickersUtilsProvider>


                                                            </Grid>

                                                            <br/>
                                                            <Button onClick={onClickHandler} variant="contained" color="primary">
                                                                BUSCAR
                                                            </Button>
                                                            <br /><br />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>

                                        <TableContainer component={Paper}>

                                            <Table stickyHeader aria-label="sticky table" >
                                                <TableHead >
                                                    <TableRow>
                                                        <StyledTableCell align={"center"}><b>BANCA</b></StyledTableCell>
                                                        <StyledTableCell align={"center"}><b>ENTRADAS</b></StyledTableCell>
                                                        <StyledTableCell align={"center"}><b>ABERTO</b></StyledTableCell>
                                                        <StyledTableCell align={"center"}><b>SAÍDAS</b></StyledTableCell>
                                                        <StyledTableCell align={"center"}><b>COMISSÕES</b></StyledTableCell>
                                                        <StyledTableCell align={"center"}><b>TOTAL</b></StyledTableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>

                                                    <StyledTableRow >
                                                        <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                            <Typography variant="h5">
                                                                {nomeBanca}
                                                            </Typography>
                                                        </StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                            <Typography variant="h5" id="entradas">
                                                                R$ {entradas.toFixed(2)}
                                                            </Typography>
                                                        </StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                            <Typography variant="h5" id="abertos">
                                                                R$ {abertos.toFixed(2)}
                                                            </Typography>
                                                        </StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                            <Typography variant="h5" id="ganhos">
                                                                R$ {ganhos.toFixed(2)}
                                                            </Typography>
                                                        </StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                            <Typography variant="h5" id="comissao">
                                                                R$ {comissao.toFixed(2)}
                                                            </Typography>
                                                        </StyledTableCell>
                                                        <StyledTableCell align={"center"} style={{ width: '10px' }}>
                                                            {ganhos > entradas ? <Typography variant="h5">
                                                                <b style={{ color: 'red' }} id="total">R$ -{Math.abs((entradas - ganhos - comissao)).toFixed(2)}</b>
                                                            </Typography> : <Typography variant="h5">
                                                                <b style={{ color: 'green' }} id="total">R$ {Math.abs((entradas - ganhos - comissao)).toFixed(2)}</b>
                                                            </Typography>}

                                                        </StyledTableCell>
                                                    </StyledTableRow>

                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Recent Deposits */}

                        {/* Recent Orders */}

                    </Grid>
                    <Dialog style={{ wordWrap: 'break-word' }}
                        open={openURL} onClose={handleCloseURL} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{ color: 'red' }}>AVISO!</DialogTitle>
                        <DialogContent >
                            <div className={classes.paper} style={{ fontSize: '18px' }}>

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
                        <DialogTitle id="form-dialog-title" style={{ color: 'red' }}></DialogTitle>
                        <DialogContent>
                            <div className={classes.paper}>
                                <CircularProgress color="secondary" />
                            </div>

                        </DialogContent>
                        <DialogActions>

                        </DialogActions>
                    </Dialog>
                </Container>

            </main>

        </div>

    );

}