import React from "react";

const ViewModal = ({ isOpen, onClose, selectedEvent, eventImages }) => {
    if (!isOpen) return null;

    return (
        <div id="view-modal" className="modal active" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 id="view-modal-title">Информация о мероприятии</h2>
                <div className="form">
                    <div className="name-event-container">
                        <label>Название мероприятия</label>
                        <p>{selectedEvent?.title}</p>
                    </div>
                    <div className="inputs-container">
                        <div className="name-event-container">
                            <label>Дата проведения</label>
                            <p>{selectedEvent?.date}</p>
                        </div>
                        <div className="name-event-container">
                            <label>Время проведения</label>
                            <p>{selectedEvent?.time}</p>
                        </div>
                    </div>
                    <div className="name-event-container">
                        <label>Место проведения</label>
                        <p>{selectedEvent?.place}</p>
                    </div>
                    <div className="name-event-container">
                        <label>Организатор мероприятия</label>
                        <p>{selectedEvent?.organizer}</p>
                    </div>
                    <div className="name-event-container">
                        <label>Изображение</label>
                        <img
                            src={eventImages[selectedEvent?.image]}
                            alt="Изображение мероприятия"
                            style={{ width: "50px", height: "50px", marginTop: "10px" }}
                        />
                    </div>
                </div>
                <button id="close-button" onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default ViewModal;