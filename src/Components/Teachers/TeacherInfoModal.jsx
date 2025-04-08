import React from "react";

const TeacherInfoModal = ({ isOpen, onClose, onEdit, teacher }) => {
    if (!isOpen || !teacher) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Информация о преподавателе</h2>
                <div className="teacher-info">
                    <p>
                        <strong>ФИО:</strong> {teacher.lastName} {teacher.firstName} {teacher.middleName}
                    </p>
                    <p>
                        <strong>ПЦК:</strong> {teacher.department?.name || "Не указано"}
                    </p>
                </div>
                <div className="modal-buttons">
                    <button className="close-btn" onClick={onClose}>
                        Закрыть
                    </button>
                    <button className="save-btn" onClick={onEdit}>
                        Редактировать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherInfoModal;