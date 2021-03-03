import React from "react"
import firebase from 'firebase';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends React.Component 
{
    constructor() {
        super()
        this.state = 
        {
            tipoRegisto: "",
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
            message: ""
        }

        this.registerClick = this.registerClick.bind(this);
    }

    registerClick() 
    {  
        const db = firebase.firestore();
            
            if(this.state.primeiroNome != "" && this.state.segundoNome != "" && this.state.nacionalidade != "" &&
               this.state.rua != "" && this.state.codigoPostal != "" && this.state.localidade != "" &&
               this.state.contactoTelefonico != "" && this.state.email != "") 
            {
                const numberOfCollaborators = 1;

                db.collection("Colaboradores")
                  .where("email", "==", this.state.email)
                  .get()
                  .then(function(snapshot) {
                      numberOfCollaborators = snapshot.size;
                  })
                  .catch((error) => {
                      alert("Erro: " + error);
                  });

                if(numberOfCollaborators == 0) 
                {                
                    db.collection("Colaboradores").doc("CB2").set({
                      primeiroNome: this.state.primeiroNome,
                      segundoNome: this.state.segundoNome,
                      nacionalidade: this.state.nacionalidade,
                      dataNascimento: this.state.dataNascimento,
                      rua: this.state.rua,
                      codigoPostal: this.state.codigoPostal,
                      localidade: this.state.localidade,
                      contactoTelefonico: this.state.contactoTelefonico,
                      email: this.state.email
                    })
                    .then(() => {
                        alert("Document successfully written!");
                    })
                    .catch((error) => {
                        alert("Error writing document: ", error);
                    });

                    this.setState({message: "Utilizador criado."});

                } else {
                  this.setState({message: "O e-mail " + this.state.email + "já se encontra registado."});
                }
            } 
            else 
            {
              this.setState({message: "Por favor preencha todos os campos."});
            }        
    }

    render() 
    {
        return (
                <div style={{paddingTop:100}} className="Login">
                  <Form>

                  {/* <Form onSubmit={handleSubmit}> */}

                  <Form.Group sm={10}>
        <Form.Check
          type="radio"
          label="Colaborador"
          name="cbEscolherColaboradorOuUtilizador"
          id="checkColaborador"
          onClick={(e) => this.setState({ tipoRegisto: "Colaborador"})}        
        />
        <Form.Check
          type="radio"
          name="cbEscolherColaboradorOuUtilizador"
          label="Utilizador"
          id="checkUtilizador"
          onClick={(e) => this.setState({ tipoRegisto: "Utilizador"})}        
        />
      </Form.Group>

                    <Form.Group size="lg">
                      <Form.Label>Primeiro Nome</Form.Label>
                      <Form.Control
                        autoFocus
                        type="text"
                        onChange={(e) => this.state.primeiroNome = e.target.value}
                      />
                    </Form.Group>
                    <Form.Group size="lg">
                      <Form.Label>Segundo Nome</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => this.state.segundoNome = e.target.value}
                      />
                    </Form.Group>
                    <Form.Group size="lg">
                      <Form.Label>Nacionalidade</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => this.state.nacionalidade = e.target.value}
                      />
                    </Form.Group>
                    <Form.Group size="lg">
                      <Form.Label>Data Nascimento</Form.Label>
                      <Form.Control
                        type="date"
                        onChange={(e) => this.state.dataNascimento = e.target.value}
                      />
                    </Form.Group>
                    <Form.Group size="lg">
                      <Form.Label>Rua</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => this.state.rua = e.target.value}
                      />
                    </Form.Group>
                    <Form.Group size="lg">
                      <Form.Label>Código-postal</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => this.state.codigoPostal = e.target.value}
                      />
                    </Form.Group>
                    <Form.Group size="lg">
                      <Form.Label>Localidade</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => this.state.localidade = e.target.value}
                      />
                    </Form.Group>
                    <Form.Group size="lg">
                      <Form.Label>Contacto telefónico</Form.Label>
                      <Form.Control
                        type="tel"
                        onChange={(e) => this.state.contactoTelefonico = e.target.value}
                      />
                    </Form.Group>
                    <Form.Group size="lg">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        onChange={(e) => this.state.email = e.target.value}
                      />
                    </Form.Group>
                    <div style={{display: this.state.tipoRegisto == "Utilizador" || this.state.tipoRegisto == "" ? "none" : "block" }}>
                    <Form.Group size="lg" >
                      <Form.Label>NIF</Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) => this.state.nif = e.target.value}
                      />
                    </Form.Group>
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