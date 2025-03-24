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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "fullName",
    direction: "asc",
  });
  const studentsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);

        const [directionsRes, groupsRes, studentsRes] = await Promise.all([
          fetch("http://localhost:5000/api/directions"),
          fetch("http://localhost:5000/api/groups"),
          fetch("http://localhost:5000/api/students")
        ]);

        if (!directionsRes.ok || !groupsRes.ok || !studentsRes.ok) {
          throw new Error("Ошибка при загрузке данных");
        }

        const [directionsData, groupsData, studentsData] = await Promise.all([
          directionsRes.json(),
          groupsRes.json(),
          studentsRes.json()
        ]);

        setDirections(directionsData);
        setSpecialties(directionsData);
        setGroups(sortGroupsAlphabetically(groupsData));
        setStudents(studentsData);

        const isipDirection = directionsData.find(d => d.name === "ИСиП");
        if (isipDirection) {
          setSelectedDirection(isipDirection._id);
          setSelectedDirectionDescription(isipDirection.description);

          const directionGroups = sortGroupsAlphabetically(
            groupsData.filter(g => isipDirection.groups.includes(g._id))
          );

          if (directionGroups.length > 0) {
            setSelectedGroup(directionGroups[0]._id);
            setCurrentGroupName(directionGroups[0].name);
          }
        }
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const sortGroupsAlphabetically = (groupsArray) => {
    return [...groupsArray].sort((a, b) => a.name.localeCompare(b.name));
  };

  const getFilteredGroups = () => {
    if (!selectedDirection) return sortGroupsAlphabetically(groups);

    const selectedDirectionObj = directions.find(d => d._id === selectedDirection);
    if (!selectedDirectionObj) return sortGroupsAlphabetically(groups);

    return sortGroupsAlphabetically(
      groups.filter(g => selectedDirectionObj.groups.includes(g._id))
    );
  };

  useEffect(() => {
    const group = groups.find(g => g._id === selectedGroup);
    setCurrentGroupName(group?.name || "");
  }, [selectedGroup, groups]);

  const getLastName = (fullName) => {
    return fullName.split(" ")[0] || "";
  };

  const filteredStudents = students
    .filter(student => {
      const directionMatch = !selectedDirection || student.specialty?._id === selectedDirection;
      const groupMatch = !selectedGroup || student.group?._id === selectedGroup;
      return directionMatch && groupMatch;
    })
    .sort((a, b) => {
      if (sortConfig.key === "fullName") {
        const lastNameA = getLastName(a.fullName).toLowerCase();
        const lastNameB = getLastName(b.fullName).toLowerCase();

        if (sortConfig.direction === "asc") {
          return lastNameA.localeCompare(lastNameB);
        } else {
          return lastNameB.localeCompare(lastNameA);
        }
      }
      return 0;
    });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  useEffect(() => {
    setFilteredStudentsCount(filteredStudents.length);
    setCurrentPage(1);
  }, [filteredStudents.length, selectedDirection, selectedGroup]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDirectionChange = (e) => {
    const selectedId = e.target.value;
    setSelectedDirection(selectedId);

    const direction = directions.find(d => d._id === selectedId);
    if (direction) {
      setSelectedDirectionDescription(direction.description);

      const directionGroups = getFilteredGroups().filter(g =>
        direction.groups.includes(g._id)
      );

      if (directionGroups.length > 0) {
        setSelectedGroup(directionGroups[0]._id);
      } else {
        setSelectedGroup("");
      }
    }
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при добавлении студента");
      }

      const addedStudent = await response.json();
      setStudents(prev => [...prev, addedStudent]);
      setIsAddModalOpen(false);
      setNewStudent({
        fullName: "",
        group: "",
        specialty: "",
        studentId: "",
      });
    } catch (err) {
      console.error("Ошибка при добавлении студента:", err);
      alert(err.message);
    }
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedStudent = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${selectedStudent._id}`,
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
        throw new Error(errorData.message || "Ошибка при обновлении студента");
      }

      const updatedStudent = await response.json();
      setStudents(prev =>
        prev.map(s => (s._id === updatedStudent._id ? updatedStudent : s))
      );
      setIsEditModalOpen(false);
      setSelectedStudent(null);
    } catch (err) {
      console.error("Ошибка при обновлении студента:", err);
      throw err;
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm("Вы уверены, что хотите удалить этого студента?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${studentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при удалении студента");
      }

      setStudents(prev => prev.filter(s => s._id !== studentId));
    } catch (err) {
      console.error("Ошибка при удалении студента:", err);
      alert("Не удалось удалить студента");
    }
  };

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

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
                <input type="text" className="calendar-search-input" placeholder="Поиск..." />
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
                disabled={!selectedDirection}
              >
                <option value="">Все группы</option>
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
                    <th
                      onClick={() => requestSort("fullName")}
                      className="sortable-header"
                    >
                      ФИО
                      {sortConfig.key === "fullName" && (
                        <span className="sort-icon">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>
                    <th>Группа</th>
                    <th>Специальность</th>
                    <th>Номер студ. билета</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  {currentStudents.length > 0 ? (
                    currentStudents.map((student) => (
                      <tr key={student._id}>
                        <td>{student.fullName}</td>
                        <td>{student.group?.name}</td>
                        <td>{student.specialty?.name}</td>
                        <td>{student.studentId}</td>
                        <td className="actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditStudent(student)}
                          >
                            Редактировать
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteStudent(student._id)}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">
                        Нет данных для отображения
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedStudent(null);
              }}
              student={selectedStudent}
              onSave={handleSaveEditedStudent}
              groups={groups}
              directions={directions}
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