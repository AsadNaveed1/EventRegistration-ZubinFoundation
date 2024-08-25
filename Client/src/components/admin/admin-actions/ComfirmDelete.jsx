import React from 'react';
import styled from 'styled-components';

const ConfirmDelete = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>Confirm Delete</Title>
        </Header>
        <Content>
          <p>Are you sure you want to delete the event "{event.title}"?</p>
          <ButtonGroup>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <DeleteButton onClick={onClose}>Delete</DeleteButton>
          </ButtonGroup>
        </Content>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 60%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: auto;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 30px;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #e53e3e;
  }
`;

const Content = styled.div`
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:hover {
    background-color: #e9ecef;
  }
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #c53030;
  }
`;

export default ConfirmDelete;