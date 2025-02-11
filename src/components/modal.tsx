import styled from 'styled-components';
import ReactDOM from 'react-dom';
import React from 'react';

const Container = styled.div`
  position: fixed; 
  z-index: 1;
  padding-top: 50px;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9); 
`;

const Button = styled.button`
  position: absolute;
  top: 15px;
  right: 35px;
  color: black;
  font-size: 40px;
  font-weight: bold;
`;

const Image = styled.img`
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
`;

interface ModalProps {
  largeFormat: string;
  close(): void;
}

const Modal = ({ largeFormat, close }: ModalProps) => {
  return (
    <Container>
      <Image src={largeFormat} />
      <Button onClick={close}>X</Button>
    </Container>
  );
};

const portalRoot = document.getElementById('modal');

const ModalPortal = ({ largeFormat, close }: ModalProps) =>
  portalRoot ? ReactDOM.createPortal(<Modal largeFormat={largeFormat} close={close} />, portalRoot) : null;

export default ModalPortal;
