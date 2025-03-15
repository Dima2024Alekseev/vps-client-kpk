import React from "react";

const DeleteModal = ({ isOpen, onClose, selectedEvent, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div id="delete-modal" className="modal active" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 id="delete-modal-title">Удаление мероприятия</h2>
                <p>Вы уверены, что хотите удалить мероприятие <br />"{selectedEvent?.title}"?</p>
                <div className="modal-buttons">
                    <button id="confirm-delete-button" onClick={onConfirm}>
                        Удалить
                    </button>
                    <button id="cancel-delete-button" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;