import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const DialogflowMessenger = () => {
  React.useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    scriptElement.async = true;
    document.body.appendChild(scriptElement);

    return () => {
      document.body.removeChild(scriptElement);
    };
  }, []);

  return (
    <>
      <MessengerContainer>
        <df-messenger
          project-id="ai-tester-433403"
          agent-id="7ab3816e-89e5-4caa-aa5e-02b1d6228d74"
          language-code="en"
          max-query-length="-1"
        >
          <df-messenger-chat-bubble chat-title="AI assistant" />
        </df-messenger>
      </MessengerContainer>
      <GlobalStyles />
    </>
  );
};

export default DialogflowMessenger;

const MessengerContainer = styled.div`
  z-index: 999;
  position: fixed;
  bottom: 16px;
  right: 16px;

  --df-messenger-font-color: #000;
  --df-messenger-font-family: Lato;
  --df-messenger-chat-background: #FEF8E6;
  --df-messenger-message-user-background: #C6DAFC;
  --df-messenger-message-bot-background: #fff;
`;

const GlobalStyles = createGlobalStyle`
  df-messenger {
    z-index: 999;
    position: fixed;
    bottom: 16px;
    right: 16px;
  }
`;