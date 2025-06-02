import React, { useState, useEffect } from "react";
import "./teachers-page.css";
import { Helmet } from "react-helmet";
import edit from "../../img/edit.svg";
import delete_ from "../../img/delete.svg";
import Header from "../../Components/Header/Header";
import search from "../../img/search-icon.svg";
import TeacherInfoModal from "../../Components/Teachers/TeacherInfoModal";
import AddTeacherModal from "../../Components/Teachers/AddTeacherModal";
import EditTeacherModal from "../../Components/Teachers/EditTeacherModal";
import Pagination from "../../Components/Pagination";
import ExcelExporter from "../../utils/ExcelExporter";
import { FaFileExcel, FaUserPlus } from 'react-icons/fa';
import { GrDocumentExcel } from "react-icons/gr";
import { MdGroupAdd } from "react-icons/md";
import ManageDepartmentModal from "../../Components/Teachers/ManageDepartmentModal";
import { toast } from "react-toastify";

const Teachers = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isManageDepartmentModalOpen, setIsManageDepartmentModalOpen] = useState(false);
    const [newTeacher, setNewTeacher] = useState({
        lastName: "",
        firstName: "",
        middleName: "",
        department: "",
    });
    const [teachers, setTeachers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: "lastName",
        direction: "asc",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const teachersPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [departmentsRes, teachersRes] = await Promise.all([
                    fetch("/api/departments"),
                    fetch("/api/teachers")
                ]);

                if (!departmentsRes.ok || !teachersRes.ok) {
                    throw new Error("Ошибка при загрузке данных");
                }

                const [departmentsData, teachersData] = await Promise.all([
                    departmentsRes.json(),
                    teachersRes.json()
                ]);

                setDepartments(departmentsData);
                setTeachers(teachersData);

                if (departmentsData.length > 0) {
                    setSelectedDepartment(departmentsData[0]._id);
                }
            } catch (err) {
                console.error("Ошибка при загрузке данных:", err);
                toast.error("Ошибка при загрузке данных");
            }
        };

        fetchData();
    }, []);

    const handleTeacherClick = (teacher) => {
        setSelectedTeacher(teacher);
        setIsModalOpen(true);
    };

    const getLastName = (teacher) => {
        return teacher.lastName || teacher.fullName?.split(" ")[0] || "";
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredTeachers = teachers
        .filter(teacher => {
            const departmentMatch = !selectedDepartment || teacher.department?._id === selectedDepartment;
            const searchMatch = !searchQuery ||
                getLastName(teacher).toLowerCase().includes(searchQuery.toLowerCase());
            return departmentMatch && searchMatch;
        })
        .sort((a, b) => {
            const lastNameA = getLastName(a).toLowerCase();
            const lastNameB = getLastName(b).toLowerCase();

            if (sortConfig.direction === "asc") {
                return lastNameA.localeCompare(lastNameB);
            } else {
                return lastNameB.localeCompare(lastNameA);
            }
        });

    const indexOfLastTeacher = currentPage * teachersPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
    const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredTeachers.length, selectedDepartment, searchQuery]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0 });
    };

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleNewTeacherChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveNewTeacher = async () => {
        const { lastName, firstName, middleName, department } = newTeacher;

        if (!lastName || !firstName || !department) {
            toast.error("Пожалуйста, заполните все обязательные поля");
            return;
        }

        try {
            const response = await fetch("/api/teachers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTeacher),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка при добавлении преподавателя");
            }

            const addedTeacher = await response.json();
            setTeachers(prev => [...prev, addedTeacher]);
            setIsAddModalOpen(false);
            setNewTeacher({
                lastName: "",
                firstName: "",
                middleName: "",
                department: "",
            });
            toast.success("Преподаватель успешно добавлен");
        } catch (err) {
            console.error("Ошибка при добавлении преподавателя:", err);
            toast.error(err.message);
        }
    };

    const handleEditTeacher = (teacher) => {
        setSelectedTeacher(teacher);
        setIsEditModalOpen(true);
    };

    const handleSaveEditedTeacher = async (updatedData) => {
        if (!updatedData._id) {
            console.error("Идентификатор преподавателя не определен");
            toast.error("Идентификатор преподавателя не определен");
            return;
        }

        try {
            const response = await fetch(
                `/api/teachers/${updatedData._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка при обновлении преподавателя");
            }

            const updatedTeacher = await response.json();
            setTeachers(prev =>
                prev.map(t => (t._id === updatedTeacher._id ? updatedTeacher : t))
            );
            setIsEditModalOpen(false);
            setSelectedTeacher(null);
            toast.success("Преподаватель успешно обновлен");
        } catch (err) {
            console.error("Ошибка при обновлении преподавателя:", err);
            toast.error(`Не удалось обновить преподавателя: ${err.message}`);
        }
    };

    const handleDeleteTeacher = async (teacherId) => {
        if (!window.confirm("Вы уверены, что хотите удалить этого преподавателя?")) return;

        try {
            const response = await fetch(
                `/api/teachers/${teacherId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка при удалении преподавателя");
            }

            setTeachers(prev => prev.filter(t => t._id !== teacherId));
            toast.success("Преподаватель успешно удален");
        } catch (err) {
            console.error("Ошибка при удалении преподавателя:", err);
            toast.error("Не удалось удалить преподавателя");
        }
    };

    const handleSaveDepartment = async (departmentData) => {
        try {
            let response;
            const url = departmentData._id
                ? `/api/departments/${departmentData._id}`
                : "/api/departments";

            response = await fetch(url, {
                method: departmentData._id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(departmentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка при сохранении ПЦК");
            }

            const result = await response.json();

            if (departmentData._id) {
                setDepartments(prev =>
                    prev.map(d => (d._id === result._id ? result : d))
                );
                toast.success("ПЦК успешно обновлен");
            } else {
                setDepartments(prev => [...prev, result]);
                toast.success("ПЦК успешно добавлен");
            }

            return result;
        } catch (err) {
            console.error("Ошибка при сохранении ПЦК:", err);
            toast.error(err.message || "Ошибка при сохранении ПЦК");
            throw err;
        }
    };

    const handleDeleteDepartment = async (departmentId) => {
        if (!window.confirm("Вы уверены, что хотите удалить этот ПЦК?")) return;

        try {
            const response = await fetch(`/api/departments/${departmentId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка при удалении ПЦК");
            }

            setDepartments(prev => prev.filter(d => d._id !== departmentId));
            toast.success("ПЦК успешно удален");
        } catch (err) {
            console.error("Ошибка при удалении ПЦК:", err.message);
            toast.error(`Не удалось удалить ПЦК: ${err.message}`);
        }
    };

    const exportToExcel = async () => {
        try {
            await ExcelExporter.exportTeachers(
                filteredTeachers,
                departments,
                selectedDepartment
            );
            toast.success("Экспорт в Excel выполнен успешно");
        } catch (err) {
            console.error('Ошибка при экспорте в Excel:', err);
            toast.error('Не удалось выполнить экспорт');
        }
    };

    const exportTeacher = async (teacher) => {
        try {
            const response = await fetch('/api/events?populate=teachers');
            if (!response.ok) throw new Error("Ошибка при загрузке мероприятий");
            const allEvents = await response.json();

            const teacherEvents = allEvents.filter(event =>
                event.teachers.some(t => t._id === teacher._id)
            );

            await ExcelExporter.exportTeacherDetails(teacher, teacherEvents);
            toast.success(`Данные преподавателя ${teacher.lastName} экспортированы`);
        } catch (err) {
            console.error("Ошибка при экспорте преподавателя:", err);
            toast.error("Не удалось экспортировать данные преподавателя");
        }
    };

    return (
        <>
            <Helmet>
                <title>Преподаватели</title>
            </Helmet>
            <div className="teacher-page">
                <Header />
                <div className="teacher-page-content">
                    <div className="teacher-page-body">
                        <div className="teacher-page-body-header">
                            <div className="panel-search-select">
                                <div className="calendar-search-container">
                                    <div className="input-icon-container">
                                        <img src={search} alt="search" />
                                    </div>
                                    <input
                                        type="text"
                                        className="calendar-search-input"
                                        placeholder="Поиск"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <div className="select-and-btn">
                                    <select
                                        className="select"
                                        value={selectedDepartment}
                                        onChange={handleDepartmentChange}
                                    >
                                        <option value="">Все ПЦК</option>
                                        {departments.map((department) => (
                                            <option key={department._id} value={department._id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="position-button">
                                <button className="add-btn-teacher" onClick={() => setIsAddModalOpen(true)}>
                                    <FaUserPlus className="add-icon" />
                                    Добавить преподавателя
                                </button>
                                <button
                                    className="add-btn-department"
                                    onClick={() => setIsManageDepartmentModalOpen(true)}
                                >
                                    <MdGroupAdd className="add-icon" />
                                    Управление ПЦК
                                </button>
                                <button
                                    className="export-btn"
                                    onClick={exportToExcel}
                                    disabled={filteredTeachers.length === 0}
                                    title="Экспорт в Excel"
                                >
                                    <FaFileExcel className="excel-icon" /> Экспорт
                                </button>
                            </div>
                        </div>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th
                                            onClick={() => requestSort("lastName")}
                                            className="sortable-header"
                                        >
                                            ФИО
                                            {sortConfig.key === "lastName" && (
                                                <span className="sort-icon">
                                                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                                                </span>
                                            )}
                                        </th>
                                        <th>ПЦК</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody id="table-body">
                                    {currentTeachers.length > 0 ? (
                                        currentTeachers.map((teacher) => (
                                            <tr key={teacher._id} className="teacher-row">
                                                <td
                                                    className="teacher-cell"
                                                    onClick={() => handleTeacherClick(teacher)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {teacher.lastName} {teacher.firstName} {teacher.middleName}
                                                </td>
                                                <td className="department-cell">{teacher.department?.name}</td>
                                                <td className="actions">
                                                    <button
                                                        className="icon-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditTeacher(teacher);
                                                        }}
                                                        title="Редактировать"
                                                    >
                                                        <img src={edit} alt="Редактировать" className="action-icon" />
                                                    </button>
                                                    <button
                                                        className="icon-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            exportTeacher(teacher);
                                                        }}
                                                        title="Экспорт в Excel"
                                                    >
                                                        <GrDocumentExcel color="#044382" className="action-icon" />
                                                    </button>
                                                    <button
                                                        className="icon-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteTeacher(teacher._id);
                                                        }}
                                                        title="Удалить"
                                                    >
                                                        <img src={delete_} alt="Удалить" className="action-icon" />
                                                    </button>
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

                        {filteredTeachers.length > teachersPerPage && (
                            <div className="pagination-container">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(filteredTeachers.length / teachersPerPage)}
                                    paginate={paginate}
                                />
                            </div>
                        )}

                        <TeacherInfoModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onEdit={() => setIsEditModalOpen(true)}
                            teacher={selectedTeacher}
                        />

                        <EditTeacherModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setSelectedTeacher(null);
                            }}
                            teacher={selectedTeacher}
                            onSave={handleSaveEditedTeacher}
                            departments={departments}
                        />

                        <AddTeacherModal
                            isOpen={isAddModalOpen}
                            onClose={() => setIsAddModalOpen(false)}
                            newTeacher={newTeacher}
                            onChange={handleNewTeacherChange}
                            onSave={handleSaveNewTeacher}
                            departments={departments}
                        />

                        <ManageDepartmentModal
                            isOpen={isManageDepartmentModalOpen}
                            onClose={() => setIsManageDepartmentModalOpen(false)}
                            departments={departments}
                            onSave={handleSaveDepartment}
                            onDelete={handleDeleteDepartment}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Teachers;