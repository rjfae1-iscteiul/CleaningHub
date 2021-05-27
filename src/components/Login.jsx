import React from "react"
import styled from "styled-components";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {Helmet} from 'react-helmet';
import Logo_Completo from "../resources/Logo_Completo.png";
import { findByLabelText } from "@testing-library/dom";

const S = {
StyledFirstPic: styled.img`
position: absolute;
top: 15%;
max-width: 30%;
  `,
};

class Login extends React.Component 
{
    constructor() {
        super()
        this.state = 
        {
          email: "",
          password: ""

        }
    }

    render() 
    {
      const styleDiv = {
      
      paddingTop: "5%",
      position: "absolute",
      paddingLeft: "43%",
      fontSize: "large"
      };
  
      const styleTexBox = {
        height: "24px",
        fontFamily: "Calibri",
        fontSize: "large"
      }
      const styleLabel = {
        fontFamily: "Calibri",
        fontWeight: "bold",
        fontSize: "large"
      }
        return (
          
                <div style={styleDiv} className="Login">
                  
                  <Helmet>
                <style>{'body { background-color: #7CD4EA  ; }'}</style>
            </Helmet>
            <div className="row">
        <div className="logo">
          <img src={Logo_Completo} width="341" height="281" />
        </div>
      </div>
                  <Form>
                  
                  {/* <Form onSubmit={handleSubmit}> */}
                    <Form.Group size="lg" controlId="email">
                    
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        style={styleTexBox}
                        autoFocus
                        type="email"
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        style={styleTexBox}
                        type="password"
                        // onChange={(e) => setPassword(e.target.value)}
                      />
                      
                    </Form.Group>
                   
			          	  <p><a href="#">Forgot password?</a></p>
                    <Button block size="lg" type="submit" style={{background: '#BACA12', color: '#000'}}>
                      Login
                    </Button>
                  </Form>
                </div>
        )
    }
}

export default Login