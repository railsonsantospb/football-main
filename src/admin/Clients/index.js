import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {useHistory} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {pt} from 'date-fns/locale';
import {api} from "../../pages/Constantes";
import Menu from '../Menu/index';
import React, {useEffect, useState} from 'react';


export default function Dashboard() {

    let history = useHistory();
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [data, setData] = useState([]);
    const [dataAux, setAux] = useState([]);
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

    const columns = ["", "NOME", "BANCA", "", "", "EXCLUIR"];


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


    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: "none",
        },
        title: {
            flexGrow: 1,
            marginLeft: "-30px",
        },
        drawerPaper: {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            overflow: "auto",
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            display: "flex",
            overflow: "auto",
            flexDirection: "column",
        },
        fixedHeight: {
            height: 240,
        },
        button: {
            width: 10,
        },
        drawer: {
            display: "none",
            flexShrink: 0,
        },
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
        let listAux = [];
        let init = 0;
        let auxDate1 = selectedDate1.getFullYear() + "-" + (selectedDate1.getMonth() + 1) + "-" + selectedDate1.getDate();
        let auxDate2 = selectedDate2.getFullYear() + "-" + (selectedDate2.getMonth() + 1) + "-" + selectedDate2.getDate();

        for (let dataAux of data) {
            let dateReverse = new Date((dataAux[0].split(' ')[0]).split('/').reverse().join('/'));
            if (dateReverse >= new Date(auxDate1) && dateReverse <= new Date(auxDate2)) {
                listAux.push(dataAux);
                init = 1;
            }
        }

        if (init == 0) {
            setData(dataAux);
        } else {
            setData(listAux);
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

    function deleteClient(id) {

        api.delete('/api/deletecliente/' + id)
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });

    }

    useEffect(() => {

        if (sessionStorage.getItem('admin') == null || sessionStorage.getItem('admin') == "") {
            history.push('/adm')
        }


        async function getClientAPI() {

            api.get('/api/getclientes')
                .then(res => {
                    let l = [];
                    try {
                        if (res.data) {
                            res.data.clientes.map((b) => {
                                l.push([<Typography></Typography>, b.nome, <Typography>{b.nomeBanca}</Typography>,
                                    <Typography></Typography>, <Typography></Typography>,
                                    <Button variant="contained"
                                            color="secondary"
                                            onClick={() => deleteClient(b.id)}><CancelIcon/></Button>]);
                            });
                        }
                        setAux(l);
                    } catch (e) {

                    }
                }).catch(error => {
                console.log(error);
            });

        }

        getClientAPI();
        setData(dataAux);


    }, []);


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


                                                            <Typography variant="h5">CLIENTES</Typography>
                                                            <Grid container justify="space-around">

                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}
                                                                                         locale={pt}>
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

                                                            <br/>
                                                            <Button onClick={onClickHandler} variant="contained"
                                                                    color="primary">
                                                                BUSCAR
                                                            </Button>
                                                            <br/><br/>
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
                <React.Fragment>


                    <MUIDataTable
                        title={"GERENCIAR CLIENTES"}
                        data={dataAux}
                        columns={columns}
                        options={options}

                    />
                </React.Fragment>

            </main>

        </div>

    );

}