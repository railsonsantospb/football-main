import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Button from '@material-ui/core/Button';
import MUIDataTable from "mui-datatables";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {api} from '../Constantes/index';
import Menu from '../Menu/index';

//let aux = [];

export default function ValidarBilhete() {

    let history = useHistory();
    const [dataAux, setDataAux] = useState([]);
    const [drawerWidth, setdrawerWidth] = useState(240);
    const [responsive, setResponsive] = useState("horizontal");
    const [tableBodyHeight, setTableBodyHeight] = useState("500px");
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
        appBarSpacer: {
            marginTop: 20,
        },
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


    const columns = ["JOGO", "DATA", "TIPO DE COTACAO",
        "GANHOU", "PERDEU", "CANCELADO", "STATUS"];


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


    function setStatusJogo(jogo, cotacao, status) {

        api.put('/api/validarjogo',
            {
                'nomeDosTimes': jogo,
                'tipoDeCotacao': cotacao,
                'status': status
            })
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
        let d1 = new Date(a.dataDoJogo.split(' ')[0].split('/')[2] + '/' +
            a.dataDoJogo.split(' ')[0].split('/')[1] + '/' +
            a.dataDoJogo.split(' ')[0].split('/')[0] + " " + a.dataDoJogo.split(' ')[2]);

        let d2 = new Date(b.dataDoJogo.split(' ')[0].split('/')[2] + '/' +
            b.dataDoJogo.split(' ')[0].split('/')[1] + '/' +
            b.dataDoJogo.split(' ')[0].split('/')[0] + " " + b.dataDoJogo.split(' ')[2]);

        return Date.parse(d1) - Date.parse(d2);
    }

    let d = [];
    useEffect(() => {

        if (sessionStorage.getItem('admin') == null || sessionStorage.getItem('admin') == "") {
            history.push('/adm');
        }

        let unmounted = false;


        async function getBancasAPI() {
            let dict = {};
            api.get('/api/getjogos')
                .then(res => {
                    try {

                        let bh = res.data.jogos.slice();
                        bh.sort(custom_sort);
                        console.log(bh);
                        if (res.data) {
                            bh.map((b) => {
                                let valor = (b.nomeDosTimes + "" + b.tipoDeCotacao);

                                dict[valor] = [

                                    <Typography style={{cursor: 'pointer'}}
                                                onClick={() => window.open('https://www.google.com/search?q=' + b.nomeDosTimes)}>{b.nomeDosTimes}</Typography>,
                                    b.dataDoJogo,
                                    b.tipoDeCotacao,
                                    <Button variant="outlined" style={{color: 'green', borderColor: 'green'}}
                                            onClick={() => setStatusJogo(b.nomeDosTimes, b.tipoDeCotacao, 'Ganhou')}><CheckCircleIcon/></Button>,
                                    <Button variant="outlined" style={{color: 'red', borderColor: 'red'}}
                                            onClick={() => setStatusJogo(b.nomeDosTimes, b.tipoDeCotacao, 'Perdeu')}><CancelIcon/></Button>,
                                    <Button variant="outlined" style={{color: 'gold', borderColor: 'gold'}}
                                            onClick={() => setStatusJogo(b.nomeDosTimes, b.tipoDeCotacao, 'Cancelado')}><CancelIcon/></Button>,
                                    b.status];


                            });
                            for (let i in dict) {
                                dataAux.push(dict[i]);
                            }
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

        return () => {
            unmounted = true
        };

    }, []);


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
                                title={'VALIDAR BILHETES'}
                                data={dataAux}
                                columns={columns}
                                options={options}

                            />
                        </React.Fragment> :
                        <Typography component="h1" variant="h6" align="center">
                            Nenhum Jogo Disponível!
                        </Typography>}
                </Container>

                <div>
                    <ScrollUpButton/>
                </div>
            </main>


        </div>


    )

}