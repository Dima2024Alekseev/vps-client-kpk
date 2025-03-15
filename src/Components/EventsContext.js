import React, { createContext, useState, useEffect } from "react";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
    const [eventsData, setEventsData] = useState([]);

    // Функция для загрузки мероприятий
    const fetchEvents = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/events");
            const data = await response.json();
            setEventsData(data);
        } catch (error) {
            console.error("Ошибка при получении мероприятий:", error);
        }
    };

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <EventsContext.Provider value={{ eventsData, setEventsData, fetchEvents }}>
            {children}
        </EventsContext.Provider>
    );
};