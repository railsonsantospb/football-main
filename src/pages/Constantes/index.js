

// https://restcountries.eu/data/afg.svg
// http://www.geognos.com/api/en/countries/flag/AI.png
// https://restcountries.eu/data/bra.svg
// https://restcountries.eu/rest/v2/all
import World from "../Home/world.jpg";
import Taca from "../Home/taca.jpg";
import axios from 'axios';




const images = {
  "Brasil": ["https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png"],
  "ao": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-5-1536x1024.jpg"],
  "Arábia Saudita": ["https://www.countryflags.com/wp-content/uploads/saudi-arabia-flag-png-large.png"],
  "Argentina": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-7-1536x963.jpg"],
  "am": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-8-1536x768.jpg"],
  "Áustria": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-10-1536x1024.jpg"],
  "Bélgica": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-18-1536x1331.jpg"],
  "by": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-16-1536x768.jpg"],
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
  "ae": ["https://www.countryflags.com/wp-content/uploads/united-arab-emirates-flag-png-large.png"],
  "Equador": ["https://www.countryflags.com/wp-content/uploads/ecuador-flag-png-large.png"],
  "Escócia": ["https://www.countryflags.com/wp-content/uploads/scotland-flag-jpg-xl-1536x1024.jpg"],
  "Eslovênia": ["https://www.countryflags.com/wp-content/uploads/slovenia-flag-png-large.png"],
  "Espanha": ["https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png"],
  "EUA": ["https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png"],
  "Estónia": ["https://www.countryflags.com/wp-content/uploads/estonia-flag-png-large.png"],
  "Estônia": ["https://www.countryflags.com/wp-content/uploads/estonia-flag-png-large.png"],
  "et": ["https://www.countryflags.com/wp-content/uploads/ethiopia-flag-png-large.png"],
  "eu": ["https://www.countryflags.com/wp-content/uploads/europe-flag-jpg-xl-1536x1024.jpg"],
  "fi": ["https://www.countryflags.com/wp-content/uploads/finland-flag-png-large.png"],
  "França": ["https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png"],
  "Geórgia": ["https://www.countryflags.com/wp-content/uploads/georgia-flag-jpg-xl.jpg"],
  "Grécia": ["https://www.countryflags.com/wp-content/uploads/greece-flag-png-large.png"],
  "Guatemala": ["https://www.countryflags.com/wp-content/uploads/guatemala-flag-png-large.png"],
  "Holanda": ["https://www.countryflags.com/wp-content/uploads/netherlands-flag-png-large.png"],
  "Honduras": ["https://www.countryflags.com/wp-content/uploads/honduras-flag-png-large.png"],
  "Hungria": ["https://www.countryflags.com/wp-content/uploads/hungary-flag-png-large.png"],
  "fo": ["https://www.countryflags.com/wp-content/uploads/faroe-islands-flag-jpg-xl-1536x999.jpg"],
  "Índia": ["https://www.countryflags.com/wp-content/uploads/india-flag-png-large.png"],
  "Inglaterra": ["https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl-1536x922.jpg"],
  "Irã": ["https://www.countryflags.com/wp-content/uploads/iran-flag-png-large.png"],
  "iq": ["https://www.countryflags.com/wp-content/uploads/iraq-flag-png-large.png"],
  "Irlanda": ["https://www.countryflags.com/wp-content/uploads/ireland-flag-png-large.png"],
  "Irlanda do Norte": ["https://www.countryflags.com/wp-content/uploads/northern-ireland-flag-jpg-xl-1536x768.jpg"],
  "Israel": ["https://www.countryflags.com/wp-content/uploads/israel-flag-png-large.png"],
  "Itália": ["https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png"],
  "Japão": ["https://www.countryflags.com/wp-content/uploads/japan-flag-png-large.png"],
  "Jordânia": ["https://www.countryflags.com/wp-content/uploads/jordan-flag-png-large.png"],
  "lv": ["https://www.countryflags.com/wp-content/uploads/latvia-flag-png-large.png"],
  "Lituânia": ["https://www.countryflags.com/wp-content/uploads/lithuania-flag-png-large.png"],
  "Marrocos": ["https://www.countryflags.com/wp-content/uploads/morocco-flag-png-large.png"],
  "México": ["https://www.countryflags.com/wp-content/uploads/mexico-flag-png-large.png"],
  "Nicarágua": ["https://www.countryflags.com/wp-content/uploads/nicaragua-flag-png-large.png"],
  "Noruega": ["https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png"],
  "Omã": ["https://www.countryflags.com/wp-content/uploads/oman-flag-png-large.png"],
  "Panamá": ["https://www.countryflags.com/wp-content/uploads/panama-flag-png-large.png"],
  "pk": ["https://www.countryflags.com/wp-content/uploads/pakistan-flag-png-large.png"],
  "Paraguai": ["https://www.countryflags.com/wp-content/uploads/paraguay-flag-png-large.png"],
  "Peru": ["https://www.countryflags.com/wp-content/uploads/peru-flag-png-large.png"],
  "Polônia": ["https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png"],
  "Polónia": ["https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png"],
  "Portugal": ["https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png"],
  "ke": ["https://www.countryflags.com/wp-content/uploads/kenya-flag-png-large.png"],
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
  "zm": ["https://www.countryflags.com/wp-content/uploads/zambia-flag-png-large.png"],
  "África do Sul": ["https://www.countryflags.com/wp-content/uploads/south-africa-flag-png-large.png"],
  "Alemanha": ["https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png"],
  "Eslováquia": ["https://www.countryflags.com/wp-content/uploads/slovakia-flag-png-large.png"],
  "sk": ["https://www.countryflags.com/wp-content/uploads/slovakia-flag-png-large.png"],
  "Indonésia": ["https://www.countryflags.com/wp-content/uploads/indonesia-flag-png-large.png"],
  "cw": ["https://www.countryflags.com/wp-content/uploads/curacao-flag-jpg-xl-1536x1024.jpg"],
  "Azerbaijão": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-11-1536x768.jpg"],
  "bz": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-19-1536x1024.jpg"],
  "bf": ["https://www.countryflags.com/wp-content/uploads/burkina-faso-flag-png-large.png"],
  "bi": ["https://www.countryflags.com/wp-content/uploads/burundi-flag-png-large.png"],
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
  "tz": ["https://www.countryflags.com/wp-content/uploads/tanzania-flag-png-large.png"],
  "Hong Kong": ["https://www.countryflags.com/wp-content/uploads/hongkong-flag-jpg-xl-1536x1024.jpg"],
  "fj": ["https://www.countryflags.com/wp-content/uploads/fiji-flag-png-large.png"],
  "kz": ["https://www.countryflags.com/wp-content/uploads/kazakhstan-flag-png-large.png"],
  "aw": ["https://www.countryflags.com/wp-content/uploads/aruba-flag-jpg-xl-1536x1024.jpg"],
  "Austrália": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-9-1536x768.jpg"],
  "ad": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-4-1536x1075.jpg"],
  "Albânia": ["https://www.countryflags.com/wp-content/uploads/albania-albanian-flag-png-square-large.png"],
  "São Marino": ["https://www.countryflags.com/wp-content/uploads/san-marino-flag-png-large.png"],
  "Tunísia": ["https://www.countryflags.com/wp-content/uploads/tunisia-flag-png-large.png"],
  "Uzbequistão": ["https://www.countryflags.com/wp-content/uploads/uzbekistan-flag-png-large.png"],
  "mr": ["https://www.countryflags.com/wp-content/uploads/mauritania-flag-jpg-xl-1536x1024.jpg"],
  "do": ["https://www.countryflags.com/wp-content/uploads/dominican-republic-flag-png-large.png"],
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


// const images = {
//   "37": ["https://restcountries.eu/data/prt.svg", [], [], []],
//   "12": ["https://restcountries.eu/data/cze.svg", [], []],
//   "14": ["https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg", [], [], []],
//   "20": ["https://restcountries.eu/data/ita.svg", [], [], []],
//   "28": ["https://restcountries.eu/data/esp.svg", [], [], []],
//   "22": ["https://restcountries.eu/data/pol.svg", [], [], []],
//   "18": ["https://restcountries.eu/data/grc.svg", [], [], []],
//   "17": ["https://restcountries.eu/data/deu.svg", [], [], []],
//   "35": ["https://restcountries.eu/data/bel.svg", [], [], []],
//   "25": ["https://restcountries.eu/data/rus.svg", [], [], []],
//   "60": ["https://restcountries.eu/data/aus.svg", [], [], []],
//   "136": ["https://restcountries.eu/data/irn.svg", [], [], []],
//   "231": ["https://restcountries.eu/data/srb.svg", [], [], []],
//   "36": ["https://restcountries.eu/data/nld.svg", [], [], []],
//   "16": ["https://restcountries.eu/data/fra.svg", [], [], []],
//   "45": ["https://restcountries.eu/data/col.svg", [], [], []],
//   "24": ["https://restcountries.eu/data/rou.svg", [], [], []],
//   "8": ["https://restcountries.eu/data/aut.svg", [], [], []],
//   "198": ["https://restcountries.eu/data/kor.svg", [], [], []],
//   "93": ["https://restcountries.eu/data/cmr.svg", [], [], []],
//   "38": ["https://restcountries.eu/data/arg.svg", [], [], []],
//   "48": ["https://restcountries.eu/data/pry.svg", [], [], []],
//   "104": ["https://restcountries.eu/data/cri.svg", [], [], []],
//   "33": ["https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png", [], [], []],
//   "50": ["https://restcountries.eu/data/hrv.svg", [], [], []],
//   "13": ["https://restcountries.eu/data/dnk.svg", [], [], []],
//   "210": ["https://restcountries.eu/data/tha.svg", [], [], []],
//   "214": ["https://restcountries.eu/data/tun.svg", [], [], []],
//   "176": ["https://restcountries.eu/data/nga.svg", [], [], []],
//   "31": ["https://restcountries.eu/data/tur.svg", [], [], []],
//   "152": ["https://restcountries.eu/data/lux.svg", [], [], []],
//   "43": ["https://restcountries.eu/data/mex.svg", [], [], []],
//   "47": ["https://restcountries.eu/data/ury.svg", [], [], []],
//   "110": ["https://restcountries.eu/data/ecu.svg", [], [], []],
//   "49": ["https://restcountries.eu/data/isl.svg", [], [], []],
//   "66": ["https://restcountries.eu/data/mys.svg", [], [], []],
//   "58": ["https://restcountries.eu/data/cyp.svg", [], [], []],
//   "186": ["https://restcountries.eu/data/qat.svg", [], [], []],
//   "30": ["https://restcountries.eu/data/che.svg", [], [], []],
//   "52": ["https://restcountries.eu/data/jpn.svg", [], [], []],
//   "27": ["https://restcountries.eu/data/svn.svg", [], [], []],
//   "63": ["https://restcountries.eu/data/bgr.svg", [], [], []],
//   "29": ["https://restcountries.eu/data/swe.svg", [], [], []],
//   "55": ["https://restcountries.eu/data/blr.svg", [], [], []],
//   "79": ["https://restcountries.eu/data/bhr.svg", [], [], []],
//   "53": ["https://restcountries.eu/data/ukr.svg", [], [], []],
//   "112": ["https://restcountries.eu/data/slv.svg", [], [], []],
//   "182": ["https://restcountries.eu/data/pan.svg", [], [], []],
//   "219": ["https://restcountries.eu/data/are.svg", [], [], []],
//   "61": ["https://restcountries.eu/data/est.svg", [], [], []],
//   "237": ["https://restcountries.eu/data/kos.svg", [], [], []],
//   "116": ["https://restcountries.eu/data/fro.svg", [], [], []],
//   "151": ["https://restcountries.eu/data/ltu.svg", [], [], []],
//   "111": ["https://restcountries.eu/data/egy.svg", [], [], []],
//   "141": ["https://restcountries.eu/data/ken.svg", [], [], []],
//   "174": ["https://restcountries.eu/data/nic.svg", [], [], []],
//   "121": ["https://restcountries.eu/data/gmb.svg", [], [], []],
//   "166": ["https://restcountries.eu/data/mar.svg", [], [], []],
//   "209": ["https://restcountries.eu/data/tza.svg", [], [], []],
//   "51": ["https://restcountries.eu/data/svk.svg", [], [], []],
//   "62": ["https://restcountries.eu/data/isr.svg", [], [], []],
//   "65": ["https://restcountries.eu/data/irl.svg", [], [], []],
//   "197": ["https://restcountries.eu/data/zaf.svg", [], [], []],
//   "140": ["https://restcountries.eu/data/kaz.svg", [], [], []],
//   "134": ["https://restcountries.eu/data/ind.svg", [], [], []],
//   "139": ["https://restcountries.eu/data/jor.svg", [], [], []],
//   "127": ["https://restcountries.eu/data/gtm.svg", [], [], []],
//   "19": ["https://restcountries.eu/data/hun.svg", [], [], []],
//   "142": ["https://restcountries.eu/data/kwt.svg", [], [], []],
//   "15": ["https://restcountries.eu/data/fin.svg", [], [], []],
//   "26": ["https://www.countryflags.com/wp-content/uploads/scotland-flag-jpg-xl.jpg", [], [], []],
//   "77": ["https://restcountries.eu/data/aze.svg", [], [], []],
//   "218": ["https://restcountries.eu/data/uga.svg", [], [], []],
//   "86": ["https://restcountries.eu/data/bih.svg", [], [], []],
//   "164": ["https://restcountries.eu/data/bih.svg", [], [], []],
//   "64": ["https://restcountries.eu/data/gbr.svg", [], [], []],
//   "69": ["https://restcountries.eu/data/dza.svg", [], [], []],
//   "133": ["https://restcountries.eu/data/hkg.svg", [], [], []],
//   "59": ["https://restcountries.eu/data/per.svg", [], [], []],
//   "224": ["https://restcountries.eu/data/vnm.svg", [], [], []],
//   "44": ["https://restcountries.eu/data/bol.svg", [], [], []],
//   "118": ["https://restcountries.eu/data/fji.svg", [], [], []],
//   "54": ["https://restcountries.eu/data/sgp.svg", [], [], []],
//   "195": ["https://restcountries.eu/data/slb.svg", [], [], []],
//   "232": ["https://restcountries.eu/data/mne.svg", [], [], []],
//   "145": ["https://restcountries.eu/data/lva.svg", [], [], []],
//   "192": ["https://restcountries.eu/data/sen.svg", [], [], []],
//   "221": ["https://restcountries.eu/data/uzb.svg", [], [], []],
//   "154": ["https://restcountries.eu/data/mkd.svg", [], [], []],
//   "158": ["https://restcountries.eu/data/mli.svg", [], [], []],
//   "181": ["https://restcountries.eu/data/pse.svg", [], [], []],
//   "122": ["https://restcountries.eu/data/geo.svg", [], [], []],
//   "191": ["https://restcountries.eu/data/sau.svg", [], [], []],
//   "23": ["https://restcountries.eu/data/irl.svg", [], [], []],
//   "132": ["https://restcountries.eu/data/hnd.svg", [], [], []],
//   "56": ["https://restcountries.eu/data/chl.svg", [], [], []],
//   "206": ["https://restcountries.eu/data/syr.svg", [], [], []],
//   "80": ["https://restcountries.eu/data/bgd.svg", [], [], []],
//   "226": ["https://www.countryflags.com/wp-content/uploads/zambia-flag-png-large.png", [], [], []],
//   "105": ["https://www.countryflags.com/wp-content/uploads/cote-d-ivoire-flag-png-large.png", [], [], []],
//   "135": ["https://www.countryflags.com/wp-content/uploads/indonesia-flag-png-large.png", [], [], []],
//   "173": ["https://www.countryflags.com/wp-content/uploads/new-zealand-flag-png-large.png", [], [], []],
//   "123": ["https://www.countryflags.com/wp-content/uploads/ghana-flag-png-large.png", [], [], []],
//   "57": ["https://www.countryflags.com/wp-content/uploads/china-flag-png-large.png", [], [], []],
//   "75": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-8-1536x768.jpg", [], [], []],
//   "99": ["https://www.countryflags.com/wp-content/uploads/taiwan-flag-png-large.png", [], [], []],
//   "39": ["https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png", [], [], []],
//   "115": ["https://www.countryflags.com/wp-content/uploads/ethiopia-flag-png-large.png", [], [], []],
//   "223": ["https://www.countryflags.com/wp-content/uploads/venezuela-flag-png-large.png", [], [], []],
//   "137": ["https://www.countryflags.com/wp-content/uploads/iraq-flag-png-large.png", [], [], []],
//   "91": ["https://www.countryflags.com/wp-content/uploads/burundi-flag-png-large.png", [], [], []],
//   "199": ["https://www.countryflags.com/wp-content/uploads/sri-lanka-flag-png-large.png", [], [], []],
//   "187": ["https://www.countryflags.com/wp-content/uploads/rwanda-flag-png-large.png", [], [], []],
//   "21": ["https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png", [], [], []],
//   "85": ["https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-21-2048x1365.jpg", [], [], []],
//   "156": ["https://cdn.countryflags.com/thumbs/malawi/flag-square-250.png", [], [], []],
//   "109": ["https://cdn.countryflags.com/thumbs/dominican-republic/flag-square-250.png", [], [], []],
//   "203": ["https://cdn.countryflags.com/thumbs/sudan/flag-square-250.png", [], [], []],
//   "153": ["https://cdn.countryflags.com/thumbs/macau/flag-square-250.png", [], [], []],
//   "131": ["https://cdn.countryflags.com/thumbs/haiti/flag-square-250.png", [], [], []],

//   "238": [Taca, [], [], []],
//   "6": [World, [], [], []],
// };




const api = axios.create({

    baseURL: "http://localhost:8000",
    //baseURL: 'https://footballdjango.herokuapp.com/',


    //baseURL: "http://107.22.133.172:8000/"
});

api.interceptors.request.use(async config => {

  config.headers.Authorization = `Token 28c0aa47fa1048fbb2bc13bfa7df3d1b37be873a`;
 


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


if (document.addEventListener) {
  document.addEventListener('contextmenu', function (e) {

    e.preventDefault();
  }, false);
} else {
  document.attachEvent('oncontextmenu', function () {

    window.event.returnValue = false;
  });
}

const nome_cotacoes = [

]

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
                  
              }   
          } catch (e) {

          }
      }).catch(error => {
          console.log(error)
      });

}

getAdminAPI();


export { auxCountry, weeks, images, auxItens, cc, regions, api, nome_cotacoes};