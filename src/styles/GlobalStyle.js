import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    cursor: pointer;
  }

  

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  ::-webkit-scrollbar-track {
    background-color: #F4F4F4;
  }
  ::-webkit-scrollbar {
      width: 10px;
      background: #F4F4F4;
  }
  ::-webkit-scrollbar-thumb {
      background: #000080;
  }

  #myTable {

    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
    font-size: 18px;
  }
  
  #myTable th, #myTable td {
    text-align: left;
    padding: 12px;
  }
  
  #myTable tr {
    border-bottom: 1px solid #ddd;
    font-size: 15px;
  }
  
  #myTable tr.header, #myTable tr:hover {
    background-color: #f1f1f1;
  }

  #myInput {
    background-image: url('/css/searchicon.png');
    background-position: 10px 10px;
    background-repeat: no-repeat;
    width: 100%;
    font-size: 16px;
    padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
  }

  .pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
  }
  
  .pagination a.active {
    background-color: dodgerblue;
    color: white;
  }
  
  .pagination a:hover:not(.active) {background-color: #ddd;}

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  #bets {
      display: none;
  }

  .button {
    background-color: #2237CF;
    border: none;
    color: white;
    width: 80px;
    padding: 10px 22px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    margin: 4px 2px;

  }




  .buttonM {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 2.9px 22px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 16px;
    border-radius: 8px;
    margin: 4px 2px;
    cursor: pointer;

  }

  tr:hover {
    background-color: #dddddd; 
  }

  tr#zebra td {
    border-bottom:1pt solid black;
  }

  td {
    padding: 5px;
  }

  .times {
    padding: 5px;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 15px;
  }

  .buttonPlus {
      background-color: #2237CF;
      border: none;
      color: white;
      width: 80px;
      padding: 10px 22px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
      margin: 4px 2px;

    }
 
  @media print {
    @page { size: auto auto; margin: 0; }
  }

  @media only screen and (max-width: 600px) {
    #ocultar {
      display: none;
    }
    #bets1 {
      
      display: block;
      padding: 10px 5px;
    }

    #bets2 {
      display: block;
      padding: 10px 5px;
      margin-top:-60px;
      margin-left:20px;
    }

    #bets3 {
      display: block;
      
      margin-top:-45px;
      margin-left: -28px;
    }
    #font {
      font-size: 12px;
    }

    .times {
      padding: 5px;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 12px;
    }

 



    .buttonPlus {
      background-color: #2237CF;
      border: none;
      color: white;
      width: 100%;
      padding: 10px 22px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
      margin: 4px 2px;

    }

  }
`;