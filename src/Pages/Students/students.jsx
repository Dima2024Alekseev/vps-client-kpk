import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./student.css";
import Header from "../../Components/Header/Header";
import studentPage from "../../img/studentPage/profile-2user.svg";
import headerItem from "../../img/studentPage/profile-tick.svg";
import save from "../../img/studentPage/save.svg";
import search from "../../img/search-icon.svg";
import StudentInfoModal from "../../Components/Modal_Student/StudentInfoModal";
import ActivityModal from "../../Components/Modal_Student/ActivityModal";
import ActivityFilterModal from "../../Components/Modal_Student/ActivityFilterModal";
import EditStudentModal from "../../Components/Modal_Student/EditStudentModal";
import AddStudentModal from "../../Components/Modal_Student/AddStudentModal";
import Pagination from "../../Components/Pagination";

const Students = () => {
  const [directions, setDirections] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedDirectionDescription, setSelectedDirectionDescription] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [currentGroupName, setCurrentGroupName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isActivityFilterModalOpen, setIsActivityFilterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    group: "",
    specialty: "",
    studentId: "",
  });
  const [groups, setGroups] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudentsCount, setFilteredStudentsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const directionsResponse = await fetch("http://localhost:5000/api/directions");
        if (!directionsResponse.ok) throw new Error("Ошибка при загрузке направлений");
        const directionsData = await directionsResponse.json();
        setDirections(directionsData);

        const isipDirection = directionsData.find((direction) => direction.name === "ИСиП");
        if (isipDirection) {
          setSelectedDirection(isipDirection._id);
          setSelectedDirectionDescription(isipDirection.description);
        }

        const groupsResponse = await fetch("http://localhost:5000/api/groups");
        if (!groupsResponse.ok) throw new Error("Ошибка при загрузке групп");
        const groupsData = await groupsResponse.json();
        const sortedGroups = sortGroupsAlphabetically(groupsData);
        setGroups(sortedGroups);

        const directionGroups = isipDirection
          ? sortedGroups.filter(group => isipDirection.groups.includes(group._id))
          : sortedGroups;

        if (directionGroups.length > 0) {
          setSelectedGroup(directionGroups[0]._id);
          setCurrentGroupName(directionGroups[0].name);
        }

        const specialtiesResponse = await fetch("http://localhost:5000/api/directions");
        if (!specialtiesResponse.ok) throw new Error("Ошибка при загрузке специальностей");
        const specialtiesData = await specialtiesResponse.json();
        setSpecialties(specialtiesData);

        const studentsResponse = await fetch("http://localhost:5000/api/students");
        if (!studentsResponse.ok) throw new Error("Ошибка при загрузке студентов");
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchData();
  }, []);

  const sortGroupsAlphabetically = (groupsArray) => {
    return [...groupsArray].sort((a, b) => a.name.localeCompare(b.name));
  };

  const getFilteredGroups = () => {
    if (!selectedDirection) return sortGroupsAlphabetically(groups);

    const selectedDirectionObj = directions.find((dir) => dir._id === selectedDirection);
    if (!selectedDirectionObj) return sortGroupsAlphabetically(groups);

    return sortGroupsAlphabetically(
      groups.filter((group) => selectedDirectionObj.groups.includes(group._id))
    );
  };

  useEffect(() => {
    const group = groups.find(g => g._id === selectedGroup);
    if (group) {
      setCurrentGroupName(group.name);
    } else {
      setCurrentGroupName("");
    }
  }, [selectedGroup, groups]);

  // Получаем отфильтрованных студентов
  const filteredStudents = students.filter(student => {
    const directionMatch = !selectedDirection || student.specialty?._id === selectedDirection;
    const groupMatch = !selectedGroup || student.group?._id === selectedGroup;
    return directionMatch && groupMatch;
  });

  // Получаем студентов для текущей страницы
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  useEffect(() => {
    setFilteredStudentsCount(filteredStudents.length);
    // Сбрасываем на первую страницу при изменении фильтров
    setCurrentPage(1);
  }, [filteredStudents.length, selectedDirection, selectedGroup]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDirectionChange = (e) => {
    const selectedId = e.target.value;
    setSelectedDirection(selectedId);

    const selectedDirection = directions.find((direction) => direction._id === selectedId);
    if (selectedDirection) {
      setSelectedDirectionDescription(selectedDirection.description);

      const directionGroups = groups.filter(group =>
        selectedDirection.groups.includes(group._id)
      );

      if (directionGroups.length > 0) {
        setSelectedGroup(directionGroups[0]._id);
        setCurrentGroupName(directionGroups[0].name);
      } else {
        setSelectedGroup("");
        setCurrentGroupName("");
      }
    }
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "specialty") {
      setSelectedSpecialty(value);
    }
  };

  const handleSaveNewStudent = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        console.log("Студент успешно добавлен");
        setIsAddModalOpen(false);
        setNewStudent({
          fullName: "",
          group: "",
          specialty: "",
          studentId: "",
        });

        const studentsResponse = await fetch("http://localhost:5000/api/students");
        if (!studentsResponse.ok) throw new Error("Ошибка при загрузке студентов");
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
      } else {
        console.error("Ошибка при добавлении студента");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleEditStudent = (studentId) => {
    console.log("Редактирование студента с ID:", studentId);
    setIsEditModalOpen(true);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Студент успешно удален");
        const studentsResponse = await fetch("http://localhost:5000/api/students");
        if (!studentsResponse.ok) throw new Error("Ошибка при загрузке студентов");
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
      } else {
        console.error("Ошибка при удалении студента");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

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
                <div className="header-title">{filteredStudentsCount}</div>
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
                  Специальность: {selectedDirectionDescription || "Информационные системы и программирование"}
                </div>
                <div className="student-page-body-header-group">
                  Группа: {currentGroupName || "Не выбрана"}
                </div>
              </div>
              <div className="calendar-search-container">
                <div className="input-icon-container">
                  <img src={search} alt="search" />
                </div>
                <input type="text" className="calendar-search-input" />
              </div>
              <select
                className="select"
                value={selectedDirection}
                onChange={handleDirectionChange}
              >
                {directions.map((direction) => (
                  <option key={direction._id} value={direction._id}>
                    {direction.name}
                  </option>
                ))}
              </select>
              <select
                className="select"
                value={selectedGroup}
                onChange={handleGroupChange}
              >
                {getFilteredGroups().map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
                Добавить
              </button>
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
                  {currentStudents.map((student) => (
                    <tr key={student._id}>
                      <td>{student.fullName}</td>
                      <td>{student.group?.name}</td>
                      <td>{student.specialty?.name}</td>
                      <td>{student.studentId}</td>
                      <td>
                        <button onClick={() => handleEditStudent(student._id)}>Редактировать</button>
                        <button onClick={() => handleDeleteStudent(student._id)}>Удалить</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Отображаем пагинацию только если студентов больше 10 */}
            {filteredStudents.length > studentsPerPage && (
              <div className="pagination-container">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredStudents.length / studentsPerPage)}
                  paginate={paginate}
                />
              </div>
            )}

            <StudentInfoModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onEdit={() => setIsEditModalOpen(true)}
              onActivity={() => setIsActivityModalOpen(true)}
            />

            <ActivityModal
              isOpen={isActivityModalOpen}
              onClose={() => setIsActivityModalOpen(false)}
              onFilter={() => setIsActivityFilterModalOpen(true)}
            />

            <ActivityFilterModal
              isOpen={isActivityFilterModalOpen}
              onClose={() => setIsActivityFilterModalOpen(false)}
            />

            <EditStudentModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            />

            <AddStudentModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              newStudent={newStudent}
              onChange={handleNewStudentChange}
              onSave={handleSaveNewStudent}
              groups={groups}
              specialties={specialties}
              selectedSpecialty={selectedSpecialty}
              directions={directions}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;