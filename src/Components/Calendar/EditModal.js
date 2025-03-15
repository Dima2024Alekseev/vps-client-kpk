import React from "react";

const EditModal = ({ isOpen, onClose, selectedEvent, onSave, eventImages, onChange }) => {
    if (!isOpen) return null;

    return (
        <div id="modal" className="modal active" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 id="modal-title">Редактирование мероприятия</h2>
                <div className="form">
                    <div className="name-event-container">
                        <label htmlFor="edit-title">Название мероприятия</label>
                        <input
                            type="text"
                            id="edit-title"
                            value={selectedEvent?.title || ""}
                            onChange={(e) => onChange({ ...selectedEvent, title: e.target.value })}
                        />
                    </div>
                    <div className="inputs-container">
                        <div className="name-event-container">
                            <label htmlFor="edit-date">Дата проведения</label>
                            <input
                                type="date"
                                id="edit-date"
                                value={selectedEvent?.date || ""}
                                onChange={(e) => onChange({ ...selectedEvent, date: e.target.value })}
                            />
                        </div>
                        <div className="name-event-container">
                            <label htmlFor="edit-time">Время проведения</label>
                            <input
                                type="time"
                                id="edit-time"
                                value={selectedEvent?.time || ""}
                                onChange={(e) => onChange({ ...selectedEvent, time: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="name-event-container">
                        <label htmlFor="edit-place">Место проведения</label>
                        <input
                            type="text"
                            id="edit-place"
                            value={selectedEvent?.place || ""}
                            onChange={(e) => onChange({ ...selectedEvent, place: e.target.value })}
                        />
                    </div>
                    <div className="name-event-container">
                        <label htmlFor="edit-org">Организатор мероприятия</label>
                        <input
                            type="text"
                            id="edit-org"
                            value={selectedEvent?.organizer || ""}
                            onChange={(e) => onChange({ ...selectedEvent, organizer: e.target.value })}
                        />
                    </div>
                    <div className="name-event-container">
                        <label htmlFor="edit-image">Изображение</label>
                        <select
                            id="edit-image"
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
                    </div>
                </div>
                <div className="modal-buttons">
                    <button id="save-button" onClick={onSave}>
                        Сохранить
                    </button>
                    <button id="close-button" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;