import React from 'react';
import firebase from 'firebase';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import 'bootstrap';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import emailjs from 'emailjs-com';
import Logo_Facebook from "../resources/facebook.png";
import swal from 'sweetalert';

class Services_jquery extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }


    /*
    contractClick() 
    {
      this.setState({showModal: true})
      // <ModalContractService></ModalContractService>
    }
  */
    componentDidMount() {
        $(document).ready(function () {


            var table = $('#example').DataTable({
                "columns": [
                    {
                        "className": 'details-control',
                        "orderable": false,
                        "data": null,
                        "defaultContent": '<i class="fas fa-plus-circle"></i>'
                    },
                    { "data": "prestadorNome" },
                    { "data": "prestadorCodigo" },
                    {
                        "data": "prestadorDataRegisto",
                        visible: false
                    },
                    {
                        "data": "prestadorDataNascimento",
                        visible: false
                    },
                    { 
                        "data": "nacionalidade"
                    },
                    { "data": "localidade" },
                    { "data": "rating" },
                    { "data": "distance" },
                    { "data": "priceWithoutProducts" },
                    { "data": "priceWithProducts" },
                    {
                        "data": "button",
                        "orderable": false
                    }
                ],
                "oLanguage": {
                    "sSearch": ""
                },
                "order": [[1, 'asc']]
            });

            
            table.on('click', 'button[name^="btnContratar"]', function (e) 
            {
                var nameButton = e.target.name;

                var prestadorId = nameButton.split('_')[1];
                var prestadorFirstName = nameButton.split('_')[2];
                var prestadorSecndName = nameButton.split('_')[3];
                var priceWithoutProducts = nameButton.split('_')[4];
                var priceWithProducts = nameButton.split('_')[5];

                $('.classOptionWithProducts').attr('id', 'optionWithProducts_' + priceWithProducts);
                $('.classOptionWithoutProducts').attr('id', 'optionWithoutProducts_' + priceWithoutProducts);

                $('#idPrestador').val(prestadorId + " - " + prestadorFirstName + " " + prestadorSecndName);

                if($('#serviceType').val() == 1) // COM PRODUTOS
                    $('#price').val($('#hours').val() * priceWithProducts);
                else // SEM PRODUTOS
                    $('#price').val($('#hours').val() * priceWithoutProducts);

                $('#requestServiceModal').modal('show');
            });

            $('div.dataTables_filter input').addClass('form-control');
            $("div.dataTables_filter input").attr("placeholder", "Procurar");

            PreencherLinhasPrestadores(table);

            $('#example tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row(tr);

                $('#modalMoreInformation').modal('show');
                
                GetExpandTableWithOtherServices(row.data().prestadorCodigo, row.data().prestadorNome, row.data().prestadorDataRegisto);
            });

            $('#paymentMethod').change(function () {
                switch ($('#paymentMethod').val()) {
                    case "MBW":
                        $('#div_MBWay').show();
                        $('#div_CreditCard').hide();
                        $('#div_IBAN').hide();
                        break;
                    case "TB":
                        $('#div_MBWay').hide();
                        $('#div_CreditCard').hide();
                        $('#div_IBAN').show();
                        break;
                    case "CC":
                        $('#div_MBWay').hide();
                        $('#div_CreditCard').show();
                        $('#div_IBAN').hide();
                        break;
                    default:
                        $('#div_MBWay').hide();
                        $('#div_CreditCard').hide();
                        $('#div_IBAN').hide();
                        break;
                }
            });

            $('#serviceType').change(function () 
            {
                var optionId;

                if($('#serviceType').val() == 1) // COM PRODUTOS
                    optionId = $("option[id^='optionWithProducts_']" ).attr('id');
                else // SEM PRODUTOS
                    optionId = $("option[id^='optionWithoutProducts_']").attr('id');
                
                $('#price').val($('#hours').val() * optionId.split('_')[1]);
                
            });

            $("#example_paginate").css("font-size", "small");
            $(".dataTables_filter").css("font-size", "small");
            $(".dataTables_length").css("font-size", "small");
            $(".dataTables_info").css("font-size", "small");
            $(".sc-bQdQlF").css("justify-content", "center");
            $(".cbcJKv").css("width", "95%");

            $('#hours').val(1);

            $('#hours').change(function () 
            {
                var optionId;

                if($('#serviceType').val() == 1) // COM PRODUTOS
                    optionId = $("option[id^='optionWithProducts_']" ).attr('id');
                else // SEM PRODUTOS
                    optionId = $("option[id^='optionWithoutProducts_']").attr('id');
                
                $('#price').val($('#hours').val() * optionId.split('_')[1]);
            });

            $('#confirmRequest').click(function () {

                if(CheckInformationBeforeSubmitRequest()) 
                {
                    const db = ReturnInstanceFirebase();

                    db.collection("Utilizadores")
                        .where("utilizadorId", "==", "g9tgom")
                        .get()
                        .then((querySnapshotUtilizadores) => 
                        {
                            querySnapshotUtilizadores.forEach((docUtilizadores) => 
                            {
                                db.collection("Prestadores")
                                .where("prestadorId", "==", $('#idPrestador').val().split(' ')[0])
                                .get()
                                .then((querySnapshotPrestadores) => 
                                {
                                    querySnapshotPrestadores.forEach((docPrestadores) => 
                                    {
                                        InsertRequestAndSendEmail(docUtilizadores, docPrestadores);
                                    })
                                });
                            })
                        });
                }
                else 
                {
                    SweetAlert("Alerta", "Existem dados por preencher ou preenchidos incorretamente", "warning");
                }
            });
        });

        function ClearFieldsAfterRequest() 
        {
            $('#ccCodigo').val("");
            $('#ccValidade').val("");
            $('#ccCardNumber').val("");
            $('#ibanNumber').val("");
            $('#phoneNumber').val("");
            $('#paymentMethod').val("Selecionar");
            $('#dataHoraFim').val("");
            $('#dataHoraInicio').val("");
            $('#observations').val("");
            $('#hours').val(1);
            $('#div_IBAN').hide();
            $('#div_MBWay').hide();
            $('#div_CreditCard').hide();
            $("#houseDivisions option:selected").removeAttr("selected");
        }

        function CheckInformationBeforeSubmitRequest() 
        {
            var hours = $('#hours').val();
            var dataHoraInicio = $('#dataHoraInicio').val();
            var dataHoraFim = $('#dataHoraFim').val();
            var metodoPagamento = $('#paymentMethod').val();

            var metodoPagamentBoolean = false;

            if(metodoPagamento.startsWith("MB")) 
            {
                metodoPagamentBoolean = CheckMBWay();
            }
            else if (metodoPagamento.startsWith("Transferência")) 
            {
                metodoPagamentBoolean = CheckIBAN();
            }
            else if(metodoPagamento.startsWith("Cartão")) 
            {
                metodoPagamentBoolean = CheckCC();
            }

            return Date.parse(dataHoraFim) > Date.parse(dataHoraInicio) && hours != "" && hours != "0" && dataHoraInicio != "" && dataHoraFim != "" && metodoPagamento != "Selecionar" && metodoPagamentBoolean == true;
        }

        function IsNumber(val)
        {
        return /^\d+$/.test(val);
        }

        function GetUserImageToCloudStorage(prestadorId) 
        {
            var storage = firebase.storage();
        
            var storageRef = storage.ref();

            var starsRef = storageRef.child('UserImages/' + prestadorId + '.jpg');

            starsRef.getDownloadURL().then(function(url) 
            {
                var img = document.getElementById('imageCard');
                img.src = url;
              }).catch(function(error) {              
                console.log('erro: ' + error);
              });
        }

        function SweetAlert(MensagemPrincipal, MensagemSecundaria, Tipo) 
        {
          swal(MensagemPrincipal, MensagemSecundaria, Tipo);
        }

        function InsertRequestAndSendEmail(docUtilizadores, docPrestadores) {
            let randString = Math.random().toString(36).substring(7);

            const db = ReturnInstanceFirebase();

            db.collection("PedidosServico").doc(randString).set({
                numeroServico: randString,
                prestadorId: $('#idPrestador').val().split(' ')[0],
                tipoServico: $('#serviceType option:selected').text(),
                numeroHoras: $('#hours').val(),
                precoTotal: $('#price').val(),
                tipoPagamento: $('#paymentMethod option:selected').text(),
                IBAN: $('#ibanNumber').val(),
                observacoes: $('#observations').val(),
                divisoes: $('#houseDivisions').val(),
                contactMBWay: $('#phoneNumber').val(),
                cc_Numero: $('#ccCardNumber').val(),
                cc_Validade: $('#ccValidade').val(),
                cc_Codigo: $('#ccCodigo').val(),
                dataPedido: GetTimeNowStringFormat(),
                dataHoraInicio: $('#dataHoraInicio').val(),
                dataHoraFim: $('#dataHoraFim').val(),
                estadoUtilizador: '',
                estadoPrestador: '',
                utilizadorId: "g9tgom"
            })
                .then(() => {

                    /* ENVIO PARA UTILIZADOR */
                    SendEmailRequestServic_Utilizador(
                        "rjfae1@iscte-iul.pt",
                        'Pedro Sebastião',
                        "962 232 590",
                        $('#observations').val(),
                        $('#houseDivisions').val(),
                        $('#serviceType option:selected').text(),
                        $('#hours').val(),
                        $('#price').val(),
                        $('#dataHoraInicio').val(),
                        $('#dataHoraFim').val(),
                        $('#paymentMethod option:selected').text()
                    )

                    /* ENVIO PARA PRESTADOR */
                    SendEmailRequestService_Prestador(
                        "rjfae1@iscte-iul.pt",
                        "Ricardo Ferreira",
                        "910 242 432",
                        $('#observations').val(),
                        $('#houseDivisions').val(),
                        $('#serviceType option:selected').text(),
                        $('#hours').val(),
                        $('#price').val(),
                        $('#dataHoraInicio').val(),
                        $('#dataHoraFim').val(),
                        $('#paymentMethod option:selected').text()
                    )
                    
                    SweetAlert("Sucesso", "Pedido de serviço finalizado. Receberá um e-mail com todos os detalhes do serviço!", "success");
                    ClearFieldsAfterRequest();
                    $('#requestServiceModal').modal('hide');
                })
                .catch((error) => {
                    console.log("Error writing document: ", error);
                });
        }

        function GetTimeNowStringFormat() {
            var m = new Date();
            return m.getUTCFullYear() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes();
        }

        function CheckIBAN() 
        {
          var IBAN = $('#ibanNumber').val();
    
          if(IBAN != "")
            return IBAN.length == 24 && IBAN.startsWith("P") && IsNumber(IBAN.replace("P", ""));
          else 
            return true;
        }
    
        function CheckMBWay() 
        {
          var MBWay = $('#phoneNumber').val();
    
          if(MBWay != "")
            return MBWay.length == 9 && IsNumber(MBWay);
          else
            return true
        }
    
        function CheckCC() 
        {
          var numCC = $('#ccCardNumber').val();
          var codCC = $('#ccCodigo').val();
          var valCC = $('#ccValidade').val();
    
          if(numCC != "" || codCC != "" || valCC != "")
            return numCC.length == 16 && IsNumber(numCC) && codCC.length == 3 && IsNumber(codCC) && valCC.length == 5 && IsNumber(valCC.replace("/", ""));
          else
            return true;
        }

        function SendEmailRequestServic_Utilizador(var_to_email, noPrestador, coPrestador, obs, divisoes, tipoSer, numHoras, preco, dahoInicio, dahoFim, tipoPag) {
            emailjs.init("user_4DnQE5ZxKgvIrlmfLcC40");

            var templateParams =
            {
                to: var_to_email,
                nomePrestador: noPrestador,
                contactoPrestador: coPrestador,
                observacoes: obs,
                divisoes: CheckDivision(divisoes),
                tipoServico: tipoSer,
                numeroHoras: numHoras,
                preco: preco,
                dataHoraInicio: dahoInicio.replace('T', ' '),
                dataHoraFim: dahoFim.replace('T', ' '),
                tipoPagamento: tipoPag
            };

            emailjs.send('serviceId_CleaningHub', 'template_reqService_Util', templateParams)
                .then(function (response) {
                    console.log('Sucesso no envio do e-mail: SendEmailRequestServic_Utilizador', response.status, response.text);
                }, function (error) {
                    console.log('Erro a enviar e-mail: SendEmailRequestServic_Utilizador', error);
                });
        }

        function SendEmailRequestService_Prestador(var_to_email, noCliente, coCliente, obs, divisoes, tipoSer, numHoras, preco, dahoInicio, dahoFim, tipoPag) {
            emailjs.init("user_4DnQE5ZxKgvIrlmfLcC40");

            var templateParams =
            {
                to: var_to_email,
                nomeCliente: noCliente,
                contactoCliente: coCliente,
                observacoes: obs,
                divisoes: divisoes,
                tipoServico: tipoSer,
                numeroHoras: numHoras,
                preco: preco + '€',
                dataHoraInicio: dahoInicio.replace('T', ' '),
                dataHoraFim: dahoFim.replace('T', ' '),
                tipoPagamento: tipoPag
            };

            emailjs.send('serviceId_CleaningHub', 'template_reqService_Pres', templateParams)
                .then(function (response) {
                    console.log('Sucesso no envio do e-mail: SendEmailRequestServic_Prestador', response.status, response.text);
                }, function (error) {
                    console.log('Erro a enviar e-mail: SendEmailRequestServic_Prestador', error);
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

        function GetExpandTableWithOtherServices(prestadorId, prestadorName, prestadorDataRegisto) 
        {
        
            GetUserImageToCloudStorage(prestadorId);

            const db = ReturnInstanceFirebase();

            db.collection("PedidosServico")
                .where("prestadorId", "==", prestadorId)
                .get()
                .then((querySnapshot) => {

                    var somaPrecoTotal = 0;

                    querySnapshot.forEach((doc) => {
                        somaPrecoTotal += parseInt(doc.data().precoTotal);
                    })

                    $('#cardPrestadorNome').html(prestadorName);
                    $('#cardRegistadoDesde').html("Registado desde:&nbsp;" + prestadorDataRegisto);
                    $('#cardTotalServicos').html("Total de serviços:&nbsp;" + querySnapshot.size);
                    $('#cardPrecoMedio').html("Preço médio:&nbsp;" + CalculateAveragePrice(somaPrecoTotal, querySnapshot.size).toFixed(2) + "€");

                    CalculateAveragePrice(somaPrecoTotal, querySnapshot.size);
                });
        }

        function CalculateAveragePrice(totalValue, servicesNumber) 
        {
            var result = parseInt(totalValue)/parseInt(servicesNumber);

            console.log(result);

            return isNaN(result) ? 0 : result;
        }

        function ValueIsNan(result) 
        {
            return isNaN(result) ? "" : result.toFixed(2);
        }


        function PreencherLinhasPrestadores(table) {
            const db = ReturnInstanceFirebase();

            db.collection("Prestadores")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        /* -> QUERY AOS SERVIÇOS */
                        db.collection("AvaliacaoServico")
                        .where("prestadorId", "==", doc.data().prestadorId)
                        .get()
                        .then((querySnapshotAval) => 
                        {
                            var rating = 0;

                            querySnapshotAval.forEach((docServ) => 
                            {
                                rating += (parseInt(docServ.data().valorPrimeiraQuestao) + parseInt(docServ.data().valorSegundaQuestao) + parseInt(docServ.data().valorTerceiraQuestao) + parseInt(docServ.data().valorQuartaQuestao))/4;
                            })

                            table.row.add({
                                "": "",
                                "prestadorNome": CheckIsNull(doc.data().primeiroNome) + ' ' + CheckIsNull(doc.data().segundoNome),
                                "prestadorCodigo": CheckIsNull(doc.data().prestadorId),
                                "prestadorDataRegisto": CheckIsNull(doc.data().dataRegisto),
                                "prestadorDataNascimento": CheckIsNull(doc.data().dataNascimento),
                                "nacionalidade": CheckIsNull(doc.data().nacionalidade),
                                "localidade": CheckIsNull(doc.data().localidade),
                                "rating": ValueIsNan(rating/querySnapshotAval.size),
                                "distance": CheckIsNull(doc.data().distance),
                                "priceWithoutProducts": CheckIsNull(doc.data().priceWithoutProducts) + "€",
                                "priceWithProducts": CheckIsNull(doc.data().priceWithProducts) + "€",
                                "button": '<button type="button" name="btnContratar_' + doc.data().prestadorId + '_' + doc.data().primeiroNome + '_' + doc.data().segundoNome + '_' + doc.data().priceWithoutProducts + '_' + doc.data().priceWithProducts + '" class="btn btn-light">Contratar</button>'
                            }).draw();
                        });
                        /* <- QUERY AOS SERVIÇOS */
                       
                    });

                    /*
                    $('button[name^="btnContratar"').click(function (e) {

                        var nameButton = e.target.name;

                        var prestadorId = nameButton.split('_')[1];
                        var prestadorFirstName = nameButton.split('_')[2];
                        var prestadorSecndName = nameButton.split('_')[3];
                        var priceWithoutProducts = nameButton.split('_')[4];
                        var priceWithProducts = nameButton.split('_')[5];

                        $('.classOptionWithProducts').attr('id', 'optionWithProducts_' + priceWithProducts);
                        $('.classOptionWithoutProducts').attr('id', 'optionWithoutProducts_' + priceWithoutProducts);

                        $('#idPrestador').val(prestadorId + " - " + prestadorFirstName + " " + prestadorSecndName);

                        if($('#serviceType').val() == 1) // COM PRODUTOS
                            $('#price').val($('#hours').val() * priceWithProducts);
                        else // SEM PRODUTOS
                            $('#price').val($('#hours').val() * priceWithoutProducts);

                        $('#requestServiceModal').modal('show');
                    });
                    */

                    // console.log(this.state.row[0].PrimeiroNome);
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function CheckDivision(divisions) 
        {
            var spanToInvoice_Div = "";

            for(let i = 0; i < divisions.length; i++)
            {
                switch(divisions[i]) 
                {
                    case "SalaDeEstar":
                        spanToInvoice_Div += '- Sala de Estar ';
                        break;
                    case "SalaDeJantar":
                         spanToInvoice_Div += '- Sala de Jantar ';
                         break;
                    default:
                        spanToInvoice_Div += '- ' + divisions[i] + ' ';
                        break;
                }
            }
            return spanToInvoice_Div;
        }

        function CheckIsNull(value) {
            return value != null ? value : "";
        }
    }

    render() {

        const styleDiv = {
            fontFamily: "Calibri",
            fontSize: "large"
        }

        const modalRequestDiv = {
            fontFamily: "Calibri",
            paddingTop: "5%",
            fontSize: "large"
        }

        const tbody = {
            fontSize: "large"
        }

        const thead = {
            fontSize: "large",
            backgroundColor: "aliceblue"
        }

        return (
            <div >

            <div className="MainDiv" style={styleDiv}>

                <div className="container" style={{
                position: 'absolute', left: '50%', top: '28%', maxWidth: '90%',
                transform: 'translate(-50%, -50%)'
              }}>

                    <table id="example">
                        <thead style={thead}>
                            <tr>
                                <th></th>
                                <th>Prestador</th>
                                <th>Código&nbsp;Prestador</th>
                                <th style={{ display: "none" }}>Registo&nbsp;Prestador</th>
                                <th style={{ display: "none" }}>Nascimento&nbsp;Prestador</th>
                                <th>Nacionalidade</th>
                                <th>Localidade</th>
                                <th>Rating</th>
                                <th>Distância</th>
                                <th>Preço&nbsp;S/&nbsp;produtos</th>
                                <th>Preço&nbsp;C/&nbsp;produtos</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody style={tbody}>
                        </tbody>

                    </table>

                </div>
                
                <div class="modal fade" id="requestServiceModal" style={modalRequestDiv} tabindex="-1" role="dialog" aria-labelledby="requestServiceModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">

                            <div class="modal-body">

                                <div class="form-group">
                                    <label>Prestador</label>
                                    <input type="text" class="form-control" id="idPrestador" disabled></input>
                                </div>

                                <div class="form-group">
                                    <div class="form-row">
                                        <div class="col">
                                            <label>Tipo de serviço</label>
                                            <select class="form-control" id="serviceType" aria-label="Default select example">
                                                <option id="optionWithProducts" class="classOptionWithProducts" value="1">Com produtos</option>
                                                <option id="optionWithoutProducts"class="classOptionWithoutProducts" value="2">Sem produtos</option>
                                            </select>
                                        </div>
                                        <div class="col">
                                        <label>Divisões</label>
                                        <select class="form-control" multiple data-live-search="true" id="houseDivisions">
                                            <option value="Selecionar">Selecionar</option>
                                            <option value="Quarto">Quarto</option>
                                            <option value="SalaDeEstar">Sala de estar</option>
                                            <option value="SalaDeJantar">Sala de jantar</option>
                                            <option value="WC">WC</option>
                                            <option value="Suite">Suíte</option>
                                            <option value="Cozinha">Cozinha</option>
                                            <option value="Sotao">Sótão</option>
                                            <option value="Arrecadacao">Arrecadação</option>
                                            <option value="Garagem">Garagem</option>
                                            <option value="Corredor">Corredor</option>
                                            <option value="Quintal">Quintal</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="form-row">
                                        <div class="col">
                                            <label>Preço</label>
                                            <input type="number" class="form-control" id="price" disabled></input>
                                        </div>
                                        <div class="col">
                                            <label>Número de horas</label>
                                            <input type="number" class="form-control" id="hours" min="1"></input>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Observações para o prestador</label>
                                    <input type="text" class="form-control" rows="2" id="observations"></input>
                                </div>

                                <div class="form-row">

                                    <div class="col">
                                        <div class="form-group">
                                            <label>Inicio</label>
                                            <input type="datetime-local" class="form-control" rows="2" id="dataHoraInicio"></input>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label>Fim</label>
                                            <input type="datetime-local" class="form-control" rows="2" id="dataHoraFim"></input>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Tipo de pagamento</label>
                                    <select class="form-control" id="paymentMethod">
                                        <option value="Selecionar">Selecionar</option>
                                        <option value="TB">Transferência bancária</option>
                                        <option value="MBW">MB Way</option>
                                        <option value="CC">Cartão de crédito</option>
                                    </select>
                                </div>

                                <div class="form-group" id="div_MBWay" style={{ display: "none" }}>
                                    <label>Número de telefone</label>
                                    <input type="text" class="form-control" id="phoneNumber" placeholder="+351"></input>
                                </div>

                                <div class="form-group" id="div_IBAN" style={{ display: "none" }}>
                                    <label>IBAN</label>
                                    <input type="text" class="form-control" id="ibanNumber" placeholder="PT50"></input>
                                </div>

                                <div class="form-group" id="div_CreditCard" style={{ display: "none" }}>
                                    <label>Número do cartão</label>
                                    <input type="text" class="form-control" id="ccCardNumber"></input>

                                    <div class="form-row">
                                        <div class="col">
                                            <label>Validade</label>
                                            <input type="text" class="form-control" id="ccValidade" Placeholder="**/**"></input>
                                        </div>
                                        <div class="col">
                                            <label>CVV2</label>
                                            <input type="text" class="form-control" id="ccCodigo" Placeholder="***"></input>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-success" id="confirmRequest">Avançar para pagamento</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                <div class="modal" id="modalMoreInformation" style={{paddingTop: '5%'}} tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="card" style={{ width: "22rem" }}>
                            <img class="card-img-top" id="imageCard"></img>
                            <div class="card-body">
                                <h5 class="card-title" id="cardPrestadorNome" style={{ fontWeight: "bold" }}></h5>

                                <div class="card" style={{ width: "19rem" }}>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item" id="cardRegistadoDesde"></li>
                                        <li class="list-group-item" id="cardTotalServicos"></li>
                                        <li class="list-group-item" id="cardPrecoMedio"></li>
                                    </ul>
                                </div>

                                <br/>
                                <div style={{textAlign:'center'}}>
                                <img src="https://img.icons8.com/color/144/000000/facebook.png" height="50px" width="50px" id="imageFacebook"></img>
                                <img src="https://img.icons8.com/cute-clipart/64/000000/instagram-new.png" height="50px" width="50px" id="imageFacebook"></img>
                                <img src="https://img.icons8.com/cute-clipart/64/000000/twitter.png" height="50px" width="50px" id="imageFacebook"></img>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Services_jquery