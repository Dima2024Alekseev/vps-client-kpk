import React from "react";

const EditTeacherModal = ({ isOpen, onClose, teacher, onSave, departments }) => {
    const [editedTeacher, setEditedTeacher] = React.useState(teacher || {});

    React.useEffect(() => {
        setEditedTeacher(teacher || {});
    }, [teacher]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTeacher(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSave(editedTeacher);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Редактировать преподавателя</h2>
                <div className="form-group">
                    <label>Фамилия</label>
                    <input
                        type="text"
                        name="lastName"
                        value={editedTeacher.lastName || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Имя</label>
                    <input
                        type="text"
                        name="firstName"
                        value={editedTeacher.firstName || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Отчество</label>
                    <input
                        type="text"
                        name="middleName"
                        value={editedTeacher.middleName || ""}
                        onChange={handleChange}
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