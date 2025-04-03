import React from "react";

const ViewModal = ({ isOpen, onClose, selectedEvent, eventImages }) => {
    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "active" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2 className="modal-title">Информация о мероприятии</h2>
                <div className="modal-form">
                    <div className="form-group">
                        <label className="form-label">Название мероприятия</label>
                        <div className="form-input" style={{ background: '#f9f9f9', padding: '12px 15px', borderRadius: '8px' }}>
                            {selectedEvent?.title}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Дата проведения</label>
                            <div className="form-input" style={{ background: '#f9f9f9', padding: '12px 15px', borderRadius: '8px' }}>
                                {selectedEvent?.date}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Время проведения</label>
                            <div className="form-input" style={{ background: '#f9f9f9', padding: '12px 15px', borderRadius: '8px' }}>
                                {selectedEvent?.time}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Место проведения</label>
                        <div className="form-input" style={{ background: '#f9f9f9', padding: '12px 15px', borderRadius: '8px' }}>
                            {selectedEvent?.place}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Организатор</label>
                        <div className="form-input" style={{ background: '#f9f9f9', padding: '12px 15px', borderRadius: '8px' }}>
                            {selectedEvent?.organizer}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Изображение</label>
                        {selectedEvent?.image && (
                            <img
                                src={eventImages[selectedEvent.image]}
                                alt="Изображение мероприятия"
                                className="image-preview"
                            />
                        )}
                    </div>
                </div>

                <div className="modal-buttons" style={{ marginTop: '30px' }}>
                    <button className="modal-button modal-button-secondary" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;