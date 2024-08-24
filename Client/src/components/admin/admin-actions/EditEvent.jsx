import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSave } from 'react-icons/fa';

const EditEvent = ({ event, onClose, onSave }) => {
  const [title, setTitle] = useState(event.title);
  const [eventType, setEventType] = useState(event.eventType);
  const [location, setLocation] = useState(event.location);
  const [time, setTime] = useState(event.time);
  const [description, setDescription] = useState(event.description);
  const [skills, setSkills] = useState(event.skills);
  const [ageRange, setAgeRange] = useState(event.ageRange);
  const [gender, setGender] = useState(event.gender);
  const [language, setLanguage] = useState(event.language);
  const [learningLink, setLearningLink] = useState(event.learningLink);

  const handleSave = () => {
    const updatedEvent = {
      ...event,
      title,
      eventType,
      location,
      time,
      description,
      skills,
      ageRange,
      gender,
      language,
      learningLink
    };
    onSave(updatedEvent);
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>Edit Event</Title>
        </Header>
        <Content>
          <Form>
            <label>
              Title:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
              Event Type:
              <input type="text" value={eventType} onChange={(e) => setEventType(e.target.value)} />
            </label>
            <label>
              Location:
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
            <label>
              Time:
              <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
            <label>
              Description:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
              Skills:
              <input type="text" value={skills.join(', ')} onChange={(e) => setSkills(e.target.value.split(','))} />
            </label>
            <label>
              Age Range:
              <input type="text" value={ageRange} onChange={(e) => setAgeRange(e.target.value)} />
            </label>
            <label>
              Gender:
              <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
            </label>
            <label>
              Language:
              <input type="text" value={language.join(', ')} onChange={(e) => setLanguage(e.target.value.split(','))} />
            </label>
            <label>
              Learning Link:
              <input type="text" value={learningLink} onChange={(e) => setLearningLink(e.target.value)} />
            </label>
            <SaveButton ><FaSave /></SaveButton>
          </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    margin-bottom: 10px;
  }

  input, textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export default EditEvent;