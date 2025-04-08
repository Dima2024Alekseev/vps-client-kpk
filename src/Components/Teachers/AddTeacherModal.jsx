import React from "react";

const AddTeacherModal = ({ isOpen, onClose, newTeacher, onChange, onSave, departments }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Добавить преподавателя</h2>
                <div className="form-group">
                    <label>Фамилия</label>
                    <input
                        type="text"
                        name="lastName"
                        value={newTeacher.lastName}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Имя</label>
                    <input
                        type="text"
                        name="firstName"
                        value={newTeacher.firstName}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Отчество</label>
                    <input
                        type="text"
                        name="middleName"
                        value={newTeacher.middleName}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>ПЦК</label>
                    <select
                        name="department"
                        value={newTeacher.department}
                        onChange={onChange}
                    >
                        <option value="">Выберите ПЦК</option>
                        {departments.map((department) => (
                            <option key={department._id} value={department._id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="modal-buttons">
                    <button className="close-btn" onClick={onClose}>
                        Отмена
                    </button>
                    <button className="save-btn" onClick={onSave}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTeacherModal;