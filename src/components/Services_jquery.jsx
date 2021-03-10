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
                    { "data": "primeiroNome" },
                    { "data": "nacionalidade" },
                    { "data": "localidade" },
                    { "data": "rating" },
                    { "data": "distance" },
                    { "data": "priceWithoutProducts" },
                    { "data": "priceWithProducts" },
                    { "data": "button" }
                    /*
                    {
                        "orderable": false,
                        "data": null,
                        "defaultContent": '<button type="button" name="btnContratar" class="btn btn-light">Contratar</button>'
                    }
                    */
                ],
                "order": [[1, 'asc']]
            });

            PreencherLinhasPrestadores(table);

            $('#example tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row(tr);

                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    row.child(format(row.data())).show();
                    tr.addClass('shown');
                }
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

            $('#hours').val(1);

            $('#hours').change(function () {
                var price = 10;

                $('#price').val($('#hours').val() * price);
            });

            $('#confirmRequest').click(function () {
                let randString = Math.random().toString(36).substring(7);

                const db = ReturnInstanceFirebase();

                db.collection("PedidosServico").doc(randString).set({
                    numeroServico: randString,
                    prestadorId: $('#idPrestador').val(),
                    tipoServico: $('#serviceType option:selected').text(),
                    numeroHoras: $('#hours').val(),
                    precoTotal: $('#price').val(),
                    tipoPagamento: $('#paymentMethod option:selected').text(),
                    IBAN: $('#ibanNumber').val(),
                    observacoes: $('#observations').val(),
                    contactMBWay: $('#phoneNumber').val(),
                    cc_Numero: $('#ccCardNumber').val(),
                    cc_Validade: $('#ccValidade').val(),
                    cc_Codigo: $('#ccCodigo').val(),
                    dataPedido: GetTimeNowStringFormat(),
                    dataHoraInicio: $('#dataHoraInicio').val(),
                    dataHoraFim: $('#dataHoraFim').val(),
                    estado: ''
                })
                .then(() => {

                    // SendEmailRequestService()
                    alert("Pedido de serviço finalizado!");
                })
                .catch((error) => {
                    alert("Error writing document: ", error);
                });
            });
        });

        function GetTimeNowStringFormat() 
        {
            var m = new Date();
            return m.getUTCFullYear() +"-"+ (m.getUTCMonth()+1) +"-"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes();
        }

        function SendEmailRequestService(var_to_name, var_to_email, codPrestador, noPrestador, coPrestador, codCliente, noCliente, coCliente, obs, tipoSer, numHoras, preco, dahoInicio, dahoFim, tipoPag) 
        {
          emailjs.init("user_4DnQE5ZxKgvIrlmfLcC40");
    
          var templateParams = 
          {
            to_name: var_to_name,
            to: var_to_email,
            codigoPrestador: codPrestador,
            nomePrestador: noPrestador,
            contactoPrestador: coPrestador,
            codigoCliente: codCliente,
            nomeCliente: noCliente,
            contactoCliente: coCliente,
            observacoes: obs,
            tipoServico: tipoSer,
            numeroHoras: numHoras,
            preco: preco,
            dataHoraInicio: dahoInicio,
            dataHoraFim: dahoFim,
            tipoPagamento: tipoPag
          };

          emailjs.send('serviceId_CleaningHub', 'template_registerUser', templateParams)
              .then(function(response) {
                alert('SUCCESS!', response.status, response.text);
              }, function(error) {
                alert('FAILED...', error);
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

        function PreencherLinhasPrestadores(table) {
            const db = ReturnInstanceFirebase();

            const array = [];

            db.collection("Prestadores")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        table.row.add({
                            "": "",
                            "primeiroNome": CheckIsNull(doc.data().primeiroNome),
                            "nacionalidade": CheckIsNull(doc.data().nacionalidade),
                            "localidade": CheckIsNull(doc.data().localidade),
                            "rating": CheckIsNull(doc.data().rating),
                            "distance": CheckIsNull(doc.data().distance),
                            "priceWithoutProducts": CheckIsNull(doc.data().priceWithoutProducts),
                            "priceWithProducts": CheckIsNull(doc.data().priceWithProducts),
                            "button": '<button type="button" name="btnContratar_' + doc.data().primeiroNome + '" class="btn btn-light">Contratar</button>'
                        }).draw();
                    });

                    $('button[name^="btnContratar"').click(function (e) {

                        var nameButton = e.target.name;

                        var prestadorName = nameButton.split('_')[1];

                        $('#idPrestador').val(prestadorName);

                        $('#exampleModal').modal('show');
                    });
                    // console.log(this.state.row[0].PrimeiroNome);
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function CheckIsNull(value) {
            return value != null ? value : "";
        }

        function format(d) {
            return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
                '<thead>' +
                '<th>Data</th>' +
                '<th>Serviço</th>' +
                '<th>Rating</th>' +
                '<th>Valor</th>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td>Te</td>' +
                '<td>TE</td>' +
                '<td>TE</td>' +
                '<td>TE</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>';
        }
    }

    render() {

        const styleDiv = {
            paddingTop: "100px",
            paddingLeft: "225px",
            fontFamily: "Calibri"
        }

        const modalService = {
            paddingTop: "40px"
        }

        const tbody = {
            fontSize: "smaller"
        }

        const thead = {
            fontSize: "smaller"
        }

        return (
            <div className="MainDiv" style={styleDiv}>

                <div className="container">

                    <table id="example">
                        <thead style={thead}>
                            <tr>
                                <th></th>
                                <th>Nome</th>
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
                <div class="modal fade" id="exampleModal" style={modalService} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Pedido de serviço</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
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
                                                <option value="1">Com produtos</option>
                                                <option value="2">Sem produtos</option>
                                            </select>
                                        </div>
                                        <div class="col">
                                            <label>Número de horas</label>
                                            <input type="number" class="form-control" id="hours" min="1"></input>
                                        </div>
                                        <div class="col">
                                            <label>Preço</label>
                                            <input type="number" class="form-control" id="price" disabled></input>
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
            </div >
        )
    }
}

export default Services_jquery