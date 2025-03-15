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
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventsData, setEventsData] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        time: "",
        place: "",
        organizer: "",
        image: "",
    });
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const eventsPerPage = 5; // Количество мероприятий на странице
    const [searchQuery, setSearchQuery] = useState(""); // Состояние для поискового запроса
    const [sortType, setSortType] = useState("date"); // Состояние для типа сортировки

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

    // Фильтрация мероприятий по поисковому запросу
    const filteredEvents = eventsData.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Сортировка мероприятий
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (sortType === "date") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortType === "title-asc") {
            return a.title.localeCompare(b.title);
        } else if (sortType === "title-desc") {
            return b.title.localeCompare(a.title);
        }
        return 0;
    });

    // Логика для отображения мероприятий на текущей странице
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    // Функция для изменения страницы
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Обработчик для закрытия модального окна при клике вне его области
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            setEditModalOpen(false);
            setDeleteModalOpen(false);
            setViewModalOpen(false);
            setAddModalOpen(false);
        }
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

    const handleAddClick = () => {
        setAddModalOpen(true);
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

    const handleSaveNewEvent = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                const addedEvent = await response.json();
                setEventsData((prevEvents) => [...prevEvents, addedEvent]);
                setAddModalOpen(false);
                setNewEvent({
                    title: "",
                    date: "",
                    time: "",
                    place: "",
                    organizer: "",
                    image: "",
                });
            }
        } catch (error) {
            console.error("Ошибка при добавлении мероприятия:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Сброс страницы при изменении поискового запроса
    };

    const handleSortChange = (e) => {
        setSortType(e.target.value);
        setCurrentPage(1); // Сброс страницы при изменении сортировки
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
                            <input
                                type="text"
                                className="calendar-search-input"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Поиск..."
                            />
                        </div>
                        <select className="calendar-select-sort" value={sortType} onChange={handleSortChange}>
                            <option value="date">Сорт: Дата</option>
                            <option value="title-asc">Сорт: Название А-Я</option>
                            <option value="title-desc">Сорт: Название Я-А</option>
                        </select>
                    </div>

                    <div className="calendar-events-container">
                        {currentEvents.map((event) => (
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
                    <div id="modal" className={`modal ${editModalOpen ? "active" : ""}`} onClick={handleModalClick}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2 id="modal-title">Редактирование мероприятия</h2>
                            <div className="form">
                                <div className="name-event-container">
                                    <label htmlFor="edit-title">Название мероприятия</label>
                                    <input
                                        type="text"
                                        id="edit-title"
                                        value={selectedEvent?.title || ""}
                                        onChange={(e) =>
                                            setSelectedEvent({ ...selectedEvent, title: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="inputs-container">
                                    <div className="name-event-container">
                                        <label htmlFor="edit-date">Дата проведения</label>
                                        <input
                                            type="date"
                                            id="edit-date"
                                            value={selectedEvent?.date || ""}
                                            onChange={(e) =>
                                                setSelectedEvent({ ...selectedEvent, date: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="name-event-container">
                                        <label htmlFor="edit-time">Время проведения</label>
                                        <input
                                            type="time"
                                            id="edit-time"
                                            value={selectedEvent?.time || ""}
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
                                        value={selectedEvent?.place || ""}
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
                                        value={selectedEvent?.organizer || ""}
                                        onChange={(e) =>
                                            setSelectedEvent({ ...selectedEvent, organizer: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="name-event-container">
                                    <label htmlFor="edit-image">Изображение</label>
                                    <select
                                        id="edit-image"
                                        value={selectedEvent?.image || ""}
                                        onChange={(e) =>
                                            setSelectedEvent({ ...selectedEvent, image: e.target.value })
                                        }
                                    >
                                        <option value="">Выберите изображение</option>
                                        {Object.keys(eventImages).map((imageName) => (
                                            <option key={imageName} value={imageName}>
                                                {imageName}
                                            </option>
                                        ))}
                                    </select>
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
                    <div id="delete-modal" className={`modal ${deleteModalOpen ? "active" : ""}`} onClick={handleModalClick}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                    <div id="view-modal" className={`modal ${viewModalOpen ? "active" : ""}`} onClick={handleModalClick}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                                <div className="name-event-container">
                                    <label>Изображение</label>
                                    <img
                                        src={eventImages[selectedEvent?.image]}
                                        alt="Изображение мероприятия"
                                        style={{ width: "50px", height: "50px", marginTop: "10px" }}
                                    />
                                </div>
                            </div>
                            <button id="close-button" onClick={() => setViewModalOpen(false)}>
                                Закрыть
                            </button>
                        </div>
                    </div>

                    {/* Модальное окно добавления */}
                    <div id="add-modal" className={`modal ${addModalOpen ? "active" : ""}`} onClick={handleModalClick}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2 id="add-modal-title">Добавить мероприятие</h2>
                            <div className="form">
                                <div className="name-event-container">
                                    <label htmlFor="add-title">Название мероприятия</label>
                                    <input
                                        type="text"
                                        id="add-title"
                                        value={newEvent.title}
                                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    />
                                </div>
                                <div className="inputs-container">
                                    <div className="name-event-container">
                                        <label htmlFor="add-date">Дата проведения</label>
                                        <input
                                            type="date"
                                            id="add-date"
                                            value={newEvent.date}
                                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="name-event-container">
                                        <label htmlFor="add-time">Время проведения</label>
                                        <input
                                            type="time"
                                            id="add-time"
                                            value={newEvent.time}
                                            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="name-event-container">
                                    <label htmlFor="add-place">Место проведения</label>
                                    <input
                                        type="text"
                                        id="add-place"
                                        value={newEvent.place}
                                        onChange={(e) => setNewEvent({ ...newEvent, place: e.target.value })}
                                    />
                                </div>
                                <div className="name-event-container">
                                    <label htmlFor="add-org">Организатор мероприятия</label>
                                    <input
                                        type="text"
                                        id="add-org"
                                        value={newEvent.organizer}
                                        onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                                    />
                                </div>
                                <div className="name-event-container">
                                    <label htmlFor="add-image">Изображение</label>
                                    <select
                                        id="add-image"
                                        value={newEvent.image}
                                        onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                                    >
                                        <option value="">Выберите изображение</option>
                                        {Object.keys(eventImages).map((imageName) => (
                                            <option key={imageName} value={imageName}>
                                                {imageName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Предпросмотр изображения */}
                                <div className="name-event-container">
                                    <label>Предпросмотр изображения</label>
                                    {newEvent.image && (
                                        <img
                                            src={eventImages[newEvent.image]}
                                            alt="Предпросмотр"
                                            style={{ width: "50px", height: "50px", marginTop: "10px" }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button id="save-button" onClick={handleSaveNewEvent}>
                                    Сохранить
                                </button>
                                <button id="close-button" onClick={() => setAddModalOpen(false)}>
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="calendar-page-content-footer">
                        <div className="add-btn" onClick={handleAddClick}>Добавить</div>
                        <div className="pagination-container">
                            <button
                                className="pagination-item"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <FaChevronLeft />
                            </button>
                            {Array.from({ length: Math.ceil(sortedEvents.length / eventsPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`pagination-item ${currentPage === index + 1 ? "active" : ""}`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                className="pagination-item"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(sortedEvents.length / eventsPerPage)}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;