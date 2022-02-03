// https://restcountries.eu/data/afg.svg
// http://www.geognos.com/api/en/countries/flag/AI.png
// https://restcountries.eu/data/bra.svg
// https://restcountries.eu/rest/v2/all

import axios from 'axios';


const cotacao = [
    {title: 'Vencedor do Encontro'},
    {title: 'Handicap de Gols (Europeu)'},
    {title: 'Resultado Certo'},
    {title: 'Total de Gols'},
    {title: 'Resultado Certo (1º Tempo)'},
    {title: 'Dupla Possibilidade'},
    {title: 'Ambas Equipes Marcam'},
    {title: 'Vencedor do Primeiro Tempo'},
    {title: 'Vencedor do Segundo Tempo'},
    {title: 'Total de Gols (Par ou Impar)'},
    {title: 'Faixa Total de Gols'},
    {title: 'Vencedor Encontro + Ambas Marcam'},
    {title: 'Ambas Equipes Marcam no 1T e 2T'},
    {title: 'Vencedor Intervalo / Vencedor Partida'},
    {title: 'Casa termina sem levar gol'},
    {title: 'Fora termina sem levar gol'},
    {title: 'Total de Escanteios'},
    {title: 'Total de Escanteios 1T'},
    {title: 'Escanteios Par/Impar'},
    {title: 'Escanteios Par/Impar no Primeiro Tempo'},
    {title: 'Vencedor do Encontro / Total de Gols'},
    {title: 'Casa Vence Ambos os Tempos'},
    {title: 'Fora Vence Ambos os Tempos'},
    {title: 'Total de Gols Par/Impar-Casa'},
    {title: 'Total de Gols Par/Impar-Fora'},
    {title: 'Total de Gols no Primeiro Tempo'},
    {title: 'Margem de Vitoria'},
    {title: 'Total de Gols 1º Tempo Par/Impar'},
    {title: 'Primeiro Tempo Ambas Marcam'},
    {title: 'Casa Vence Sem Levar Gol'},
    {title: 'Fora Vence Sem Levar Gol'},
    {title: 'Casa Marca Ambos os Tempos'},
    {title: 'Fora Marca Ambos os Tempos'},
    {title: 'Casa Quantidade Exata de Gols'},
    {title: 'Fora Quantidade Exata de Gols'},
    {title: 'Quem Marca o Primeiro Gol'},
    {title: 'Tempo Com Mais Gols'},
    {title: 'Quantidade Exata Gols Partida'},
    {title: 'Total Gols 2T'},
    {title: 'Total Gols Casa'},
    {title: 'Total Gols 1T - Casa'},
    {title: 'Total Gols 1T - Fora'},
    {title: 'Casa Vence Algum Tempo'},
    {title: 'Fora Vence Algum Tempo'},
    {title: 'Vencedor do 1T/Total Gols 1T'},
    {title: 'Dupla Possibilidade/Ambas Marcam'},
    {title: 'Dupla Possibilidade 1T/Ambas Marcam 1T'},
    {title: 'Dupla Possibilidade 2T/Ambas Marcam 2T'},
    {title: 'Handicap de Gols (EUROPEU) - 2T'},
    {title: 'Quantidade Exata de Gols - 1T'},
    {title: 'Quem Cobrará o Primeiro Escanteio'},
    {title: 'Quem Cobrará o Primeiro Escanteio - 1T'},
    {title: 'Faixa total escanteios - Casa'},
    {title: 'Faixa total escanteios - Fora'},
    {title: 'Faixa total escanteios - Casa - 1T'},
    {title: 'Faixa total escanteios - Fora - 1T'},
    {title: 'Time com mais escanteios'},
    {title: 'Time com mais escanteios - 1T'},
    {title: 'Faixa de escanteios'},
    {title: 'Faixa de escanteios - 1T'},
    {title: 'Quem cobrará o último escanteio'},
    {title: 'Quem cobrará o último escanteio - 1T'},
];

const api = axios.create({
    //baseURL: "http://127.0.0.1:8000"
    baseURL: "https://footballdjango.herokuapp.com"
});

api.interceptors.request.use(async config => {


    config.headers.Authorization = `Token 88c3f466365e3346c236c65d703892cefcadb49b`;

    return config;
});


export {cotacao, api};
