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

const Teachers = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
                    fetch("http://localhost:5000/api/departments"),
                    fetch("http://localhost:5000/api/teachers")
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

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        try {
            const response = await fetch("http://localhost:5000/api/teachers", {
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
        } catch (err) {
            console.error("Ошибка при добавлении преподавателя:", err);
            alert(err.message);
        }
    };

    const handleEditTeacher = (teacher) => {
        setSelectedTeacher(teacher);
        setIsEditModalOpen(true);
    };

    const handleSaveEditedTeacher = async (updatedData) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/teachers/${selectedTeacher._id}`,
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
        } catch (err) {
            console.error("Ошибка при обновлении преподавателя:", err);
            throw err;
        }
    };

    const handleDeleteTeacher = async (teacherId) => {
        if (!window.confirm("Вы уверены, что хотите удалить этого преподавателя?")) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/teachers/${teacherId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка при удалении преподавателя");
            }

            setTeachers(prev => prev.filter(t => t._id !== teacherId));
        } catch (err) {
            console.error("Ошибка при удалении преподавателя:", err);
            alert("Не удалось удалить преподавателя");
        }
    };

    const exportToExcel = async () => {
        try {
            await ExcelExporter.exportTeachers(
                filteredTeachers,
                departments,
                selectedDepartment
            );
        } catch (err) {
            console.error('Ошибка при экспорте в Excel:', err);
            alert('Не удалось выполнить экспорт');
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
                                <button className="add-btn-teacher" onClick={() => setIsAddModalOpen(true)}>
                                     <FaUserPlus className="add-icon" />
                                      Добавить
                                   
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
                                                <td className="teacher-cell" onClick={() => handleTeacherClick(teacher)}>
                                                    {teacher.lastName} {teacher.firstName} {teacher.middleName}
                                                </td>
                                                <td className="department-cell">{teacher.department?.name}</td>
                                                <td className="actions">
                                                    <button
                                                        className="icon-btn"
                                                        onClick={() => handleEditTeacher(teacher)}
                                                        title="Редактировать"
                                                    >
                                                        <img src={edit} alt="Редактировать" className="action-icon" />
                                                    </button>
                                                    <button
                                                        className="icon-btn"
                                                        onClick={() => handleDeleteTeacher(teacher._id)}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Teachers;