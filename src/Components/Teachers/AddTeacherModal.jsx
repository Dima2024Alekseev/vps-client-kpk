import React, { useState, useEffect } from "react";

const AddTeacherModal = ({ isOpen, onClose, newTeacher, onChange, onSave, departments }) => {
    const initialTeacherState = {
        lastName: "",
        firstName: "",
        middleName: "",
        department: ""
    };

    const [localTeacher, setLocalTeacher] = useState(initialTeacherState);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            setLocalTeacher(newTeacher || initialTeacherState);
            setError("");
        }
    }, [isOpen, newTeacher]);

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

        setLocalTeacher(prev => ({
            ...prev,
            [name]: value
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

    const handleSave = () => {
        // Проверка обязательных полей
        if (!localTeacher.lastName || !localTeacher.firstName) {
            setError("Фамилия и имя обязательны для заполнения");
            return;
        }

        onSave(localTeacher);
        handleClose();
    };

    const handleClose = () => {
        setLocalTeacher(initialTeacherState);
        setError("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Добавить преподавателя</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label>Фамилия*</label>
                    <input
                        type="text"
                        name="lastName"
                        value={localTeacher.lastName}
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
                        value={localTeacher.firstName}
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
                        value={localTeacher.middleName}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className="form-group">
                    <label>ПЦК</label>
                    <select
                        name="department"
                        value={localTeacher.department}
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
                    <button className="close-btn" onClick={handleClose}>
                        Отмена
                    </button>
                    <button className="save-btn" onClick={handleSave}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTeacherModal;