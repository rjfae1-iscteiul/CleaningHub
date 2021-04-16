import React from "react"
import firebase from 'firebase';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap';
import 'react-rater/lib/react-rater.css';
import { Helmet } from "react-helmet";
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import swal from 'sweetalert';

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


class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

    /*
    Geocode.setApiKey("AIzaSyBnyvkAnkVp4RHFuqvNzlkLDMCEL6fRu1w");

    Geocode.fromAddress("Eiffel Tower").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        alert(lat, lng);
      },
      (error) => {
        alert(error);
      }
    );
    */

    $(document).ready(function () {
      GetCurrentInformation();

      $('#btnChangePassword').click(function () {
        ReturnInstanceFirebase();

        var auth = firebase.auth();

        auth.sendPasswordResetEmail("ferreira.jorge.ricardo@gmail.com").then(function () {
          SweetAlert("Sucesso", "Foi enviado um e-mail para redefinir a sua password.", "success");
        }).catch(function (error) {
          console.log('error: ' + error);
        });
      });

      $('#btnGuardarGeral').click(function () 
      {
        var localidade = $('#idTxbLocalidade').val();
        var contatoTelefonico = $('#idTxbContatoTelefonico').val();
        var nacionalidade = $('#idTxbNacionalidade').val();
        var codigoPostal = $('#idTxbCodigoPostal').val();
        var rua = $('#idTxbRua').val();

        if(localidade == "" || contatoTelefonico == "" || nacionalidade == "" || codigoPostal == "" || rua == "") 
        {
          SweetAlert("Alerta", "Dados principais devem estar todos preenchidos.", "warning");
        } 
        else 
        {
          SweetAlert("Sucesso", "Dados principais atualizados com sucesso.", "success");
          SetNewInformationInFirebase("g9tgom");
        }

      });

      $('#btnDadosPagamentos').click(function () {
        $('#modalPayment').modal('show');
      });

      $('#atualizarDadosPagamento').click(function () {

        if(!CheckCC()) 
        {
          SweetAlert("Aviso", "Os dados do cartão de crédito não se encontram corretamente preenchidos.", "warning");
        } 
        else if(!CheckIBAN()) 
        {
          SweetAlert("Aviso", "O IBAN não se encontra corretamente preenchido.", "warning");
        } 
        else if(!CheckMBWay())
        {
          SweetAlert("Aviso", "O número de MBWay não se encontra corretamente preenchido", "warning");
        } 
        else 
        {
          $('#modalPayment').modal('hide');
          SweetAlert("Sucesso", "Dados atualizados com sucesso", "success");
          SetNewInformationInFirebase("g9tgom");
        }
      })

    });

    function CheckIBAN() 
    {
      var IBAN = $('#idTxbIBAN').val();

      if(IBAN != "")
        return IBAN.length == 24 && IBAN.startsWith("P") && IsNumber(IBAN.replace("P", ""));
      else 
        return true;
    }

    function CheckMBWay() 
    {
      var MBWay = $('#idTxbMbWay').val();

      if(MBWay != "")
        return MBWay.length == 9 && IsNumber(MBWay);
      else
        return true
    }

    function CheckCC() 
    {
      var numCC = $('#txbNumCartaoCredito').val();
      var codCC = $('#txbCCVCartaoCredito').val();
      var valCC = $('#txbDataValidadeCartaoCredito').val();

      if(numCC != "" || codCC != "" || valCC != "")
        return numCC.length == 16 && IsNumber(numCC) && codCC.length == 3 && IsNumber(codCC) && valCC.length == 5 && IsNumber(valCC.replace("/", ""));
      else
        return true;
    }

    function IsNumber(val)
    {
      return /^\d+$/.test(val);
    }

    function GetCurrentInformation() {
      const db = ReturnInstanceFirebase();

      db.collection("Utilizadores")
        .where("utilizadorId", "==", "g9tgom")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            $('#idTxbPrimeiroNome').val(doc.data().primeiroNome);
            $('#idTxbSegundoNome').val(doc.data().segundoNome);
            $('#idTxbRua').val(doc.data().rua);
            $('#idTxbCodigoPostal').val(doc.data().codigoPostal);
            $('#idTxbContatoTelefonico').val(doc.data().contactoTelefonico);
            $('#idTxbLocalidade').val(doc.data().localidade);
            $('#idTxbEmail').val(doc.data().email);
            $('#idTxbNacionalidade').val(doc.data().nacionalidade);
            $('#idTxbDataNascimento').val(doc.data().dataNascimento);

            $('#idTxbMbWay').val(doc.data().mbway);
            $('#idTxbIBAN').val(doc.data().iban);
            $('#txbCCVCartaoCredito').val(doc.data().ccCodigo);
            $('#txbDataValidadeCartaoCredito').val(doc.data().ccDataValidade);
            $('#txbNumCartaoCredito').val(doc.data().ccCartaoCredito);

          })
        })
        .catch((error) => {
          console.log("Erro: " + error);
        });
    }

    function SweetAlert(MensagemPrincipal, MensagemSecundaria, Tipo) 
    {
      swal(MensagemPrincipal, MensagemSecundaria, Tipo);
    }

    function SetNewInformationInFirebase(utilizadorId) {
      const db = ReturnInstanceFirebase();

      var servicoReference = db.collection("Utilizadores").doc(utilizadorId);

      return servicoReference.update({
        "rua": $('#idTxbRua').val(),
        "localidade": $('#idTxbLocalidade').val(),
        "codigoPostal": $('#idTxbCodigoPostal').val(),
        "nacionalidade": $('#idTxbNacionalidade').val(),
        "contactoTelefonico": $('#idTxbContatoTelefonico').val(),
        "mbway": $('#idTxbMbWay').val(),
        "iban": $('#idTxbIBAN').val(),
        "ccCodigo": $('#txbCCVCartaoCredito').val(),
        "ccDataValidade": $('#txbDataValidadeCartaoCredito').val(),
        "ccCartaoCredito": $('#txbNumCartaoCredito').val()
      })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.log("Error update: " + error);
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

  }

  render() {

    const styleDiv = {
      paddingTop: "8%",
      textAlign: "center",
      fontFamily: "Calibri",
      paddingLeft: "400px"
    };

    const styleCheckbox = {
      textAlign: "left"
    };
    const styleTexBox = {
      height: "24px",
      fontFamily: "Calibri"
    }
    const styleLabel = {
      fontFamily: "Calibri",
      fontWeight: "bold"
    }

    const modalService = {
      paddingTop: "40px"
    }

    return (

      <div style={styleDiv} className="EditProfile">
        <form>


          <table>
            <tr>
              <td>

                <div class="form-row">
                  <div class="col">
                    <div class="form-group">
                      <label>Primeiro Nome</label>
                      <input type="text" class="form-control" id="idTxbPrimeiroNome" ReadOnly="true" ></input>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label>Segundo Nome</label>
                      <input type="text" class="form-control" id="idTxbSegundoNome" ReadOnly="true" ></input>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Rua</label>
                  <input type="text" class="form-control" id="idTxbRua" ></input>
                </div>

                <div class="form-row">
                  <div class="col">
                    <div class="form-group">
                      <label>Código-postal</label>
                      <input type="text" class="form-control" id="idTxbCodigoPostal" ></input>
                    </div>
                    <div class="form-group">
                      <label>Nacionalidade</label>
                      <input type="text" class="form-control" id="idTxbNacionalidade" ></input>
                    </div>

                    <div class="form-group">
                      <label>Contacto telefónico</label>
                      <input type="tel" class="form-control" id="idTxbContatoTelefonico" ></input>
                    </div>
                  </div>

                  <div class="col">
                    <div class="form-group">
                      <label>Localidade</label>
                      <input type="text" class="form-control" id="idTxbLocalidade" ></input>
                    </div>

                    <div class="form-group">
                      <label>Data de Nascimento</label>
                      <input type="text" class="form-control" id="idTxbDataNascimento" ReadOnly="true"></input>
                    </div>

                    <div class="form-group">
                      <label>E-mail</label>
                      <input type="text" class="form-control" id="idTxbEmail" ReadOnly="true" ></input>
                    </div>
                  </div>
                </div>

                <div class="form-row">

                  <div class="col">
                    <div>
                      <button type="button" class="btn btn-primary" id="btnChangePassword">Mudar Password</button>
                    </div>
                  </div>
                  <div class="col">
                    <div>
                      <button type="button" class="btn btn-primary" id="btnDadosPagamentos">Dados Pagamento</button>
                    </div>
                  </div>
                  <div class="col">
                    <div>
                      <button type="button" class="btn btn-primary" id="btnGuardarGeral">Guardar</button>
                    </div>
                  </div>
                </div>
              </td>

              <td style={{ paddingLeft: "2em" }}>
                {/* Google Maps */}
                <h4>Google Maps</h4>
                <div style={{ height: '50vh', width: '50vh' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBnyvkAnkVp4RHFuqvNzlkLDMCEL6fRu1w" }}
                    defaultCenter={{
                      lat: 59.95,
                      lng: 30.33
                    }}
                    defaultZoom={11}
                  >

                    <Marker
                      lat={59.95}
                      lng={30.33}
                      name="My Marker"
                      color="#55b3e9"
                    />

                  </GoogleMapReact>


                </div>
              </td>
            </tr>
          </table>

          {/* Modal */}
          <div class="modal" id="modalPayment" style={{ paddingTop: "10em" }} tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Dados de Pagamento</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">

                  <div class="card">
                    <h5 class="card-header">Cartão de Crédito</h5>
                    <div class="card-body">
                      <div class="form-row">
                        <label>Número do Cartão</label>
                        <input type="text" class="form-control" id="txbNumCartaoCredito"></input>
                      </div>

                      <br />
                      <div class="form-row">

                        <div class="col">
                          <div class="form-group">
                            <label>Data de Validade</label>
                            <input type="text" class="form-control" placeholder="MM/YY" id="txbDataValidadeCartaoCredito"></input>
                          </div>
                        </div>

                        <div class="col">
                          <div class="form-group">
                            <label>CVV</label>
                            <input type="number" class="form-control" id="txbCCVCartaoCredito"></input>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                  <br />

                  <div class="form-group">
                    <label>IBAN</label>
                    <input type="text" class="form-control" id="idTxbIBAN"></input>
                  </div>

                  <div class="form-group">
                    <label>MBWAY</label>
                    <input type="text" class="form-control" id="idTxbMbWay"></input>
                  </div>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" id="atualizarDadosPagamento">Atualizar dados</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                </div>
              </div>
            </div>


          </div>
        </form>
      </div >
    )
  }
}

export default EditProfile