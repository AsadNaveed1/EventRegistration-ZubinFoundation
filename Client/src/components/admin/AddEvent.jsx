import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import axios from '../axios';

function AddEventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    interests: '',
    location: '',
    time: '',
    skills: [],
    ageRange: '',
    gender: '',
    language: [],
    learning_materials: [],
    image: null,
  });

  const interestOptions = [
    { value: 'mentalHealth', label: 'Mental Health' },
    { value: 'womenAndGirls', label: 'Women and Girls' },
    { value: 'careers', label: 'Careers' },
    { value: 'emergencyRelief', label: 'Emergency Relief' },
    { value: 'family', label: 'Family' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'others', label: 'Others' }
  ];

  const skillOptions = [
    { value: 'communication', label: 'Communication' },
    { value: 'counseling', label: 'Counseling' },
    { value: 'empathy', label: 'Empathy' },
    { value: 'timeManagement', label: 'Time Management' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInterestChange = (selectedOption) => {
    setFormData({
      ...formData,
      interests: selectedOption ? selectedOption.value : ''
    });
  };

  const handleGenderChange = (selectedOption) => {
    setFormData({
      ...formData,
      gender: selectedOption ? selectedOption.value : ''
    });
  };

  const handleSkillChange = (selectedOptions) => {
    setFormData({
      ...formData,
      skills: selectedOptions || []
    });
  };

  const handleLanguageChange = (selectedOptions) => {
    setFormData({
      ...formData,
      language: selectedOptions || []
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleLearningLinkChange = (index, value) => {
    const newLinks = [...formData.learning_materials];
    newLinks[index] = value;
    setFormData({
      ...formData,
      learning_materials: newLinks
    });
  };

  const addLearningLink = () => {
    setFormData({
      ...formData,
      learning_materials: [...formData.learning_materials, '']
    });
  };

  const removeLearningLink = (index) => {
    setFormData({
      ...formData,
      learning_materials: formData.learning_materials.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
// const userDetails ={
//   username: 'user1',
//   password:'password'
// }
// const token  = await axios.post ( 'zubin_auth/user/register/',userDetails)
// console.log (token)

const newEvent = {
  ...formData,
  learning_materials:formData.learning_materials,
  start_datetime:formData.time, // Send date as a separate field
  end_datetime:formData.time, // Send date as a separate field
  skills: formData.skills.map(skill => skill.value),
  language: formData.language.map(lang => lang.value),
  image: formData.image ? formData.image.name : '',
  capacity: 30, 
  image_src: 'https://example.com/women-empowerment'
};
   axios.post('/events/add_event',newEvent).then(
      async()=>{
        const response  = await axios.get('/events/all_events')
        console.log(response)
      }
    );


  

    alert('Event added successfully!');
    // setFormData({
    //   title: '',
    //   description: '',
    //   interests: [],
    //   location: '',
    //   time: '',
    //   skills: [],
    //   ageRange: '',
    //   gender: '',
    //   language: [],
    //   learning_materials: [],
    //   image: null
    // });
  };


  return (
    <Wrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <h2>Add Event</h2>
        <FormGroup>
          <Label>Event Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </FormGroup>
        <FormRow>
          <FormGroup>
            <Label>Title <RequiredIndicator /></Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Event Title"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Interests <RequiredIndicator /></Label>
            <Select
              options={interestOptions}
              value={interestOptions.find(option => option.value === formData.interests)}
              onChange={handleInterestChange}
              placeholder="Select interests..."
              required
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Location <RequiredIndicator /></Label>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Event Location"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Time <RequiredIndicator /></Label>
            <Input
              type="datetime-local"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Required Skills <RequiredIndicator /></Label>
            <Select
              isMulti
              options={skillOptions}
              value={formData.skills}
              onChange={handleSkillChange}
              placeholder="Select skills..."
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Age Range <RequiredIndicator /></Label>
            <Input
              type="text"
              name="ageRange"
              value={formData.ageRange}
              onChange={handleInputChange}
              placeholder="Age Range (e.g., 18-30)"
              required
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Gender <RequiredIndicator /></Label>
            <Select
              options={genderOptions}
              value={genderOptions.find(option => option.value === formData.gender)}
              onChange={handleGenderChange}
              placeholder="Select gender..."
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Language <RequiredIndicator /></Label>
            <Select
              isMulti
              options={languageOptions}
              value={formData.language}
              onChange={handleLanguageChange}
              placeholder="Select language..."
              required
            />
          </FormGroup>
        </FormRow>
        <FormGroup style={{ marginTop: '20px' }}>
          <Label>Description <RequiredIndicator /></Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Event Description"
            required
          />
        </FormGroup>
        <FormGroup style={{ marginTop: '20px' }}>
          <Label>Required Learning (YouTube Link) <RequiredIndicator /></Label>
          {formData.learning_materials.map((link, index) => (
            <LearningLinkWrapper key={index}>
              <Input
                type="url"
                value={link}
                onChange={(e) => handleLearningLinkChange(index, e.target.value)}
                placeholder="YouTube Video Link"
                required
              />
              <RemoveButton type="button" onClick={() => removeLearningLink(index)}>–</RemoveButton>
            </LearningLinkWrapper>
          ))}
          <AddButton type="button" onClick={addLearningLink}>+</AddButton>
        </FormGroup>
        <SubmitButton type="submit">Add Event</SubmitButton>
      </FormWrapper>
    </Wrapper>
  );
}

const FormWrapper = styled.form`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 60px; 
  margin-left: 250px; 
`;

const Wrapper = styled.div`
  padding: 20px;
  margin-top: 60px;
  margin-left: 250px;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;

  & > * {
    flex: 1;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const RequiredIndicator = styled.span`
  color: red;
  font-size: 14px;
  &::before {
    content: "*";
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #5a67d8;
  color: #fff;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #434190;
  }
`;

const LearningLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > * {
    margin-right: 10px;
  }
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #45a049;
  }
`;

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e53935;
  }
`;

export default AddEventForm;
