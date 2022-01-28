import {withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import {
    Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { renderMatches, useParams } from "react-router";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import InboxIcon from '@material-ui/icons/Inbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import Taca from "../Home/taca.jpg";
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { images, auxCountry, auxItens, api } from '../Constantes/index';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import PrintIcon from '@material-ui/icons/Print';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { pt } from 'date-fns/locale';
import Hidden from "@material-ui/core/Hidden";
import football from "../Home/football";
import Menu from '../Menu/index';
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';


let tab;
let date = [];
const themeG = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    ptBR,
  );


export default function Dashboard(props) {

    let history = useHistory();
    let { campId } = useParams();
    const theme = useTheme();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    var betsAll = "";
    const [open, setOpen] = useState(false);
    const [live, setLive] = useState([]);
    const [message, setMessage] = useState("");
    const [dateHour, setDateHour] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [dic, setDic] = useState({});
    const [competition, setCompetition] = useState([]);
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
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const container = window !== undefined ? () => window().document.body : undefined;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // const columns = ["CUPOM", "CLIENTE", "DATA", "SITUAÇÃO", "ENTRADA", "COMISSÕES", "COTAÇÃO", "RETORNO",
    //     "TIPO", "APOSTA"];
        let s = {'Perdeu' : 'red', 'Ganhou': 'green', 'Cancelado': 'gold', 'Aberto': 'blue'}
        const columns = [
            { field: 'Cupom', headerName: 'Cupom', width: 120, align: 'center',
            renderCell: (params) => (<Button variant="contained" color="primary" 
            component={Link} to={'/bilhete/'+params.value}>{params.value}</Button>) },

            { field: 'Cliente', headerName: 'Cliente', width: 80, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>) },

            { field: 'Data', headerName: 'Data', width: 140, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>) },

            { field: 'Situacao', headerName: 'Situação', width: 115, align: 'center',
            renderCell: (params) => (<Button variant="contained" style={{background: s[params.value]}}>
                <p style={{color: 'white'}}>{params.value}</p></Button>) },
                
            { field: 'Entrada', headerName: 'Entrada', width: 80, align: 'center', 
            renderCell: (params) => (<b>{params.value}</b>) },

            { field: 'Comissao', headerName: 'Comissão', width: 90, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>) },

            { field: 'Cotacao', headerName: 'Cotação', width: 90, align: 'center',
            renderCell: (params) => (<b>{params.value}</b>) },

            { field: 'Retorno', headerName: 'Retorno', width: 80, align: 'center', 
            renderCell: (params) => (<b>{params.value}</b>) },

            { field: 'Tipo', headerName: 'Tipo', width: 60, align: 'center', 
            renderCell: (params) => (<b>{params.value}</b>) },

            { field: 'Aposta', headerName: 'Aposta', width: 80, align: 'center', 
            renderCell: (params) => (<b>{params.value}</b>) },

            { field: 'Cancelar', headerName: 'Cancelar', width: 100, align: 'center',
            renderCell: (params) => (<Button onClick={() => setStatusBilhete(params.value)} 
            variant="contained" color="secondary"> <CancelIcon /></Button>) },
            // {
            //   field: 'firstName',
            //   headerName: 'First name',
            //   width: 100,
            //   renderCell: (params) => (<a href={params}>{params.value}</a>),
            //   align: 'center',
              
            // },
            // {
            //   field: 'lastName',
            //   headerName: 'Last name',
            //   width: 150,
            //   editable: true,
            //   align: 'center',
            // },
            // {
            //   field: 'age',
            //   headerName: 'Age',
            //   type: 'number',
            //   width: 110,
            //   editable: true,
            // },
            // {
            //   field: 'fullName',
            //   headerName: 'Full name',
            //   description: 'This column has a value getter and is not sortable.',
            //   sortable: false,
            //   width: 160,
            //   valueGetter: (params) =>
            //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
            // },
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

    const handleClick = () => {
        setOpenNav(!openNav);
    };

    const handleClickA = (index) => {
        if (openNavA === index) {
            setOpenNavA("");
        } else {
            setOpenNavA(index);
        }
    };

    const handleClickB = (index) => {
        if (openNavB === index) {
            setOpenNavB("");
        } else {
            setOpenNavB(index);
        }
    };


    const handleDrawerClose = () => {
        setOpenNav(false);
        setOpenNavA("");
        setOpenNavB("");
        document.getElementById("drawer").style.display = "none";
    };

    const handleClickOpenURL = () => {
        setOpenURL(true);
    };

    const handleCloseURL = () => {
        setOpenURL(false);
    };

    const handleClickOpenLoading = () => {
        setOpenLoading(true);
    };

    const handleCloseLoading = () => {
        setOpenLoading(false);
    };

    function exit() {
        sessionStorage.removeItem('login');
        history.push('/');
    }

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


    const onClickHandler = () => {
        let listAux = [];
        let init = 0;
        let auxDate1 = selectedDate1.getFullYear() + "-" + (selectedDate1.getMonth() + 1) + "-" + selectedDate1.getDate();
        let auxDate2 = selectedDate2.getFullYear() + "-" + (selectedDate2.getMonth() + 1) + "-" + selectedDate2.getDate();
        
        
        console.log(dataAux.length, count.length);
        for (let datas of dataAux) {
            
            let d = datas['Data'].split(' ')[0].split('/');
            d.reverse();
            
            let dateReverse = new Date(d.join('-'));
            
            console.log(dateReverse >= new Date(auxDate1) && dateReverse <= new Date(auxDate2));
            if (dateReverse >= new Date(auxDate1) && dateReverse <= new Date(auxDate2)) {
                listAux.push(datas);
                init = 1;
            }
        }
        
        if (init == 0) {
            setAux(dataAux);
        } else {
            setAux(listAux);
        }
        if(dataAux.length != count.length){
            setAux(count);
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



    useEffect(() => {

        if ( sessionStorage.getItem('login') == null ||  sessionStorage.getItem('login') == "" ||
            (new Date().getMinutes() - sessionStorage.getItem('minutos')) >= 10) {
            history.push('/')
        } else {
            sessionStorage.setItem('minutos', new Date().getMinutes());
        }

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

            api.get('/api/getbilhetes/' + sessionStorage.getItem('login'))
                .then(res => {
                    let l = [];
                    let ax = [];
                    try {
                        if (res.data) {
                            setBilhetes(res.data);
                            res.data.bilhetes.map((b) => {
                                let d1 = new Date(b.dataDaAposta.split(' ')[0].split('/')[1] + '/' +
                                b.dataDaAposta.split(' ')[0].split('/')[0] + '/' +
                                b.dataDaAposta.split(' ')[0].split('/')[2]);

                                let d2 = new Date(sessionStorage.getItem('date').split('/')[1] + '/' +
                                sessionStorage.getItem('date').split('/')[0] + '/' + 
                                sessionStorage.getItem('date').split('/')[2]);

                                var difference= d2.getTime()-d1.getTime();
                                console.log(d2.getDay(), d1.getDay());
                                let days = difference/(1000 * 3600 * 24);

                                let st = b.status.replaceAll('{', '').replaceAll('}', '');
                                let result = ((st.split(',').length == b.quantidadeDeJogos));

                                let valor = (result == true && st.indexOf('Aberto') != -1 ? 'Aberto' : 
                                st.indexOf('Perdeu') != -1 ? 'Perdeu' : 
                                st.indexOf('Perdeu') == -1 && st.indexOf('Aberto') == -1 && st.indexOf('Cancelado') == -1 ? 'Ganhou' :
                                st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') == -1 && st.indexOf('Aberto') == -1 ? 'Cancelado' : 
                                st.indexOf('Perdeu') == -1 && st.indexOf('Ganhou') != -1 || st.indexOf('Cacenlado') != -1 &&
                                st.indexOf('Aberto') == -1 ? 'Ganhou' : 'Aberto');

                                if(days <= 6 && d2.getDay() >= d1.getDay()){
                                    
                                    l.push({id: b.id, Cupom: b.codigo,
                                        Cliente: b.nomeCliente, 
                                        Data: b.dataDaAposta, 
                                        Situacao: valor,
                                        Entrada: b.valorDeEntrada.toFixed(2),
                                        Comissao: b.comissao.toFixed(2),
                                        Cotacao: b.cotacao.toFixed(2),
                                        Retorno: b.valorDeSaida.toFixed(2),
                                        Tipo: b.tipoSimplesouMultiplo,
                                        Aposta: b.tipoDeJogo, Cancelar: b.codigo});
                                }
                                ax.push({id: b.id, Cupom: b.codigo,
                                    Cliente: b.nomeCliente, 
                                    Data: b.dataDaAposta, 
                                    Situacao: valor,
                                    Entrada: b.valorDeEntrada.toFixed(2),
                                    Comissao: b.comissao.toFixed(2),
                                    Cotacao: b.cotacao.toFixed(2),
                                    Retorno: b.valorDeSaida.toFixed(2),
                                    Tipo: b.tipoSimplesouMultiplo,
                                    Aposta: b.tipoDeJogo, Cancelar: b.codigo});
                                
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
            <CssBaseline />

            <Menu/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
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
                                                        <Grid item >


                                                            <Typography variant="h5">BILHETES</Typography>
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
                                                                        value={selectedDate2}
                                                                        onChange={date2 => handleDateChange2(date2)}
                                                                        format="dd/MM/yyyy"
                                                                    />
                                                                </MuiPickersUtilsProvider>


                                                            </Grid>

                                                            <br />
                                                            <Button onClick={onClickHandler} variant="contained" color="primary">
                                                                BUSCAR
                                                            </Button>
                                                            <br /><br />
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
                <br />
                <ThemeProvider theme={themeG}>
                <div style={{ height: 400, width: '100%',  }}>
                <DataGrid
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    rows={dataAux}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                />
                </div>
                </ThemeProvider>

            </main>
                    
        </div>

    );

}