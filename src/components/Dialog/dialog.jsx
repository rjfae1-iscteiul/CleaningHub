import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap';
//import 'react-rater/lib/react-rater.css';   
import './dialog-styles.css';
import { Button } from 'react-bootstrap';
import { getDefaultNormalizer } from '@testing-library/dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import TextField from '@material-ui/core/TextField';



export default function Dialog(props) {

    
       /* state = {
           show: true
       } */

       const [show, setShow] = useState(true);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    
          
        return (
            <Modal open={props.showModal} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="coluna-textfields col-md-8">
                    <TextField id="standard-basic" label="Standard" />
                    <TextField id="standard-basic" label="Standard" />
                    <TextField id="standard-basic" label="Standard" />

            </div>
        

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        )
      

 }
    