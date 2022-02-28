import Table from "@material-ui/core/Table";
import {memo, useMemo} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";
import LockIcon from '@mui/icons-material/Lock';
import {images} from "../../Constantes/index";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import useWindowDimensions from '../../Size/index';



const html = <LockIcon style={{fontSize: 14}}/>;

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: 5,
    },
    body: {
        fontSize: 12,
        

    },
}))(TableCell);

const StyledTableCell2 = withStyles((theme) => ({
    head: {
        backgroundColor: 'red',
        color: theme.palette.common.white,
        padding: 5,
    },
    body: {
        fontSize: 12,


    },
}))(TableCell);


const Jogos = memo(function Jogos(props) {

    const {width} = useWindowDimensions();

    return (
        <TableContainer component={Paper} >
                                      
                                      
            {props.campeonato.length != 0 ? props.campeonato.prejogo.map((c) => (

            c.momentos.map((j) => ( 
                <Table stickyHeader aria-label="sticky table" >
                {width < 600 && c.countrys != '' ? <TableHead >
                    <TableRow>
                        <StyledTableCell
                                            id='font'><b><img src={images[c.pais]} style={{marginRight: 3}} width='30' height='22' />{c.pais}</b><br/></StyledTableCell>
                        <StyledTableCell align={"center"} style={{width: 5}}
                                            ><b>1</b></StyledTableCell>
                        <StyledTableCell align={"center"} style={{width: 5}}
                                            ><b>X</b></StyledTableCell>
                        <StyledTableCell align={"center"} style={{width: 5}}
                                            ><b>2</b></StyledTableCell>
                             
                        
                    </TableRow>
                </TableHead> : width < 600 ? <TableHead >
                    <TableRow>
                        <StyledTableCell2
                            id='font'><b>{c.nome}</b><br/></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 5}}
                        ><b></b></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 5}}
                        ><b></b></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 5}}
                        ><b></b></StyledTableCell2>


                    </TableRow>
                </TableHead> : c.countrys != '' ? <TableHead>
                    <TableRow>
                        <StyledTableCell
                                            id='font'><b><img src={images[c.pais]} style={{marginRight: 3}} width='30' height='22' />{c.pais}</b><br/></StyledTableCell>
                        <StyledTableCell align={"center"} style={{width: 15}}
                                            ><b>CASA</b></StyledTableCell>
                        <StyledTableCell align={"center"} style={{width: 15}}
                                            ><b>EMPATE</b></StyledTableCell>
                        <StyledTableCell align={"center"} style={{width: 15}}
                                            ><b>FORA</b></StyledTableCell>
                        <StyledTableCell align={"center"} style={{width: 15}}
                                            ><b>MAIS</b></StyledTableCell>
                    </TableRow> 
                </TableHead> : <TableHead >
                    <TableRow>
                        <StyledTableCell2
                                            id='font'><b>{c.nome}</b><br/></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 15}}
                                            ><b></b></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 15}}
                                            ><b></b></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 15}}
                                            ><b></b></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 15}}
                                            ><b></b></StyledTableCell2>
                    </TableRow> 
                </TableHead>}

                {c.countrys != '' && width > 600 ?  <TableHead >
                    <TableRow>
                        <StyledTableCell2
                                            id='font' ><b>{c.nome}</b><br/></StyledTableCell2>
                        <StyledTableCell2 align={"center"} 
                                            ><b></b></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 15}}
                                            ><b></b></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 15}}
                                            ><b></b></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 15}}
                                            ><b></b></StyledTableCell2>
                    </TableRow> 
                </TableHead> : ''}

                {c.countrys != '' && width < 600 ?  <TableHead >
                    <TableRow>
                        <StyledTableCell2
                            id='font'><b>{c.nome}</b><br/></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 5}}
                        ><b></b></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 5}}
                        ><b></b></StyledTableCell2>
                        <StyledTableCell2 align={"center"} style={{width: 5}}
                        ><b></b></StyledTableCell2>


                    </TableRow>
                </TableHead> : ''}
                
                
             
                <TableBody>
                
       
                {j.eventos.map((live, k) => (
                <TableRow id="zebra" key={k}> 
                <td class="times">  <a style={{textDecoration: 'none', color: 'black'}}
                href={"/#/maispre/" + live.id + '-' + live.data}>
                {live.casa} X {live.fora}
                </a>
                <p>  {((new Date(live.data).getDate() < 10
            ? "0" + new Date(live.data).getDate()
            : new Date(live.data).getDate()) +
            "/" +
            (Number(new Date(live.data).getMonth()) + 1 < 10
                ? "0" +
                (Number(new Date(live.data).getMonth()) + 1)
                : Number(new Date(live.data).getMonth()) + 1) +
            "/" +
            new Date(live.data).getFullYear() +
            " " +
            (new Date(live.data).getHours() < 10
                ? "0" + new Date(live.data).getHours()
                : new Date(live.data).getHours()) +
            ":" +
            (Number(new Date(live.data).getMinutes() + "") === 0
                ? "00"
                : Number(new Date(live.data).getMinutes() + "") >=
                10
                ? new Date(live.data).getMinutes() + ""
                : "0" + (new Date(live.data).getMinutes() + "")))}  </p> 
                </td>
                <td > 
                <b class="button" onClick={props.onClickHandler} data-item={('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                        live.subeventos[0].aposta : '') + "=" + "Vencedor do Encontro--"
                                    + live.subeventos[0].aposta + "=" +
                                    (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[0].aposta + live.subeventos[0].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                    + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                        'VencedordoEncontro' + live.subeventos[0].aposta : '') + "=" +
                                    (live.subeventos.length >= 3 ? (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[0].cotacao / 100) ?
                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                    parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                        ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                        live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                                        && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                            (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                    ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[0].cotacao / 100)) +
                                                parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                    ((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                    : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[0].cotacao / 100) ?
                                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                                    parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                        ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                        live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                                                        && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                            (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                    ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[0].cotacao / 100)) +
                                                                parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                                    ((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                    : html) : html)) :
                                    (live.subeventos[0].cotacao / 100).toFixed(2)) >
                                    parseFloat(sessionStorage.getItem('cotaMax')) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[0].cotacao / 100) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                        parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                            ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                            live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                                            && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                        ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[0].cotacao / 100)) +
                                                    parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                        ((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                        : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[0].cotacao / 100) ?
                                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                                        parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                            ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                            live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                                                            && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                                (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                        ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[0].cotacao / 100)) +
                                                                    parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                                        ((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                        : html) : html)) :
                                    (live.subeventos[0].cotacao / 100).toFixed(2)) : 0)
                                    + "=" + (live.casa + ' x ' + live.fora) + "="
                                    + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                    "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')}


                                    
                 id={(parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ?
                (live.subeventos.length >= 3 ?
                ('VencedordoEncontro' +
                live.subeventos[0].aposta +
                live.subeventos[0].idOpcao + live.id).replace(/[^0-9a-z]/gi, '') : '') : '')}> 
                <span id="vcasa" data-item={('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                        live.subeventos[0].aposta : '') + "=" + "Vencedor do Encontro--"
                                    + live.subeventos[0].aposta + "=" +
                                    (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[0].aposta + live.subeventos[0].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                    + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                        'VencedordoEncontro' + live.subeventos[0].aposta : '') + "=" +
                                    (live.subeventos.length >= 3 ? (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[0].cotacao / 100) ?
                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                    parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                        ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                        live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                                        && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                            (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                    ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[0].cotacao / 100)) +
                                                parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                    ((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                    : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[0].cotacao / 100) ?
                                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                                    parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                        ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                        live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                                                        && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                            (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                    ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[0].cotacao / 100)) +
                                                                parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                                    ((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                    : html) : html)) :
                                    (live.subeventos[0].cotacao / 100).toFixed(2)) >
                                    parseFloat(sessionStorage.getItem('cotaMax')) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[0].cotacao / 100) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                        parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                            ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                            live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                                            && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                        ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[0].cotacao / 100)) +
                                                    parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                        ((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                        : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[0].cotacao / 100) ?
                                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                                        parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                            ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                            live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                                                            && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                                (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                        ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[0].cotacao / 100)) +
                                                                    parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                                        ((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                        : html) : html)) :
                                    (live.subeventos[0].cotacao / 100).toFixed(2)) : 0)
                                    + "=" + (live.casa + ' x ' + live.fora) + "="
                                    + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                    "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')}>
                {(parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[0].cotacao / 100) ?
                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[0].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined &&
                props.cotacao['Vencedor do Encontro'] < 0 ?
                    ((live.subeventos[0].cotacao / 100) - (((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                    live.subeventos.length >= 3 && live.subeventos[0].cotacao > 0
                    && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                        (parseFloat((live.subeventos[0].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[0].cotacao / 100)) +
                            parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                ((live.subeventos[0].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                : html) : html)}</span>  </b></td> 

                <td >
                <b class="button" onClick={props.onClickHandler} data-item={('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                        live.subeventos[1].aposta : '') + "=" + "Vencedor do Encontro--"
                                    + live.subeventos[1].aposta + "=" +
                                    (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[1].aposta + live.subeventos[1].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                    + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                        'VencedordoEncontro' + live.subeventos[1].aposta : '') + "=" +
                                    (live.subeventos.length >= 3 ? (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[1].cotacao / 100) ?
                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                    parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                        ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                        live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                                        && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                            (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                    ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[1].cotacao / 100)) +
                                                parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                    ((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                    : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[1].cotacao / 100) ?
                                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                                    parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                        ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                        live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                                                        && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                            (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                    ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[1].cotacao / 100)) +
                                                                parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                                    ((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                    : html) : html)) :
                                    (live.subeventos[1].cotacao / 100).toFixed(2)) >
                                    parseFloat(sessionStorage.getItem('cotaMax')) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[1].cotacao / 100) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                        parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                            ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                            live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                                            && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                        ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[1].cotacao / 100)) +
                                                    parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                        ((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                        : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[1].cotacao / 100) ?
                                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                                        parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                            ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                            live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                                                            && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                                (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                        ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[1].cotacao / 100)) +
                                                                    parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                                        ((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                        : html) : html)) :
                                    (live.subeventos[1].cotacao / 100).toFixed(2)) : 0)
                                    + "=" + (live.casa + ' x ' + live.fora) + "="
                                    + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                    "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')}

                id={(parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ?
                (live.subeventos.length >= 3 ?
                ('VencedordoEncontro' +
                live.subeventos[1].aposta +
                live.subeventos[1].idOpcao + live.id).replace(/[^0-9a-z]/gi, '') : '') : '')}>  
                <span id="vcasa" data-item={('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                        live.subeventos[1].aposta : '') + "=" + "Vencedor do Encontro--"
                                    + live.subeventos[1].aposta + "=" +
                                    (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[1].aposta + live.subeventos[1].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                    + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                        'VencedordoEncontro' + live.subeventos[1].aposta : '') + "=" +
                                    (live.subeventos.length >= 3 ? (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[1].cotacao / 100) ?
                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                    parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                        ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                        live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                                        && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                            (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                    ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[1].cotacao / 100)) +
                                                parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                    ((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                    : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[1].cotacao / 100) ?
                                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                                    parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                        ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                        live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                                                        && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                            (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                    ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[1].cotacao / 100)) +
                                                                parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                                    ((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                    : html) : html)) :
                                    (live.subeventos[1].cotacao / 100).toFixed(2)) >
                                    parseFloat(sessionStorage.getItem('cotaMax')) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[1].cotacao / 100) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                        parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                            ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                            live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                                            && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                        ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[1].cotacao / 100)) +
                                                    parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                        ((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                        : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[1].cotacao / 100) ?
                                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                                        parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                            ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                            live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                                                            && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                                (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                        ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[1].cotacao / 100)) +
                                                                    parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                                        ((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                                        : html) : html)) :
                                    (live.subeventos[1].cotacao / 100).toFixed(2)) : 0)
                                    + "=" + (live.casa + ' x ' + live.fora) + "="
                                    + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                    "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')}>
                {(parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[1].cotacao / 100) ?
                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[1].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                    ((live.subeventos[1].cotacao / 100) - (((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                    live.subeventos.length >= 3 && live.subeventos[1].cotacao > 0
                    && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                        (parseFloat((live.subeventos[1].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[1].cotacao / 100)) +
                            parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                ((live.subeventos[1].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                : html) : html)}</span>  </b></td>

                <td > 
                <b class="button" onClick={props.onClickHandler} data-item={('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                        live.subeventos[2].aposta : '') + "=" + "Vencedor do Encontro--"
                                    + live.subeventos[2].aposta + "=" +
                                    (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[2].aposta + live.subeventos[2].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                    + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                        'VencedordoEncontro' + live.subeventos[2].aposta : '') + "=" +
                                    (live.subeventos.length >= 3 ? (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[2].cotacao / 100) ?
                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                    parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                        ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                        live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                                        && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                            (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                    ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[2].cotacao / 100)) +
                                                parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                    ((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                            : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[2].cotacao / 100) ?
                                            parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                            parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                                                && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                    (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                            ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[2].cotacao / 100)) +
                                                        parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                            ((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                    : html) : html)) :
                                    (live.subeventos[2].cotacao / 100).toFixed(2)) >
                                    parseFloat(sessionStorage.getItem('cotaMax')) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[2].cotacao / 100) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                        parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                            ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                            live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                                            && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                        ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[2].cotacao / 100)) +
                                                    parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                        ((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[2].cotacao / 100) ?
                                                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                                parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                    ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                    live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                                                    && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                        (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[2].cotacao / 100)) +
                                                            parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                                ((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                        : html) : html)) :
                                        (live.subeventos[2].cotacao / 100).toFixed(2)) : 0)
                                    + "=" + (live.casa + ' x ' + live.fora) + "="
                                    + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                    "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')}

                 id={(parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ?
                (live.subeventos.length >= 3 ?
                ('VencedordoEncontro' +
                live.subeventos[2].aposta +
                live.subeventos[2].idOpcao + live.id).replace(/[^0-9a-z]/gi, '') : '') : '')}> 
                <span id="vcasa" data-item={('Vencedor do Encontro:' + (live.subeventos.length >= 3 ?
                                        live.subeventos[2].aposta : '') + "=" + "Vencedor do Encontro--"
                                    + live.subeventos[2].aposta + "=" +
                                    (live.subeventos.length >= 3 ? ('VencedordoEncontro' + live.subeventos[2].aposta + live.subeventos[2].idOpcao).replace(/[^0-9a-z]/gi, '') : '')
                                    + "=" + live.id + "-" + (live.subeventos.length >= 3 ?
                                        'VencedordoEncontro' + live.subeventos[2].aposta : '') + "=" +
                                    (live.subeventos.length >= 3 ? (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[2].cotacao / 100) ?
                                    parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                    parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                        ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                        live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                                        && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                            (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                    ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[2].cotacao / 100)) +
                                                parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                    ((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                            : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[2].cotacao / 100) ?
                                            parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                            parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                                                && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                    (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                            ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[2].cotacao / 100)) +
                                                        parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                            ((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                    : html) : html)) :
                                    (live.subeventos[2].cotacao / 100).toFixed(2)) >
                                    parseFloat(sessionStorage.getItem('cotaMax')) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) : (Number.isInteger(parseInt((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[2].cotacao / 100) ?
                                        parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                        parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                            ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                            live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                                            && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                        ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[2].cotacao / 100)) +
                                                    parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                        ((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                : html) : html))) == true ? parseFloat((parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[2].cotacao / 100) ?
                                                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                                                parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                                                    ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                                                    live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                                                    && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                                                        (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                                                ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[2].cotacao / 100)) +
                                                            parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                                                ((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                                                        : html) : html)) :
                                        (live.subeventos[2].cotacao / 100).toFixed(2)) : 0)
                                    + "=" + (live.casa + ' x ' + live.fora) + "="
                                    + (c.pais + ': ' + c.nome) + "=" + new Date(live.data) + "=" +
                                    "Aberto" + "=" + 'Vencedor do Encontro' + "=" + live.id).replace(/'/g, '')}>
                {(parseFloat(sessionStorage.getItem('cotaMax')) < parseFloat(live.subeventos[2].cotacao / 100) ?
                parseFloat(sessionStorage.getItem('cotaMax')).toFixed(2) :
                parseFloat(sessionStorage.getItem('cotaMin')) <= (live.subeventos[2].cotacao / 100) ? (props.cotacao['Vencedor do Encontro'] != undefined && props.cotacao['Vencedor do Encontro'] < 0 ?
                    ((live.subeventos[2].cotacao / 100) - (((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) * -1)) :
                    live.subeventos.length >= 3 && live.subeventos[2].cotacao > 0
                    && (props.cotacao['Vencedor do Encontro'] != undefined ? props.cotacao['Vencedor do Encontro'][0] : true) == true ?
                        (parseFloat((live.subeventos[2].cotacao / 100) > parseFloat(sessionStorage.getItem('cotaMax'))
                                ? parseFloat(sessionStorage.getItem('cotaMax')) : (live.subeventos[2].cotacao / 100)) +
                            parseFloat(props.cotacao['Vencedor do Encontro'] != undefined ?
                                ((live.subeventos[2].cotacao / 100) * (props.cotacao['Vencedor do Encontro'][1] / 100)) : 0)).toFixed(2)
                        : html) : html)}</span> </b></td> 

                <td id="ocultar" ><a href={"/#/maispre/" + live.id + '-' + live.data}
                class="buttonM"><p style={{fontSize: 26}}> + </p></a></td>
                </TableRow>))}</TableBody></Table>)))) : <h2 style={{textAlign: 'center'}}>Carregando...</h2>}
                
            
            
        </TableContainer>
    );
});

export default Jogos;