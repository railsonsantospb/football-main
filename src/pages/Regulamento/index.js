import {makeStyles, useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Menu from '../Menu/index';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';


//let openNavA = [];
export default function Dashboard(props) {

    const [openNav, setOpenNav] = useState(false);
    const [openNavA, setOpenNavA] = useState("");
    const [openNavB, setOpenNavB] = useState("");



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



    return (

        <div className={classes.root}>
            <Menu/>


            <main className={classes.content}>

                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>


                    <div>
                        <fieldset style={{padding: 20}}>
                            <Grid item={true} xs={12} container spacing={2}>

                                <Grid container align="center">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">
                                                <b style={{color: '#CA5242'}}>REGULAMENTOS</b>
                                            </Typography>

                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid><br/><br/>


                            <Box sx={{minWidth: 275}}>
                                <Card variant="outlined">
                                    <CardContent>

                                        <Typography variant="h6" component="div">
                                            REGRAS DO JOGO
                                        </Typography>
                                        <Typography sx={{mb: 1.5}} color="text.secondary">
                                            1º - O valor máximo por aposta é de R$
                                            {" " + parseFloat(sessionStorage.getItem('valorDeSaida')).toFixed(2)};<br/>
                                            2º - A premiação máxima por ganho de aposta é de R$ 10000;<br/>
                                            4º - Limite de Times selecionados serão de até 20 Palpites;<br/>
                                            3º - Todos os Prêmios serão pagos em até 120 horas.<br/>


                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>

                            <br/>

                            <Box sx={{minWidth: 275}}>
                                <Card variant="outlined">
                                    <CardContent>

                                        <Typography variant="h6" component="div">
                                            REGRAS DE APOSTAS
                                        </Typography>
                                        <Typography sx={{mb: 1.5}} color="text.secondary">
                                            <br/>
                                            90 Minutos de Jogo:
                                            Todos os jogos são baseados no resultado ao final dos 90 minutos de
                                            jogo.<br/>
                                            Isto inclui qualquer tempo de compensação mas não inclui: prorrogação,<br/>
                                            gol de ouro ou marcações de grandes penalidades.<br/><br/>

                                            <Typography variant="h6" component="div">
                                                Jogos Adiados, Reagendados ou Abandonados
                                            </Typography>

                                            Quaisquer jogos não jogados ou adiados serão considerados "Não
                                            Participantes” <br/>
                                            caso não remarcado e não jogado no período anterior a 48h, Na eventualidade
                                            de <br/>
                                            isto acontecer, as apostas serão mantidas. Se for cancelada, todas as
                                            apostas <br/>
                                            serão canceladas e o dinheiro das apostas devolvidos. Se houver outros jogos
                                            em <br/>
                                            apostas "casadinha", esses continuarão valendo.<br/>
                                            <br/>

                                            <Typography variant="h6" component="div">
                                                Resultado ao Intervalo
                                            </Typography>
                                            As apostas serão anuladas se o jogo for abandonado antes do intervalo.
                                            Se o jogo for abandonado só no segundo tempo e sua aposta foi intervalo,
                                            essa será ganha.<br/><br/>

                                            <Typography variant="h6" component="div">
                                                Erro de Sistema
                                            </Typography>
                                            A <b>SONHOBETS</b> não pagará prêmios de jogos que já tenham começados e por
                                            erro
                                            de sistema continuaram disponíveis para apostas, ou erro datas e horários.
                                            (isso inclui apostas antecipadas e apostas ao vivo). Neste caso, as apostas
                                            serão canceladas e o apostador terá o dinheiro devolvido.<br/>

                                            Jogos com erros de cotações, cotações faltando, ou com valor diferente do
                                            considerado normal nas apostas, serao cancelados e devolvido o dinheiro para
                                            o apostador.<br/>

                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box><br/>
                            <Box sx={{minWidth: 275}}>
                                <Card variant="outlined">
                                    <CardContent>

                                        <Typography variant="h6" component="div">
                                            JOGO RESPONSÁVEL
                                        </Typography>
                                        <Typography sx={{mb: 1.5}} color="text.secondary">
                                            <br/>
                                            <Typography variant="h6" component="div">
                                                O Nosso Compromisso
                                            </Typography>

                                            A <b>SONHOBETS</b> está empenhada em promover o Jogo Responsável. Promovemos
                                            o jogo<br/>
                                            como uma atividade de lazer e acreditamos que o jogo apenas poderá ser
                                            desfrutado <br/>
                                            desta forma de se mantiver o controle e jogar de forma responsável. No
                                            entanto, <br/>
                                            sabemos que para algumas pessoas, o jogo pode deixar de ser uma atividade de
                                            lazer<br/>
                                            inofensiva e tornar-se um problema.<br/><br/>

                                            1. O jogo deve ser visto como uma forma de entretenimento e não como uma
                                            forma de <br/>
                                            fazer dinheiro;<br/>
                                            2. Aposte com sensatez e nunca persiga perdas;<br/>
                                            3. Aposte apenas aquilo que se pode dar ao luxo de perder;<br/>
                                            4. Monitorize o tempo que passa a jogar;<br/>
                                            5. Faça pausas do jogo regularmente. Jogar de forma contínua <br/>
                                            pode fazer com que perca noção de tempo e perspectiva;<br/>
                                            6. Não jogue sob influência de álcool ou quando se sente aborrecido(a) <br/>
                                            ou deprimido(a).<br/>

                                            Se possuir preocupações com o seu jogo, favor nos contactar para o
                                            cancelamento <br/>
                                            da conta.<br/>

                                            <br/>
                                            {/* <Typography variant="h6" component="div">
                            Regulamento Basquete:
                            </Typography>

                            1 As apostas serão resolvidas com o resultado final oficial NÃO incluindo <br/>
                            tempo extra ou qualquer extra innings. Se um jogo acabar com um empate, todas <br/>
                            as apostas são PERDIDAS.<br/>
                            2 Apostas em mercados claramente identificados com indicação Tempo Regulamentar (TR)<br/>
                            são pagas de acordo com o resultado o Tempo regulamentar somente.<br/>
                            3 Apostas Jogadores Especiais: Se o jogador não jogou em nenhuma das partes do jogo, <br/>
                            então as apostas no jogador serão canceladas.<br/> */}


                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>

                        </fieldset>
                    </div>


                </Container>

                <div>
                    <ScrollUpButton/>
                </div>
            </main>


        </div>


    )

}