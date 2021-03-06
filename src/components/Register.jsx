import React from "react"
import firebase from 'firebase';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends React.Component {
  constructor() {
    super()
    this.state =
    {
      tipoRegisto: "",
      genero: "",
      primeiroNome: "",
      segundoNome: "",
      nacionalidade: "",
      dataNascimento: "",
      rua: "",
      codigoPostal: "",
      localidade: "",
      contactoTelefonico: "",
      email: "",
      nif: "",
      message: "",
      fstPassword: "",
      sndPassword: "",
      IBAN: "",
      priceServiceWithProduct: "",
      priceServiceWithoutProduct: "",
      rating: 0,
      distance: 0
    }

    this.registerClick = this.registerClick.bind(this);
  }

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

  registerClick() {
    const db = firebase.firestore();

    if (this.state.primeiroNome != "" && this.state.segundoNome != "" && this.state.nacionalidade != "" &&
      this.state.rua != "" && this.state.codigoPostal != "" && this.state.localidade != "" &&
      this.state.contactoTelefonico != "" && this.state.email != "") {
      if (this.state.fstPassword != this.state.sndPassword) {
        this.setState({ message: "A password não se encontra igual nas duas opções." });
      }
      else {

        const documents = [];

        db.collection("Colaboradores")
          .where("email", "==", this.state.email)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
              alert(doc.id, " => ", doc.data());
              // alert(doc.data().PrimeiroNome);
              documents.push(doc.data());
            });
          })
          .catch((error) => {
            alert("Erro: " + error);
          });

        alert("Array l:" + documents.length);

        if (this.state.numberOfExistsUsers == 0) {
          var randomstring = require("randomstring");

          db.collection("Colaboradores").doc(randomstring.generate(7)).set({
            primeiroNome: this.state.primeiroNome,
            segundoNome: this.state.segundoNome,
            nacionalidade: this.state.nacionalidade,
            dataNascimento: this.state.dataNascimento,
            rua: this.state.rua,
            codigoPostal: this.state.codigoPostal,
            localidade: this.state.localidade,
            contactoTelefonico: this.state.contactoTelefonico,
            email: this.state.email,
            rating: this.state.rating,
            distance: this.state.distance
          })
            .then(() => {
              alert("Document successfully written!");
            })
            .catch((error) => {
              alert("Error writing document: ", error);
            });

          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.fstPassword)
            .then((user) => {
              alert("User criado no Auth Firebase");
              // ...
            })
            .catch((error) => {
              alert("Erro no Auth Firebase");
              var errorCode = error.code;
              var errorMessage = error.message;
              // ..
            });

          this.setState({ message: "Utilizador criado." });

        } else {
          this.setState({ message: "O e-mail " + this.state.email + "já se encontra registado." });
        }
      }
    }
    else {
      this.setState({ message: "Por favor preencha todos os campos." });
    }
  }

  render() {

    const styleDiv = {
      paddingTop: "50px",
      textAlign: "center",
      fontFamily: "Calibri",
      paddingLeft: "400px"
    };

    const styleTexBox = {
      height: "24px",
      fontFamily: "Calibri"
    }
    const styleLabel = {
      fontFamily: "Calibri",
      fontWeight: "bold"
    }

    return (

      <div style={styleDiv} className="Register">

        <Form>

          <div class="form-row">
            <div class="col">
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Colaborador"
                  name="cbEscolherColaboradorOuUtilizador"
                  id="checkColaborador"
                  onClick={(e) => this.setState({ tipoRegisto: "Colaborador" })}
                />
                <Form.Check
                  type="radio"
                  label="Utilizador"
                  name="cbEscolherColaboradorOuUtilizador"
                  id="checkUtilizador"
                  onClick={(e) => this.setState({ tipoRegisto: "Utilizador" })}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Primeiro Nome</Form.Label>
                <Form.Control
                  style={styleTexBox}
                  autoFocus
                  type="text"
                  onChange={(e) => this.setState({ primeiroNome: e.target.value })}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Data Nascimento</Form.Label>
                <Form.Control
                  style={styleTexBox}
                  type="date"
                  onChange={(e) => this.setState({ dataNascimento: e.target.value })}
                />
              </Form.Group>
            </div>
            <div class="col">

              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Masculino"
                  name="cbEscolherGenero"
                  id="checkMasculino"
                  onClick={(e) => this.setState({ genero: "Masculino" })}
                />
                <Form.Check
                  type="radio"
                  label="Feminino"
                  name="cbEscolherGenero"
                  id="checkFeminino"
                  onClick={(e) => this.setState({ genero: "Feminino" })}
                />
              </Form.Group>


              <Form.Group>
                <Form.Label>Segundo Nome</Form.Label>
                <Form.Control
                  type="text"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ segundoNome: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nacionalidade</Form.Label>
                <Form.Control
                  type="text"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ nacionalidade: e.target.value })}
                />
              </Form.Group>

            </div>
          </div>

          <Form.Group>
            <Form.Label>Rua</Form.Label>
            <Form.Control
              type="text"
              style={styleTexBox}
              onChange={(e) => this.setState({ rua: e.target.value })}
            />
          </Form.Group>
          <div class="form-row">
            <div class="col">
              <Form.Group>
                <Form.Label>Código-postal</Form.Label>
                <Form.Control
                  type="text"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ codigoPostal: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contacto telefónico</Form.Label>
                <Form.Control
                  type="tel"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ contactoTelefonico: e.target.value })}
                />
              </Form.Group>
              <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ fstPassword: e.target.value })}
                />
              </Form.Group>
            </div>
            <div class="col">
              <Form.Group>
                <Form.Label>Localidade</Form.Label>
                <Form.Control
                  type="text"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ localidade: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </Form.Group>
              <Form.Group >
                <Form.Label>Repita a Password</Form.Label>
                <Form.Control
                  type="password"
                  style={styleTexBox} S
                  onChange={(e) => this.setState({ sndPassword: e.target.value })}
                />
              </Form.Group>
            </div>
          </div>

          <div style={{ display: this.state.tipoRegisto == "Utilizador" || this.state.tipoRegisto == "" ? "none" : "block" }}>
            <div class="form-row">
            <div class="col">
              <Form.Group >
                <Form.Label>NIF</Form.Label>
                <Form.Control
                  type="number"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ nif: e.target.value })}
                />
              </Form.Group>
              <Form.Group >
                <Form.Label>Preço sem produtos</Form.Label>
                <Form.Control
                  type="number"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ priceServiceWithoutProduct: e.target.value })}
                />
              </Form.Group>
            </div>
            <div class="col">
            <Form.Group >
                <Form.Label>IBAN</Form.Label>
                <Form.Control
                  type="number"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ IBAN: e.target.value })}
                />
              </Form.Group>

              <Form.Group >
                <Form.Label>Preço com produtos</Form.Label>
                <Form.Control
                  type="number"
                  style={styleTexBox}
                  onChange={(e) => this.setState({ priceServiceWithProduct: e.target.value })}
                />
              </Form.Group>
            </div>
            </div>
          </div>


          <Button onClick={this.registerClick}>
            <label>Registar {this.state.tipoRegisto} </label>
          </Button>
          <label>{this.state.message}</label>
        </Form>
      </div>
    )
  }
}

export default Register