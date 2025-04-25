import React, { useState, useEffect } from "react";

const EditTeacherModal = ({ isOpen, onClose, teacher, onSave, departments }) => {
    const [editedTeacher, setEditedTeacher] = useState(teacher || {});
    const [error, setError] = useState("");

    useEffect(() => {
        setEditedTeacher(teacher || {});
        setError("");
    }, [teacher]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Проверка для полей ФИО
        if (name === "lastName" || name === "firstName" || name === "middleName") {
            if (!/^[А-Яа-яЁё\s]*$/.test(value)) {
                setError("ФИО может содержать только русские буквы");
                return;
            }
            setError("");
        }

        setEditedTeacher(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleKeyPress = (e) => {
        // Блокировка недопустимых символов при вводе (только для ФИО)
        const name = e.target.name;
        if (name === "lastName" || name === "firstName" || name === "middleName") {
            if (!/^[А-Яа-яЁё\s]$/.test(e.key)) {
                e.preventDefault();
            }
        }
    };

    const handleSubmit = () => {
        // Проверка обязательных полей
        if (!editedTeacher.lastName || !editedTeacher.firstName) {
            setError("Фамилия и имя обязательны для заполнения");
            return;
        }

        onSave(editedTeacher);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Редактировать преподавателя</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label>Фамилия*</label>
                    <input
                        type="text"
                        name="lastName"
                        value={editedTeacher.lastName || ""}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Имя*</label>
                    <input
                        type="text"
                        name="firstName"
                        value={editedTeacher.firstName || ""}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Отчество</label>
                    <input
                        type="text"
                        name="middleName"
                        value={editedTeacher.middleName || ""}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className="form-group">
                    <label>ПЦК</label>
                    <select
                        name="department"
                        value={editedTeacher.department?._id || editedTeacher.department || ""}
                        onChange={handleChange}
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
                    <button className="save-btn" onClick={handleSubmit}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTeacherModal;