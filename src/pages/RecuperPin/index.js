import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, {useEffect, useRef, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {useParams} from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import {api} from '../Constantes/index';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {useReactToPrint} from "react-to-print";
import TextField from '@material-ui/core/TextField';
import Menu from '../Menu/index';


export default function Dashboard(props) {

    let history = useHistory();
    let {codigoBilhete} = useParams();
    const [message, setMessage] = useState("");
    const [openURL, setOpenURL] = React.useState(false);
    const [openLoading, setOpenLoading] = React.useState(false);
    const [codigoB, setCodigo] = useState(codigoBilhete);



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


    const classes = useStyles();


    const handleCloseURL = () => {
        setOpenURL(false);
    };


    const handleCloseLoading = () => {
        setOpenLoading(false);
    };



    function getCodigo(e) {
        setCodigo(e.target.value);
    }


    let nb = 0;

    function bilhete() {
        api.get('/api/getbilhetetemporario/' + codigoB)
            .then(res => {
                try {
                    if (res.data) {
                        let b = JSON.parse(res.data.bilhete[0].bilhete.replace(/'/g, '"'))
                        sessionStorage.setItem('valorIn', b['valorIn']);
                        sessionStorage.setItem('retorno', b['retorno']);
                        for(let v in b){
                            localStorage.setItem(v, b[v]);
                        }
                        sessionStorage.setItem("pin", "pin");
                        history.push('/');
                    }
                } catch (e) {
                    console.log(e);
                }
            }).catch(error => {
            console.log(error)
        });
    }





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
                                <Grid container spacing={2}>

                                    <Grid xs={12} md={12} sm={12} item>
                                        <Grid container spacing={2} key={127}>

                                            <Grid item sm container>
                                                <Grid item container direction="column" spacing={2}>
                                                    <Grid item align="center">

                                                        <br/>
                                                        <TextField id="outlined-basic" label="Código do Bilhete"
                                                                   variant="outlined"
                                                                   onChange={getCodigo}/>
                                                        <Grid container justify="space-around">

                                                        </Grid>

                                                        <br/>


                                                        <Button onClick={bilhete} style={{margin: '10px', width: 200}}

                                                                variant="contained"
                                                                color="primary">
                                                            <VpnKeyIcon/>
                                                        </Button>



                                                        <br/><br/>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>

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


            </main>


        </div>

    );

}