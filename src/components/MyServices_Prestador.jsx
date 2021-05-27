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
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import { Helmet } from "react-helmet";
import emailjs from 'emailjs-com';
import GoogleMapReact from 'google-map-react'; 
import swal from 'sweetalert';
import Geocode from "react-geocode";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Marker = (props) => {
    const { color, name, id } = props;
    return (
        <div>
            <div
                className="pin bounce"
                style={{ backgroundColor: color, cursor: 'pointer' }}
                title={name}
            />
            <div className="pulse" />
        </div>
    );
};

class MyServices_Prestador extends React.Component {
    constructor(props) {
        super(props)

        this.state = {  
            latitude: 0.0,
            longitude: 0.0,
            center: {
              lati: 38.7222524, 
              long: -9.1393366
          }
        }
    }

    componentDidMount() {

        Geocode.setApiKey("AIzaSyDRa5tSeLYFGsON0p6FwcBzUMEoIoLonXM");

        Geocode.setLanguage("en");
    
        Geocode.setRegion("es");

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
                "oLanguage": {
                    "sSearch": ""
                },
                "order": [[1, 'asc']]
            });

            table.on('click', 'button[name^="btnObterCoordenadas_"]', function (e) 
            {
                var nameButton = e.target.name;

                var utilizadorId = nameButton.split('_')[1];

                $('#modalGoogleMaps').modal('show');

                GetUtilizadorDirections(utilizadorId);
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
            /*
            $(".sc-bQdQlF").css("justify-content", "center");
            $(".sc-bQdQlF").css("width", "85%");
            */
        });

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

        function AtualizarEstadoDoDocumento(serviceId, newStatus, newDate) 
        {
            const db = ReturnInstanceFirebase();

            var servicoReference = db.collection("PedidosServico").doc(serviceId);

            servicoReference.update({
                "estadoPrestador": newStatus
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
                'Pedro Sebastião',
                'rjfae1@iscte-iul.pt',
                'prestador',
                serviceId,
                newStatus,
                novaData
            )
        }

        function SweetAlert(MensagemPrincipal, MensagemSecundaria, Tipo) 
        {
          swal(MensagemPrincipal, MensagemSecundaria, Tipo);
        }

        function PreencherLinhasPrestadores(table) {

            const db = ReturnInstanceFirebase();

            db.collection("PedidosServico")
                .where("prestadorId", "==", "l1j9xk")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => 
                    {
                        $('#titleTable').html('<u>Ecrã do prestador Pedro Sebastião com pedidos a realizar</u>');

                        console.log(doc.data().utilizadorId);

                        db.collection("Utilizadores")
                        .where("utilizadorId", "==", doc.data().utilizadorId)
                        .get()
                        .then((querySnapshotUti) => {
                            querySnapshotUti.forEach((docUti) => 
                            {
                                table.row.add({
                                    "numeroServico": CheckIsNull(doc.data().numeroServico),
                                    "nomeCliente": CheckIsNull(docUti.data().primeiroNome) + ' ' + CheckIsNull(docUti.data().segundoNome),
                                    "contactoCliente": CheckIsNull(docUti.data().contactoTelefonico),
                                    "observacoes": CheckIsNull(doc.data().observacoes),
                                    "dataDoPedido": CheckIsNull(doc.data().dataPedido),
                                    "dataHoraInicio": CheckIsNull(doc.data().dataHoraInicio).replace('T', '&nbsp;'),
                                    "dataHoraFim": CheckIsNull(doc.data().dataHoraFim).replace('T', '&nbsp;'),
                                    "tipoServico": CheckIsNull(doc.data().tipoServico),
                                    "tipoPagamento": CheckIsNull(doc.data().tipoPagamento),
                                    "acoes": '<select class="form-control" id="actionService_' + CheckIsNull(doc.data().numeroServico) + '"' + ReadOnly(doc.data().estadoPrestador) +'>' +
                                        '<option ' + Selected(doc.data().estadoPrestador, "Selecionar") + '>Selecionar</option>' +
                                        '<option ' + Selected(doc.data().estadoPrestador, "Remarcado") + '>Remarcado</option>' +
                                        '<option ' + Selected(doc.data().estadoPrestador, "Cancelado P/ prestador") + '>Cancelado P/ prestador</option>' +
                                        '<option ' + Selected(doc.data().estadoPrestador, "Cancelado P/ utilizador") + '>Cancelado P/ utilizador</option>' +
                                        '<option ' + Selected(doc.data().estadoPrestador, "Terminado") + '>Terminado</option>' +
                                        '</select>',
                                    "obterCoordenadas": '<button type="button" name="btnObterCoordenadas_' + doc.data().utilizadorId + '" class="btn btn-light">Google&nbsp;Maps</button>'
                                }).draw();
                            });
                        });
                    });

                    /*
                    $('button[name^="btnObterCoordenadas_"').click(function (e) {

                        var nameButton = e.target.name;

                        var utilizadorId = nameButton.split('_')[1];

                        $('#modalGoogleMaps').modal('show');

                        GetUtilizadorDirections(utilizadorId);
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

        function GetUtilizadorDirections(utilizadorId) 
        {
            const db = ReturnInstanceFirebase();

            db.collection("Utilizadores")
                .where("utilizadorId", "==", utilizadorId)
                .get()
                .then((querySnapshot) => {

                    querySnapshot.forEach((doc) => 
                    {
                        if(querySnapshot.size == 1) 
                        {
                            $('#modalGoogleMapsLocalidade').html(doc.data().localidade);
                            $('#modalGoogleMapsRua').html(doc.data().rua);
                            $('#modalGoogleMapsCodigoPostal').html(doc.data().codigoPostal);
                            $('#modalGoogleMapsDistance').html();

                        }
                    })
                });
        }

        function ReadOnly(status) 
        {
            return status != "" && status != 'Selecionar' ? "readonly" : "";
        }

        function Selected(currentStatus, statusToCompare) 
        {
            return currentStatus == statusToCompare ? "Selected" : "";
        }

        function CheckIsNull(value) 
        {
            return value != null ? value : "";
        }

        Geocode.fromAddress('Rua do Jardim, 2695-656, Loures').then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
      
              console.log('Latitude: ' + lat + ' || Longitude: ' + lng);
      
              this.setState({
                latitude: lat,
                longitude: lng
              });
      
            },
            (error) => {
              console.log(error);
            }
          );    
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

                    <div className="MainDiv" style={styleDiv} >

                        <div className="container" style={{
                position: 'absolute', left: '50%', top: '30%', maxWidth: '90%',
                transform: 'translate(-50%, -50%)'
              }} >
                            <span style={{fontSize:'x-large', fontWeight: 'bold'}} id="titleTable"><u></u></span>
                            <br/>
                            <br/>
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

                        <div class="modal fade" id="modalGoogleMaps" style={{paddingTop: '4%'}} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">

                                    <div class="modal-body">
                                        <h4>Google Maps</h4>
                                        <span><b>Latitude:</b> {this.state.latitude}</span>
                                        <br/>
                                        <span><b>Longitude:</b> {this.state.longitude}</span>
                                        <div style={{ height: '50vh', width: '100%' }}>

                                            <GoogleMapReact
                                                bootstrapURLKeys={{ key: "AIzaSyBnyvkAnkVp4RHFuqvNzlkLDMCEL6fRu1w" }}
                                                defaultCenter={{
                                                    lat: 38.83247679999999,
                                                    lng: -9.101574
                                                }}
                                                defaultZoom={11}
                                            >

                                            <Marker                      
                                                lat={this.state.latitude}
                                                lng={this.state.longitude}
                                                name="My Marker"
                                                color="#55b3e9"
                                            />

                                            </GoogleMapReact>
                                        </div>
                                        <br/>
                                        <label>Localidade:&nbsp;</label>
                                        <label id="modalGoogleMapsLocalidade" style={{fontWeight:"normal"}}></label>
                                        <br/>
                                        <label>Rua:&nbsp;</label>
                                        <label id="modalGoogleMapsRua" style={{fontWeight:"normal"}}></label>
                                        <br/>
                                        <label>Código-postal:&nbsp;</label>
                                        <label id="modalGoogleMapsCodigoPostal" style={{fontWeight:"normal"}}></label>
                                        <br/>
                                        <label style={{display: "none"}}>Distância:&nbsp;</label>
                                        <label id="modalGoogleMapsDistance" style={{fontWeight:"normal", display: "none"}}></label>
                                        <br/>

                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >

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
                    </div >
                
            </div>
        )
    }
}

export default MyServices_Prestador