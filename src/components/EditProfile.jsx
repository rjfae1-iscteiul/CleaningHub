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
            <div class="col-md-12 modal_body_map">
              <div class="location-map" id="location-map">
                <div style="width: 600px; height: 400px;" id="map_canvas"></div>
              </div>
            </div>
          </div>
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
                    <button type="button" class="btn btn-primary" id="btnEditar">Guardar</button>
                </div>
            </div>
           </div> 


          <div class="modal fade" id="modalMoreDataPrestador" style={modalService} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <label>Current Password</label>
                    <input type="password" class="form-control" id="idTxbPassword" ></input>
                  </div>

                  <div class="form-group">
                    <label>New Password</label>
                    <input type="password" class="form-control" id="idTxbPassword" ></input>
                  </div>

                  <div class="form-group" style={styleCheckbox}>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="groupChbGenero" id="chbColaborador"></input>
                    <label>Masculino</label>
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