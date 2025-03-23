import React from "react";

const StudentInfoModal = ({ isOpen, onClose, onEdit, onActivity }) => {
  if (!isOpen) return null;

  return (
    <div className="student-info-modal-overlay">
      <div className="student-info-modal-content">
        <h2>Информация о студенте</h2>
        <div className="student-info-form">
          <div className="student-info-form-group">
            <label>ФИО</label>
            <p id="modal-initials"></p>
          </div>
          <div className="student-info-form-group">
            <label>Группа</label>
            <p id="modal-group"></p>
          </div>
          <div className="student-info-form-group">
            <label>Номер студенческого билета</label>
            <p id="modal-ticket"></p>
          </div>
          <div className="student-info-form-group">
            <label>Специальность</label>
            <p id="modal-specialty"></p>
          </div>
        </div>

        <div className="student-info-modal-buttons">
          <button className="edit-btn" onClick={onEdit}>
            Изменить
          </button>
          <button className="activity-btn" onClick={onActivity}>
            Активность
          </button>
          <button className="close-btn" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoModal;