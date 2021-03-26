import React from "react"
import styled from "styled-components";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {Helmet} from 'react-helmet';
import Logo_Completo from "../resources/Logo_Completo.png";

const S = {
StyledFirstPic: styled.img`
    position: absolute;
    top: 5%;
    left: 37%;
    max-width: 18%;
    max-height: 30vh;
    border-radius: 5%;
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
        paddingTop: "45%",
        textAlign: "center",
        fontFamily: "Calibri",
        paddingLeft: "790px"
        
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
          
                <div style={styleDiv} className="Login">
                  <Helmet>
                <style>{'body { background-color: #7CD4EA  ; }'}</style>
            </Helmet>
            
                  <Form>
                  
                  {/* <Form onSubmit={handleSubmit}> */}
                    <Form.Group size="lg" controlId="email">
                    <S.StyledFirstPic src={Logo_Completo} alt="" />
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