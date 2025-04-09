import React, { useEffect, useState } from "react";

const EditModal = ({ isOpen, onClose, selectedEvent, onSave, eventImages, onChange }) => {
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
                <h2 className="modal-title">Редактирование мероприятия</h2>
                <div className="modal-form">
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
                        <select
                            className="form-input"
                            multiple
                            value={selectedEvent.students || []}
                            onChange={(e) => {
                                const selectedStudents = Array.from(e.target.selectedOptions, option => option.value);
                                onChange({ ...selectedEvent, students: selectedStudents });
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
                            value={selectedEvent.teachers || []}
                            onChange={(e) => {
                                const selectedTeachers = Array.from(e.target.selectedOptions, option => option.value);
                                onChange({ ...selectedEvent, teachers: selectedTeachers });
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

export default EditModal;
