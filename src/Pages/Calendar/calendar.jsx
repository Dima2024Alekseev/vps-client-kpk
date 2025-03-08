import React, { useState } from "react";
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

    const eventsData = [
        {
            id: 1,
            title: "Второй Этап конкурса Студент года 2024",
            date: "04.03.2024",
            time: "14:00",
            place: "Главный корпус, аудитория 101",
            organizer: "Иванов И.И.",
            image: reshot,
        },
        {
            id: 2,
            title: "Концерт ко Дню Защитника Отечества",
            date: "22.02.2024",
            time: "18:00",
            place: "Актовый зал",
            organizer: "Петров П.П.",
            image: concert,
        },
        {
            id: 3,
            title: "Квиз в честь Дня студента",
            date: "25.01.2024",
            time: "15:00",
            place: "КПК, актовый зал",
            organizer: "Жукова Т.Д.",
            image: events,
        },
        {
            id: 4,
            title: "Дни китайской культуры",
            date: "15.12.2023",
            time: "12:00",
            place: "Конференц-зал",
            organizer: "Сидоров С.С.",
            image: china,
        },
        {
            id: 5,
            title: "Открытие шахматного клуба",
            date: "08.12.2023",
            time: "16:00",
            place: "Библиотека",
            organizer: "Кузнецов К.К.",
            image: events,
        },
    ];

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

    const handleSaveEdit = () => {
        // Логика сохранения изменений
        setEditModalOpen(false);
    };

    const handleConfirmDelete = () => {
        // Логика удаления события
        setDeleteModalOpen(false);
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
                            <div className="events-item" key={event.id}>
                                <div className="events-item-image-container">
                                    <img src={event.image} alt="" />
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
                                    />
                                </div>
                                <div className="inputs-container">
                                    <div className="name-event-container">
                                        <label htmlFor="edit-date">Дата проведения</label>
                                        <input
                                            type="text"
                                            id="edit-date"
                                            defaultValue={selectedEvent?.date}
                                        />
                                    </div>
                                    <div className="name-event-container">
                                        <label htmlFor="edit-time">Время проведения</label>
                                        <input
                                            type="text"
                                            id="edit-time"
                                            defaultValue={selectedEvent?.time}
                                        />
                                    </div>
                                </div>
                                <div className="name-event-container">
                                    <label htmlFor="edit-place">Место проведения</label>
                                    <input
                                        type="text"
                                        id="edit-place"
                                        defaultValue={selectedEvent?.place}
                                    />
                                </div>
                                <div className="name-event-container">
                                    <label htmlFor="edit-org">Организатор мероприятия</label>
                                    <input
                                        type="text"
                                        id="edit-org"
                                        defaultValue={selectedEvent?.organizer}
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
                            <p>Вы уверены, что хотите удалить мероприятие <br/>"{selectedEvent?.title}"?</p>
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