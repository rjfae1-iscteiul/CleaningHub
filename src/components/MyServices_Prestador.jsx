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
import { Loader } from "@googlemaps/js-api-loader";
import Map from 'google-maps-react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';


class MyServices_Prestador extends React.Component {
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

            var table = $('#tableInfo').DataTable({
                "columns": [
                    { "data": "numeroServico" },
                    { "data": "nomeCliente" },
                    { "data": "contactoCliente" },
                    { "data": "observacoes" },
                    { "data": "dataDoPedido" },
                    { "data": "dataHoraInicio" },
                    { "data": "dataHoraFim" },
                    { "data": "tipoServico" },
                    { "data": "tipoPagamento" },
                    { "data": "acoes" },
                    { "data": "obterCoordenadas" }
                ],
                "order": [[1, 'asc']]
            });

            PreencherLinhasPrestadores(table);
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

        function GetTimeNowStringFormat() 
        {
            var m = new Date();
            return m.getUTCFullYear() +"-"+ (m.getUTCMonth()+1) +"-"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes();
        }

        function AtualizarEstadoDoDocumento() 
        {
            /*
            var washingtonRef = db.collection("cities").doc("DC");

            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                capital: true
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
            */
        }

        function PreencherLinhasPrestadores(table) {

            const db = ReturnInstanceFirebase();

            const array = [];

            db.collection("PedidosServico")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        table.row.add({
                            "numeroServico": CheckIsNull(doc.data().numeroServico),
                            "nomeCliente": CheckIsNull(doc.data().primeiroNome),
                            "contactoCliente": CheckIsNull(doc.data().rating),
                            "observacoes": CheckIsNull(doc.data().observacoes),
                            "dataDoPedido": CheckIsNull(doc.data().dataPedido),
                            "dataHoraInicio": CheckIsNull(doc.data().dataHoraInicio).replace('T', '&nbsp;'),
                            "dataHoraFim": CheckIsNull(doc.data().dataHoraFim).replace('T', '&nbsp;'),
                            "tipoServico": CheckIsNull(doc.data().tipoServico),
                            "tipoPagamento": CheckIsNull(doc.data().tipoPagamento),
                            "acoes": '<select class="form-control" id="actionService_' + CheckIsNull(doc.data().numeroServico) + '">' +
                                '<option checked>Selecionar</option>' +
                                '<option>Remarcado</option>' +
                                '<option>Cancelado P/ prestador</option>' +
                                '<option>Cancelado P/ utilizador</option>' +
                                '<option>Terminado</option>' +
                                '</select>',
                            "obterCoordenadas": '<button type="button" name="btnObterCoordenadas_' + doc.data().primeiroNome + '" class="btn btn-light">Google&nbsp;Maps</button>'
                        }).draw();
                    });

                    $('button[name^="btnObterCoordenadas_"').click(function (e) {
                        $('#modalGoogleMaps').modal('show');
                    });

                    $('select[id^="actionService_"').change(function (e) {
                        var numeroServico = e.target.id.split('_')[1];
                        var accao = e.target.value;

                        if(accao == 'Remarcado') 
                        {
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

                        if($('#lblActionService').html() == 'Remarcado' && $('#novaDataHora').val() == '') 
                        {
                            alert('Preencha a nova data do serviço');
                        } 
                        else 
                        {
                        $(numeroServico).attr("disabled", true);
                        $('#modalConfirmAction').modal('hide');
                        }
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
    }

    render() {

        const styleDiv = {
            paddingTop: "100px",
            paddingLeft: "40px",
            fontFamily: "Calibri"
        }

        const modalService = {
            paddingTop: "40px"
        }

        const map = {
            height: "100%"
        }

        const tbody = {
            fontSize: "smaller"
        }

        const thead = {
            fontSize: "smaller"
        }

        const labelWithoutBold = {
            fontWeight: "normal"
        }

        return (
            <html>

                <div className="MainDiv" style={styleDiv}>

                    <div className="container">

                        <table id="tableInfo">
                            <thead style={thead}>
                                <tr>
                                    <th>Número&nbsp;Serviço</th>
                                    <th>Nome&nbsp;Cliente</th>
                                    <th>Contacto&nbsp;Cliente</th>
                                    <th>Observações</th>
                                    <th>Pedido</th>
                                    <th>Inicio</th>
                                    <th>Fim</th>
                                    <th>Tipo&nbsp;de&nbsp;Serviço</th>
                                    <th>Tipo&nbsp;de&nbsp;Pagamento</th>
                                    <th>Ações&nbsp;do&nbsp;Serviço</th>
                                    <th>Obter&nbsp;coordenadas</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody style={tbody}>

                            </tbody>

                        </table>

                    </div>

                    {/* Google Maps */}
                    <div class="modal fade" id="modalGoogleMaps" style={modalService} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Coordenadas Google Maps</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <label></label>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >

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

                                    <div class="form-group" id="divActionNovaDataHora" style={{display:"none"}}>
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
                </div >

            </html>
        )
    }
}

export default MyServices_Prestador