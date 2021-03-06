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
                                            1?? - O valor m??ximo por aposta ?? de R$
                                            {" " + parseFloat(sessionStorage.getItem('valorDeSaida')).toFixed(2)};<br/>
                                            2?? - A premia????o m??xima por ganho de aposta ?? de R$ 10000;<br/>
                                            4?? - Limite de Times selecionados ser??o de at?? 20 Palpites;<br/>
                                            3?? - Todos os Pr??mios ser??o pagos em at?? 120 horas.<br/>


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
                                            Todos os jogos s??o baseados no resultado ao final dos 90 minutos de
                                            jogo.<br/>
                                            Isto inclui qualquer tempo de compensa????o mas n??o inclui: prorroga????o,<br/>
                                            gol de ouro ou marca????es de grandes penalidades.<br/><br/>

                                            <Typography variant="h6" component="div">
                                                Jogos Adiados, Reagendados ou Abandonados
                                            </Typography>

                                            Quaisquer jogos n??o jogados ou adiados ser??o considerados "N??o
                                            Participantes??? <br/>
                                            caso n??o remarcado e n??o jogado no per??odo anterior a 48h, Na eventualidade
                                            de <br/>
                                            isto acontecer, as apostas ser??o mantidas. Se for cancelada, todas as
                                            apostas <br/>
                                            ser??o canceladas e o dinheiro das apostas devolvidos. Se houver outros jogos
                                            em <br/>
                                            apostas "casadinha", esses continuar??o valendo.<br/>
                                            <br/>

                                            <Typography variant="h6" component="div">
                                                Resultado ao Intervalo
                                            </Typography>
                                            As apostas ser??o anuladas se o jogo for abandonado antes do intervalo.
                                            Se o jogo for abandonado s?? no segundo tempo e sua aposta foi intervalo,
                                            essa ser?? ganha.<br/><br/>

                                            <Typography variant="h6" component="div">
                                                Erro de Sistema
                                            </Typography>
                                            A <b>SONHOBETS</b> n??o pagar?? pr??mios de jogos que j?? tenham come??ados e por
                                            erro
                                            de sistema continuaram dispon??veis para apostas, ou erro datas e hor??rios.
                                            (isso inclui apostas antecipadas e apostas ao vivo). Neste caso, as apostas
                                            ser??o canceladas e o apostador ter?? o dinheiro devolvido.<br/>

                                            Jogos com erros de cota????es, cota????es faltando, ou com valor diferente do
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
                                            JOGO RESPONS??VEL
                                        </Typography>
                                        <Typography sx={{mb: 1.5}} color="text.secondary">
                                            <br/>
                                            <Typography variant="h6" component="div">
                                                O Nosso Compromisso
                                            </Typography>

                                            A <b>SONHOBETS</b> est?? empenhada em promover o Jogo Respons??vel. Promovemos
                                            o jogo<br/>
                                            como uma atividade de lazer e acreditamos que o jogo apenas poder?? ser
                                            desfrutado <br/>
                                            desta forma de se mantiver o controle e jogar de forma respons??vel. No
                                            entanto, <br/>
                                            sabemos que para algumas pessoas, o jogo pode deixar de ser uma atividade de
                                            lazer<br/>
                                            inofensiva e tornar-se um problema.<br/><br/>

                                            1. O jogo deve ser visto como uma forma de entretenimento e n??o como uma
                                            forma de <br/>
                                            fazer dinheiro;<br/>
                                            2. Aposte com sensatez e nunca persiga perdas;<br/>
                                            3. Aposte apenas aquilo que se pode dar ao luxo de perder;<br/>
                                            4. Monitorize o tempo que passa a jogar;<br/>
                                            5. Fa??a pausas do jogo regularmente. Jogar de forma cont??nua <br/>
                                            pode fazer com que perca no????o de tempo e perspectiva;<br/>
                                            6. N??o jogue sob influ??ncia de ??lcool ou quando se sente aborrecido(a) <br/>
                                            ou deprimido(a).<br/>

                                            Se possuir preocupa????es com o seu jogo, favor nos contactar para o
                                            cancelamento <br/>
                                            da conta.<br/>

                                            <br/>
                                            {/* <Typography variant="h6" component="div">
                            Regulamento Basquete:
                            </Typography>

                            1 As apostas ser??o resolvidas com o resultado final oficial N??O incluindo <br/>
                            tempo extra ou qualquer extra innings. Se um jogo acabar com um empate, todas <br/>
                            as apostas s??o PERDIDAS.<br/>
                            2 Apostas em mercados claramente identificados com indica????o Tempo Regulamentar (TR)<br/>
                            s??o pagas de acordo com o resultado o Tempo regulamentar somente.<br/>
                            3 Apostas Jogadores Especiais: Se o jogador n??o jogou em nenhuma das partes do jogo, <br/>
                            ent??o as apostas no jogador ser??o canceladas.<br/> */}


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