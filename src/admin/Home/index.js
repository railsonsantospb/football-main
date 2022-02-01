import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from 'react-router-dom';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Button from '@material-ui/core/Button';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import {api} from '../Constantes/index';
import MenuAdmin from '../Menu/index';
import {createTheme, ThemeProvider} from '@mui/material/styles';

export default function Dashboard() {

    let history = useHistory();
    const [date, setDate] = useState([]);
    const [dataAux, setDataAux] = useState([]);
    const [day, setDay] = useState([]);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

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

    const getMuiTheme = () => createTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    color: "#FF0000",
                },

            }
        }
    })

    const options = {
        rowsPerPage: 50,
        filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        selectableRows: false,

        textLabels: {
            body: {
                noMatch: "Nenhum dado encontrado",
                toolTip: "Ordenar",
                columnHeaderTooltip: column => `Ordenar por ${column.label}`
            },
            pagination: {
                next: "Próxima Página",
                previous: "Página Anterior",
                rowsPerPage: "Linha por página:",
                displayRows: "de",
            },
            toolbar: {
                search: "Procurar",
                downloadCsv: "Download CSV",
                print: "Print",
                viewColumns: "View Columns",
                filterTable: "Filter Table",
            },
            filter: {
                all: "Tudo",
                title: "FILTERS",
                reset: "RESET",
            },
            viewColumns: {
                title: "Mostrar Colunas",
                titleAria: "Show/Hide Table Columns",
            },
            selectedRows: {
                text: "row(s) selected",
                delete: "Delete",
                deleteAria: "Delete Selected Rows",
            },
        }


        // onRowClick: (rowData, rowMeta) => {
        //     const dataToState = rowData;
        //     console.log(dataToState);
        // }
    };


    const columns = ["GERENTE", "STATUS", "CRIAR CAMBISTA", "REIMPRIMIR", "STATUS CAMBISTA", "ALTERAR LIMITES",
        "CANCELAR APOSTAS", "APOSTAS CAMBISTA", "EDITAR"];


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


    let d = [];
    useEffect(() => {

        if (sessionStorage.getItem('admin') == null || sessionStorage.getItem('admin') == "") {
            history.push('/adm');
        }


        async function getDateAll() {

            try {
                let d = Date.parse(new Date());
                d = new Date(d);
                d = d.setDate(d.getDate());


                let d1 = Date.parse(new Date());
                d1 = new Date(d1);
                d1 = d1.setDate(d1.getDate() + 1);

                let d2 = Date.parse(new Date());
                d2 = new Date(d2);
                d2 = d2.setDate(d2.getDate() + 2);

                d = new Date(d);
                d1 = new Date(d1);
                d2 = new Date(d2);


                setDate([d.getFullYear() + "-" + Number(d.getMonth() + 1) + "-" +
                d.getDate(), d1.getFullYear() + "-" + Number(d1.getMonth() + 1) + "-" +
                d1.getDate(), d2.getFullYear() + "-" + Number(d2.getMonth() + 1) + "-" +
                d2.getDate()]);


                setDay([d.getDay(), d1.getDay(), d2.getDay()]);
                console.log([d.getDay(), d1.getDay(), d2.getDay()]);


            } catch (e) {
                console.log(e);
            }

        }


        async function getGerentesAPI() {

            api.get('/api/getgerencia')
                .then(res => {
                    try {
                        if (res.data) {
                            console.log(res.data);
                            res.data.gerencias.map((b) => {
                                dataAux.push([
                                    b.nome,
                                    b.status == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarStatus(b.id, b.status)}><CheckCircleIcon/></Button>
                                        : <Button variant="outlined" style={{color: 'red', borderColor: 'red'}}
                                                  onClick={() => atualizarStatus(b.id, b.status)}><CancelIcon/></Button>,

                                    b.criarCambista == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarCriarCambista(b.id, b.criarCambista)}><CheckCircleIcon/></Button>
                                        : <Button variant="outlined" style={{color: 'red', borderColor: 'red'}}
                                                  onClick={() => atualizarCriarCambista(b.id, b.criarCambista)}><CancelIcon/></Button>,

                                    b.reiprimirApostas == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarReiprimirApostas(b.id, b.reiprimirApostas)}>
                                            <CheckCircleIcon/></Button> : <Button variant="outlined"
                                                                                  style={{
                                                                                      color: 'red',
                                                                                      borderColor: 'red'
                                                                                  }} onClick={() =>
                                            atualizarReiprimirApostas(b.id, b.reiprimirApostas)}>
                                            <CancelIcon/></Button>,

                                    b.alterarStatusCambista == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarAlterarStatusCambista(b.id, b.alterarStatusCambista)}>
                                            <CheckCircleIcon/></Button> :
                                        <Button variant="outlined" style={{color: 'red', borderColor: 'red'}}
                                                onClick={() => atualizarAlterarStatusCambista(b.id, b.alterarStatusCambista)}><CancelIcon/></Button>,


                                    b.alterarLimitesApostas == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarAlterarLimitesApostas(b.id, b.alterarLimitesApostas)}>
                                            <CheckCircleIcon/></Button> : <Button variant="outlined"
                                                                                  style={{
                                                                                      color: 'red',
                                                                                      borderColor: 'red'
                                                                                  }} onClick={() =>
                                            atualizarAlterarLimitesApostas(b.id, b.alterarLimitesApostas)}>
                                            <CancelIcon/></Button>,

                                    b.cancelarApostaCambista == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarCancelarApostaCambista(b.id, b.cancelarApostaCambista)}>
                                            <CheckCircleIcon/></Button> : <Button variant="outlined"
                                                                                  style={{
                                                                                      color: 'red',
                                                                                      borderColor: 'red'
                                                                                  }} onClick={() =>
                                            atualizarCancelarApostaCambista(b.id, b.cancelarApostaCambista)}>
                                            <CancelIcon/></Button>,

                                    b.ativaApostasCambistas == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarAtivaApostasCambistas(b.id, b.ativaApostasCambistas)}>
                                            <CheckCircleIcon/></Button> : <Button variant="outlined"
                                                                                  style={{
                                                                                      color: 'red',
                                                                                      borderColor: 'red'
                                                                                  }} onClick={() =>
                                            atualizarAtivaApostasCambistas(b.id, b.ativaApostasCambistas)}>
                                            <CancelIcon/></Button>,


                                    <Button variant="outlined" style={{color: 'blue', borderColor: 'blue'}}
                                            component={Link} to={'/editgerente/' + b.id}><EditIcon/></Button>,]);
                            })
                            setDataAux(dataAux);

                        }
                    } catch (e) {
                        console.log(e);

                    }
                }).catch(error => {
                console.log(error)
            });

        }

        setDataAux(d);
        getGerentesAPI();
        getDateAll();


    }, []);

    function atualizarReiprimirApostas(id, reiprimirApostas) {
        if (reiprimirApostas) {
            reiprimirApostas = false;
        } else {
            reiprimirApostas = true;
        }
        api.put('/api/updategerencia/' + id, {
            "reiprimirApostas": reiprimirApostas,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarCriarCambista(id, criarCambista) {
        if (criarCambista) {
            criarCambista = false;
        } else {
            criarCambista = true;
        }
        api.put('/api/updategerencia/' + id, {
            "criarCambista": criarCambista,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarAtivaApostasCambistas(id, ativaApostasCambistas) {
        if (ativaApostasCambistas) {
            ativaApostasCambistas = false;
        } else {
            ativaApostasCambistas = true;
        }
        api.put('/api/updatebanca/' + id, {
            "ativaApostasCambistas": ativaApostasCambistas,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarStatus(id, status) {
        if (status) {
            status = false;
        } else {
            status = true;
        }
        api.put('/api/updategerencia/' + id, {
            "status": status,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarAlterarStatusCambista(id, alterarStatusCambista) {
        if (alterarStatusCambista) {
            alterarStatusCambista = false;
        } else {
            alterarStatusCambista = true;
        }
        api.put('/api/updategerencia/' + id, {
            "alterarStatusCambista": alterarStatusCambista,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarAlterarLimitesApostas(id, alterarLimitesApostas) {
        if (alterarLimitesApostas) {
            alterarLimitesApostas = false;
        } else {
            alterarLimitesApostas = true;
        }
        api.put('/api/updategerencia/' + id, {
            "alterarLimitesApostas": alterarLimitesApostas,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarCancelarApostaCambista(id, cancelarApostaCambista) {
        if (cancelarApostaCambista) {
            cancelarApostaCambista = false;
        } else {
            cancelarApostaCambista = true;
        }
        api.put('/api/updategerencia/' + id, {
            "cancelarApostaCambista": cancelarApostaCambista,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }


    return (
        <div className={classes.root} onClick={close}>
            <CssBaseline/>

            <MenuAdmin/>

            <main className={classes.content}>

                <div className={classes.appBarSpacer}/>

                <Container maxWidth="lg" className={classes.container}>

                    <br/>
                    {dataAux.length > 0 ?
                        <React.Fragment>
                            <ThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable
                                    title={<Grid container direction={'row'}>

                                        <br/>
                                        <Grid item style={{paddingLeft: '10px'}}></Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" component={Link}
                                                    to={'/cadgerente'}>
                                                CADASTRAR GERENTE
                                            </Button>
                                        </Grid>
                                    </Grid>}
                                    data={dataAux}
                                    columns={columns}
                                    options={options}

                                />
                            </ThemeProvider>
                        </React.Fragment> : <Typography component="h4" color="inherit" align="center">
                            <Grid item>
                                <Button variant="contained" color="primary" component={Link} to={'/cadgerente'}>
                                    CADASTRAR GERENTE
                                </Button>
                            </Grid>
                            <Grid item style={{marginBottom: '10px'}}></Grid>
                            Nenhum Gerente Cadastrado!
                        </Typography>}
                </Container>

                <div>
                    <ScrollUpButton/>
                </div>
            </main>


        </div>


    )

}