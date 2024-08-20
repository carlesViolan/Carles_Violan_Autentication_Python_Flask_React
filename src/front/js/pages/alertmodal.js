import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AlertModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleSignUpRedirect = () => {
    handleClose();
    navigate("/register"); // Asegúrate de tener una ruta configurada para la vista de registro
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invalid Credentials</Modal.Title>
      </Modal.Header>
      <Modal.Body>Invalid credentials, please try again or create a new account.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSignUpRedirect}>
          Create Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
