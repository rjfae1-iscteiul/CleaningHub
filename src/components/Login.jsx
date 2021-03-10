import React from "react"
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

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
        paddingTop: "200px",
        textAlign: "center",
        fontFamily: "Calibri",
        paddingLeft: "600px"
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
                    <Button block size="lg" type="submit">
                      Login
                    </Button>
                  </Form>
                </div>
        )
    }
}

export default Login