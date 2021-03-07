import React from "react"
import firebase from 'firebase';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap';

class Register extends React.Component {
  constructor() {
    super()
    this.state =
    {
    }
  }

  componentDidMount() {

    $(document).ready(function () {
      $('#chbColaborador').click(function () {
        $('#modalMoreDataPrestador').modal('show');
      });

      $('#btnRegister').click(function () {

        const db = ReturnInstanceFirebase();

        if (Colaborador_CheckInformation()) 
        {
          if (!VerifyPassword()) 
          {
            alert("A password não se encontra igual nas duas opções.");
          }
          else 
          { 
              if($('#chbPrestador').attr('checked')) 
              {
                db.collection("Prestadores")
                .where("email", "==", $('#idTxbEmail').val())
                .get()
                .then(querySnapshot => 
                {
                  if(querySnapshot.size == 0) 
                  {
                    AddPrestadorInCollectionFirebase();
  
                    CreateUserInAuthFirebase();
  
                    alert("Utilizador criado.");
                  } else {
                    alert("Utilizador já existe.");
                  }
                })
                .catch((error) => {
                  alert("Erro: " + error);
                });
              } 
              else 
              {
                db.collection("Utilizadores")
                .where("email", "==", $('#idTxbEmail').val())
                .get()
                .then(querySnapshot => 
                {
                  if(querySnapshot.size == 0) 
                  {
                    AddUtilizadorInCollectionFirebase();
  
                    CreateUserInAuthFirebase();  

                    alert("Utilizador criado");
                  } else {
                    alert("Utilizador já existe.");
                  }
                })
                .catch((error) => {
                  alert("Erro: " + error);
                });
              }
          }
        }
        else {
          alert("Por favor preencha todos os campos.");
        }
      });

    });

    function Colaborador_CheckInformation() {
      if ($('#idTxbPrimeiroNome').val() == "" || $('#idTxbSegundoNome').val() == "" || $('#idTxbNacionalidade').val() == "" || $('#idTxbRua').val() == "" ||
        $('#idTxbCodigoPostal').val() == "" || $('#idTxbContatoTelefonico').val() == "" || $('#idTxbPassword').val() == "" || $('#idTxbLocalidade').val() == "" || $('#idTxbEmail').val() == "" || $('#idTxbRewritePassword').val() == "") {
        return false;
      }
      else {
        return true;
      }
    }

    function Prestador_CheckInformation() {
      if ($('#idTxbNIF').val() == "" || $('#idTxbPriceWithoutProducts').val() == "" || $('#idTxbPriceWithProducts').val() == "") {
        return false;
      }
      else {
        return true;
      }
    }

    function VerifyPassword() 
    {
      return $('#idTxbPassword').val() == $('#idTxbRewritePassword').val();
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
          alert("User criado no Auth Firebase");
        })
        .catch((error) => {
          alert("Erro no Auth Firebase:" + error.code + " - " + error.message);
        });
    }

    function AddUtilizadorInCollectionFirebase() {
      let randString = Math.random().toString(36).substring(7);

      const db = ReturnInstanceFirebase();

      db.collection("Utilizadores").doc(randString).set({
        primeiroNome: $('#idTxbPrimeiroNome').val(),
        segundoNome: $('#idTxbSegundoNome').val(),
        nacionalidade: $('#idTxbNacionalidade').val(),
        dataNascimento: $('#idTxbDataNascimento').val(),
        rua: $('#idTxbRua').val(),
        codigoPostal: $('#idTxbCodigoPostal').val(),
        localidade: $('#idTxbLocalidade').val(),
        contactoTelefonico: $('#idTxbContatoTelefonico').val(),
        email: $('#idTxbEmail').val()
      })
        .then(() => {
          alert("Document successfully written!");
        })
        .catch((error) => {
          alert("Error writing document: ", error);
        });
    }

    function AddPrestadorInCollectionFirebase() 
    {
      let randString = Math.random().toString(36).substring(7);

      const db = ReturnInstanceFirebase();

      db.collection("Prestadores").doc(randString).set({
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
      })
        .then(() => {
          alert("Document successfully written!");
        })
        .catch((error) => {
          alert("Error writing document: ", error);
        });
    }
  }

  render() {

    const styleDiv = {
      paddingTop: "50px",
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


      <div style={styleDiv} className="Register">


        <form>

          <div class="form-row">
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
                  <input class="form-check-input" type="radio" name="groupChbGenero" id="chbColaborador"></input>
                  <label>Masculino</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="groupChbGenero" id="chbUtilizador"></input>
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

          <button type="button" class="btn btn-primary" id="btnRegister">Registar</button>

          <div class="modal fade" id="modalMoreDataPrestador" style={modalService} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <input type="number" class="form-control" id="idTxbIBAN" Placeholder="PT50"></input>
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

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success" id="saveDataPrestador" data-dismiss="modal">Guardar</button>
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