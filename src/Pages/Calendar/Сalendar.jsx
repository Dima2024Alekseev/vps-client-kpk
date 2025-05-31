import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./calendar.css";
import { MdEventAvailable } from "react-icons/md";
import Header from "../../Components/Header/Header";
import search from "../../img/search-icon.svg";
import reshot from "../../img/reshot-icon-student.svg";
import clock from "../../img/clock.svg";
import edit from "../../img/edit.svg";
import delete_ from "../../img/delete.svg";
import concert from "../../img/online_concert_interaction.svg";
import events from "../../img/calendar_event_star.svg";
import china from "../../img/china_flag_icon.svg";
import game from "../../img/game_jn91iitvfpln.svg";
import group from "../../img/group_3pfeaq1nm193.svg";
import sport from "../../img/sport_71qlik1n211a.svg";
import konferentsiya from "../../img/konferentsiya_rpbf1ei71xv3.svg";
import chess from "../../img/chess_ypvggyrc9o86.svg";
import Pagination from "../../Components/Pagination";
import { EventsContext } from "../../Components/EventsContext";
import EditModal from "../../Components/Calendar/EditModal";
import DeleteModal from "../../Components/Calendar/DeleteModal";
import ViewModal from "../../Components/Calendar/ViewModal";
import AddModal from "../../Components/Calendar/AddModal";
import { toast } from "react-toastify";

const Calendar = () => {
    const { eventsData, fetchEvents } = useContext(EventsContext);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        time: "",
        place: "",
        organizer: "",
        image: "",
        students: [],
        teachers: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState("");
    const [sortType, setSortType] = useState("date");

    const eventImages = {
        "reshot-icon-student.svg": reshot,
        "online_concert_interaction.svg": concert,
        "calendar_event_star.svg": events,
        "china_flag_icon.svg": china,
        "game_jn91iitvfpln.svg": game,
        "group_3pfeaq1nm193.svg": group,
        "sport_71qlik1n211a.svg": sport,
        "konferentsiya_rpbf1ei71xv3.svg": konferentsiya,
        "chess_ypvggyrc9o86.svg": chess,
    };

    const eventImageTitles = {
        "reshot-icon-student.svg": "Учебное мероприятие",
        "online_concert_interaction.svg": "Концерт",
        "calendar_event_star.svg": "Календарное событие",
        "china_flag_icon.svg": "Китайская культура",
        "game_jn91iitvfpln.svg": "Игровое мероприятие",
        "group_3pfeaq1nm193.svg": "Групповое мероприятие",
        "sport_71qlik1n211a.svg": "Спортивное событие",
        "konferentsiya_rpbf1ei71xv3.svg": "Конференция",
        "chess_ypvggyrc9o86.svg": "Шахматы / Интеллектуальные игры"
    };

    useEffect(() => {
        const checkUpcomingEvents = () => {
            const now = new Date();

            eventsData.forEach(event => {
                try {
                    const [year, month, day] = event.date.split('-');
                    const [hours, minutes] = event.time.split(':');

                    const eventDateTime = new Date(
                        parseInt(year),
                        parseInt(month) - 1,
                        parseInt(day),
                        parseInt(hours),
                        parseInt(minutes)
                    );

                    const timeDiff = (eventDateTime - now) / (1000 * 60);

                    if (timeDiff > 0 && timeDiff <= 5) {
                        const notificationKey = `notified_${event._id}`;

                        if (!localStorage.getItem(notificationKey)) {
                            toast.info(`⏰ Скоро начнется: "${event.title}" в ${event.time}`, {
                                position: "bottom-right",
                                autoClose: 10000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });

                            localStorage.setItem(notificationKey, 'true');
                            setTimeout(() => {
                                localStorage.removeItem(notificationKey);
                            }, 60 * 60 * 1000);
                        }
                    }
                } catch (error) {
                    console.error('Ошибка при проверке события:', error);
                }
            });
        };

        const interval = setInterval(checkUpcomingEvents, 60000);
        checkUpcomingEvents();
        return () => clearInterval(interval);
    }, [eventsData]);

    const filteredEvents = eventsData.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0 });
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
            const response = await fetch(`/api/events/${selectedEvent._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedEvent),
            });

            if (response.ok) {
                fetchEvents();
                setEditModalOpen(false);
                toast.success("Мероприятие успешно обновлено");
            }
        } catch (error) {
            console.error("Ошибка при обновлении мероприятия:", error);
            toast.error("Ошибка при обновлении мероприятия");
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`/api/events/${selectedEvent._id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchEvents();
                setDeleteModalOpen(false);
                toast.success("Мероприятие успешно удалено");
            }
        } catch (error) {
            console.error("Ошибка при удалении мероприятия:", error);
            toast.error("Ошибка при удалении мероприятия");
        }
    };

    const handleSaveNewEvent = async () => {
        try {
            const response = await fetch("/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                fetchEvents();
                setAddModalOpen(false);
                setNewEvent({
                    title: "",
                    date: "",
                    time: "",
                    place: "",
                    organizer: "",
                    image: "",
                    students: [],
                    teachers: []
                });
                toast.success("Мероприятие успешно добавлено");
            }
        } catch (error) {
            console.error("Ошибка при добавлении мероприятия:", error);
            toast.error("Ошибка при добавлении мероприятия");
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortType(e.target.value);
        setCurrentPage(1);
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
                                <img src={search} alt="Поиск" title="Поиск мероприятий" />
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
                                    <img
                                        src={eventImages[event.image]}
                                        alt={event.title}
                                        title={eventImageTitles[event.image] || event.title}
                                    />
                                </div>
                                <div className="events-item-title">{event.title}</div>
                                <div className="events-item-date-container">
                                    <div>
                                        <img src={clock} alt="Время" title="Время мероприятия" />
                                    </div>
                                    <div><p>{event.date} в {event.time}</p></div>
                                </div>
                                <div className="btn-container">
                                    <div
                                        className="events-item-button"
                                        onClick={() => handleViewClick(event)}
                                        title="Подробнее о мероприятии"
                                    >
                                        Подробнее
                                    </div>
                                    <img
                                        src={edit}
                                        alt="Редактировать"
                                        className="edit-button"
                                        onClick={() => handleEditClick(event)}
                                        title="Редактировать мероприятие"
                                    />
                                    <img
                                        src={delete_}
                                        alt="Удалить"
                                        onClick={() => handleDeleteClick(event)}
                                        title="Удалить мероприятие"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <EditModal
                        isOpen={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        selectedEvent={selectedEvent}
                        onSave={handleSaveEdit}
                        eventImages={eventImages}
                        eventImageTitles={eventImageTitles}
                        onChange={setSelectedEvent}
                    />

                    <DeleteModal
                        isOpen={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        selectedEvent={selectedEvent}
                        onConfirm={handleConfirmDelete}
                    />

                    <ViewModal
                        isOpen={viewModalOpen}
                        onClose={() => setViewModalOpen(false)}
                        selectedEvent={selectedEvent}
                        eventImages={eventImages}
                        eventImageTitles={eventImageTitles}
                    />

                    <AddModal
                        isOpen={addModalOpen}
                        onClose={() => setAddModalOpen(false)}
                        newEvent={newEvent}
                        onChange={setNewEvent}
                        onSave={handleSaveNewEvent}
                        eventImages={eventImages}
                        eventImageTitles={eventImageTitles}
                    />

                    <div className="calendar-page-content-footer">
                        <div className="add-btn" onClick={handleAddClick} title="Добавить новое мероприятие">
                            <MdEventAvailable size={30} />
                            Добавить
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(sortedEvents.length / eventsPerPage)}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;