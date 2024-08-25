// context/EventContext.js
import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export function useEventContext() {
  return useContext(EventContext);
}

export function EventProvider({ children }) {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const registerEvent = (event) => {
    setRegisteredEvents([...registeredEvents, event]);
  };

  const withdrawEvent = (eventId) => {
    setRegisteredEvents(registeredEvents.filter(event => event.id !== eventId));
  };

  return (
    <EventContext.Provider value={{ registeredEvents, registerEvent, withdrawEvent }}>
      {children}
    </EventContext.Provider>
  );
}