import React from "react";
import { Helmet } from "react-helmet";
import "./student.css";
import Header from "../../Components/Header/Header";
import studentPage from "../../img/studentPage/profile-2user.svg";
import headerItem from "../../img/studentPage/profile-tick.svg";
import save from "../../img/studentPage/save.svg";
import search from "../../img/search-icon.svg";
import chevronL from "../../img/chevron-left.svg";
import chevronR from "../../img/chevron-right.svg";
import filter from "../../img/studentPage/filter.svg";

const Students = () => {
    return (
        <>
            <Helmet>
                <title>Студенты</title>
            </Helmet>
            <div className="student-page">
                <Header />
                <div className="student-page-content">
                    <div className="student-page-header">
                        <div className="header-item">
                            <div className="icon-container">
                                <img src={studentPage} alt="" />
                            </div>
                            <div className="header-title-container">
                                <div className="header-subtitle">Кол-во студентов</div>
                                <div className="header-title">26</div>
                            </div>
                        </div>

                        <div className="header-item">
                            <div className="icon-container">
                                <img src={headerItem} alt="" />
                            </div>
                            <div className="header-title-container">
                                <div className="header-subtitle">Активность</div>
                                <div className="header-title">50%</div>
                            </div>
                        </div>

                        <div className="header-item">
                            <div className="icon-container">
                                <img src={save} alt="" />
                            </div>
                            <div className="header-title-container">
                                <div className="header-subtitle">Кол-во мероприятий</div>
                                <div className="header-title">190</div>
                            </div>
                        </div>
                    </div>
                    <div className="student-page-body">
                        <div className="student-page-body-header">
                            <div className="student-page-body-header-title-container">
                                <div className="student-page-body-header-title">
                                    Специальность: Информационные системы и программирование
                                </div>
                                <div className="student-page-body-header-group">Группа: 203</div>
                            </div>
                            <div className="calendar-search-container" >
                                <div className="input-icon-container">
                                    <img src={search} alt="search" />
                                </div>
                                <input type="text" className="calendar-search-input" />
                            </div>
                            <select className="select">
                                <option>Фильтр: ИСиП</option>
                                <option>Фильтр: Нач. кл.</option>
                                <option>Фильтр: Дошкол.</option>
                                <option>Фильтр: Физ. кул.</option>
                            </select>
                        </div>

                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Группа</th>
                                        <th>Специальность</th>
                                        <th>Номер студ. билета</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="table-body">
                                    {/* Данные будут добавляться динамически */}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination-container">
                            <div className="pagination-item">
                                <img src={chevronL} alt="" />
                            </div>
                            <div className="pagination-item active">1</div>
                            <div className="pagination-item">2</div>
                            <div className="pagination-item">3</div>
                            <div className="pagination-item">4</div>
                            <div className="pagination-item empty">...</div>
                            <div className="pagination-item">...</div>
                            <div className="pagination-item">
                                <img src={chevronR} alt="" />
                            </div>
                        </div>

                        {/* <!-- Модальное окно информации о студенте --> */}
                        <div id="student-modal" className="modal">
                            <div className="modal-content">
                                <h2 id="view-modal-title">Информация о студенте</h2>
                                <div className="form">
                                    <div className="name-event-container">
                                        <label>ФИО</label>
                                        <p id="modal-initials"></p>
                                    </div>
                                    <div className="inputs-container">
                                        <div className="name-event-container">
                                            <label>Группа</label>
                                            <p id="modal-group"></p>
                                        </div>
                                        <div className="name-event-container">
                                            <label>Номер студенческого билета</label>
                                            <p id="modal-ticket"></p>
                                        </div>
                                    </div>
                                    <div className="name-event-container">
                                        <label>Специальность</label>
                                        <p id="modal-specialty"></p>
                                    </div>
                                </div>

                                <div className="buttons-container">
                                    <button className="active-btn" onclick="closeModal()">
                                        Изменить
                                    </button>
                                    <button className="active-btn" onclick="openActivityModal()">
                                        Активность
                                    </button>
                                </div>

                                <button className="close-btn" onclick="closeModal()">Закрыть</button>
                            </div>
                        </div>

                        {/* <!-- Второе модальное окно (изменение активности) --> */}
                        <div id="activity-modal" className="modal-overlay">
                            <h2 id="view-modal-title">Активность студента</h2>
                            <div className="filters-container">
                                <div className="name-event-container" >
                                    <label>ФИО</label>
                                    <p>Алексеев Дмитрий Евгеньевич</p>
                                </div>
                                <div className="filter-icon-container" onclick="openActivityModal()">
                                    <img src={filter} alt="" />
                                </div>
                            </div>

                            <div
                                className="chart-container"

                            >
                                <canvas id="activityChart"></canvas>
                            </div>
                            <button className="close-btn" onclick="closeActivityModal()">
                                Закрыть
                            </button>
                        </div>

                        {/* <!-- Модальное окно фильтров --> */}
                        <div
                            id="activity-modal-filters"
                            className="modal-overlay"

                        >
                            <h2 id="view-modal-title">Фильтры</h2>
                            <div className="filter-container">
                                <div className="container">Фильтр по активности:</div>
                                <select>
                                    <option>Все мероприятия</option>
                                </select>
                            </div>
                            <div className="filter-container">
                                <div className="container">Фильтр по интервалу:</div>
                                <div>
                                    <input type="date" id="dateInput" name="date" />
                                    <input type="date" id="dateInput" name="date" />
                                </div>
                            </div>

                            <button className="close-btn" onclick="closeActivityFilterModal()">
                                Закрыть
                            </button>
                        </div>

                        {/* <!-- Модальное окно редактирования студента --> */}
                        <div id="student-edit-modal" className="modal">
                            <div className="modal-content">
                                <h2 id="view-modal-title">Редактирование студента</h2>
                                <div className="form">
                                    <div className="name-event-container">
                                        <label>ФИО</label>
                                        <input id="modal-edit-initials" type="text" value="" />
                                    </div>
                                    <div className="inputs-container">
                                        <div className="name-event-container">
                                            <label>Группа</label>
                                            <input id="modal-edit-group" type="text" value="" />
                                        </div>
                                        <div className="name-event-container">
                                            <label>Номер студенческого билета</label>
                                            <input id="modal-edit-ticket" type="text" value="" />
                                        </div>
                                    </div>
                                    <div className="name-event-container">
                                        <label>Специальность</label>
                                        <input id="modal-edit-specialty" type="text" value="" />
                                    </div>
                                </div>

                                <div className="buttons-container" >
                                    <button className="close-btn" onclick="closeEditModal()">
                                        Изменить
                                    </button>
                                    <button className="close-btn" onclick="closeEditModal()">
                                        Закрыть
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Students;