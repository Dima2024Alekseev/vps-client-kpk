import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./calendar.css";
import Header from "../../Components/Header/Header";
import search from "../../img/search-icon.svg";
import reshot from "../../img/reshot-icon-student.svg";
import clock from "../../img/clock.svg";
import edit from "../../img/edit.svg";
import delete_ from "../../img/delete.svg";
import concert from "../../img/online_concert_interaction.svg";
import events from "../../img/calendar_event_star.svg";
import china from "../../img/china_flag_icon.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventsData, setEventsData] = useState([]);

    // Получение мероприятий из базы данных
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/events");
                const data = await response.json();
                setEventsData(data);
            } catch (error) {
                console.error("Ошибка при получении мероприятий:", error);
            }
        };

        fetchEvents();
    }, []);

    // Маппинг изображений
    const eventImages = {
        "reshot-icon-student.svg": reshot,
        "online_concert_interaction.svg": concert,
        "calendar_event_star.svg": events,
        "china_flag_icon.svg": china,
    };

    const handleEditClick = (event) => {
        setSelectedEvent(event);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (event) => {
        setSelectedEvent(event);
        setDeleteModalOpen(true);
    };

    const handleViewClick = (event) => {
        setSelectedEvent(event);
        setViewModalOpen(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/events/${selectedEvent._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedEvent),
            });

            if (response.ok) {
                const updatedEvent = await response.json();
                setEventsData((prevEvents) =>
                    prevEvents.map((event) =>
                        event._id === updatedEvent._id ? updatedEvent : event
                    )
                );
                setEditModalOpen(false);
            }
        } catch (error) {
            console.error("Ошибка при обновлении мероприятия:", error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/events/${selectedEvent._id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setEventsData((prevEvents) =>
                    prevEvents.filter((event) => event._id !== selectedEvent._id)
                );
                setDeleteModalOpen(false);
            }
        } catch (error) {
            console.error("Ошибка при удалении мероприятия:", error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Календарь</title>
            </Helmet>
            <div className="calendar-page">
                <Header />
                <div className="calendar-page-content">
                    <div className="calendar-page-content-header">
                        <div className="calendar-search-container">
                            <div className="input-icon-container">
                                <img src={search} alt="search" />
                            </div>
                            <input type="text" className="calendar-search-input" />
                        </div>
                        <select className="calendar-select-sort">
                            <option value="1">Сорт: Дата</option>
                            <option value="2">Сорт: Название А-Я</option>
                            <option value="3">Сорт: Название Я-А</option>
                        </select>
                    </div>

                    <div className="calendar-events-container">
                        {eventsData.map((event) => (
                            <div className="events-item" key={event._id}>
                                <div className="events-item-image-container">
                                    <img src={eventImages[event.image]} alt="" />
                                </div>
                                <div className="events-item-title">{event.title}</div>
                                <div className="events-item-date-container">
                                    <div>
                                        <img src={clock} alt="" />
                                    </div>
                                    <div>{event.date}</div>
                                </div>
                                <div className="btn-container">
                                    <div
                                        className="events-item-button"
                                        onClick={() => handleViewClick(event)}
                                    >
                                        Подробнее
                                    </div>
                                    <img
                                        src={edit}
                                        alt="edit-icon"
                                        className="edit-button"
                                        onClick={() => handleEditClick(event)}
                                    />
                                    <img
                                        src={delete_}
                                        alt="delete-icon"
                                        onClick={() => handleDeleteClick(event)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Модальное окно редактирования */}
                    <div id="modal" className={`modal ${editModalOpen ? "active" : ""}`}>
                        <div className="modal-content">
                            <h2 id="modal-title">Редактирование мероприятия</h2>
                            <div className="form">
                                <div className="name-event-container">
                                    <label htmlFor="edit-title">Название мероприятия</label>
                                    <input
                                        type="text"
                                        id="edit-title"
                                        defaultValue={selectedEvent?.title}
                                        onChange={(e) =>
                                            setSelectedEvent({ ...selectedEvent, title: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="inputs-container">
                                    <div className="name-event-container">
                                        <label htmlFor="edit-date">Дата проведения</label>
                                        <input
                                            type="text"
                                            id="edit-date"
                                            defaultValue={selectedEvent?.date}
                                            onChange={(e) =>
                                                setSelectedEvent({ ...selectedEvent, date: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="name-event-container">
                                        <label htmlFor="edit-time">Время проведения</label>
                                        <input
                                            type="text"
                                            id="edit-time"
                                            defaultValue={selectedEvent?.time}
                                            onChange={(e) =>
                                                setSelectedEvent({ ...selectedEvent, time: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="name-event-container">
                                    <label htmlFor="edit-place">Место проведения</label>
                                    <input
                                        type="text"
                                        id="edit-place"
                                        defaultValue={selectedEvent?.place}
                                        onChange={(e) =>
                                            setSelectedEvent({ ...selectedEvent, place: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="name-event-container">
                                    <label htmlFor="edit-org">Организатор мероприятия</label>
                                    <input
                                        type="text"
                                        id="edit-org"
                                        defaultValue={selectedEvent?.organizer}
                                        onChange={(e) =>
                                            setSelectedEvent({ ...selectedEvent, organizer: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button id="save-button" onClick={handleSaveEdit}>
                                    Сохранить
                                </button>
                                <button id="close-button" onClick={() => setEditModalOpen(false)}>
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Модальное окно удаления */}
                    <div id="delete-modal" className={`modal ${deleteModalOpen ? "active" : ""}`}>
                        <div className="modal-content">
                            <h2 id="delete-modal-title">Удаление мероприятия</h2>
                            <p>Вы уверены, что хотите удалить мероприятие <br />"{selectedEvent?.title}"?</p>
                            <div className="modal-buttons">
                                <button id="confirm-delete-button" onClick={handleConfirmDelete}>
                                    Удалить
                                </button>
                                <button id="cancel-delete-button" onClick={() => setDeleteModalOpen(false)}>
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Модальное окно просмотра информации */}
                    <div id="view-modal" className={`modal ${viewModalOpen ? "active" : ""}`}>
                        <div className="modal-content">
                            <h2 id="view-modal-title">Информация о мероприятии</h2>
                            <div className="form">
                                <div className="name-event-container">
                                    <label>Название мероприятия</label>
                                    <p>{selectedEvent?.title}</p>
                                </div>
                                <div className="inputs-container">
                                    <div className="name-event-container">
                                        <label>Дата проведения</label>
                                        <p>{selectedEvent?.date}</p>
                                    </div>
                                    <div className="name-event-container">
                                        <label>Время проведения</label>
                                        <p>{selectedEvent?.time}</p>
                                    </div>
                                </div>
                                <div className="name-event-container">
                                    <label>Место проведения</label>
                                    <p>{selectedEvent?.place}</p>
                                </div>
                                <div className="name-event-container">
                                    <label>Организатор мероприятия</label>
                                    <p>{selectedEvent?.organizer}</p>
                                </div>
                            </div>
                            <button id="close-button" onClick={() => setViewModalOpen(false)}>
                                Закрыть
                            </button>
                        </div>
                    </div>

                    <div className="calendar-page-content-footer">
                        <div className="add-btn">Добавить</div>
                        <div className="pagination-container">
                            <div className="pagination-item">
                                <FaChevronLeft />
                            </div>
                            <div className="pagination-item active">1</div>
                            <div className="pagination-item">2</div>
                            <div className="pagination-item">3</div>
                            <div className="pagination-item">4</div>
                            <div className="pagination-item empty">...</div>
                            <div className="pagination-item">...</div>
                            <div className="pagination-item">
                                <FaChevronRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;