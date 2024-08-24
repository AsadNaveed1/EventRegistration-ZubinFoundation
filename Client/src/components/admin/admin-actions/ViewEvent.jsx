import React from 'react';
import styled from 'styled-components';

const ViewEvent = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>{event.title}</Title>
        </Header>
        <Content>
          <Detail><strong>Type of Event:</strong> {event.eventType}</Detail>
          <Detail><strong>Location:</strong> {event.location}</Detail>
          <Detail><strong>Date of Event:</strong> {new Date(event.time).toDateString()}</Detail>
          <Detail><strong>Description:</strong> {event.description}</Detail>
          <Detail><strong>Skills:</strong> {event.skills.join(', ')}</Detail>
          <Detail><strong>Age Range:</strong> {event.ageRange}</Detail>
          <Detail><strong>Gender:</strong> {event.gender}</Detail>
          <Detail><strong>Language:</strong> {event.language.join(', ')}</Detail>
          <Detail>
            <strong>Learning Link:</strong> <a href={event.learningLink} target="_blank" rel="noopener noreferrer">View</a>
          </Detail>
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

const Detail = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #555;

  a {
    color: #3182ce;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default ViewEvent;

