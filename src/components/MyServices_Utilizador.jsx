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
import { Helmet } from "react-helmet";
import emailjs from 'emailjs-com';

class MyServices_Utilizador extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {

        $(document).ready(function () {

            var table = $('#tableInfo').DataTable({
                "columns": [
                    { "data": "numeroServico" },
                    { "data": "nomePrestador" },
                    { "data": "contactoPrestador" },
                    { "data": "observacoes" },
                    { "data": "dataDoPedido" },
                    { "data": "dataHoraInicio" },
                    { "data": "dataHoraFim" },
                    { "data": "tipoServico" },
                    { "data": "tipoPagamento" },
                    { "data": "acoes" },
                    { "data": "avaliarServico" }
                ],
                "order": [[1, 'asc']]
            });

            PreencherLinhasPrestadores(table);
            
            $("#example_paginate").css("font-size", "small");
            $(".dataTables_filter").css("font-size", "small");
            $(".dataTables_length").css("font-size", "small");
            $(".dataTables_info").css("font-size", "small");
            $(".sc-bQdQlF").css("justify-content", "center");

            $('#dropDownQuestion1').change(function (e) {
                $('#dropDownQuestion1').val() < 3 ? $('#divTextAreaQuestion1').show() : $('#divTextAreaQuestion1').hide();
            });

            $('#dropDownQuestion2').change(function (e) {
                $('#dropDownQuestion2').val() < 3 ? $('#divTextAreaQuestion2').show() : $('#divTextAreaQuestion2').hide();
            });

            $('#dropDownQuestion3').change(function (e) {
                $('#dropDownQuestion3').val() < 3 ? $('#divTextAreaQuestion3').show() : $('#divTextAreaQuestion3').hide();
            });

            $('#dropDownQuestion4').change(function (e) {
                $('#dropDownQuestion4').val() < 3 ? $('#divTextAreaQuestion4').show() : $('#divTextAreaQuestion4').hide();
            });

            $('#btnSubmitSurvey').click(function (e) {
                InserirAvaliacao();
                $('#modalSurveySatisfaction').modal('hide');
            });

            $('#btnSaveFile').click(function (e) 
            {
                   
            });

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

        function GetTimeNowStringFormat() {
            var m = new Date();
            return m.getUTCFullYear() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes();
        }

        function InserirAvaliacao(serviceId, prestId) {
            let randString = Math.random().toString(36).substring(7);

            const db = ReturnInstanceFirebase();

            db.collection("AvaliacaoServico")
                .doc(randString)
                .set({
                    utilizadorId: "g9tgom",
                    prestadorId: prestId,
                    servicoId: serviceId,
                    valorPrimeiraQuestao: $('#dropDownQuestion1').val(),
                    justiPrimeiraQuestao: $('#textAreaQuestion1').val(),
                    valorSegundaQuestao: $('#dropDownQuestion2').val(),
                    justiSegundaQuestao: $('#textAreaQuestion2').val(),
                    valorTerceiraQuestao: $('#dropDownQuestion3').val(),
                    justiTerceiraQuestao: $('#textAreaQuestion3').val(),
                    valorQuartaQuestao: $('#dropDownQuestion4').val(),
                    justiQuartaQuestao: $('#textAreaQuestion4').val(),
                    dataDeInsercao: GetTimeNowStringFormat()
                })
                .then(() => {
                    alert("Document successfully written!");
                })
                .catch((error) => {
                    alert("Error writing document: ", error);
                });
        }

        function PreencherLinhasPrestadores(table) {

            const db = ReturnInstanceFirebase();

            db.collection("PedidosServico")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        table.row.add({
                            "numeroServico": CheckIsNull(doc.data().numeroServico),
                            "nomePrestador": "Ricardo Jorge Ferreira",
                            "contactoPrestador": "910 000 000",
                            "observacoes": CheckIsNull(doc.data().observacoes),
                            "dataDoPedido": CheckIsNull(doc.data().dataPedido),
                            "dataHoraInicio": CheckIsNull(doc.data().dataHoraInicio).replace('T', '&nbsp;'),
                            "dataHoraFim": CheckIsNull(doc.data().dataHoraFim).replace('T', '&nbsp;'),
                            "tipoServico": CheckIsNull(doc.data().tipoServico),
                            "tipoPagamento": CheckIsNull(doc.data().tipoPagamento),
                            "acoes": '<select class="form-control" id="actionService_' + CheckIsNull(doc.data().numeroServico) + '"' + ReadOnly(doc.data().estado) + '>' +
                                '<option checked>Selecionar</option>' +
                                '<option>Remarcado</option>' +
                                '<option>Cancelado P/ prestador</option>' +
                                '<option>Cancelado P/ utilizador</option>' +
                                '<option>Terminado</option>' +
                                '</select>',
                            "avaliarServico": '<button type="button" id="btnAvaliarServico_' + doc.data().numeroServico + '_' + doc.data().prestadorId + '" class="btn btn-light">Avaliar</button>'
                        }).draw();
                    });

                    $('button[id^="btnAvaliarServico"]').click(function (e) {

                        $('#modalInvoices').modal('show');
                        $('#inv_Cli_Nome').html('Ricardo Jorge Ferreira');
                        $('#inv_Cli_Rua').html('Rua da Estrela');
                        $('#inv_Cli_CodigoPostal').html('1700-245');
                        $('#inv_Localidade').html('Oeiras');
                        $('#inv_Cli_NIF').html('NIF: 291 123 121');

                        // $('#modalSurveySatisfaction').modal('show');
                    });

                    $('select[id^="actionService_"').change(function (e) {
                        var numeroServico = e.target.id.split('_')[1];
                        var accao = e.target.value;

                        if (accao == 'Remarcado') {
                            $('#divActionNovaDataHora').show();
                        } else {
                            $('#divActionNovaDataHora').hide();
                        }

                        $('#lblActionService').html(accao);
                        $('#lblNumeroService').html(numeroServico);
                        $('#modalConfirmAction').modal('show');
                    });

                    $('#confirmAction').click(function (e) {
                        var numeroServico = '#actionService_' + $('#lblNumeroService').text();

                        if ($('#lblActionService').html() == 'Remarcado' && $('#novaDataHora').val() == '') {
                            alert('Preencha a nova data do serviço');
                        }
                        else {
                            $(numeroServico).attr("disabled", true);
                            AtualizarEstadoDoDocumento(numeroServico.split('_')[1], $('#lblActionService').html());
                            $('#modalConfirmAction').modal('hide');
                        }
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function AtualizarEstadoDoDocumento(serviceId, newStatus) {
            const db = ReturnInstanceFirebase();

            var servicoReference = db.collection("PedidosServico").doc(serviceId);

            return servicoReference.update({
                "estadoUtilizador": newStatus
            })
                .then(() => {
                    alert("Document successfully updated!");
                })
                .catch((error) => {
                    alert("Error update: " + error);
                });
        }

        function ReadOnly(status) {
            return status != "" ? "readonly" : "";
        }

        function CheckIsNull(value) {
            return value != null ? value : "";
        }
    }

    render() {

        const styleDiv = {
            paddingTop: "100px",
            fontFamily: "Calibri"
        }

        const modalService = {
            paddingTop: "100px"
        }

        const modalServiceInvoice = {
            paddingTop: "80px"
        }

        const map = {
            height: "100%"
        }

        const tbody = {
            fontSize: "smaller"
        }

        const thead = {
            fontSize: "smaller",
            backgroundColor: "aliceblue"
        }

        const labelWithoutBold = {
            fontWeight: "normal"
        }

        return (
            <html>
                <head>
                    <Helmet>
                    </Helmet>
                </head>
                <body>

                    <div className="MainDiv" style={styleDiv}>

                        <div className="container">

                            <table id="tableInfo">
                                <thead style={thead}>
                                    <tr>
                                        <th>Número&nbsp;Serviço</th>
                                        <th>Nome&nbsp;Prestador</th>
                                        <th>Contacto&nbsp;Prestador</th>
                                        <th>Observações</th>
                                        <th>Pedido</th>
                                        <th>Inicio</th>
                                        <th>Fim</th>
                                        <th>Tipo&nbsp;de&nbsp;Serviço</th>
                                        <th>Tipo&nbsp;de&nbsp;Pagamento</th>
                                        <th>Ações&nbsp;do&nbsp;Serviço</th>
                                        <th>Avaliar&nbsp;Serviço</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody style={tbody}>

                                </tbody>

                            </table>

                        </div>

                        {/* Action Service */}
                        <div class="modal fade" id="modalConfirmAction" style={modalService} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Ação sobre serviço</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <label>Ação:&nbsp;</label>
                                        <label id="lblActionService" style={labelWithoutBold}></label>
                                        <br />
                                        <label>Número de serviço:&nbsp;</label>
                                        <label id="lblNumeroService" style={labelWithoutBold}></label>
                                        <br />
                                        <br />

                                        <div class="form-group" id="divActionNovaDataHora" style={{ display: "none" }}>
                                            <label>Nova data:&nbsp;</label>
                                            <input type="datetime-local" class="form-control" id="novaDataHora"></input>
                                        </div>
                                        <br />
                                        <label>Pretende avançar?</label>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                            <button type="button" class="btn btn-success" id="confirmAction">Confirmar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >

                        {/* Survey */}
                        <div class="modal fade" id="modalSurveySatisfaction" style={modalService} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-scrollable" role="document">
                                <div class="modal-content">

                                    <div class="modal-body">

                                        <div id="Question1">
                                            <div class="card" style={{ width: "28rem" }}>
                                                <div class="card-header" style={{ fontWeight: "bold" }}>
                                                    Cumprimento de prazos e assiduidade do prestador?
                                                </div>
                                                <select class="form-control" id="dropDownQuestion1" style={{ width: "15rem", marginLeft: "7em" }}>
                                                    <option checked>Selecionar</option>
                                                    <option value="1">Muito mau</option>
                                                    <option value="2">Mau</option>
                                                    <option value="3">Razoável</option>
                                                    <option value="4">Bom</option>
                                                    <option value="5">Muito bom</option>
                                                </select>
                                                <div id="divTextAreaQuestion1" style={{ display: "none", width: "24rem", marginLeft: "2em" }}>
                                                    <br />
                                                    <label>Descreva o motivo da sua insatisfação:</label>
                                                    <textarea class="form-control" id="textAreaQuestion1" style={{ resize: "none" }} rows="2"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <br />

                                        <div id="Question2">
                                            <div class="card" style={{ width: "28rem" }}>
                                                <div class="card-header" style={{ fontWeight: "bold" }}>
                                                    Higienização e cuidado na realização do serviço?
                                                </div>
                                                <select class="form-control" id="dropDownQuestion2" style={{ width: "15rem", marginLeft: "7em" }}>
                                                    <option checked>Selecionar</option>
                                                    <option value="1">Muito mau</option>
                                                    <option value="2">Mau</option>
                                                    <option value="3">Razoável</option>
                                                    <option value="4">Bom</option>
                                                    <option value="5">Muito bom</option>
                                                </select>
                                                <div id="divTextAreaQuestion2" style={{ display: "none", width: "24rem", marginLeft: "2em" }}>
                                                    <br />
                                                    <label>Descreva o motivo da sua insatisfação:</label>
                                                    <textarea class="form-control" id="textAreaQuestion2" style={{ resize: "none" }} rows="2"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <br />

                                        <div id="Question3">
                                            <div class="card" style={{ width: "28rem" }}>
                                                <div class="card-header" style={{ fontWeight: "bold" }}>
                                                    Relação qualidade/preço do serviço prestado?
                                                </div>
                                                <select class="form-control" id="dropDownQuestion3" style={{ width: "15rem", marginLeft: "7em" }}>
                                                    <option checked>Selecionar</option>
                                                    <option value="1">Muito mau</option>
                                                    <option value="2">Mau</option>
                                                    <option value="3">Razoável</option>
                                                    <option value="4">Bom</option>
                                                    <option value="5">Muito bom</option>
                                                </select>
                                                <div id="divTextAreaQuestion3" style={{ display: "none", width: "24rem", marginLeft: "2em" }}>
                                                    <br />
                                                    <label>Descreva o motivo da sua insatisfação:</label>
                                                    <textarea class="form-control" id="textAreaQuestion3" style={{ resize: "none" }} rows="2"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <br />

                                        <div id="Question4">
                                            <div class="card" style={{ width: "28rem" }}>
                                                <div class="card-header" style={{ fontWeight: "bold" }}>
                                                    Qual a probabilidade de recomendar o serviço do prestador?
                                                </div>
                                                <select class="form-control" id="dropDownQuestion4" style={{ width: "15rem", marginLeft: "7em" }}>
                                                    <option checked>Selecionar</option>
                                                    <option value="1">Não recomendaria</option>
                                                    <option value="2">Pouco provável</option>
                                                    <option value="3">Talvez</option>
                                                    <option value="4">Recomendaria</option>
                                                    <option value="5">Recomendaria de certeza</option>
                                                </select>
                                                <div id="divTextAreaQuestion4" style={{ display: "none", width: "24rem", marginLeft: "2em" }}>
                                                    <br />
                                                    <label>Descreva o motivo da sua insatisfação:</label>
                                                    <textarea class="form-control" id="textAreaQuestion4" style={{ resize: "none" }} rows="2"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <br />

                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" id="btnSubmitSurvey">Submeter avaliação</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Invoices */}
                        <div class="modal fade" id="modalInvoices" style={modalServiceInvoice} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">

                                    <div class="modal-body">


                                        <div id="invoice" class="invoice-box" style={{ fontFamily: "Calibri" }}>
                                            <table>
                                                <tr class="top">
                                                    <td colspan="2">
                                                        <table>
                                                            <tr>
                                                                <td class="title">
                                                                    <img src="src\resources\Logo_Completo.png" alt="Company logo" style={{ width: "100%", maxWidth: "300px" }} />
                                                                </td>

                                                                <td>
                                                                    Fatura Nº: dy3me3s<br />
									Emitida: março 27, 2021<br />
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>

                                                <tr class="information">
                                                    <td colspan="2">
                                                        <table>
                                                            <tr>
                                                                <td style={{ fontFamily: "Calibri" }}>
                                                                    CleaningHub, S.A.<br />
									                                ISCTE - Av. das Forças Armadas<br />
                                                                    1649-026, Lisboa<br />
                                                                    NIF: 500 00 0000
                                                                </td>

                                                                <td >
                                                                    <span id="inv_Cli_Nome" ></span><br />
                                                                    <span id="inv_Cli_Rua"></span><br />
                                                                    <span id="inv_Cli_CodigoPostal"></span>, <span id="inv_Localidade"></span><br />
                                                                    <span id="inv_Cli_NIF"></span><br />
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>

                                                <tr class="heading">
                                                    <td>Método de pagamento</td>

                                                    <td></td>
                                                </tr>

                                                <tr class="details">
                                                    <td>Transferência bancária</td>

                                                    <td>IBAN: PT50 0000 0321 0324 00023 0000 1</td>
                                                </tr>

                                                <tr class="heading">
                                                    <td>Serviço</td>

                                                    <td>Preço</td>
                                                </tr>

                                                <tr class="item last">
                                                    <td>Serviço de limpeza de escadas de prédio (12/04/2021 - 09:00/13:00)</td>

                                                    <td>20€ / hora</td>
                                                </tr>

                                                <tr class="total">
                                                    <td></td>

                                                    <td>Total: 80€</td>
                                                </tr>
                                            </table>

                                        </div>

                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" id="btnSendEmailWithInvoice">Enviar por e-mail</button>
                                            <button type="button" class="btn btn-primary" id="btnSaveFile">Gravar em PDF</button>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </body >
            </html >
        )
    }
}

export default MyServices_Utilizador