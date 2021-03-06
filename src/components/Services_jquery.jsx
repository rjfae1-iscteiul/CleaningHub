import React from 'react';
import firebase from 'firebase';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import 'bootstrap';

class Services_jquery extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            rowInformation: []
        }
    }

    /*
    contractClick() 
    {
      this.setState({showModal: true})
      // <ModalContractService></ModalContractService>
    }
  */
    componentWillMount() {

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
    }

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
                    { "data": "name" },
                    { "data": "position" },
                    { "data": "office" },
                    { "data": "office" },
                    { "data": "office1" },
                    {
                        "orderable": false,
                        "data": null,
                        "defaultContent": '<button type="button" id="btnContratar" class="btn btn-light">Contratar</button>'
                    }
                ],
                "order": [[1, 'asc']]
            });

            $("#btnContratar").click(function() 
            {
                $('#exampleModal').modal('show');
            });

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
        });

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
            paddingLeft: "150px",
            fontFamily: "Calibri"
        }
        return (
            <div className="MainDiv" style={styleDiv}>

                <div className="container">

                    <table id="example">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nome</th>
                                <th>Rating</th>
                                <th>Distância</th>
                                <th>Preço S/ produtos</th>
                                <th>Preço C/ produtos</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Prescott Bartlett</td>
                                <td>Technical Author</td>
                                <td>London</td>
                                <td>2011/05/07</td>
                                <td>$145,000</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Gavin Cortez</td>
                                <td>Team Leader</td>
                                <td>San Francisco</td>
                                <td>22</td>
                                <td>2008/10/26</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Martena Mccray</td>
                                <td>Post-Sales support</td>
                                <td>Edinburgh</td>
                                <td>46</td>
                                <td>$324,050</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Unity Butler</td>
                                <td>Marketing Designer</td>
                                <td>San Francisco</td>
                                <td>2009/12/09</td>
                                <td>$85,675</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Donna Snider</td>
                                <td>Customer Support</td>
                                <td>27</td>
                                <td>2011/01/25</td>
                                <td>$112,000</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Services_jquery