import React from "react"
import firebase from 'firebase';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap';
import 'react-rater/lib/react-rater.css';
import { Helmet } from "react-helmet";
import GoogleMapReact from 'google-map-react';

class EditProfile extends React.Component 
{
  constructor(props) {
    super(props)
    this.state = {
        
      }
    }

    
    componentDidMount() {

        $(document).ready(function () {
          $('#btnEditar').click(function () {
            $('#modalChangePassword').modal('show');
          });

          $('#btnGuardarAlteracaoDaPassword').click(function () 
          {
            ReturnInstanceFirebase();

            var auth = firebase.auth();

            auth.sendPasswordResetEmail("ferreira.jorge.ricardo@gmail.com").then(function() {
              alert('email enviado');
            }).catch(function(error) {
              alert('error: ' + error);
            });
          });                  
    
          $('#savePassword').click(function () 
          {
            if(Prestador_CheckInformation())
            {
              $('#modalChangePassword').modal('hide');
            } 
            else 
            {
              alert('Alguns campos estão inválidos');
            }
          });
      
        });
    
        function GetCurrentInformation() 
        {
          const db = ReturnInstanceFirebase();

          db.collection("Utilizadores")
          .where("utilizadorId", "==", "g9tgom")
          .get()
          .then(querySnapshot => 
          {
            querySnapshot.forEach((doc) => 
            {
              $('#idTxbPrimeiroNome').val(doc.data().primeiroNome);
              $('#idTxbSegundoNome').val(doc.data().primeiroNome);
              $('#idTxbPrimeiroNome').val(doc.data().primeiroNome);
              $('#idTxbPrimeiroNome').val(doc.data().primeiroNome);

            })
          })
          .catch((error) => {
            alert("Erro: " + error);
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


      <div style={styleDiv} className="EditProfile">
        <form>
        
        <div class="row">
        <div class="col-md-6">
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label>Primeiro Nome</label>
                <input type="text" class="form-control" id="idTxbPrimeiroNome" ></input>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>Segundo Nome</label>
                <input type="text" class="form-control" id="idTxbSegundoNome" ></input>
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
            </div>
          </div>

          <div class="form-row">
            
            <div class="col">  
                <div>
                     <button type="button" class="btn btn-primary" id="btnEditar">Mudar Password</button>
                </div>
            </div>
            <div class="col">
                <div>
                    <button type="button" class="btn btn-primary" id="btnGuardarGeral"  >Guardar</button>
                </div>
            </div>
           </div>       
          
          <div class="modal fade" id="modalChangePassword" style={modalService} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Mudar Password</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">

                  <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" id="idTxbCurrentPassword" ></input>
                  </div>

                  <div class="form-group">
                    <label>Nova Password</label>
                    <input type="password" class="form-control" id="idTxbNewPassword" ></input>
                  </div>

                  <div class="form-group">
                    <label>Confirmar Password</label>
                    <input type="password" class="form-control" id="idTxbNewConfirmPassword" ></input>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success" id="btnGuardarAlteracaoDaPassword" data-dismiss="modal">Guardar</button>
                  </div>
                </div>
              </div>
            </div>
          </div >
          
          </div>
          <div class="col-md-6">
          <div class="row">
           {/* Google Maps */}
            <div style={{ height: '50vh', width: '100%' }}>
                  <GoogleMapReact
                      bootstrapURLKeys={{ key: "AIzaSyBnyvkAnkVp4RHFuqvNzlkLDMCEL6fRu1w" }}
                      defaultCenter={{
                          lat: 59.95,
                          lng: 30.33
                      }}
                      defaultZoom={11}
                  >
                  </GoogleMapReact>
              </div>
            </div>
            <div class="row">
              <form role="form">
                <div class="form-group">
                  <label for="username">Full name (on the card)</label>
                  <input type="text" class="form-control" name="username" placeholder="" required=""></input>
                </div>
                <div class="form-group">
                  <label for="cardNumber">Card number</label>
                  <div class="input-group">
                    <input type="text" class="form-control" name="cardNumber" placeholder=""></input>
                    <div class="input-group-append">
                      <span class="input-group-text text-muted">
                       <i class="fab fa-cc-visa"></i>  <i class="fab fa-cc-amex"></i>   
                       <i class="fab fa-cc-mastercard"></i> 
                      </span>
                    </div>
                  </div>
                </div>

              <div class="row">
                  <div class="col-sm-8">
                      <div class="form-group">
                          <label><span class="hidden-xs">Expiration</span> </label>
                        <div class="input-group">
                          <input type="number" class="form-control" placeholder="MM" name=""></input>
                            <input type="number" class="form-control" placeholder="YY" name=""></input>
                        </div>
                      </div>
                  </div>
                  <div class="col-sm-4">
                      <div class="form-group">
                          <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">CVV <i class="fa fa-question-circle"></i></label>
                          <input type="number" class="form-control" required=""></input>
                      </div>
                  </div>
              </div>
              <button class="subscribe btn btn-primary btn-block" type="button"> Confirm  </button>
              </form>
            </div>
            </div>
            </div>
        </form>
      </div >
    )
  }
}

export default EditProfile