import React from "react";

const AddModal = ({ isOpen, onClose, newEvent, onChange, onSave, eventImages }) => {
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