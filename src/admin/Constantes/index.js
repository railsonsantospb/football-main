

// https://restcountries.eu/data/afg.svg
// http://www.geognos.com/api/en/countries/flag/AI.png
// https://restcountries.eu/data/bra.svg
// https://restcountries.eu/rest/v2/all
import World from "../Home/world.jpg";
import Taca from "../Home/taca.jpg";
import axios from 'axios';

const images = {
    "37": ["https://restcountries.eu/data/prt.svg", [], [], []],
    "12": ["https://restcountries.eu/data/cze.svg", [], []],
    "14": ["https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg", [], [], []],
    "20": ["https://restcountries.eu/data/ita.svg", [], [], []],
    "28": ["https://restcountries.eu/data/esp.svg", [], [], []],
    "22": ["https://restcountries.eu/data/pol.svg", [], [], []],
    "18": ["https://restcountries.eu/data/grc.svg", [], [], []],
    "17": ["https://restcountries.eu/data/deu.svg", [], [], []],
    "35": ["https://restcountries.eu/data/bel.svg", [], [], []],
    "25": ["https://restcountries.eu/data/rus.svg", [], [], []],
    "60": ["https://restcountries.eu/data/aus.svg", [], [], []],
    "136": ["https://restcountries.eu/data/irn.svg", [], [], []],
    "231": ["https://restcountries.eu/data/srb.svg", [], [], []],
    "36": ["https://restcountries.eu/data/nld.svg", [], [], []],
    "16": ["https://restcountries.eu/data/fra.svg", [], [], []],
    "45": ["https://restcountries.eu/data/col.svg", [], [], []],
    "24": ["https://restcountries.eu/data/rou.svg", [], [], []],
    "8": ["https://restcountries.eu/data/aut.svg", [], [], []],
    "198": ["https://restcountries.eu/data/kor.svg", [], [], []],
    "93": ["https://restcountries.eu/data/cmr.svg", [], [], []],
    "38": ["https://restcountries.eu/data/arg.svg", [], [], []],
    "48": ["https://restcountries.eu/data/pry.svg", [], [], []],
    "104": ["https://restcountries.eu/data/cri.svg", [], [], []],
    "33": ["https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png", [], [], []],
    "50": ["https://restcountries.eu/data/hrv.svg", [], [], []],
    "13": ["https://restcountries.eu/data/dnk.svg", [], [], []],
    "210": ["https://restcountries.eu/data/tha.svg", [], [], []],
    "214": ["https://restcountries.eu/data/tun.svg", [], [], []],
    "176": ["https://restcountries.eu/data/nga.svg", [], [], []],
    "31": ["https://restcountries.eu/data/tur.svg", [], [], []],
    "152": ["https://restcountries.eu/data/lux.svg", [], [], []],
    "43": ["https://restcountries.eu/data/mex.svg", [], [], []],
    "47": ["https://restcountries.eu/data/ury.svg", [], [], []],
    "110": ["https://restcountries.eu/data/ecu.svg", [], [], []],
    "49": ["https://restcountries.eu/data/isl.svg", [], [], []],
    "66": ["https://restcountries.eu/data/mys.svg", [], [], []],
    "58": ["https://restcountries.eu/data/cyp.svg", [], [], []],
    "186": ["https://restcountries.eu/data/qat.svg", [], [], []],
    "30": ["https://restcountries.eu/data/che.svg", [], [], []],
    "52": ["https://restcountries.eu/data/jpn.svg", [], [], []],
    "27": ["https://restcountries.eu/data/svn.svg", [], [], []],
    "63": ["https://restcountries.eu/data/bgr.svg", [], [], []],
    "29": ["https://restcountries.eu/data/swe.svg", [], [], []],
    "55": ["https://restcountries.eu/data/blr.svg", [], [], []],
    "79": ["https://restcountries.eu/data/bhr.svg", [], [], []],
    "53": ["https://restcountries.eu/data/ukr.svg", [], [], []],
    "112": ["https://restcountries.eu/data/slv.svg", [], [], []],
    "182": ["https://restcountries.eu/data/pan.svg", [], [], []],
    "219": ["https://restcountries.eu/data/are.svg", [], [], []],
    "61": ["https://restcountries.eu/data/est.svg", [], [], []],
    "237": ["https://restcountries.eu/data/kos.svg", [], [], []],
    "116": ["https://restcountries.eu/data/fro.svg", [], [], []],
    "151": ["https://restcountries.eu/data/ltu.svg", [], [], []],
    "111": ["https://restcountries.eu/data/egy.svg", [], [], []],
    "141": ["https://restcountries.eu/data/ken.svg", [], [], []],
    "174": ["https://restcountries.eu/data/nic.svg", [], [], []],
    "121": ["https://restcountries.eu/data/gmb.svg", [], [], []],
    "166": ["https://restcountries.eu/data/mar.svg", [], [], []],
    "209": ["https://restcountries.eu/data/tza.svg", [], [], []],
    "51": ["https://restcountries.eu/data/svk.svg", [], [], []],
    "62": ["https://restcountries.eu/data/isr.svg", [], [], []],
    "65": ["https://restcountries.eu/data/irl.svg", [], [], []],
    "197": ["https://restcountries.eu/data/zaf.svg", [], [], []],
    "140": ["https://restcountries.eu/data/kaz.svg", [], [], []],
    "134": ["https://restcountries.eu/data/ind.svg", [], [], []],
    "139": ["https://restcountries.eu/data/jor.svg", [], [], []],
    "127": ["https://restcountries.eu/data/gtm.svg", [], [], []],
    "19": ["https://restcountries.eu/data/hun.svg", [], [], []],
    "142": ["https://restcountries.eu/data/kwt.svg", [], [], []],
    "15": ["https://restcountries.eu/data/fin.svg", [], [], []],
    "26": ["https://www.countryflags.com/wp-content/uploads/scotland-flag-jpg-xl.jpg", [], [], []],
    "77": ["https://restcountries.eu/data/aze.svg", [], [], []],
    "218": ["https://restcountries.eu/data/uga.svg", [], [], []],
    "86": ["https://restcountries.eu/data/bih.svg", [], [], []],
    "164": ["https://restcountries.eu/data/bih.svg", [], [], []],
    "64": ["https://restcountries.eu/data/gbr.svg", [], [], []],
    "69": ["https://restcountries.eu/data/dza.svg", [], [], []],
    "133": ["https://restcountries.eu/data/hkg.svg", [], [], []],
    "59": ["https://restcountries.eu/data/per.svg", [], [], []],
    "224": ["https://restcountries.eu/data/vnm.svg", [], [], []],
    "44": ["https://restcountries.eu/data/bol.svg", [], [], []],
    "118": ["https://restcountries.eu/data/fji.svg", [], [], []],
    "54": ["https://restcountries.eu/data/sgp.svg", [], [], []],
    "195": ["https://restcountries.eu/data/slb.svg", [], [], []],
    "232": ["https://restcountries.eu/data/mne.svg", [], [], []],
    "145": ["https://restcountries.eu/data/lva.svg", [], [], []],
    "192": ["https://restcountries.eu/data/sen.svg", [], [], []],
    "221": ["https://restcountries.eu/data/uzb.svg", [], [], []],
    "154": ["https://restcountries.eu/data/mkd.svg", [], [], []],
    "158": ["https://restcountries.eu/data/mli.svg", [], [], []],
    "181": ["https://restcountries.eu/data/pse.svg", [], [], []],
    "122": ["https://restcountries.eu/data/geo.svg", [], [], []],
    "191": ["https://restcountries.eu/data/sau.svg", [], [], []],
    "23": ["https://restcountries.eu/data/irl.svg", [], [], []],
    "132": ["https://restcountries.eu/data/hnd.svg", [], [], []],
    "56": ["https://restcountries.eu/data/chl.svg", [], [], []],
    "206": ["https://restcountries.eu/data/syr.svg", [], [], []],
    "80": ["https://restcountries.eu/data/bgd.svg", [], [], []],
    "226": ["https://www.countryflags.com/wp-content/uploads/zambia-flag-png-large.png", [], [], []],
    "105": ["https://www.countryflags.com/wp-content/uploads/cote-d-ivoire-flag-png-large.png", [], [], []],
    "135": ["https://www.countryflags.com/wp-content/uploads/indonesia-flag-png-large.png", [], [], []],
    "173": ["https://www.countryflags.com/wp-content/uploads/new-zealand-flag-png-large.png", [], [], []],
    "123": ["https://www.countryflags.com/wp-content/uploads/ghana-flag-png-large.png", [], [], []],
    "57": ["https://www.countryflags.com/wp-content/uploads/china-flag-png-large.png", [], [], []],
    "75": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-8-1536x768.jpg", [], [], []],
    "99": ["https://www.countryflags.com/wp-content/uploads/taiwan-flag-png-large.png", [], [], []],
    "39": ["https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", [], [], []],
    "115": ["https://www.countryflags.com/wp-content/uploads/ethiopia-flag-png-large.png", [], [], []],
    "238": [Taca, [], [], []],
    "6": [World, [], [], []],
};

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
  {title: 'Handicap de Gols (EUROPEU) – 2T'},
  {title: 'Quantidade Exata de Gols – 1T'},
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
  baseURL: "http://127.0.0.1:8000"
  //baseURL: "https://footballdjango.herokuapp.com"
});

api.interceptors.request.use(async config => {


  config.headers.Authorization = `Token 28c0aa47fa1048fbb2bc13bfa7df3d1b37be873a`;

  return config;
});


const weeks = {
    "0": "Domingo",
    "1": "Segunda-Feira",
    "2": "Terça-Feira",
    "3": "Quarta-Feira",
    "4": "Quinta-Feira",
    "5": "Sexta-Feira",
    "6": "Sábado",
}

const auxCountry = [33, 42, 6, 7, 9, 14, 20, 28, 17, 36, 16, 37];
const auxItens = [33, 6, 14, 20, 28, 17, 36, 16, 37];
const regions = ['BRA', 'EUR', 'ENG', 'ITA', 'FRA', 'ESP', 'GER', 'POR', 'TUR', 'NED', 'DEN', 'WRL', 'S-A', 'EUR'];

const cc = require('coupon-code');


if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
   
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
 
      window.event.returnValue = false;
    });
  }



export {auxCountry, weeks, images, auxItens, cc, regions, cotacao, api};