import React from "react";
import "../style/calendar.css";
import Header from "../Components/Header/Header";
import search from "../img/search-icon.svg";
import reshot from "../img/reshot-icon-student.svg";
import clock from "../img/clock.svg";
import edit from "../img/edit.svg";
import delete_ from "../img/delete.svg";
import concert from "../img/online_concert_interaction.svg";
import events from "../img/calendar_event_star.svg";
import china from "../img/china_flag_icon.svg";

const Calendar = () => {
    return <>

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
                        <option value="1">Сорт: Название А-Я</option>
                        <option value="1">Сорт: Название Я-А</option>
                    </select>
                </div>

                <div className="calendar-events-container">
                    <div className="events-item">
                        <div className="events-item-image-container">
                            <img src={reshot} alt="" />
                        </div>
                        <div className="events-item-title">
                            Второй Этап конкурса Студент года 2024
                        </div>
                        <div className="events-item-date-container">
                            <div>
                                <img src={clock} alt="" />
                            </div>
                            <div>04.03.2024</div>
                        </div>
                        <div className="btn-container">
                            <div className="events-item-button">Подробнее</div>
                            <img src={edit} alt="edit-icon" className="edit-button" />
                            <img src={delete_} alt="delete-icon" />
                        </div>
                    </div>

                    <div className="events-item">
                        <div className="events-item-image-container">
                            <img src={concert} alt="" />
                        </div>
                        <div className="events-item-title">
                            Концерт ко Дню Защитника Отечества
                        </div>
                        <div className="events-item-date-container">
                            <div>
                                <img src={clock} alt="" />
                            </div>
                            <div>22.02.2024</div>
                        </div>
                        <div className="btn-container">
                            <div className="events-item-button">Подробнее</div>
                            <img src={edit} alt="edit-icon" className="edit-button" />
                            <img src={delete_} alt="delete-icon" />
                        </div>
                    </div>

                    <div className="events-item">
                        <div className="events-item-image-container">
                            <img src={events} alt="" />
                        </div>
                        <div className="events-item-title">Квиз в честь Дня студента</div>
                        <div className="events-item-date-container">
                            <div>
                                <img src={clock} alt="" />
                            </div>
                            <div>25.01.2024</div>
                        </div>
                        <div className="btn-container">
                            <div className="events-item-button">Подробнее</div>
                            <img src={edit} alt="edit-icon" className="edit-button" />
                            <img src={delete_} alt="delete-icon" />
                        </div>
                    </div>

                    <div className="events-item">
                        <div className="events-item-image-container">
                            <img src={china} alt="" />
                        </div>
                        <div className="events-item-title">Дни китайской культуры</div>
                        <div className="events-item-date-container">
                            <div>
                                <img src={clock} alt="" />
                            </div>
                            <div>15.12.2023</div>
                        </div>
                        <div className="btn-container">
                            <div className="events-item-button">Подробнее</div>
                            <img src={edit} alt="edit-icon" className="edit-button" />
                            <img src={delete_} alt="delete-icon" />
                        </div>
                    </div>

                    <div className="events-item">
                        <div className="events-item-image-container">
                            <img src={events} alt="" />
                        </div>
                        <div className="events-item-title">Открытие шахматного клуба</div>
                        <div className="events-item-date-container">
                            <div>
                                <img src={clock} alt="" />
                            </div>
                            <div>08.12.2023</div>
                        </div>
                        <div className="btn-container">
                            <div className="events-item-button">Подробнее</div>
                            <img src={edit} alt="edit-icon" className="edit-button" />
                            <img src={delete_} alt="delete-icon" />
                        </div>
                    </div>
                </div>

                {/* модалка для редактирования информации */}
                <div id="modal" className="modal">
                    <div className="modal-content">
                        <span className="close"></span>
                        <h2 id="modal-title">Заголовок модального окна</h2>
                        <div className="form">
                            <div className="name-event-container">
                                <label for="edit-title">Название меропрития</label>
                                <input type="text" id="edit-title" />
                            </div>
                            <div className="inputs-container">
                                <div className="name-event-container">
                                    <label for="edit-date">Дата проведения</label>
                                    <input type="text" id="edit-date" />
                                </div>
                                <div className="name-event-container">
                                    <label for="edit-time">Время проведения</label>
                                    <input type="text" id="edit-time" />
                                </div>
                            </div>
                            <div className="name-event-container">
                                <label for="edit-title">Место проведения</label>
                                <input type="text" id="edit-place" />
                            </div>
                            <div className="name-event-container">
                                <label for="edit-title">Организатор мероприятия</label>
                                <input type="text" id="edit-org" />
                            </div>
                        </div>
                        <button id="save-button">Сохранить</button>
                    </div>
                </div>

                {/* Модалка для просмотра информации */}
                <div id="view-modal" className="modal">
                    <div className="modal-content">
                        <span className="close"></span>
                        <h2 id="view-modal-title">Информация о мероприятии</h2>
                        <div className="form">
                            <div className="name-event-container">
                                <label>Название мероприятия</label>
                                <p id="view-title"></p>
                            </div>
                            <div className="inputs-container">
                                <div className="name-event-container">
                                    <label>Дата проведения</label>
                                    <p id="view-date"></p>
                                </div>
                                <div className="name-event-container">
                                    <label>Время проведения</label>
                                    <p id="view-time"></p>
                                </div>
                            </div>
                            <div className="name-event-container">
                                <label>Место проведения</label>
                                <p id="view-place"></p>
                            </div>
                            <div className="name-event-container">
                                <label>Организатор мероприятия</label>
                                <p id="view-org"></p>
                            </div>
                            <button id="close-button">Закрыть</button>
                        </div>
                    </div>
                </div>

                {/* модалка для создания события */}
                <div id="create-modal" className="modal">
                    <div className="modal-content">
                        <span className="close" id="close-create-modal">&times;</span>
                        <h2 className="modal-title">Добавить мероприятие</h2>
                        <div className="form">
                            <div className="name-event-container">
                                <label for="create-title">Название мероприятия</label>
                                <input type="text" id="create-title" />
                            </div>
                            <div className="inputs-container">
                                <div className="name-event-container">
                                    <label for="create-date">Дата проведения</label>
                                    <input type="date" id="create-date" />
                                </div>
                                <div className="name-event-container">
                                    <label for="create-time">Время проведения</label>
                                    <input type="time" id="create-time" />
                                </div>
                            </div>
                            <div className="name-event-container">
                                <label for="create-place">Место проведения</label>
                                <input type="text" id="create-place" />
                            </div>
                            <div className="name-event-container">
                                <label for="create-org">Организатор</label>
                                <input type="text" id="create-org" />
                            </div>
                        </div>
                        <button id="create-button">Создать</button>
                    </div>
                </div>

                <div className="calendar-page-content-footer">
                    <div className="add-btn">Добавить</div>
                    <div className="pagination-container">
                        <div className="pagination-item">
                            <img src="./img/chevron-left.svg" alt="" />
                        </div>
                        <div className="pagination-item active">1</div>
                        <div className="pagination-item">2</div>
                        <div className="pagination-item">3</div>
                        <div className="pagination-item">4</div>
                        <div className="pagination-item empty">...</div>
                        <div className="pagination-item">...</div>
                        <div className="pagination-item">
                            <img src="./img/chevron-right.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default Calendar;