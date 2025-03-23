import React from "react";

const EditStudentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="edit-student-modal-overlay">
      <div className="edit-student-modal-content">
        <h2>Редактирование студента</h2>
        <div className="edit-student-form">
          <div className="edit-student-form-group">
            <label>ФИО</label>
            <input id="modal-edit-initials" type="text" value="" />
          </div>
          <div className="edit-student-form-group">
            <label>Группа</label>
            <input id="modal-edit-group" type="text" value="" />
          </div>
          <div className="edit-student-form-group">
            <label>Номер студенческого билета</label>
            <input id="modal-edit-ticket" type="text" value="" />
          </div>
          <div className="edit-student-form-group">
            <label>Специальность</label>
            <input id="modal-edit-specialty" type="text" value="" />
          </div>
        </div>

        <div className="edit-student-modal-buttons">
          <button className="save-btn" onClick={onClose}>
            Сохранить
          </button>
          <button className="close-btn" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;