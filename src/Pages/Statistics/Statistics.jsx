import React, { useState, useEffect } from "react";
import "./statistic.css";
import { Helmet } from "react-helmet";
import Header from "../../Components/Header/Header";
import Pagination from "../../Components/Pagination";
import ExcelExporter from "../../utils/ExcelExporter";
import { FaFileExcel, FaTable, FaChartBar } from 'react-icons/fa';
import Modal from "../../Components/ModalStatistics/ModalStatistics";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Statistics = () => {
    const [events, setEvents] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [directions, setDirections] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('table'); // 'table' или 'chart'
    const eventsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, departmentsRes, directionsRes] = await Promise.all([
                    fetch("/api/events"),
                    fetch("/api/departments"),
                    fetch("/api/directions")
                ]);

                if (!eventsRes.ok || !departmentsRes.ok || !directionsRes.ok) {
                    throw new Error("Ошибка при загрузке данных");
                }

                const [eventsData, departmentsData, directionsData] = await Promise.all([
                    eventsRes.json(),
                    departmentsRes.json(),
                    directionsRes.json()
                ]);

                setEvents(eventsData);
                setDepartments(departmentsData);
                setDirections(directionsData);
            } catch (err) {
                console.error("Ошибка при загрузке данных:", err);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleDateFilterChange = (e) => {
        setDateFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleSpecialtyFilterChange = (e) => {
        setSpecialtyFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleDepartmentFilterChange = (e) => {
        setDepartmentFilter(e.target.value);
        setCurrentPage(1);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'table' ? 'chart' : 'table');
    };

    const filteredEvents = events.filter(event => {
        const searchMatch = !searchQuery ||
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.students.some(student => student.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
            event.teachers.some(teacher => teacher.fullName.toLowerCase().includes(searchQuery.toLowerCase()));

        const dateMatch = !dateFilter ||
            new Date(event.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString();

        const specialtyMatch = !specialtyFilter ||
            event.students.some(student => student.specialty === specialtyFilter) ||
            event.teachers.some(teacher => teacher.specialty === specialtyFilter);

        const departmentMatch = !departmentFilter ||
            event.students.some(student => student.department === departmentFilter) ||
            event.teachers.some(teacher => teacher.department === departmentFilter);

        return searchMatch && dateMatch && specialtyMatch && departmentMatch;
    });

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (dateFilter) {
            return new Date(a.date) - new Date(b.date);
        } else if (specialtyFilter) {
            return a.students.some(student => student.specialty === specialtyFilter) ||
                a.teachers.some(teacher => teacher.specialty === specialtyFilter)
                ? -1 : 1;
        } else if (departmentFilter) {
            return a.students.some(student => student.department === departmentFilter) ||
                a.teachers.some(teacher => teacher.department === departmentFilter)
                ? -1 : 1;
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const exportSelectedEvent = async (selectedEvent) => {
        try {
            if (selectedEvent === 'all') {
                await ExcelExporter.exportEvents(
                    filteredEvents,
                    departments,
                    directions,
                    dateFilter,
                    specialtyFilter,
                    departmentFilter
                );
            } else {
                const eventToExport = events.find(event => event._id === selectedEvent);
                if (eventToExport) {
                    await ExcelExporter.exportEvents(
                        [eventToExport],
                        departments,
                        directions,
                        dateFilter,
                        specialtyFilter,
                        departmentFilter
                    );
                }
            }
        } catch (err) {
            console.error('Ошибка при экспорте в Excel:', err);
            alert('Не удалось выполнить экспорт');
        } finally {
            closeModal();
        }
    };

    // Подготовка данных для диаграммы
    const prepareChartData = () => {
        // Группировка по датам
        const eventsByDate = filteredEvents.reduce((acc, event) => {
            const date = new Date(event.date).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = {
                    date,
                    events: 0,
                    participants: 0
                };
            }
            acc[date].events += 1;
            acc[date].participants += (event.students?.length || 0) + (event.teachers?.length || 0);
            return acc;
        }, {});

        // Группировка по направлениям
        const eventsByDirection = filteredEvents.reduce((acc, event) => {
            const directionsInEvent = new Set();

            // Собираем все направления студентов
            event.students?.forEach(student => {
                if (student.specialty) {
                    const direction = directions.find(d => d._id === student.specialty);
                    if (direction) {
                        directionsInEvent.add(direction.name);
                    }
                }
            });

            // Собираем все направления преподавателей
            event.teachers?.forEach(teacher => {
                if (teacher.specialty) {
                    const direction = directions.find(d => d._id === teacher.specialty);
                    if (direction) {
                        directionsInEvent.add(direction.name);
                    }
                }
            });

            // Если нет направлений, добавляем "Не указано"
            if (directionsInEvent.size === 0) {
                directionsInEvent.add("Не указано");
            }

            // Увеличиваем счетчики для каждого направления
            directionsInEvent.forEach(directionName => {
                if (!acc[directionName]) {
                    acc[directionName] = {
                        direction: directionName,
                        events: 0,
                        participants: 0
                    };
                }
                acc[directionName].events += 1;
                acc[directionName].participants += (event.students?.length || 0) + (event.teachers?.length || 0);
            });

            return acc;
        }, {});

        return {
            byDate: Object.values(eventsByDate),
            byDirection: Object.values(eventsByDirection)
        };
    };

    const chartData = prepareChartData();

    return (
        <>
            <Helmet>
                <title>Статистика</title>
            </Helmet>
            <div className="statistic-page">
                <Header />
                <div className="statistic-page-content">
                    <div className="statistic-page-body">
                        <div className="statistic-page-body-header">
                            <div className="calendar-search-container">
                                <input
                                    type="text"
                                    className="calendar-search-input"
                                    placeholder="Поиск"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="filter-container">
                                <div className="filter-item">
                                    <label>Фильтр по дате:</label>
                                    <input
                                        type="date"
                                        className="filter-input"
                                        value={dateFilter}
                                        onChange={handleDateFilterChange}
                                    />
                                </div>
                                <div className="filter-item">
                                    <label>Фильтр по специальности:</label>
                                    <select
                                        className="filter-select"
                                        value={specialtyFilter}
                                        onChange={handleSpecialtyFilterChange}
                                    >
                                        <option value="">Все специальности</option>
                                        {directions.map(direction => (
                                            <option key={direction._id} value={direction._id}>
                                                {direction.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="filter-item">
                                    <label>Фильтр по ПЦК:</label>
                                    <select
                                        className="filter-select"
                                        value={departmentFilter}
                                        onChange={handleDepartmentFilterChange}
                                    >
                                        <option value="">Все ПЦК</option>
                                        {departments.map(department => (
                                            <option key={department._id} value={department._id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="view-controls">
                                <button
                                    className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                                    onClick={() => setViewMode('table')}
                                    title="Таблица"
                                >
                                    <FaTable />
                                </button>
                                <button
                                    className={`view-btn ${viewMode === 'chart' ? 'active' : ''}`}
                                    onClick={() => setViewMode('chart')}
                                    title="Диаграммы"
                                >
                                    <FaChartBar />
                                </button>
                                <button
                                    className="export-btn"
                                    onClick={openModal}
                                    disabled={filteredEvents.length === 0}
                                    title="Экспорт в Excel"
                                >
                                    <FaFileExcel className="excel-icon" /> Экспорт
                                </button>
                            </div>
                        </div>

                        {viewMode === 'table' ? (
                            <>
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Название мероприятия</th>
                                                <th>Дата</th>
                                                <th>Участники</th>
                                            </tr>
                                        </thead>
                                        <tbody id="table-body">
                                            {currentEvents.length > 0 ? (
                                                currentEvents.map((event) => (
                                                    <tr key={event._id} className="event-row">
                                                        <td className="event-cell">{event.title}</td>
                                                        <td className="date-cell">{new Date(event.date).toLocaleDateString()}</td>
                                                        <td className="participants-cell">
                                                            {event.students && event.students.length > 0 ? (
                                                                <div className="participants-list">
                                                                    {event.students.map(student => (
                                                                        <div key={student._id}>{student.fullName}</div>
                                                                    ))}
                                                                </div>
                                                            ) : "Нет участников"}
                                                            {event.teachers && event.teachers.length > 0 ? (
                                                                <div className="participants-list">
                                                                    {event.teachers.map(teacher => (
                                                                        <div key={teacher._id}>{teacher.fullName}</div>
                                                                    ))}
                                                                </div>
                                                            ) : ""}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="no-data">
                                                        Нет данных для отображения
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {sortedEvents.length > eventsPerPage && (
                                    <div className="pagination-container">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={Math.ceil(sortedEvents.length / eventsPerPage)}
                                            paginate={paginate}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="charts-container">
                                {filteredEvents.length > 0 ? (
                                    <>
                                        <div className="chart-section">
                                            <h3>Мероприятия по датам</h3>
                                            <div className="chart-wrapper">
                                                <ResponsiveContainer width="100%" height={400}>
                                                    <BarChart
                                                        data={chartData.byDate}
                                                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis
                                                            dataKey="date"
                                                            angle={0}
                                                            textAnchor="end"
                                                            height={70}
                                                        />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="events" name="Количество мероприятий" fill="#0052A2" />
                                                        <Bar dataKey="participants" name="Количество участников" fill="#82ca9d" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        <div className="chart-section">
                                            <h3>Мероприятия по направлениям</h3>
                                            <div className="chart-wrapper">
                                                <ResponsiveContainer width="100%" height={400}>
                                                    <BarChart
                                                        data={chartData.byDirection}
                                                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis
                                                            dataKey="direction"
                                                            angle={0}
                                                            textAnchor="end"
                                                            height={70}
                                                        />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="events" name="Количество мероприятий" fill="#0052A2" />
                                                        <Bar dataKey="participants" name="Количество участников" fill="#82ca9d" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="no-data">
                                        Нет данных для отображения диаграмм
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onExport={exportSelectedEvent}
                events={events}
            />
        </>
    );
};

export default Statistics;