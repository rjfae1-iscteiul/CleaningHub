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
 
class Dashboard_CH extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {

        $(document).ready(function () {

            NumeroUtilizadores();
            NumeroPrestadores();
            NumeroServicos();
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

        function NumeroUtilizadores() {

            const db = ReturnInstanceFirebase();

            db.collection("Utilizadores")
                .get()
                .then((querySnapshot) => {
                    var label = $('#indicator1').html();
                    $('#indicator1').html(label + querySnapshot.size);
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function NumeroPrestadores() {

            const db = ReturnInstanceFirebase();

            db.collection("Utilizadores")
                .get()
                .then((querySnapshot) => {
                    var label = $('#indicator2').html();
                    $('#indicator2').html(label + querySnapshot.size);
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        function NumeroServicos() {

            const db = ReturnInstanceFirebase();

            db.collection("PedidosServico")
                .get()
                .then((querySnapshot) => {
                    var iban = 0;
                    var mbway = 0;
                    var cc = 0;

                    var label = $('#indicator3').html();
                    $('#indicator3').html(label + querySnapshot.size);

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

                    var label8 = $('#indicator8').html();
                    $('#indicator8').html(label8 + iban);

                    var label9 = $('#indicator9').html();
                    $('#indicator9').html(label9 + mbway);

                    var label10 = $('#indicator10').html();
                    $('#indicator10').html(label10 + cc);
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
            paddingTop: "30px",
            fontFamily: "Calibri"
        }

        const modalService = {
            paddingTop: "100px"
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
                <head>
                    <Helmet>
                    </Helmet>
                </head>
                <body>

                    <div className="MainDiv" style={styleDiv}>

                        <div className="container">

                            <table>
                                <tr>
                                    <td>
                                        <div class="card" style={{ width: "25rem" }}>
                                            <div class="card-header" style={{ fontWeight: "bold" }}>
                                                Indicadores gerais
                                </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item" id="indicator1">Número de utilizadores:&nbsp;</li>
                                                <li class="list-group-item" id="indicator2">Número de prestadores:&nbsp;</li>
                                                <li class="list-group-item" id="indicator3">Número de serviços:&nbsp;</li>
                                                <li class="list-group-item" id="indicator8">Número de pagamentos com IBAN:&nbsp;</li>
                                                <li class="list-group-item" id="indicator9">Número de pagamentos com MbWay:&nbsp;</li>
                                                <li class="list-group-item" id="indicator10">Número de pagamentos com Cartão de Crédito:&nbsp;</li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="card" style={{ width: "25rem" }}>
                                            <div class="card-header" style={{ fontWeight: "bold" }}>
                                                Indicadores utilizadores
                                </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Número de serviços remarcados:&nbsp;</li>
                                                <li class="list-group-item">Número de serviços cancelados pelo utilizador:&nbsp;</li>
                                                <li class="list-group-item">Número de serviços cancelados pelo prestador:&nbsp;</li>
                                                <li class="list-group-item">Número de serviços terminados:&nbsp;</li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="card" style={{ width: "25rem" }}>
                                            <div class="card-header" style={{ fontWeight: "bold" }}>
                                                Indicadores prestadores
                                </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Número de serviços remarcados:&nbsp;</li>
                                                <li class="list-group-item">Número de serviços cancelados pelo utilizador:&nbsp;</li>
                                                <li class="list-group-item">Número de serviços cancelados pelo prestador:&nbsp;</li>
                                                <li class="list-group-item">Número de serviços terminados:&nbsp;</li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </table>


                        </div>
                    </div >
                </body >
            </html >
        )
    }
}

export default Dashboard_CH