import React from "react";

const ViewModal = ({ isOpen, onClose, selectedEvent, eventImages }) => {
    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "active" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Информация о мероприятии</h2>
                <div className="modal-form">
                    <div className="form-group">
                        <label className="form-label">Название мероприятия</label>
                        <div className="form-input info-text">
                            {selectedEvent?.title || "Не указано"}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Дата проведения</label>
                            <div className="form-input info-text">
                                {selectedEvent?.date || "Не указана"}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Время проведения</label>
                            <div className="form-input info-text">
                                {selectedEvent?.time || "Не указано"}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Место проведения</label>
                        <div className="form-input info-text">
                            {selectedEvent?.place || "Не указано"}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Организатор</label>
                        <div className="form-input info-text">
                            {selectedEvent?.organizer || "Не указан"}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Изображение</label>
                        {selectedEvent?.image ? (
                            <img
                                src={eventImages[selectedEvent.image]}
                                alt="Изображение мероприятия"
                                className="image-preview-large"
                            />
                        ) : (
                            <div className="form-input info-text">Не выбрано</div>
                        )}
                    </div>

                    {selectedEvent?.students?.length > 0 && (
                        <div className="form-group">
                            <label className="form-label">Студенты ({selectedEvent.students.length})</label>
                            <div className="participants-list">
                                {selectedEvent.students.map((student) => (
                                    <div key={student._id} className="participant-card">
                                        <div className="participant-avatar">
                                            {student.fullName?.charAt(0) || "S"}
                                        </div>
                                        <div className="participant-info">
                                            <span className="participant-name">{student.fullName || "Неизвестный студент"}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedEvent?.teachers?.length > 0 && (
                        <div className="form-group">
                            <label className="form-label">Преподаватели ({selectedEvent.teachers.length})</label>
                            <div className="participants-list">
                                {selectedEvent.teachers.map((teacher) => (
                                    <div key={teacher._id} className="participant-card">
                                        <div className="participant-avatar teacher">
                                            {teacher.fullName?.charAt(0) || "T"}
                                        </div>
                                        <div className="participant-info">
                                            <span className="participant-name">{teacher.fullName || "Неизвестный преподаватель"}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-buttons">
                    <button className="modal-button modal-button-secondary" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;