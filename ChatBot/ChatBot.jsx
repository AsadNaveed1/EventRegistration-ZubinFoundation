import React from 'react';
import styled from 'styled-components';
const MyComponent = () => {
  return (
    <div>
        <link rel="stylesheet" href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"/>
        <script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
        
        <Wrapper>
            <df-messenger
            oauth-client-id="590459718731-npr85ffmig06bkur9e7tm0c5kbne6ssu.apps.googleusercontent.com"
            project-id="ai-tester-433403"
            agent-id="7ab3816e-89e5-4caa-aa5e-02b1d6228d74"
            language-code="en"
            max-query-length="-1">
            <df-messenger-chat-bubble
            chat-title="Volunteer_helper">
            </df-messenger-chat-bubble>
            </df-messenger>
        </Wrapper>
    </div>
  );
};


const Wrapper = styled.div`
    .df-messenger {
        z-index: 999;
        position: fixed;
        bottom: 16px;
        right: 16px;
    }
`;
export default MyComponent;