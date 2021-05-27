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
import Logo_Completo from "../resources/Logo_Completo.png";
import swal from 'sweetalert';

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
                    { "data": "avaliarServico" },
                    { "data": "faturaServico" }
                ],
                "oLanguage": {
                    "sSearch": ""
                },
                "order": [[1, 'asc']]
            });

            table.on('click', 'button[id^="btnAvaliarServico"]', function (e) 
            {
                var serviceId = e.target.id.split('_')[1];
                var prestadorId = e.target.id.split('_')[2];

                $('#titleAvaliacao_Prestador').html('Código do prestador avaliado: <b>' + prestadorId + '</b>');
                $('#titleAvaliacao_Servico').html('Código do serviço avaliado: <b>' + serviceId + '</b>');

                $("#titleAvaliacao_Prestador").attr("name", prestadorId);
                $("#titleAvaliacao_Servico").attr("name", serviceId);

                $('#modalSurveySatisfaction').modal('show');
            });
            
            table.on('click', 'button[id^="btnFaturaServico"]', function (e) 
            {
                var numeroServico = e.target.id.split('_')[1];

                DadosParaFatura(numeroServico);
            });
            
            table.on('change', 'select[id^="actionService_"]', function (e) 
            {
                var numeroServico = e.target.id.split('_')[1];
                var accao = e.target.value;

                $('#novaDataHora').val('');

                if(accao != 'Selecionar') 
                {
                    if (accao == 'Remarcado') {
                        $('#divActionNovaDataHora').show();
                    } else {
                        $('#divActionNovaDataHora').hide();
                    }

                    $('#lblActionService').html(accao);
                    $('#lblNumeroService').html(numeroServico);
                    $('#modalConfirmAction').modal('show');
                }
            });

            $('div.dataTables_filter input').addClass('form-control');
            $("div.dataTables_filter input").attr("placeholder", "Procurar");

            PreencherLinhasPrestadores(table);

            $("#example_paginate").css("font-size", "small");
            $(".dataTables_filter").css("font-size", "small");
            $(".dataTables_length").css("font-size", "small");
            $(".dataTables_info").css("font-size", "small");

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

            $('#btnSubmitSurvey').click(function (e) 
            {
                if(!CheckOptionSurvey()) 
                {
                    SweetAlert('Alerta', 'Existem questões sem opção selecionada.', 'warning');
                } 
                else if(CheckMoreInformationSurvey(1) == false || CheckMoreInformationSurvey(2) == false || CheckMoreInformationSurvey(3) == false || CheckMoreInformationSurvey(4) == false) 
                {
                    SweetAlert('Alerta', 'Existem motivos de insatisfação por preenche.', 'warning');
                }
                else 
                {
                    SweetAlert('Suceso', 'Avaliação ao prestador submetida.', 'success');
                    InserirAvaliacao($('#titleAvaliacao_Servico').attr("name"), $('#titleAvaliacao_Prestador').attr("name"));
                    $('#modalSurveySatisfaction').modal('hide');
                }
            });

            $('#btnSaveFile').click(function (e) {
                window.print();
            });

        });
        
        function SendEmailRequestServic_Avaliacao(var_to_name, var_to_email, codServico, avalP1, avalP2, avalP3, avalP4, obsP1, obsP2, obsP3, obsP4) {
            emailjs.init("user_4DnQE5ZxKgvIrlmfLcC40");

            var templateParams =
            {
                to_name: var_to_name,
                to: var_to_email,
                codServico: codServico,
                avalP1: avalP1,
                avalP2: avalP2,
                avalP3: avalP3,
                avalP4: avalP4,
                obsP1: obsP1,
                obsP2: obsP2,
                obsP3: obsP3,
                obsP4: obsP4
            };

            emailjs.send('serviceId_CleaningHub', 'template_survey', templateParams)
                .then(function (response) {
                    console.log('Sucesso no envio do e-mail: SendEmailRequestServic_Avaliacao', response.status, response.text);
                }, function (error) {
                    console.log('Erro a enviar e-mail: SendEmailRequestServic_Avaliacao', error);
                });
        }

        function SendEmailRequestServic_AltEstServico(var_to_name, var_to_email, tipo, codServico, novoEstadoServico, novaDataServico) {
            emailjs.init("user_4DnQE5ZxKgvIrlmfLcC40");

            var templateParams =
            {
                to_name: var_to_name,
                to: var_to_email,
                tipo: tipo,
                codServico: codServico,
                novoEstadoServico: novoEstadoServico,
                novaDataServico: novaDataServico.replace('T', ' ')
            };

            emailjs.send('serviceId_CleaningHub', 'template_chngeSrvStatus', templateParams)
                .then(function (response) {
                    console.log('Sucesso no envio do e-mail: SendEmailRequestServic_AltEstServico', response.status, response.text);
                }, function (error) {
                    console.log('Erro a enviar e-mail: SendEmailRequestServic_AltEstServico', error);
                });
        }

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

            console.log('ServiceId: ' + serviceId);
            console.log('PrestadorId: ' + prestId);

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
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.log("Error writing document: ", error);
                });

                db.collection("Prestadores")
                .where("prestadorId", "==", prestId)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => 
                    {    
                        SendEmailRequestServic_Avaliacao(
                                                    doc.data().primeiroNome + ' ' + doc.data().segundoNome,
                                                    'rjfae1@iscte-iul.pt',
                                                    serviceId,
                                                    $('#dropDownQuestion1 option:selected').text(),
                                                    $('#dropDownQuestion2 option:selected').text(),
                                                    $('#dropDownQuestion3 option:selected').text(),
                                                    $('#dropDownQuestion4 option:selected').text(),
                                                    $('#textAreaQuestion1').val(),
                                                    $('#textAreaQuestion2').val(),
                                                    $('#textAreaQuestion3').val(),
                                                    $('#textAreaQuestion4').val()
                                                    );
                        });
                });
        }

        function PreencherLinhasPrestadores(table) {

            const db = ReturnInstanceFirebase();

            db.collection("PedidosServico")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => 
                    {                    
                        $('#titleTable').html('<u>Ecrã do utilizador Ricardo Ferreira com pedidos contratados</u>');

                        console.log(doc.data().prestadorId);

                        db.collection("Prestadores")
                        .where("prestadorId", "==", doc.data().prestadorId)
                        .get()
                        .then((querySnapshotPres) => 
                        {
                            querySnapshotPres.forEach((docPres) => 
                            {                
                                table.row.add({
                                    "numeroServico": CheckIsNull(doc.data().numeroServico),
                                    "nomePrestador": CheckIsNull(docPres.data().primeiroNome) + ' ' + CheckIsNull(docPres.data().segundoNome),
                                    "contactoPrestador": CheckIsNull(docPres.data().contactoTelefonico),
                                    "observacoes": CheckIsNull(doc.data().observacoes),
                                    "dataDoPedido": CheckIsNull(doc.data().dataPedido),
                                    "dataHoraInicio": CheckIsNull(doc.data().dataHoraInicio).replace('T', '&nbsp;'),
                                    "dataHoraFim": CheckIsNull(doc.data().dataHoraFim).replace('T', '&nbsp;'),
                                    "tipoServico": CheckIsNull(doc.data().tipoServico),
                                    "tipoPagamento": CheckIsNull(doc.data().tipoPagamento),
                                    "acoes": '<select class="form-control" id="actionService_' + CheckIsNull(doc.data().numeroServico) + '"' + ReadOnly(doc.data().estadoUtilizador) + '>' +
                                        '<option ' + Selected(doc.data().estadoUtilizador, "Selecionar") + '>Selecionar</option>' +
                                        '<option ' + Selected(doc.data().estadoUtilizador, "Remarcado") + '>Remarcado</option>' +
                                        '<option ' + Selected(doc.data().estadoUtilizador, "Cancelado P/ prestador") + '>Cancelado P/ prestador</option>' +
                                        '<option ' + Selected(doc.data().estadoUtilizador, "Cancelado P/ utilizador") + '>Cancelado P/ utilizador</option>' +
                                        '<option ' + Selected(doc.data().estadoUtilizador, "Terminado") + '>Terminado</option>' +
                                        '</select>',
                                    "avaliarServico": '<button type="button" id="btnAvaliarServico_' + doc.data().numeroServico + '_' + doc.data().prestadorId + '" class="btn btn-light">Avaliar</button>',
                                    "faturaServico": '<button type="button" id="btnFaturaServico_' + doc.data().numeroServico + '" class="btn btn-light faturaServ">Fatura</button>'
                                }).draw();
                            })
                        });

                    });
                   
                    /*
                    Old Event Buttons
                    $('button[id^="btnAvaliarServico"]').click(function (e) {
                        $('#modalSurveySatisfaction').modal('show');
                    });

                    $('button[id^="btnFaturaServico"]').click(function (e) 
                    {
                        var numeroServico = e.target.id.split('_')[1];

                        DadosParaFatura(numeroServico);

                        // $('#modalInvoices').modal('show');
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
                    */      

                    $('#confirmAction').click(function (e) {
                        var numeroServico = '#actionService_' + $('#lblNumeroService').text();

                        if ($('#lblActionService').html() == 'Remarcado' && $('#novaDataHora').val() == '') {
                            SweetAlert('Alerta', 'Preencha a nova data do serviço', 'warning');
                        }
                        else {
                            $(numeroServico).attr("disabled", true);
                            AtualizarEstadoDoDocumento(numeroServico.split('_')[1], $('#lblActionService').html(), $('#novaDataHora').val());
                            $('#modalConfirmAction').modal('hide');
                            SweetAlert('Sucesso', 'Estado do serviço foi alterado a nova data do serviço', 'success');

                        }
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function AtualizarEstadoDoDocumento(serviceId, newStatus, newDate) {
            const db = ReturnInstanceFirebase();

            var servicoReference = db.collection("PedidosServico").doc(serviceId);

            servicoReference.update({
                "estadoUtilizador": newStatus
            })
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    console.log("Error update: " + error);
                });

            var novaData = '';

            if(newDate != '') {
                novaData = 'Nova data do serviço: ' + newDate;
            }
            SendEmailRequestServic_AltEstServico(
                'Ricardo Ferreira',
                'rjfae1@iscte-iul.pt',
                'utilizador',
                serviceId,
                newStatus,
                novaData
            )

        }

        function ValueIsNan(result) 
        {
            return isNaN(result) ? "" : result.toFixed(2);
        }

        function CheckOptionSurvey() 
        {
            return $('#dropDownQuestion1').val() != "0" && $('#dropDownQuestion2').val() != "0" && $('#dropDownQuestion3').val() != "0" && $('#dropDownQuestion4').val() != "0";
        }

        function CheckMoreInformationSurvey(id) 
        {        
            if( ($('#dropDownQuestion' + id).val() == "1" || $('#dropDownQuestion' + id).val() == "2") && $('#textAreaQuestion' + id).val() == "")
                return false;
            else 
                return true;
        }

        function SweetAlert(MensagemPrincipal, MensagemSecundaria, Tipo) 
        {
          swal(MensagemPrincipal, MensagemSecundaria, Tipo);
        }

        function Selected(currentStatus, statusToCompare) 
        {
            return currentStatus == statusToCompare ? "Selected" : "";
        }

        function ReadOnly(status) {
            return status != "" && status != 'Selecionar' ? "readonly" : "";
        }

        function CheckIsNull(value) {
            return value != null ? value : "";
        }

        function DadosParaFatura(serviceId) {
            const db = ReturnInstanceFirebase();

            $('#modalInvoices').modal('show');

            db.collection("PedidosServico")
                .where("numeroServico", "==", serviceId)
                .get()
                .then((querySnapshotPedServicos) => 
                {
                    querySnapshotPedServicos.forEach((docPedServicos) => 
                    {
                        $('#inv_MetodoPagamento').html(docPedServicos.data().tipoPagamento);

                        switch(docPedServicos.data().tipoPagamento) 
                        {
                            case "Transferência bancária":
                                $('#inv_InfoPagamento').html(docPedServicos.data().IBAN);
                                break;
                            case "MBWay":
                            case "MB Way":
                                $('#inv_InfoPagamento').html(docPedServicos.data().contactMBWay);
                                break;
                            default:
                                $('#inv_InfoPagamento').html('<span style="font-weight:bold">Número: </span>' + docPedServicos.data().cc_Numero + ' <br/> <span style="font-weight:bold">Validade: </span>' + docPedServicos.data().cc_Validade + ' <br/> <span style="font-weight:bold">Código: </span>' + docPedServicos.data().cc_Codigo);
                                break;
                        }

                        $('#inv_Code').html(docPedServicos.data().numeroServico);
                        $('#inv_Date').html(docPedServicos.data().dataPedido);
                        $('#inv_PrecoHora').html( ValueIsNan(docPedServicos.data().precoTotal / docPedServicos.data().numeroHoras) + '€');
                        $('#inv_PrecoTotal').html(docPedServicos.data().precoTotal + '€');
                        $('#inv_TipoServico').html(docPedServicos.data().tipoServico);
                        $('#inv_DataHoraInicio').html(docPedServicos.data().dataHoraInicio.replace('T', ' '));

                        var div = docPedServicos.data().divisoes;
                        var spanToInvoice_Div = "";

                        if(div != null) 
                        {
                            for(let i = 0; i < div.length; i++)
                            {
                                switch(div[i]) 
                                {
                                    case "SalaDeEstar":
                                        spanToInvoice_Div += '<li>Sala de Estar</li>';
                                        break;
                                    case "SalaDeJantar":
                                        spanToInvoice_Div += '<li>Sala de Jantar</li>';
                                        break;
                                    default:
                                        spanToInvoice_Div += '<li>' + div[i] + '</li>';
                                        break;
                                }
                            }
                        }
                        $('#inv_DivisoesDaCasa').html(spanToInvoice_Div);

                        $('#inv_NumeroDeHoras').html(docPedServicos.data().numeroHoras);

                        $('#inv_DataHoraFim').html(docPedServicos.data().dataHoraFim.replace('T', ' '));

                        db.collection("Utilizadores")
                        .where("utilizadorId", "==", docPedServicos.data().utilizadorId)
                        .get()
                        .then((querySnapshotUtilizadores) => 
                        {
                            querySnapshotUtilizadores.forEach((docUti) => 
                            {
                                $('#inv_Cli_Nome').html(docUti.data().primeiroNome + ' ' + docUti.data().segundoNome);
                                $('#inv_Cli_Rua').html(docUti.data().rua);
                                $('#inv_Cli_CodigoPostal').html(docUti.data().codigoPostal);
                                $('#inv_Localidade').html(docUti.data().localidade);
                                // $('#inv_Cli_NIF').html('NIF: ' + docUti.data().NIF);
                            })
                        });

                    })
                });
        }

    }

    render() {

        const styleDiv = {
            fontFamily: "Calibri",
            fontSize: "large"
        }

        const tbody = {
            fontSize: "large"
        }

        const thead = {
            fontSize: "large",
            backgroundColor: "aliceblue"
        }

        const labelWithoutBold = {
            fontWeight: "normal",
            fontSize: "large"
        }

        return (
      
                <div>
                    <div className="MainDiv" style={styleDiv}>

                        <div className="container" style={{
                position: 'absolute', left: '50%', top: '30%', maxWidth: '90%',
                transform: 'translate(-50%, -50%)'
              }}>
                            <span style={{fontSize:'x-large', fontWeight: 'bold'}} id="titleTable"><u></u></span>
                            <br/>
                            <br/>
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
                                        <th>Fatura</th>
                                    </tr>
                                </thead>
                                <tbody style={tbody}>

                                </tbody>

                            </table>

                        </div>

                        {/* Action Service */}
                        <div class="modal fade" id="modalConfirmAction" style={{paddingTop: '4%'}} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <div class="modal fade" id="modalSurveySatisfaction" style={{paddingTop: '4%'}} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-scrollable" role="document">
                                <div class="modal-content">

                                    <div class="modal-body">

                                        <span id="titleAvaliacao_Prestador"></span>
                                        <br/>
                                        <span id="titleAvaliacao_Servico"></span>
                                        <br/>

                                        <div id="Question1">
                                            <div class="card" style={{ width: "28rem" }}>
                                                <div class="card-header" style={{ fontWeight: "bold" }}>
                                                    Cumprimento de prazos e assiduidade do prestador?
                                                </div>
                                                <select class="form-control" id="dropDownQuestion1" style={{ width: "15rem", marginLeft: "7em" }}>
                                                    <option value="0" checked>Selecionar</option>
                                                    <option value="1">Muito mau</option>
                                                    <option value="2">Mau</option>
                                                    <option value="3">Razoável</option>
                                                    <option value="4">Bom</option>
                                                    <option value="5">Muito bom</option>
                                                    <option value="6">N/A</option>
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
                                                    <option value="0" checked>Selecionar</option>
                                                    <option value="1">Muito mau</option>
                                                    <option value="2">Mau</option>
                                                    <option value="3">Razoável</option>
                                                    <option value="4">Bom</option>
                                                    <option value="5">Muito bom</option>
                                                    <option value="6">N/A</option>
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
                                                    <option value="0" checked>Selecionar</option>
                                                    <option value="1">Muito mau</option>
                                                    <option value="2">Mau</option>
                                                    <option value="3">Razoável</option>
                                                    <option value="4">Bom</option>
                                                    <option value="5">Muito bom</option>
                                                    <option value="6">N/A</option>
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
                                                    <option value="0" checked>Selecionar</option>
                                                    <option value="1">Não recomendaria</option>
                                                    <option value="2">Pouco provável</option>
                                                    <option value="3">Talvez</option>
                                                    <option value="4">Recomendaria</option>
                                                    <option value="5">Recomendaria de certeza</option>
                                                    <option value="6">N/A</option>
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
                        <div class="modal fade" id="modalInvoices" tabindex="-1" style={{paddingTop: '4%'}} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                                    <img src={Logo_Completo} alt="Company logo" style={{ width: "100%", maxWidth: "300px" }} />
                                                                </td>

                                                                <td>
                                                                    Fatura Nº: <span id="inv_Code"></span><br />
									                                Emitida: <span id="inv_Date"></span><br />
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
                                                                    <span id="inv_Cli_NIF" style={{display:'none'}}></span><br />
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
                                                    <td><span id="inv_MetodoPagamento"></span></td>

                                                    <td><span id="inv_InfoPagamento"></span></td>
                                                </tr>

                                                

                                                <tr class="heading">
                                                    <td>Serviço</td>

                                                    <td>Preço</td>
                                                </tr>

                                                <tr class="item last">
                                                    <td>
                                                        <span id="inv_TipoServico"></span> (<span id="inv_DataHoraInicio"></span> - <span id="inv_DataHoraFim"></span>)
                                                        <br/>
                                                        <span >Número de horas: <span id="inv_NumeroDeHoras"></span></span>
                                                        <br/>
                                                        <span >Divisões da casa: <span id="inv_DivisoesDaCasa"></span></span>
                                                        </td>

                                                    <td><span id="inv_PrecoHora"></span> / hora</td>
                                                </tr>

                                                <tr class="total">
                                                    <td></td>

                                                    <td>Total: <span id="inv_PrecoTotal"></span></td>
                                                </tr>
                                            </table>

                                        </div>

                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" id="btnSaveFile">Gravar em PDF</button>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    </div>
        )
    }
}

export default MyServices_Utilizador