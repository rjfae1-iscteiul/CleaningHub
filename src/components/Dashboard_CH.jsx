import React from 'react';
import firebase from 'firebase';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import 'bootstrap';
import 'react-rater/lib/react-rater.css';

class Dashboard_CH extends React.Component {

    componentDidMount() {

        $(document).ready(function () {
            NumeroUtilizadores();
            NumeroPrestadores();
            NumeroEPagamentosServicos();
            EstadosServicos();
            AvalicoesServicos();
            TaxasServicos();
        });

        function ReturnInstanceFirebase() {
            var config =
            {
                apiKey: "AIzaSyB2t8aMWPcQFGCKCy-TzAW_WsA-vm37VrQ",
                authDomain: "cleaninghub-23a2c.firebaseapp.com",
                databaseURL: "https://cleaninghub-23a2c-default-rtdb.firebaseio.com",
                projectId: "cleaninghub-23a2c",
                storageBucket: "cleaninghub-23a2c.appspot.com",
                messagingSenderId: "967816808845",
                appId: "1:967816808845:web:2fba9803b8bbafff38d5c4",
                measurementId: "G-MMCZ5W595Q"
            };

            if (!firebase.apps.length) {
                firebase.initializeApp(config);
            }
            else {
                firebase.app();
            }
            return firebase.firestore();
        }

        function NumeroUtilizadores() {

            const db = ReturnInstanceFirebase();

            db.collection("Utilizadores")
                .get()
                .then((querySnapshot) => {
                    var label = $('#ind_ger_indicator1').html();
                    $('#ind_ger_indicator1').html(label + querySnapshot.size);
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function NumeroPrestadores() {

            const db = ReturnInstanceFirebase();

            db.collection("Prestadores")
                .get()
                .then((querySnapshot) => {
                    var label = $('#ind_ger_indicator1').html();
                    $('#ind_ger_indicator1').html(label + ' / ' + ValueIsNan(querySnapshot.size));
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function NumeroEPagamentosServicos() {

            const db = ReturnInstanceFirebase();

            db.collection("PedidosServico")
                .get()
                .then((querySnapshot) => {
                    var iban = 0;
                    var mbway = 0;
                    var cc = 0;

                    var label2 = $('#ind_ger_indicator2').html();
                    $('#ind_ger_indicator2').html(label2 + ValueIsNan(querySnapshot.size));

                    querySnapshot.forEach((doc) => {
                        switch (doc.data().tipoPagamento) {
                            case "Transferência bancária":
                                iban++;
                                break;
                            case "MB Way":
                                mbway++;
                                break;
                            case "Cartão de crédito":
                                cc++;
                                break;
                            default:
                                break;
                        }
                    })

                    var label3 = $('#ind_ger_indicator3').html();
                    $('#ind_ger_indicator3').html(label3 + iban + ' / ' + ValueIsNan((iban/querySnapshot.size)*100).toFixed(2) + '%');

                    var label4 = $('#ind_ger_indicator4').html();
                    $('#ind_ger_indicator4').html(label4 + mbway + ' / ' + ValueIsNan((mbway/querySnapshot.size)*100).toFixed(2) + '%');

                    var label5 = $('#ind_ger_indicator5').html();
                    $('#ind_ger_indicator5').html(label5 + cc + ' / ' + ValueIsNan((cc/querySnapshot.size)*100).toFixed(2) + '%');
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function EstadosServicos() {

            const db = ReturnInstanceFirebase();

            db.collection("PedidosServico")
                .get()
                .then((querySnapshot) => 
                {
                    
                    var uti_remarcado = 0;
                    var uti_canceladoUtilizador = 0;
                    var uti_canceladoPrestador = 0;
                    var uti_terminado = 0;
                    var uti_semAcao = 0;

                    var pre_remarcado = 0;
                    var pre_canceladoUtilizador = 0;
                    var pre_canceladoPrestador = 0;
                    var pre_terminado = 0;
                    var pre_semAcao = 0;

                    querySnapshot.forEach((doc) => 
                    {
                        switch (doc.data().estadoUtilizador) 
                        {
                            case "Remarcado":
                                uti_remarcado++;
                                break;
                            case "Cancelado P/ utilizador":
                                uti_canceladoUtilizador++;
                                break;
                            case "Cancelado P/ prestador":
                                uti_canceladoPrestador++;
                                break;
                            case "Terminado":
                                uti_terminado++;
                                break;
                            default:
                                uti_semAcao++;
                                break;
                        }

                        switch (doc.data().estadoPrestador) 
                        {
                            case "Remarcado":
                                pre_remarcado++;
                                break;
                            case "Cancelado P/ utilizador":
                                pre_canceladoUtilizador++;
                                break;
                            case "Cancelado P/ prestador":
                                pre_canceladoPrestador++;
                                break;
                            case "Terminado":
                                pre_terminado++;
                                break;
                            default:
                                pre_semAcao++;
                                break;
                        }
                    })

                    /* UTILIZADOR */
                    var label_uti_1 = $('#ind_uti_indicador1').html();
                    $('#ind_uti_indicador1').html(label_uti_1 + uti_remarcado + ' / ' + ValueIsNan((uti_remarcado/querySnapshot.size)*100).toFixed(2) + '%');

                    var label_uti_2 = $('#ind_uti_indicador2').html();
                    $('#ind_uti_indicador2').html(label_uti_2 + uti_canceladoUtilizador + ' / ' + ValueIsNan((uti_canceladoUtilizador/querySnapshot.size)*100).toFixed(2) + '%');

                    var label_uti_3 = $('#ind_uti_indicador3').html();
                    $('#ind_uti_indicador3').html(label_uti_3 + uti_canceladoPrestador + ' / ' + ValueIsNan((uti_canceladoPrestador/querySnapshot.size)*100).toFixed(2) + '%');

                    var label_uti_4 = $('#ind_uti_indicador4').html();
                    $('#ind_uti_indicador4').html(label_uti_4 + uti_terminado + ' / ' + ValueIsNan((uti_terminado/querySnapshot.size)*100).toFixed(2) + '%');

                    var label_uti_5 = $('#ind_uti_indicador5').html();
                    $('#ind_uti_indicador5').html(label_uti_5 + uti_semAcao + ' / ' + ValueIsNan((uti_semAcao/querySnapshot.size)*100).toFixed(2) + '%');

                    /* PRESTADOR */
                    var label_pre_1 = $('#ind_pre_indicador1').html();
                    $('#ind_pre_indicador1').html(label_pre_1 + pre_remarcado + ' / ' + ValueIsNan((pre_remarcado/querySnapshot.size)*100).toFixed(2) + '%');

                    var label_pre_2 = $('#ind_pre_indicador2').html();
                    $('#ind_pre_indicador2').html(label_pre_2 + pre_canceladoUtilizador + ' / ' + ValueIsNan((pre_canceladoUtilizador/querySnapshot.size)*100).toFixed(2) + '%');

                    var label_pre_3 = $('#ind_pre_indicador3').html();
                    $('#ind_pre_indicador3').html(label_pre_3 + pre_canceladoPrestador + ' / ' + ValueIsNan((pre_canceladoPrestador/querySnapshot.size)*100).toFixed(2) + '%');

                    var label_pre_4 = $('#ind_pre_indicador4').html();
                    $('#ind_pre_indicador4').html(label_pre_4 + pre_terminado + ' / ' + ValueIsNan((pre_terminado/querySnapshot.size)*100).toFixed(2) + '%');

                    var label_pre_5 = $('#ind_pre_indicador5').html();
                    $('#ind_pre_indicador5').html(label_pre_5 + pre_semAcao + ' / ' + ValueIsNan((pre_semAcao/querySnapshot.size)*100).toFixed(2) + '%');
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function AvalicoesServicos() {

            const db = ReturnInstanceFirebase();

            db.collection("AvaliacaoServico")
                .get()
                .then((querySnapshot) => 
                {
                    var questao1 = 0;
                    var questao2 = 0;
                    var questao3 = 0;
                    var questao4 = 0;

                    querySnapshot.forEach((doc) => 
                    {
                        questao1 += parseInt(doc.data().valorPrimeiraQuestao);
                        questao2 += parseInt(doc.data().valorSegundaQuestao);
                        questao3 += parseInt(doc.data().valorTerceiraQuestao);
                        questao4 += parseInt(doc.data().valorQuartaQuestao);
                    })

                    var label1 = $('#ind_questao1').html();
                    $('#ind_questao1').html(label1 + ValueIsNan(questao1/querySnapshot.size).toFixed(2));

                    var label2 = $('#ind_questao2').html();
                    $('#ind_questao2').html(label2 + ValueIsNan(questao2/querySnapshot.size).toFixed(2));

                    var label3 = $('#ind_questao3').html();
                    $('#ind_questao3').html(label3 + ValueIsNan(questao3/querySnapshot.size).toFixed(2));

                    var label4 = $('#ind_questao4').html();
                    $('#ind_questao4').html(label4 + ValueIsNan(questao4/querySnapshot.size).toFixed(2));
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function ValueIsNan(result) 
        {
            return isNaN(result) ? 0 : result;
        }

        function TaxasServicos() 
        {
            const db = ReturnInstanceFirebase();

            db.collection("PedidosServico")
                .get()
                .then((querySnapshot) => 
                {
                    var taxa1 = 0;
                    var taxa2 = 0;
                    var taxa3 = 0;
                    var taxa4 = 0;

                    querySnapshot.forEach((doc) => 
                    {
                        if(parseInt(doc.data().precoTotal) < 100) 
                        {
                            taxa1 += parseInt(doc.data().precoTotal);
                        } 
                        else if(parseInt(doc.data().precoTotal) >= 100 && parseInt(doc.data().precoTotal) <= 200) 
                        {
                            taxa2 += parseInt(doc.data().precoTotal);
                        } 
                        else if(parseInt(doc.data().precoTotal) >= 200 && parseInt(doc.data().precoTotal) <= 300) 
                        {
                            taxa3 += parseInt(doc.data().precoTotal);
                        } 
                        else 
                        {
                            taxa4 += parseInt(doc.data().precoTotal);
                        }
                    })

                    var label1 = $('#ind_taxa1').html();
                    $('#ind_taxa1').html(label1 + ValueIsNan(taxa1) + '€ / ' + ValueIsNan(taxa1*0.075).toFixed(2) + '€');

                    var label2 = $('#ind_taxa2').html();
                    $('#ind_taxa2').html(label2 + ValueIsNan(taxa2) + '€ / ' + ValueIsNan(taxa2*0.10).toFixed(2) + '€');

                    var label3 = $('#ind_taxa3').html();
                    $('#ind_taxa3').html(label3 + ValueIsNan(taxa3) + '€ / ' + ValueIsNan(taxa3*0.125).toFixed(2) + '€');

                    var label4 = $('#ind_taxa4').html();
                    $('#ind_taxa4').html(label4 + ValueIsNan(taxa4) + '€ / ' + ValueIsNan(taxa4*0.15).toFixed(2) + '€');

                    var totalTaxas = (ValueIsNan(taxa1*0.075) + ValueIsNan(taxa2*0.10) + ValueIsNan(taxa3*0.1259) + ValueIsNan(taxa4*0.15)).toFixed(2);

                    var labelHeader = $('#cardIdIndicadoresFinanceiros').html();
                    $('#cardIdIndicadoresFinanceiros').html(labelHeader + ' - Total de taxas: ' + ValueIsNan(totalTaxas) + '€');

                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    }

    render() {

        const styleDiv = {
            fontFamily: "Calibri",
            fontSize: "large"
        }


        return (
            <div style={{
                position: 'absolute', left: '30%', top: '40%',
                transform: 'translate(-50%, -50%)'
              }}>
                    <div className="MainDiv" style={styleDiv}>

                        <div className="container">

                            <table>
                                <tr>
                                    <td style={{paddingRight:"1em",paddingBottom:"3em"}}>
                                        <div class="card" style={{ width: "28rem" }}>
                                            <div class="card-header" style={{ fontWeight: "bold" }}>
                                                Indicadores gerais
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item" id="ind_ger_indicator1">Número de utilizadores/prestadores:&nbsp;</li>
                                                <li class="list-group-item" id="ind_ger_indicator2">Número de serviços:&nbsp;</li>
                                                <li class="list-group-item" id="ind_ger_indicator3">Número de pagamentos com IBAN:&nbsp;</li>
                                                <li class="list-group-item" id="ind_ger_indicator4">Número de pagamentos com MbWay:&nbsp;</li>
                                                <li class="list-group-item" id="ind_ger_indicator5">Número de pagamentos com CC:&nbsp;</li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td style={{paddingRight:"1em", paddingBottom:"3em"}}>
                                        <div class="card" style={{ width: "29rem" }}>
                                            <div class="card-header" style={{ fontWeight: "bold" }}>
                                                Indicadores utilizadores
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item" id="ind_uti_indicador1">Número de serviços remarcados:&nbsp;</li>
                                                <li class="list-group-item" id="ind_uti_indicador2">Número de serviços cancelados P/ utilizador:&nbsp;</li>
                                                <li class="list-group-item" id="ind_uti_indicador3">Número de serviços cancelados P/ prestador:&nbsp;</li>
                                                <li class="list-group-item" id="ind_uti_indicador4">Número de serviços terminados:&nbsp;</li>
                                                <li class="list-group-item" id="ind_uti_indicador5">Número de serviços sem ação:&nbsp;</li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td style={{paddingRight:"1em",paddingBottom:"3em"}}>
                                        <div class="card" style={{ width: "29rem" }}>
                                            <div class="card-header" style={{ fontWeight: "bold" }}>
                                                Indicadores prestadores
                                </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item" id="ind_pre_indicador1">Número de serviços remarcados:&nbsp;</li>
                                                <li class="list-group-item" id="ind_pre_indicador2">Número de serviços cancelados P/ utilizador:&nbsp;</li>
                                                <li class="list-group-item" id="ind_pre_indicador3">Número de serviços cancelados P/ prestador:&nbsp;</li>
                                                <li class="list-group-item" id="ind_pre_indicador4">Número de serviços terminados:&nbsp;</li>
                                                <li class="list-group-item" id="ind_pre_indicador5">Número de serviços sem ação:&nbsp;</li>

                                            </ul>
                                        </div>
                                    </td>
                                <td>
                                        <div class="card" style={{ width: "28rem" }}>
                                            <div class="card-header" style={{ fontWeight: "bold" }}>
                                                Avaliação dos utilizadores sobre prestadores (0 a 5)
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item" id="ind_questao1">Questão 1 - Média:&nbsp;</li>
                                                <li class="list-group-item" id="ind_questao2">Questão 2 - Média:&nbsp;</li>
                                                <li class="list-group-item" id="ind_questao3">Questão 3 - Média:&nbsp;</li>
                                                <li class="list-group-item" id="ind_questao4">Questão 4 - Média:&nbsp;</li>
                                            </ul>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <div class="card" style={{ width: "28rem" }}>
                                            <div class="card-header" id="cardIdIndicadoresFinanceiros" style={{ fontWeight: "bold" }}>
                                                Indicadores financeiros
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item" id="ind_taxa1">(Taxa 7,5%) Serviços menos 100€:&nbsp;</li>
                                                <li class="list-group-item" id="ind_taxa2">(Taxa 10%) Serviços dos 100€ e os 200€:&nbsp;</li>
                                                <li class="list-group-item" id="ind_taxa3">(Taxa 12.5%) Serviços dos 200€ e os 300€:&nbsp;</li>
                                                <li class="list-group-item" id="ind_taxa4">(Taxa 15%) Serviços superiores a 300€:&nbsp;</li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <canvas id="myChart" width="400" height="400"></canvas>

                            </table>


                        </div>
                    </div >
                    </div>
        )
    }
}

export default Dashboard_CH