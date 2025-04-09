import React, { useEffect, useState } from "react";

const AddModal = ({ isOpen, onClose, newEvent, onChange, onSave, eventImages }) => {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);

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

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "active" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2 className="modal-title">Добавить мероприятие</h2>
                <div className="modal-form">
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
                        <select
                            className="form-input"
                            multiple
                            value={newEvent.students || []}
                            onChange={(e) => {
                                const selectedStudents = Array.from(e.target.selectedOptions, option => option.value);
                                onChange({ ...newEvent, students: selectedStudents });
                            }}
                        >
                            {students.map((student) => (
                                <option key={student._id} value={student._id}>
                                    {student.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Преподаватели</label>
                        <select
                            className="form-input"
                            multiple
                            value={newEvent.teachers || []}
                            onChange={(e) => {
                                const selectedTeachers = Array.from(e.target.selectedOptions, option => option.value);
                                onChange({ ...newEvent, teachers: selectedTeachers });
                            }}
                        >
                            {teachers.map((teacher) => (
                                <option key={teacher._id} value={teacher._id}>
                                    {teacher.fullName}
                                </option>
                            ))}
                        </select>
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
