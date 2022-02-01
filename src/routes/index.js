import {HashRouter, Route} from 'react-router-dom';

import AoVivo from '../pages/AoVivo';
import PreJogo from '../pages/PreJogo';
import PreJogo2 from '../pages/PreJogo2';
import MaisAoVivo from '../pages/MaisAoVivo';
import Mais from '../pages/Mais';
import Home from '../pages/Home';
import Init from '../pages/Init';
import Caixa from '../pages/Caixa';
import Bilhetes from '../pages/Bilhetes';
import Bilhete from '../pages/Bilhete';
import RecuperarPin from '../pages/RecuperPin';
import VerificarBilhete from '../pages/VerificarBilhete';
import Clients from '../pages/Clients';
import Login from '../pages/Login';
import LoginMange from '../gerente/Login';
import NovaSenha from '../pages/NovaSenha';
import ManageHome from '../gerente/Home';
import ManageCaixa from '../gerente/Caixa';
import ManageBilhetes from '../gerente/Bilhetes';
import ManageBilhete from '../gerente/Bilhete';
import ManageClients from '../gerente/Clients';
import CadCambista from '../gerente/CadCambista';
import EditCambista from '../gerente/EditCambista';
import Relatorios from '../gerente/Relatorios';
import ManageCaixaCambista from '../gerente/CaixaCambista';
import NovaSenhaGerente from '../gerente/NovaSenha';

import ManageHomeA from '../admin/Home';
import LoginMangeA from '../admin/Login';
import ManageCaixaA from '../admin/Caixa';
import ManageBilhetesA from '../admin/Bilhetes';
import ManageBilheteA from '../admin/Bilhete';
import ManageClientsA from '../admin/Clients';
import CadCambistaA from '../admin/CadCambista';
import CadGerente from '../admin/CadGerente';
import EditCambistaA from '../admin/EditCambista';
import EditGerente from '../admin/EditGerente';
import RelatoriosCambistasA from '../admin/RelatoriosCambistas';
import ManageCaixaCambistaA from '../admin/CaixaCambista';
import NovaSenhaGerenteA from '../admin/NovaSenha';
import ManageCotacaoA from '../admin/Cotacao';
import ManageCotacaoAoVivo from '../admin/CotacaoAoVivo';
import ValidarBilhete from '../admin/ValidarBilhete';
import ValidarDados from '../admin/Propriedades';
import Bancas from '../admin/Bancas';
import Regulamento from '../pages/Regulamento';


export default function Routes() {

    return (
        <HashRouter>
            <Route exact path="/" component={Init}/>
            <Route exact path="/banca" component={Login}/>
            <Route exact path="/login" component={LoginMange}/>
            <Route exact path="/campeonato/:campId" component={PreJogo}/>
            <Route exact path="/pre/campeonato/:campId" component={PreJogo2}/>
            <Route exact path="/date/:dateId" component={Init}/>
            <Route exact path="/inicio" component={Home}/>
            <Route exact path="/aovivo" component={AoVivo}/>
            <Route exact path="/maisAoVivo/:id" component={MaisAoVivo}/>
            <Route exact path="/maispre/:id" component={Mais}/>
            <Route exact path="/caixa" component={Caixa}/>
            <Route exact path="/bilhetes" component={Bilhetes}/>
            <Route exact path="/bilhete/:codigoBilhete" component={Bilhete}/>
            <Route exact path="/recuperarpin" component={RecuperarPin}/>
            <Route exact path="/verificarBilhete/:codigoBilhete" component={VerificarBilhete}/>
            <Route exact path="/clientes" component={Clients}/>
            <Route exact path="/novasenha" component={NovaSenha}/>
            <Route exact path="/regulamento" component={Regulamento}/>

            <Route exact path="/gerente" component={ManageHome}/>
            <Route exact path="/cambista" component={ManageHome}/>
            <Route exact path="/caixagerente" component={ManageCaixa}/>
            <Route exact path="/caixagerentecambistas" component={ManageCaixaCambista}/>
            <Route exact path="/bilhetegerente/:codigoBilhete" component={ManageBilhete}/>
            <Route exact path="/bilhetesgerente" component={ManageBilhetes}/>
            <Route exact path="/clientesgerente" component={ManageClients}/>
            <Route exact path="/cadcambistagerente" component={CadCambista}/>
            <Route exact path="/editcambistagerente/:id" component={EditCambista}/>
            <Route exact path="/relatorios" component={Relatorios}/>
            <Route exact path="/novasenhagerente" component={NovaSenhaGerente}/>


            <Route exact path="/admin" component={ManageHomeA}/>
            <Route exact path="/adm" component={LoginMangeA}/>
            <Route exact path="/cambistas" component={ManageHomeA}/>
            <Route exact path="/caixagerentes" component={ManageCaixaA}/>
            <Route exact path="/caixacambistas" component={ManageCaixaCambistaA}/>
            <Route exact path="/bilhetesA" component={ManageBilhetesA}/>
            <Route exact path="/bilheteA/:codigoBilhete" component={ManageBilheteA}/>
            <Route exact path="/clientesA" component={ManageClientsA}/>
            <Route exact path="/cadcambista" component={CadCambistaA}/>
            <Route exact path="/cadgerente" component={CadGerente}/>
            <Route exact path="/editcambista/:id" component={EditCambistaA}/>
            <Route exact path="/editgerente/:id" component={EditGerente}/>
            <Route exact path="/relatoriosc" component={RelatoriosCambistasA}/>
            <Route exact path="/cotacaoAovivo" component={ManageCotacaoAoVivo}/>
            <Route exact path="/cotacao" component={ManageCotacaoA}/>
            <Route exact path="/validarBilhete" component={ValidarBilhete}/>
            <Route exact path="/validarDados" component={ValidarDados}/>
            <Route exact path="/novasenhaadmin" component={NovaSenhaGerenteA}/>
            <Route exact path="/cadastrargerente" component={ManageHomeA}/>
            <Route exact path="/cadastrarbancadmin" component={Bancas}/>

        </HashRouter>
    );
}
