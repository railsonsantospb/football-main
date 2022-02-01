import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
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
import Menu from '../Menu/index';

export default function Dashboard() {

    let history = useHistory();
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


    clearInterval(Number(sessionStorage.getItem("idMaisAovivo")));

    let d = [];
    useEffect(() => {

        if (sessionStorage.getItem('manage') == null || sessionStorage.getItem('manage') == "") {
            history.push('/login')
        }


        async function getBancasAPI() {

            api.get('/api/getbancas/' + sessionStorage.getItem('manage'))
                .then(res => {
                    try {
                        if (res.data) {

                            res.data.bancas.map((b) => {
                                dataAux.push([
                                    b.nome,
                                    'R$ ' + (b.saldoGeral).toFixed(2),
                                    'R$ ' + (b.saldoSimples).toFixed(2),
                                    b.comissaoPreJogo,
                                    b.comissaoAoVivo,
                                    b.ativarApostas == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarAtivarApostas(b.id, b.ativarApostas)}><CheckCircleIcon/></Button> :
                                        <Button variant="outlined" style={{color: 'red', borderColor: 'red'}}
                                                onClick={() => atualizarAtivarApostas(b.id, b.ativarApostas)}><CancelIcon/></Button>,
                                    b.status == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarStatus(b.id, b.status)}><CheckCircleIcon/></Button> :
                                        <Button variant="outlined" style={{color: 'red', borderColor: 'red'}}
                                                onClick={() => atualizarStatus(b.id, b.status)}><CancelIcon/></Button>,
                                    b.ativarApostasPreJogo == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarAtivarApostasPreJogo(b.id, b.ativarApostasPreJogo)}><CheckCircleIcon/></Button> :
                                        <Button variant="outlined" style={{color: 'red', borderColor: 'red'}}
                                                onClick={() => atualizarAtivarApostasPreJogo(b.id, b.ativarApostasPreJogo)}><CancelIcon/></Button>,
                                    b.ativarApostasAoVivos == 1 ?
                                        <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                                onClick={() => atualizarApostasAoVivo(b.id, b.ativarApostasAoVivos)}><CheckCircleIcon/></Button> :
                                        <Button variant="outlined" style={{color: 'red', borderColor: 'red'}}
                                                onClick={() => atualizarApostasAoVivo(b.id, b.ativarApostasAoVivos)}><CancelIcon/></Button>,
                                    <Button variant="outlined" style={{color: 'blue', borderColor: 'blue'}}
                                            component={Link}
                                            to={'/editcambistagerente/' + b.id}><EditIcon/></Button>,]);
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
        getBancasAPI();


    }, []);

    function atualizarApostasAoVivo(id, apostasAoVivo) {
        if (apostasAoVivo) {
            apostasAoVivo = false;
        } else {
            apostasAoVivo = true;
        }
        api.put('/api/updatebanca/' + id, {
            "ativarApostasAoVivos": apostasAoVivo,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarAtivarApostasPreJogo(id, ativarApostasPreJogo) {
        if (ativarApostasPreJogo) {
            ativarApostasPreJogo = false;
        } else {
            ativarApostasPreJogo = true;
        }
        api.put('/api/updatebanca/' + id, {
            "ativarApostasPreJogo": ativarApostasPreJogo,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }

    function atualizarAtivarApostas(id, ativarApostas) {
        if (ativarApostas) {
            ativarApostas = false;
        } else {
            ativarApostas = true;
        }
        api.put('/api/updatebanca/' + id, {
            "ativarApostas": ativarApostas,
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
        api.put('/api/updatebanca/' + id, {
            "status": status,
        })
            .then(res => {
                history.go(0);
            }).catch(error => {
            console.log(error)
        });
    }


    const fixedHeightPaper = clsx(classes.paper);


    return (
        <div className={classes.root} onClick={close}>
            <CssBaseline/>


            <Menu/>
            <main className={classes.content}>

                <div className={classes.appBarSpacer}/>

                <Container maxWidth="lg" className={classes.container}>

                    <br/>
                    {dataAux.length > 0 ?
                        <React.Fragment>
                            <MUIDataTable
                                title={<Grid container direction={'row'}>

                                    <br/>
                                    <Grid item style={{paddingLeft: '10px'}}></Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" component={Link}
                                                to={'/cadcambistagerente'}>
                                            CADASTRAR CAMBISTA
                                        </Button>
                                    </Grid>
                                </Grid>}
                                data={dataAux}
                                columns={columns}
                                options={options}

                            />
                        </React.Fragment> : <Typography component="h4" color="inherit" align="center">
                            <Grid item>
                                <Button variant="contained" color="primary" component={Link} to={'/cadcambistagerente'}>
                                    CADASTRAR CAMBISTA
                                </Button>
                            </Grid>
                            <Grid item style={{marginBottom: '10px'}}></Grid>
                            Nenhum Cambista Cadastrado!
                        </Typography>}
                </Container>

                <div>
                    <ScrollUpButton/>
                </div>
            </main>


        </div>


    )

}