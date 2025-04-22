import React, { useEffect, useState } from "react";

const EditModal = ({ isOpen, onClose, selectedEvent, onSave, eventImages, onChange }) => {
    const [allStudents, setAllStudents] = useState([]);
    const [allTeachers, setAllTeachers] = useState([]);
    const [searchStudent, setSearchStudent] = useState("");
    const [searchTeacher, setSearchTeacher] = useState("");
    const [isStudentListOpen, setIsStudentListOpen] = useState(false);
    const [isTeacherListOpen, setIsTeacherListOpen] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/students");
                const data = await response.json();
                setAllStudents(data);
            } catch (error) {
                console.error("Ошибка при загрузке студентов:", error);
            }
        };

        const fetchTeachers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/teachers");
                const data = await response.json();
                setAllTeachers(data);
            } catch (error) {
                console.error("Ошибка при загрузке преподавателей:", error);
            }
        };

        fetchStudents();
        fetchTeachers();
    }, []);

    if (!selectedEvent) {
        return null;
    }

    const handleAddStudent = (student) => {
        if (!selectedEvent.students.some(s => s._id === student._id)) {
            onChange({
                ...selectedEvent,
                students: [...selectedEvent.students, student]
            });
        }
        setIsStudentListOpen(false);
    };

    const handleRemoveStudent = (studentId) => {
        onChange({
            ...selectedEvent,
            students: selectedEvent.students.filter(s => s._id !== studentId)
        });
    };

    const handleAddTeacher = (teacher) => {
        if (!selectedEvent.teachers.some(t => t._id === teacher._id)) {
            onChange({
                ...selectedEvent,
                teachers: [...selectedEvent.teachers, teacher]
            });
        }
        setIsTeacherListOpen(false);
    };

    const handleRemoveTeacher = (teacherId) => {
        onChange({
            ...selectedEvent,
            teachers: selectedEvent.teachers.filter(t => t._id !== teacherId)
        });
    };

    const filteredStudents = allStudents.filter(student =>
        student.fullName?.toLowerCase().includes(searchStudent.toLowerCase()) &&
        !selectedEvent.students.some(s => s._id === student._id)
    );

    const filteredTeachers = allTeachers.filter(teacher =>
        teacher.fullName?.toLowerCase().includes(searchTeacher.toLowerCase()) &&
        !selectedEvent.teachers.some(t => t._id === teacher._id)
    );

    const handleFormClick = () => {
        setIsStudentListOpen(false);
        setIsTeacherListOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "active" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Редактирование мероприятия</h2>
                <div className="modal-form" onClick={handleFormClick}>
                    <div className="form-group">
                        <label className="form-label">Название мероприятия</label>
                        <input
                            type="text"
                            className="form-input"
                            value={selectedEvent?.title || ""}
                            onChange={(e) => onChange({ ...selectedEvent, title: e.target.value })}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Дата проведения</label>
                            <input
                                type="date"
                                className="form-input"
                                value={selectedEvent?.date || ""}
                                onChange={(e) => onChange({ ...selectedEvent, date: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Время проведения</label>
                            <input
                                type="time"
                                className="form-input"
                                value={selectedEvent?.time || ""}
                                onChange={(e) => onChange({ ...selectedEvent, time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Место проведения</label>
                        <input
                            type="text"
                            className="form-input"
                            value={selectedEvent?.place || ""}
                            onChange={(e) => onChange({ ...selectedEvent, place: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Организатор</label>
                        <input
                            type="text"
                            className="form-input"
                            value={selectedEvent?.organizer || ""}
                            onChange={(e) => onChange({ ...selectedEvent, organizer: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Изображение</label>
                        <select
                            className="form-input"
                            value={selectedEvent?.image || ""}
                            onChange={(e) => onChange({ ...selectedEvent, image: e.target.value })}
                        >
                            <option value="">Выберите изображение</option>
                            {Object.keys(eventImages).map((imageName) => (
                                <option key={imageName} value={imageName}>
                                    {imageName}
                                </option>
                            ))}
                        </select>
                        {selectedEvent?.image && (
                            <img
                                src={eventImages[selectedEvent.image]}
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
                                        <span>{student.fullName || "Неизвестно"}</span>
                                        <button onClick={() => handleAddStudent(student)}>Добавить</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="selected-student-list">
                            {selectedEvent.students?.length > 0 ? (
                                selectedEvent.students.map((student) => (
                                    <div key={student._id} className="selected-student-item">
                                        <span>{student.fullName || "Неизвестно"}</span>
                                        <button onClick={() => handleRemoveStudent(student._id)}>Удалить</button>
                                    </div>
                                ))
                            ) : (
                                <div className="selected-student-item">Нет добавленных студентов</div>
                            )}
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
                                        <span>{teacher.fullName || "Неизвестно"}</span>
                                        <button onClick={() => handleAddTeacher(teacher)}>Добавить</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="selected-teacher-list">
                            {selectedEvent.teachers?.length > 0 ? (
                                selectedEvent.teachers.map((teacher) => (
                                    <div key={teacher._id} className="selected-teacher-item">
                                        <span>{teacher.fullName || "Неизвестно"}</span>
                                        <button onClick={() => handleRemoveTeacher(teacher._id)}>Удалить</button>
                                    </div>
                                ))
                            ) : (
                                <div className="selected-teacher-item">Нет добавленных преподавателей</div>
                            )}
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

export default EditModal;