import React from "react";

const DeleteModal = ({ isOpen, onClose, selectedEvent, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "active" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Удаление мероприятия</h2>
                <div className="modal-form">
                    <p style={{ textAlign: 'center', margin: '20px 0' }}>
                        Вы уверены, что хотите удалить мероприятие<br />
                        <strong>"{selectedEvent?.title}"</strong>?
                    </p>
                </div>
                <div className="modal-buttons">
                    <button className="modal-button modal-button-danger" onClick={onConfirm}>
                        Удалить
                    </button>
                    <button className="modal-button modal-button-secondary" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;