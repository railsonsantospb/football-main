// https://restcountries.eu/data/afg.svg
// http://www.geognos.com/api/en/countries/flag/AI.png
// https://restcountries.eu/data/bra.svg
// https://restcountries.eu/rest/v2/all

import axios from 'axios';


const api = axios.create({
    //baseURL: "http://127.0.0.1:8000"
    baseURL: "https://footballdjango.herokuapp.com"
});

api.interceptors.request.use(async config => {


    config.headers.Authorization = `Token 88c3f466365e3346c236c65d703892cefcadb49b`;

    return config;
});


async function getAdminAPI() {

    api.get('/api/getadmin')
        .then(res => {
            try {
                if (res.data) {
                    // console.log(res.data);
                    sessionStorage.setItem('limiteApostaGeral', res.data.admin[0].limiteApostaGeral);
                    sessionStorage.setItem('limiteApostaSimples', res.data.admin[0].limiteApostaSimples);
                    sessionStorage.setItem('configTime', res.data.admin[0].configTime);

                }
            } catch (e) {

            }
        }).catch(error => {
        console.log(error)
    });

}

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


export {api};
