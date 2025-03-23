import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./student.css";
import Header from "../../Components/Header/Header";
import studentPage from "../../img/studentPage/profile-2user.svg";
import headerItem from "../../img/studentPage/profile-tick.svg";
import save from "../../img/studentPage/save.svg";
import search from "../../img/search-icon.svg";
import chevronL from "../../img/chevron-left.svg";
import chevronR from "../../img/chevron-right.svg";
import StudentInfoModal from "../../Components/Modal_Student/StudentInfoModal";
import ActivityModal from "../../Components/Modal_Student/ActivityModal";
import ActivityFilterModal from "../../Components/Modal_Student/ActivityFilterModal";
import EditStudentModal from "../../Components/Modal_Student/EditStudentModal";
import AddStudentModal from "../../Components/Modal_Student/AddStudentModal";

const Students = () => {
  const [directions, setDirections] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedDirectionDescription, setSelectedDirectionDescription] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
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
        setGroups(groupsData);

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

  const handleDirectionChange = (e) => {
    const selectedId = e.target.value;
    setSelectedDirection(selectedId);
    setSelectedGroup(""); // Сбрасываем выбранную группу

    const selectedDirection = directions.find((direction) => direction._id === selectedId);
    if (selectedDirection) {
      setSelectedDirectionDescription(selectedDirection.description);
    }
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const getFilteredGroups = () => {
    if (!selectedDirection) return groups;

    const selectedDirectionObj = directions.find((dir) => dir._id === selectedDirection);
    if (!selectedDirectionObj) return groups;

    return groups.filter((group) => selectedDirectionObj.groups.includes(group._id));
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
                <div className="header-title">{students.length}</div>
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
                <div className="student-page-body-header-group">Группа: 203</div>
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
                <option value="">Выберите группу</option>
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
                  {students
                    .filter((student) => !selectedGroup || student.group?._id === selectedGroup)
                    .map((student) => (
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