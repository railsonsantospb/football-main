import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory, Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Taca from './taca.jpg';
import { images, weeks, api } from '../Constantes/index';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import Menu from '../Menu/index';



//let openNavA = [];
export default function Dashboard(props) {

    let history = useHistory();
    let values = [];
    const [ids, setIds] = useState([]);
    const [date, setDate] = useState([]);
    const [day, setDay] = useState([]);
    const [country, setCountry] = useState([]);
    const [saldoSimples, setSaldoSimples] = useState(0);
    const [saldoGeral, setSaldoGeral] = useState(0);
    const [nomeBanca, setNomeBanca] = useState("");


    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            
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



    useEffect(() => {



        async function getPaisesCampeonatos() {
            api.get('/api/gethome').then(res => {

                
                    let l = []
                    res.data.home.modalidades[0].paises.map((f) => {
                    
                        l.push(f);
                        
                    });
                    setCountry(l);

                
            }).catch(error => {
              
                console.log(error)
            });
        }

        getPaisesCampeonatos();





        async function getDateAll() {
            api.get('/api/getdate').then(res => {

                    try {
                    
                        let d = Date(res.data.date);
                        d = new Date(d);
                        d = d.setDate(d.getDate());


                        let d1 = Date(res.data.date);
                        d1 = new Date(d1);
                        d1 = d1.setDate(d1.getDate() + 1);

                        let d2 = Date(res.data.date);
                        d2 = new Date(d2);
                        d2 = d2.setDate(d2.getDate() + 2);

                        d = new Date(d);
                        d1 = new Date(d1);
                        d2 = new Date(d2);
                    


                        setDate([
                            d.getFullYear() + "-" + 
                            ("0" + (d.getMonth()+1)).slice(-2) + "-" +
                            ("0" + d.getDate()).slice(-2), 

                            d1.getFullYear() + "-" + 
                            ("0" + (d1.getMonth()+1)).slice(-2) + "-" +
                            ("0" + d1.getDate()).slice(-2), 
                            
                            d2.getFullYear() + "-" + 
                            ("0" + (d2.getMonth()+1)).slice(-2) + "-" +
                            ("0" + d2.getDate()).slice(-2)]);

                       
                            setDay([d.getDay(), d1.getDay(), d2.getDay()]);
                        


                    } catch (e) {
                        console.log(e);
                    }
                }).catch(error => {
                    console.log(error)
                });
        }

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

        if(sessionStorage.getItem('login') != null &&  sessionStorage.getItem('login') != "") {
            getLoginAPI();
        }
     

        getDateAll();
                
        values = ids;


    }, []);


    //console.log(country);


    return (
        
        <div className={classes.root}>
            <Menu/>
           

            
            <main className={classes.content}>

                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
   

                    {country.length > 0 ?


                        <div><fieldset style={{padding: 20}}>
                            <Grid item={true} xs={12} container spacing={2}>

                                <Grid container align="center" >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} >
                                            <Typography variant="h5" >
                                                <b style={{ color: '#428bca' }}>SONHOBETS</b>
                                            </Typography>
                                            <Typography variant="h6" >
                                                <b>VEM VIVER A EMOÇÃO DO FUTEBOL</b>
                                                {}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid><br /><br />
                            
                            <Grid container align='center'>

                                <Grid item={true} xs={12} md={3} lg={3} align='center'>

                                    <Link to={'/aovivo'} style={{ textDecoration: 'none' }}>
                                        <div
                                            style={{ position: "relative", margin: "20px" }}>
                                            
                                                        <Typography gutterBottom variant="h5"
                                                            component="h2">

                                                        </Typography>
                                                        <Grid sm container align="center">
                                                            <Grid container direction="column"
                                                                spacing={2}>
                                                                <Grid>
                                                                    <img src={Taca} width="150px"
                                                                        height="100"
                                                                        align="center"
                                                                        alt='Ao Vivo' />
                                                                    <Typography gutterBottom style={{color: 'black'}}>
                                                                        <b>AO VIVO</b>

                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    
                                        </div>
                                    </Link>
                                </Grid>
                            </Grid>

                            <div>

                                <fieldset ><Typography variant="h5"  align='center' gutterBottom>
                                    <Grid style={{ marginTop: '10px', marginLeft: '20px' }}>
                                        <Typography variant="h5" gutterBottom>
                                            <b>JOGOS DO DIA</b>
                                        </Typography>
                                    </Grid>
                                </Typography></fieldset>

                                <Grid container>
                                    {

                                        [0, 1, 2].flatMap((index) => (


                                            <Grid item={true} xs={12} md={3} lg={3}>

                                                <Link
                                                    to={"/date/" + date[index]} style={{ textDecoration: 'none' }}>


                                                    <div
                                                        style={{ position: "relative", margin: "20px" }}>
                                                        
                                                                    <Typography gutterBottom variant="h5"
                                                                        component="h2">

                                                                    </Typography>
                                                                    <Grid sm container align="center">
                                                                        <Grid container direction="column"
                                                                            spacing={2}>
                                                                            <Grid>
                                                                                <img src={Taca} width="150px"
                                                                                    height="100"
                                                                                    align="center"
                                                                                    alt={weeks[day[index]]} />
                                                                                <Typography gutterBottom style={{color: 'black'}}>
                                                                                    <b>{weeks[day[index]]}</b>

                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                               
                                                    </div>


                                                </Link>
                                            </Grid>

                                        ))}</Grid>
                                <br />

                            </div>


                            <div style={{ marginLeft: '10px' }}>



            {country.map((countrys) => {
                return (

                    <div>
                      
                            <div>



                     
                                 

                                <fieldset ><Typography variant="h5"  align='center' gutterBottom>
                                    <Grid style={{ marginTop: '10px', marginLeft: '20px' }}>
                                        <Typography variant="h5" gutterBottom >
                                            <b>{countrys.nome}</b>
                                        </Typography>
                                    </Grid>
                                </Typography></fieldset>
                            

                                   


                                <Grid item={true} container>
                                    

                                        {countrys.campeonatos.map((item) => (
                                           

                                            <Grid item={true} xs={12} md={3} lg={3}>

                                                <Link to={"/campeonato/" +item.id}
                                                    style={{ textDecoration: 'none' }}>

                                                        <div 
                                                            style={{ position: "relative", margin: "20px" }}>
                                                            
                                                                        <Typography gutterBottom variant="h5"
                                                                            component="h2">

                                                                        </Typography>
                                                                        <Grid sm container align="center">
                                                                            <Grid container direction="column"
                                                                                spacing={2}>
                                                                                <Grid>
                                                                                    <img src={images[countrys.nome]} width="150px"
                                                                                        height="100"
                                                                                        align="center"
                                                                                         />
                                                                                    <Typography gutterBottom style={{color: 'black'}}>
                                                                                        <b>{item.nome}</b>

                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    
                                                        </div>
                                                        
                                                </Link>
                                            </Grid>

                                        ))} </Grid>
                                <br />

                            </div>
                    </div>
                )

            })}
        </div>
        </fieldset></div>


                        : <LinearProgress />}

                </Container>

                <div>
                    <ScrollUpButton />
                </div>
            </main>


        </div>


    )

}