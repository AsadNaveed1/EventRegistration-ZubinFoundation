import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <About>
          <h3>Event Registration</h3>
          <p>Discover the best events happening around you every day.</p>
        </About>
        <SocialMedia>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </SocialMedia>
        <ContactInfo>
          <p>Contact us at: info@myevents.com</p>
          <p>Phone: (123) 456-7890</p>
        </ContactInfo>
      </FooterContent>
      <Copyright>
        © {new Date().getFullYear()} MyEvents. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;



const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  position: static;
  left: 0;
  bottom: 0;
  width: 100%;

`;
const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const About = styled.div`
  flex: 1;

  h3 {
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #bdc3c7;
  }
`;

const SocialMedia = styled.div`
  flex: 1;
  text-align: center;

  a {
    margin: 0 10px;
    color: #ecf0f1;
    text-decoration: none;
  }

  a:hover {
    color: #3498db;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  text-align: right;
  font-size: 16px;
  color: #bdc3c7;
`;

const Copyright = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #95a5a6;
  border-top: 1px solid #34495e;
`;