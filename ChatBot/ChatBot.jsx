import React, { useEffect } from 'react';

const DialogflowMessenger = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    script.async = true;

    script.onload = () => {
      window.dfMessengerSettings = {
        oauthClientID: '590459718731-npr85ffmig06bkur9e7tm0c5kbne6ssu.apps.googleusercontent.com',
        projectID: 'ai-tester-433403',
        agentID: '7ab3816e-89e5-4caa-aa5e-02b1d6228d74',
        languageCode: 'en',
        maxQueryLength: -1,
        chatTitle: 'Volunteer_helper',
        enableHistory: true,
        defaultHeight: 500,
        defaultWidth: 400
      };

      const dfMessenger = document.createElement('df-messenger');
      dfMessenger.setAttribute('id', 'df-messenger-container');

      document.body.appendChild(dfMessenger);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      window.dfMessengerSettings = undefined;
      const dfMessenger = document.getElementById('df-messenger-container');
      if (dfMessenger) {
        document.body.removeChild(dfMessenger);
      }
    };
  }, []);

  return null;
};

export default DialogflowMessenger;