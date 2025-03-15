import React from "react";

const AddModal = ({ isOpen, onClose, newEvent, onChange, onSave, eventImages }) => {
    if (!isOpen) return null;

    return (
        <div id="add-modal" className="modal active" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 id="add-modal-title">Добавить мероприятие</h2>
                <div className="form">
                    <div className="name-event-container">
                        <label htmlFor="add-title">Название мероприятия</label>
                        <input
                            type="text"
                            id="add-title"
                            value={newEvent.title}
                            onChange={(e) => onChange({ ...newEvent, title: e.target.value })}
                        />
                    </div>
                    <div className="inputs-container">
                        <div className="name-event-container">
                            <label htmlFor="add-date">Дата проведения</label>
                            <input
                                type="date"
                                id="add-date"
                                value={newEvent.date}
                                onChange={(e) => onChange({ ...newEvent, date: e.target.value })}
                            />
                        </div>
                        <div className="name-event-container">
                            <label htmlFor="add-time">Время проведения</label>
                            <input
                                type="time"
                                id="add-time"
                                value={newEvent.time}
                                onChange={(e) => onChange({ ...newEvent, time: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="name-event-container">
                        <label htmlFor="add-place">Место проведения</label>
                        <input
                            type="text"
                            id="add-place"
                            value={newEvent.place}
                            onChange={(e) => onChange({ ...newEvent, place: e.target.value })}
                        />
                    </div>
                    <div className="name-event-container">
                        <label htmlFor="add-org">Организатор мероприятия</label>
                        <input
                            type="text"
                            id="add-org"
                            value={newEvent.organizer}
                            onChange={(e) => onChange({ ...newEvent, organizer: e.target.value })}
                        />
                    </div>
                    <div className="name-event-container">
                        <label htmlFor="add-image">Изображение</label>
                        <select
                            id="add-image"
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
                    </div>
                    <div className="name-event-container">
                        <label>Предпросмотр изображения</label>
                        {newEvent.image && (
                            <img
                                src={eventImages[newEvent.image]}
                                alt="Предпросмотр"
                                style={{ width: "50px", height: "50px", marginTop: "10px" }}
                            />
                        )}
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

export default AddModal;