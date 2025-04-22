import React, { useEffect, useState } from "react";

const AddModal = ({ isOpen, onClose, newEvent, onChange, onSave, eventImages }) => {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [searchStudent, setSearchStudent] = useState("");
    const [searchTeacher, setSearchTeacher] = useState("");
    const [isStudentListOpen, setIsStudentListOpen] = useState(false);
    const [isTeacherListOpen, setIsTeacherListOpen] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch("http://localhost:5000/api/students");
            const data = await response.json();
            setStudents(data);
        };

        const fetchTeachers = async () => {
            const response = await fetch("http://localhost:5000/api/teachers");
            const data = await response.json();
            setTeachers(data);
        };

        fetchStudents();
        fetchTeachers();
    }, []);

    const handleAddStudent = (student) => {
        if (!newEvent.students.some(s => s._id === student._id)) {
            onChange({ ...newEvent, students: [...newEvent.students, student] });
        }
        setIsStudentListOpen(false);
    };

    const handleRemoveStudent = (studentId) => {
        onChange({ ...newEvent, students: newEvent.students.filter(s => s._id !== studentId) });
    };

    const handleAddTeacher = (teacher) => {
        if (!newEvent.teachers.some(t => t._id === teacher._id)) {
            onChange({ ...newEvent, teachers: [...newEvent.teachers, teacher] });
        }
        setIsTeacherListOpen(false);
    };

    const handleRemoveTeacher = (teacherId) => {
        onChange({ ...newEvent, teachers: newEvent.teachers.filter(t => t._id !== teacherId) });
    };

    const filteredStudents = students.filter(student =>
        student.fullName.toLowerCase().includes(searchStudent.toLowerCase()) &&
        !newEvent.students.some(s => s._id === student._id)
    );

    const filteredTeachers = teachers.filter(teacher =>
        teacher.fullName.toLowerCase().includes(searchTeacher.toLowerCase()) &&
        !newEvent.teachers.some(t => t._id === teacher._id)
    );

    const handleFormClick = () => {
        setIsStudentListOpen(false);
        setIsTeacherListOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "active" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Добавить мероприятие</h2>
                <div className="modal-form" onClick={handleFormClick}>
                    <div className="form-group">
                        <label className="form-label">Название мероприятия</label>
                        <input
                            type="text"
                            className="form-input"
                            value={newEvent.title}
                            onChange={(e) => onChange({ ...newEvent, title: e.target.value })}
                            placeholder="Введите название"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Дата проведения</label>
                            <input
                                type="date"
                                className="form-input"
                                value={newEvent.date}
                                onChange={(e) => onChange({ ...newEvent, date: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Время проведения</label>
                            <input
                                type="time"
                                className="form-input"
                                value={newEvent.time}
                                onChange={(e) => onChange({ ...newEvent, time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Место проведения</label>
                        <input
                            type="text"
                            className="form-input"
                            value={newEvent.place}
                            onChange={(e) => onChange({ ...newEvent, place: e.target.value })}
                            placeholder="Введите место"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Организатор</label>
                        <input
                            type="text"
                            className="form-input"
                            value={newEvent.organizer}
                            onChange={(e) => onChange({ ...newEvent, organizer: e.target.value })}
                            placeholder="Введите организатора"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Изображение</label>
                        <select
                            className="form-input"
                            value={newEvent.image}
                            onChange={(e) => onChange({ ...newEvent, image: e.target.value })}
                        >
                            <option value="">Выберите изображение</option>
                            {Object.keys(eventImages).map((imageName) => (
                                <option key={imageName} value={imageName}>
                                    {imageName}
                                </option>
                            ))}
                        </select>
                        {newEvent.image && (
                            <img
                                src={eventImages[newEvent.image]}
                                alt="Предпросмотр"
                                className="image-preview"
                            />
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Студенты</label>
                        <div className="input-with-button">
                            <input
                                type="text"
                                className="form-input"
                                value={searchStudent}
                                onChange={(e) => setSearchStudent(e.target.value)}
                                placeholder="Поиск студентов"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsStudentListOpen(true);
                                }}
                            />
                        </div>
                        {isStudentListOpen && (
                            <div className="student-list" onClick={(e) => e.stopPropagation()}>
                                {filteredStudents.map((student) => (
                                    <div key={student._id} className="student-item">
                                        <span>{student.fullName}</span>
                                        <button onClick={() => handleAddStudent(student)}>Добавить</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="selected-student-list">
                            {newEvent.students.map((student) => (
                                <div key={student._id} className="selected-student-item">
                                    <span>{student.fullName}</span>
                                    <button onClick={() => handleRemoveStudent(student._id)}>Удалить</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Преподаватели</label>
                        <div className="input-with-button">
                            <input
                                type="text"
                                className="form-input"
                                value={searchTeacher}
                                onChange={(e) => setSearchTeacher(e.target.value)}
                                placeholder="Поиск преподавателей"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsTeacherListOpen(true);
                                }}
                            />
                        </div>
                        {isTeacherListOpen && (
                            <div className="teacher-list" onClick={(e) => e.stopPropagation()}>
                                {filteredTeachers.map((teacher) => (
                                    <div key={teacher._id} className="teacher-item">
                                        <span>{teacher.fullName}</span>
                                        <button onClick={() => handleAddTeacher(teacher)}>Добавить</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="selected-teacher-list">
                            {newEvent.teachers.map((teacher) => (
                                <div key={teacher._id} className="selected-teacher-item">
                                    <span>{teacher.fullName}</span>
                                    <button onClick={() => handleRemoveTeacher(teacher._id)}>Удалить</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-buttons">
                    <button className="modal-button modal-button-primary" onClick={onSave}>
                        Сохранить
                    </button>
                    <button className="modal-button modal-button-secondary" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddModal;