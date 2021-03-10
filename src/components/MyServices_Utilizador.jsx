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


class MyServices_Utilizador extends React.Component {
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
                    {
                        "className": 'details-control',
                        "orderable": false,
                        "data": null,
                        "defaultContent": '<i class="fas fa-plus-circle"></i>'
                    },
                    { "data": "nomeCliente" },
                    { "data": "contactoCliente" },
                    { "data": "observacoes" },
                    { "data": "dataDoPedido" },
                    { "data": "dataHoraInicio" },
                    { "data": "dataHoraFim" },
                    { "data": "tipoServico" },
                    { "data": "tipoPagamento" },
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

        function PreencherLinhasPrestadores(table) {
            
            const db = ReturnInstanceFirebase();

            const array = [];

            db.collection("PedidosServico")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        table.row.add({
                            "": "",
                            "nomeCliente": CheckIsNull(doc.data().primeiroNome),
                            "contactoCliente": CheckIsNull(doc.data().rating),
                            "observacoes": CheckIsNull(doc.data().observacoes),
                            "dataDoPedido": CheckIsNull(doc.data().dataPedido),
                            "dataHoraInicio": CheckIsNull(doc.data().dataHoraInicio),
                            "dataHoraFim": CheckIsNull(doc.data().dataHoraFim),
                            "tipoServico": CheckIsNull(doc.data().tipoServico),
                            "tipoPagamento": CheckIsNull(doc.data().tipoPagamento),
                            "obterCoordenadas": '<button type="button" name="btnObterCoordenadas_' + doc.data().primeiroNome + '" class="btn btn-light">Coordenadas</button>'
                        }).draw();
                    });

                    $('button[name^="btnObterCoordenadas_"').click(function (e) {

                        $('#modalGoogleMaps').modal('show');
                        
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
            paddingLeft: "130px",
            fontFamily: "Calibri"
        }

        const modalService = {
            paddingTop: "40px"
        }

        const map = {
            height: "100%"
          }

        return (
            <html>

            <div className="MainDiv" style={styleDiv}>

                <div className="container">

                    <table id="tableInfo">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nome Cliente</th>
                                <th>Contacto Cliente</th>
                                <th>Observações</th>
                                <th>Data do Pedido</th>
                                <th>Data e hora de Inicio</th>
                                <th>Data e hora de Fim</th>
                                <th>Tipo de Serviço</th>
                                <th>Tipo de Pagamento</th>
                                <th>Obter coordenadas</th>
                                <th></th>
                            </tr>
                        </thead>

                    </table>

                </div>
                <div class="modal fade" id="modalGoogleMaps" style={modalService} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Pedido de serviço</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-success" id="confirmRequest">Avançar para pagamento</button>
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