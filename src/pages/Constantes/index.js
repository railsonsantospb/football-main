// https://restcountries.eu/data/afg.svg
// http://www.geognos.com/api/en/countries/flag/AI.png
// https://restcountries.eu/data/bra.svg
// https://restcountries.eu/rest/v2/all
import World from "../Home/world.jpg";
import axios from 'axios';


const images = {
    "Brasil": ["https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png"],
    "Arábia Saudita": ["https://www.countryflags.com/wp-content/uploads/saudi-arabia-flag-png-large.png"],
    "Argentina": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-7-1536x963.jpg"],
    "Áustria": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-10-1536x1024.jpg"],
    "Bélgica": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-18-1536x1331.jpg"],
    "Bolívia": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-1536x1050.jpg"],
    "Bósnia e Herzegovina": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-22-1536x768.jpg"],
    "Bulgária": ["https://www.countryflags.com/wp-content/uploads/bulgaria-flag-png-large.png"],
    "Canadá": ["https://www.countryflags.com/wp-content/uploads/canada-flag-png-large.png"],
    "Catar": ["https://www.countryflags.com/wp-content/uploads/qatar-flag-png-large.png"],
    "Chile": ["https://www.countryflags.com/wp-content/uploads/chile-flag-png-large.png"],
    "Chipre": ["https://www.countryflags.com/wp-content/uploads/cyprus-flag-png-large.png"],
    "Colômbia": ["https://www.countryflags.com/wp-content/uploads/colombia-flag-png-large.png"],
    "Coreia do Sul": ["https://www.countryflags.com/wp-content/uploads/south-korea-flag-png-large.png"],
    "República da Coreia": ["https://www.countryflags.com/wp-content/uploads/south-korea-flag-png-large.png"],
    "Costa Rica": ["https://www.countryflags.com/wp-content/uploads/costa-rica-flag-png-large.png"],
    "Croácia": ["https://www.countryflags.com/wp-content/uploads/croatia-flag-png-large.png"],
    "Dinamarca": ["https://www.countryflags.com/wp-content/uploads/denmark-flag-png-large.png"],
    "Egito": ["https://www.countryflags.com/wp-content/uploads/egypt-flag-png-large.png"],
    "El Salvador": ["https://www.countryflags.com/wp-content/uploads/el-salvador-flag-png-large.png"],
    "Equador": ["https://www.countryflags.com/wp-content/uploads/ecuador-flag-png-large.png"],
    "Escócia": ["https://www.countryflags.com/wp-content/uploads/scotland-flag-jpg-xl-1536x1024.jpg"],
    "Eslovênia": ["https://www.countryflags.com/wp-content/uploads/slovenia-flag-png-large.png"],
    "Espanha": ["https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png"],
    "EUA": ["https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png"],
    "Estónia": ["https://www.countryflags.com/wp-content/uploads/estonia-flag-png-large.png"],
    "Estônia": ["https://www.countryflags.com/wp-content/uploads/estonia-flag-png-large.png"],
    "França": ["https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png"],
    "Geórgia": ["https://www.countryflags.com/wp-content/uploads/georgia-flag-jpg-xl.jpg"],
    "Grécia": ["https://www.countryflags.com/wp-content/uploads/greece-flag-png-large.png"],
    "Guatemala": ["https://www.countryflags.com/wp-content/uploads/guatemala-flag-png-large.png"],
    "Holanda": ["https://www.countryflags.com/wp-content/uploads/netherlands-flag-png-large.png"],
    "Honduras": ["https://www.countryflags.com/wp-content/uploads/honduras-flag-png-large.png"],
    "Hungria": ["https://www.countryflags.com/wp-content/uploads/hungary-flag-png-large.png"],
    "Índia": ["https://www.countryflags.com/wp-content/uploads/india-flag-png-large.png"],
    "Inglaterra": ["https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl-1536x922.jpg"],
    "Irã": ["https://www.countryflags.com/wp-content/uploads/iran-flag-png-large.png"],
    "Irlanda": ["https://www.countryflags.com/wp-content/uploads/ireland-flag-png-large.png"],
    "Irlanda do Norte": ["https://www.countryflags.com/wp-content/uploads/northern-ireland-flag-jpg-xl-1536x768.jpg"],
    "Israel": ["https://www.countryflags.com/wp-content/uploads/israel-flag-png-large.png"],
    "Itália": ["https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png"],
    "Japão": ["https://www.countryflags.com/wp-content/uploads/japan-flag-png-large.png"],
    "Jordânia": ["https://www.countryflags.com/wp-content/uploads/jordan-flag-png-large.png"],
    "Lituânia": ["https://www.countryflags.com/wp-content/uploads/lithuania-flag-png-large.png"],
    "Marrocos": ["https://www.countryflags.com/wp-content/uploads/morocco-flag-png-large.png"],
    "México": ["https://www.countryflags.com/wp-content/uploads/mexico-flag-png-large.png"],
    "Nicarágua": ["https://www.countryflags.com/wp-content/uploads/nicaragua-flag-png-large.png"],
    "Noruega": ["https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png"],
    "Omã": ["https://www.countryflags.com/wp-content/uploads/oman-flag-png-large.png"],
    "Panamá": ["https://www.countryflags.com/wp-content/uploads/panama-flag-png-large.png"],
    "Paraguai": ["https://www.countryflags.com/wp-content/uploads/paraguay-flag-png-large.png"],
    "Peru": ["https://www.countryflags.com/wp-content/uploads/peru-flag-png-large.png"],
    "Polônia": ["https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png"],
    "Polónia": ["https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png"],
    "Portugal": ["https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png"],
    "República Tcheca": ["https://www.countryflags.com/wp-content/uploads/czech-republic-flag-png-large.png"],
    "Romênia": ["https://www.countryflags.com/wp-content/uploads/romania-flag-png-large.png"],
    "Rússia": ["https://www.countryflags.com/wp-content/uploads/russia-flag-png-large.png"],
    "Sérvia": ["https://www.countryflags.com/wp-content/uploads/serbia-flag-png-large.png"],
    "Suécia": ["https://www.countryflags.com/wp-content/uploads/sweden-flag-png-large.png"],
    "Suíça": ["https://www.countryflags.com/wp-content/uploads/switzerland-flag-png-large.png"],
    "Turquia": ["https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png"],
    "Ucrânia": ["https://www.countryflags.com/wp-content/uploads/ukraine-flag-png-large.png"],
    "Uruguai": ["https://www.countryflags.com/wp-content/uploads/uruguay-flag-png-large.png"],
    "Venezuela": ["https://www.countryflags.com/wp-content/uploads/venezuela-flag-png-large.png"],
    "África do Sul": ["https://www.countryflags.com/wp-content/uploads/south-africa-flag-png-large.png"],
    "Alemanha": ["https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png"],
    "Eslováquia": ["https://www.countryflags.com/wp-content/uploads/slovakia-flag-png-large.png"],
    "Indonésia": ["https://www.countryflags.com/wp-content/uploads/indonesia-flag-png-large.png"],
    "Azerbaijão": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-11-1536x768.jpg"],
    "China": ["https://www.countryflags.com/wp-content/uploads/china-flag-png-large.png"],
    "Luxemburgo": ["https://www.countryflags.com/wp-content/uploads/luxembourg-flag-png-large.png"],
    "Macedônia do Norte": ["https://www.countryflags.com/wp-content/uploads/macedonia-flag-png-large.png"],
    "Macedónia do Norte": ["https://www.countryflags.com/wp-content/uploads/macedonia-flag-png-large.png"],
    "Malta": ["https://www.countryflags.com/wp-content/uploads/malta-flag-png-large.png"],
    "Moldávia": ["https://www.countryflags.com/wp-content/uploads/moldova-flag-png-large.png"],
    "Montenegro": ["https://www.countryflags.com/wp-content/uploads/montenegro-flag-png-large.png"],
    "País de Gales": ["https://www.countryflags.com/wp-content/uploads/wales-flag-jpg-xl-1536x912.jpg"],
    "Palestina": ["https://www.countryflags.com/wp-content/uploads/palestina-flag-jpg-xl-1536x768.jpg"],
    "Tailândia": ["https://www.countryflags.com/wp-content/uploads/thailand-flag-png-large.png"],
    "Hong Kong": ["https://www.countryflags.com/wp-content/uploads/hongkong-flag-jpg-xl-1536x1024.jpg"],
    "Austrália": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-9-1536x768.jpg"],
    "ad": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-4-1536x1075.jpg"],
    "Albânia": ["https://www.countryflags.com/wp-content/uploads/albania-albanian-flag-png-square-large.png"],
    "São Marino": ["https://www.countryflags.com/wp-content/uploads/san-marino-flag-png-large.png"],
    "Tunísia": ["https://www.countryflags.com/wp-content/uploads/tunisia-flag-png-large.png"],
    "Uzbequistão": ["https://www.countryflags.com/wp-content/uploads/uzbekistan-flag-png-large.png"],
    "Zimbábue": ["https://www.countryflags.com/wp-content/uploads/zimbabwe-flag-png-large.png"],
    "Andorra": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-4-1536x1075.jpg"],
    "Bahrein": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-13-1536x922.jpg"],
    "Bahrain": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-13-1536x922.jpg"],
    "Bielorrússia": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-16-1536x768.jpg"],
    "Armênia": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-8-1536x768.jpg"],
    "Botswana": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-23-1536x1024.jpg"],
    "Ruanda": ["https://www.countryflags.com/wp-content/uploads/rwanda-flag-png-large.png"],
    "Argélia": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-3-1536x1024.jpg"],
    "Camboja": ["https://www.countryflags.com/wp-content/uploads/cambodia-flag-png-large.png"],
    "Emirados Árabes Unidos": ["https://www.countryflags.com/wp-content/uploads/united-arab-emirates-flag-png-large.png"],
    "Kuwait": ["https://www.countryflags.com/wp-content/uploads/kuwait-flag-png-large.png"],
    "Kosovo": ["https://www.countryflags.com/wp-content/uploads/kosovo-flag-png-large.png"],
    "Libano": ["https://www.countryflags.com/wp-content/uploads/lebanon-flag-png-large.png"],
    "Rep. da Tanzânia": ["https://www.countryflags.com/wp-content/uploads/tanzania-flag-png-large.png"],
    "Gana": ["https://www.countryflags.com/wp-content/uploads/ghana-flag-png-large.png"],
    "Costa do Marfim": ["https://www.countryflags.com/wp-content/uploads/cote-d-ivoire-flag-png-large.png"],
    "Senegal": ["https://www.countryflags.com/wp-content/uploads/senegal-flag-png-large.png"],
    "Etiópia": ["https://www.countryflags.com/wp-content/uploads/ethiopia-flag-png-large.png"],

    "Internacional": [World],
};


const api = axios.create({

    //baseURL: "http://localhost:8000",
    baseURL: 'https://footballdjango.herokuapp.com/',


    //baseURL: "http://107.22.133.172:8000/"
});

api.interceptors.request.use(async config => {

    config.headers.Authorization = `Token 88c3f466365e3346c236c65d703892cefcadb49b`;


    return config;
});


const weeks = {
    "0": "DOMINGO",
    "1": "SEGUNDA-FEIRA",
    "2": "TERÇA-FEIRA",
    "3": "QUARTA-FEIRA",
    "4": "QUINTA-FEIRA",
    "5": "SEXTA-FEIRA",
    "6": "SÁBADO",
}


const auxCountry = [33, 42, 6, 7, 9, 14, 20, 28, 17, 36, 16, 37];
const auxItens = [33, 6, 14, 20, 28, 17, 36, 16, 37];
const regions = ['BRA', 'EUR', 'ENG', 'ITA', 'FRA', 'ESP', 'GER', 'POR', 'TUR', 'NED', 'DEN', 'WRL', 'S-A', 'EUR'];

const cc = require('coupon-code');


const nome_cotacoes = []

async function getAdminAPI() {

    api.get('/api/getadmin')
        .then(res => {
            try {
                if (res.data) {
                    //console.log(res.data);
                    sessionStorage.setItem('cotacaoAdmin', res.data.admin[0].cotacao);
                    sessionStorage.setItem('valorDeSaida', res.data.admin[0].valorDeSaida);
                    sessionStorage.setItem('valorDeEntrada', res.data.admin[0].valorDeEntrada);
                    sessionStorage.setItem('cotacaoAdminMin', res.data.admin[0].cotacaoMin);
                    sessionStorage.setItem('cotaMin', res.data.admin[0].cotaMin);
                    sessionStorage.setItem('cotaMax', res.data.admin[0].cotaMax);
                    sessionStorage.setItem('qtdJogos', res.data.admin[0].qtdJogos);
                    sessionStorage.setItem('configTime', res.data.admin[0].configTime);

                }
            } catch (e) {

            }
        }).catch(error => {
        console.log(error)
    });

}
sessionStorage.setItem('minutos', new Date().getMinutes());
getAdminAPI();

async function getDateAll() {
    api.get('/api/getdate').then(res => {

        try {
            console.log(res.data);
            sessionStorage.setItem('date', res.data.date);

        } catch (e) {
            console.log(e);
        }
    }).catch(error => {
        console.log(error)
    });
}

getDateAll();


export {auxCountry, weeks, images, auxItens, cc, regions, api, nome_cotacoes};
