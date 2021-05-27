import React from "react"
import firebase from 'firebase';
import styled from "styled-components";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet';
import Logo_Completo from "../resources/Logo_Completo.png";
import swal from 'sweetalert';

class Register extends React.Component {
  constructor() {
    super()
    this.state =
    {
    }
  }

  componentDidMount() {

    var files = [];

    $(document).ready(function () {
      $('#chbPrestador').click(function () {
        $('#modalMoreDataPrestador').modal('show');
      });

      $('#btnRegister').click(function () {

        const db = ReturnInstanceFirebase();

        if (Colaborador_CheckInformation() && VerifyCheckboxEmptys()) {
          if (!VerifyPassword()) {
            SweetAlert("Aviso", "A password não se encontra igual nas duas opções.", "warning");
          }
          else {

            let randString = Math.random().toString(36).substring(7);

            if ($('#chbPrestador').prop("checked")) {
              db.collection("Prestadores")
                .where("email", "==", $('#idTxbEmail').val())
                .get()
                .then(querySnapshot => {
                  console.log(querySnapshot.size);

                  if (querySnapshot.size == 0) 
                  {
                    AddPrestadorInCollectionFirebase(randString);

                    CreateUserInAuthFirebase();

                    SendEmailRegister($('#idTxbPrimeiroNome').val(), $('#idTxbEmail').val());

                    SetImageInCloudFirebase(files, randString);

                    SweetAlert("Sucesso", "Utilizador criado.", "success");
                  } else {
                    SweetAlert("Aviso", "Utilizador já existe.", "warning");
                  }
                })
                .catch((error) => {
                  console.log("Erro: " + error);
                });
            }
            else {
              db.collection("Utilizadores")
                .where("email", "==", $('#idTxbEmail').val())
                .get()
                .then(querySnapshot => {
                  console.log(querySnapshot.size);

                  if (querySnapshot.size == 0) 
                  {
                    AddUtilizadorInCollectionFirebase(randString);

                    CreateUserInAuthFirebase();

                    SendEmailRegister($('#idTxbPrimeiroNome').val(), $('#idTxbEmail').val());
                    
                    SweetAlert("Sucesso", "Utilizador criado.", "success");
                  } else {
                    SweetAlert("Aviso", "Utilizador já existe.", "warning");
                  }
                })
                .catch((error) => {
                  console.log("Erro: " + error);
                });
            }
          }
        }
        else {
          SweetAlert("Alerta", "Por favor preencha corretamente todos os campos.", "warning");
        }
      });

      $('#saveDataPrestador').click(function ()
      {
        if (Prestador_CheckInformation()) {
          $('#modalMoreDataPrestador').modal('hide');
          console.log(files.length);
        }
        else {
          SweetAlert("Alerta", "Todos os campos (excepto o IBAN) são de preenchimento obrigatório.", "warning");
        }
      });

      $('#importPrestadorPhoto').change(function (e)
      {
        files = e.target.files;
      });

    });

    function Colaborador_CheckInformation() {
      if (!CheckCodigoPostal() || !CheckContactoTelefonico() || $('#idTxbPrimeiroNome').val() == "" || $('#idTxbSegundoNome').val() == "" || $('#idTxbNacionalidade').val() == "" || $('#idTxbRua').val() == "" ||
        $('#idTxbCodigoPostal').val() == "" || $('#idTxbContatoTelefonico').val() == "" || $('#idTxbPassword').val() == "" || $('#idTxbLocalidade').val() == "" || $('#idTxbEmail').val() == "" || $('#idTxbRewritePassword').val() == "") {
        return false;
      }
      else {
        return true;
      }
    }

    function Prestador_CheckInformation() {

      if (!CheckCodigoPostal() || !CheckContactoTelefonico() || !CheckNIF() || $('#chbPrestador').attr('checked') && $('#idTxbNIF').val() == "" || $('#idTxbPriceWithoutProducts').val() == "" || $('#idTxbPriceWithProducts').val() == "") {    
        return false;
      }
      else {

        if($('#idTxbIBAN').val() != "") 
        {
            return CheckIBAN();
        } 
        return true;
      }
    }

    function VerifyCheckboxEmptys() {
      if (($('#chbPrestador').prop('checked') || $('#chbUtilizador').prop('checked')) && ($('#chbMasculino').prop('checked') || $('#chbFeminino').prop('checked'))) {
        return true;
      }
      else {
        return false;
      }
    }

    function CheckNIF() 
    {
      var NIF = $('#idTxbNIF').val();

      return NIF.length == 9 && IsNumber(NIF);
    }

    function CheckCodigoPostal() 
    {
      var codigoPostal = $('#idTxbCodigoPostal').val();

      return codigoPostal.length == 8 && IsNumber(codigoPostal.replace("-", ""));
    }

    function CheckIBAN() 
    {
      var IBAN = $('#idTxbIBAN').val();

      return IBAN.length == 24 && IBAN.startsWith("P") && IsNumber(IBAN.replace("P", ""));
    }

    function CheckContactoTelefonico() 
    {
      var contactoTelefonico = $('#idTxbContatoTelefonico').val();

      return IsNumber(contactoTelefonico) && contactoTelefonico.length == 9 && (contactoTelefonico.startsWith("2") || contactoTelefonico.startsWith("9"));
    }

    function IsNumber(val)
    {
      return /^\d+$/.test(val);
    }

    function VerifyPassword() {
      return $('#idTxbPassword').val() == $('#idTxbRewritePassword').val();
    }

    function SendEmailRegister(var_to_name, var_to_email) {
      emailjs.init("user_4DnQE5ZxKgvIrlmfLcC40");

      console.log('SendEmailRegister: ' + var_to_name + ' ' + var_to_email);

      var templateParams =
      {
        to_name: var_to_name,
        // to: var_to_email,
        to: 'rjfae1@iscte-iul.pt'
      };

      emailjs.send('serviceId_CleaningHub', 'template_registerUser', templateParams)
        .then(function (response) {
          console.log('Email enviado com sucesso!', response.status, response.text);
        }, function (error) {
          console.log('Erro no envio do e-mail', error);
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

    function CreateUserInAuthFirebase() {
      firebase.auth().createUserWithEmailAndPassword($('#idTxbEmail').val(), $('#idTxbPassword').val())
        .then((user) => {
          console.log("User criado no Auth Firebase");
        })
        .catch((error) => {
          console.log("Erro no Auth Firebase:" + error.code + " - " + error.message);
        });
    }

    function AddUtilizadorInCollectionFirebase(randString) {

      console.log("AddUtilizadorInCollectionFirebase");

      const db = ReturnInstanceFirebase();

      db.collection("Utilizadores").doc(randString).set({
        utilizadorId: randString,
        primeiroNome: $('#idTxbPrimeiroNome').val(),
        segundoNome: $('#idTxbSegundoNome').val(),
        nacionalidade: $('#idTxbNacionalidade').val(),
        dataNascimento: $('#idTxbDataNascimento').val(),
        rua: $('#idTxbRua').val(),
        codigoPostal: $('#idTxbCodigoPostal').val(),
        localidade: $('#idTxbLocalidade').val(),
        contactoTelefonico: $('#idTxbContatoTelefonico').val(),
        email: $('#idTxbEmail').val(),
        dataRegisto: GetTimeNowStringFormat()
      })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.log("Error writing document: ", error);
        });
    }

    function SweetAlert(MensagemPrincipal, MensagemSecundaria, Tipo) 
    {
      swal(MensagemPrincipal, MensagemSecundaria, Tipo);
    }

    function SetImageInCloudFirebase(files, prestadorId) 
    {
      ReturnInstanceFirebase();

      try 
      {
        var storage = firebase.storage();

        var storageRef = storage.ref();

        storageRef.child('UserImages/' + prestadorId + '.jpg').put(files[0]);
      } 
      catch (error) 
      {
        console.log(error);
      }
    }

    function GetTimeNowStringFormat() {
      var m = new Date();
      return m.getUTCFullYear() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes();
    }

    function AddPrestadorInCollectionFirebase(randString) {

      console.log("AddPrestadorInCollectionFirebase");

      try 
      {
      
        console.log('0' + randString);
        console.log('1' + $('#idTxbPrimeiroNome').val());
        console.log('2' + $('#idTxbSegundoNome').val());
        console.log('3' + $('#idTxbNacionalidade').val());
        console.log('4' + $('#idTxbDataNascimento').val());
        console.log('5' + $('#idTxbRua').val());
        console.log('6' + $('#idTxbCodigoPostal').val());
        console.log('7' + $('#idTxbLocalidade').val());
        console.log('8' + $('#idTxbContatoTelefonico').val());
        console.log('9' + $('#idTxbEmail').val());
        console.log('10' + $('#idTxbNIF').val());
        console.log('11' + $('#idTxbIBAN').val());
        console.log('12' + $('#idTxbPriceWithoutProducts').val());
        console.log('13' + $('#idTxbPriceWithProducts').val());
        console.log('14' + GetTimeNowStringFormat());
        
        const db = ReturnInstanceFirebase();

        var teste = db.collection("Prestadores").doc(randString).set({
          prestadorId: randString,
          primeiroNome: $('#idTxbPrimeiroNome').val(),
          segundoNome: $('#idTxbSegundoNome').val(),
          nacionalidade: $('#idTxbNacionalidade').val(),
          dataNascimento: $('#idTxbDataNascimento').val(),
          rua: $('#idTxbRua').val(),
          codigoPostal: $('#idTxbCodigoPostal').val(),
          localidade: $('#idTxbLocalidade').val(),
          contactoTelefonico: $('#idTxbContatoTelefonico').val(),
          email: $('#idTxbEmail').val(),
          nif: $('#idTxbNIF').val(),
          iban: $('#idTxbIBAN').val(),
          priceWithoutProducts: $('#idTxbPriceWithoutProducts').val(),
          priceWithProducts: $('#idTxbPriceWithProducts').val(),
          dataRegisto: GetTimeNowStringFormat()
        })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.log("Error writing document: ", error);
          });
      } catch (error) {
        console.log("Erro AddPrestadorInCollectionFirebase");
      }      
    }



  }

  render() {

    const styleDiv = {
      position: "absolute",
      paddingTop: "5%",
      textAlign: "center",
      fontFamily: "Calibri",
      fontSize: "large",
      paddingLeft: "40%"
    };

    const styleCheckbox = {
      textAlign: "left",
      fontSize: "large"
    };

    const styleRow = {
      paddingTop: "5%"
    }
    return (

      
      <div style={styleDiv} className="Register">
        <Helmet>
          <style>{'body { background-color: #7CD4EA; }'}</style>
        </Helmet>

        <div className="row">
        <div className="logo">
          <img src={Logo_Completo} style={{display: "none"}} width="341" height="281" />
        </div>
      </div>
        <form>
          <Form.Group size="lg" >
           
            <div class="form-row" style={styleRow}>
              <div class="col">

                <div class="form-group" style={styleCheckbox}>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="groupChbTipo" id="chbPrestador"></input>
                    <label>Prestador</label>

                  </div>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="groupChbTipo" id="chbUtilizador"></input>
                    <label>Utilizador</label>
                  </div>
                </div>

                <div class="form-group">
                  <label>Primeiro Nome</label>
                  <input type="text" class="form-control" id="idTxbPrimeiroNome" ></input>
                </div>

                <div class="form-group">
                  <label>Data Nascimento</label>
                  <input type="date" class="form-control" id="idTxbDataNascimento" ></input>
                </div>

              </div>
              <div class="col">

                <div class="form-group" style={styleCheckbox}>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="groupChbGenero" id="chbMasculino"></input>
                    <label>Masculino</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="groupChbGenero" id="chbFeminino"></input>
                    <label>Feminino</label>
                  </div>
                </div>

                <div class="form-group">
                  <label>Segundo Nome</label>
                  <input type="text" class="form-control" id="idTxbSegundoNome" ></input>
                </div>

                <div class="form-group">
                  <label>Nacionalidade</label>
                  <input type="text" class="form-control" id="idTxbNacionalidade" ></input>
                </div>
              </div>
            </div>
          </Form.Group>

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
                <label>Contacto telefónico</label>
                <input type="tel" class="form-control" id="idTxbContatoTelefonico" ></input>
              </div>

              <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" id="idTxbPassword" ></input>
              </div>

            </div>
            <div class="col">

              <div class="form-group">
                <label>Localidade</label>
                <input type="text" class="form-control" id="idTxbLocalidade" ></input>
              </div>

              <div class="form-group">
                <label>E-mail</label>
                <input type="text" class="form-control" id="idTxbEmail" ></input>
              </div>

              <div class="form-group">
                <label>Repita a Password</label>
                <input type="password" class="form-control" id="idTxbRewritePassword" ></input>
              </div>

            </div>
          </div>

          {/* <button type="button" class="btn btn-primary" id="btnRegister">Registar</button> */}
          <button type="button" id="btnRegister" style={{ background: '#BACA12', color: '#000' }}>
            Registar
                    </button>

          <div class="modal fade" id="modalMoreDataPrestador" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{paddingTop: "3%"}}>
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
                    <label>NIF</label>
                    <input type="number" class="form-control" id="idTxbNIF" ></input>
                  </div>

                  <div class="form-group">
                    <label>IBAN</label>
                    <input type="text" class="form-control" id="idTxbIBAN" Placeholder="PT50"></input>
                  </div>

                  <div class="form-row">

                    <div class="col">
                      <div class="form-group">
                        <label>Preço sem produtos</label>
                        <input type="number" class="form-control" id="idTxbPriceWithoutProducts" ></input>
                      </div>
                    </div>

                    <div class="col">

                      <div class="form-group">
                        <label>Preço com produtos</label>
                        <input type="number" class="form-control" id="idTxbPriceWithProducts" ></input>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>Importar Fotografia</label>
                    <input type="file" class="form-control-file" id="importPrestadorPhoto"></input>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </form>
      </div >
    )
  }
}

export default Register