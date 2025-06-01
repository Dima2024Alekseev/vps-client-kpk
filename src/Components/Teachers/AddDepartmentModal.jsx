// src/Components/Departments/AddDepartmentModal.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddDepartmentModal = ({ isOpen, onClose, newDepartment, onChange, onSave }) => {
  const initialDepartmentState = {
    name: "",
    description: ""
  };

  const [localDepartment, setLocalDepartment] = useState(initialDepartmentState);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setLocalDepartment(newDepartment || initialDepartmentState);
      setError("");
    }
  }, [isOpen, newDepartment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalDepartment(prev => ({
      ...prev,
      [name]: value
    }));
    onChange(e);
  };

  const handleSave = () => {
    if (!localDepartment.name) {
      setError("Название ПЦК обязательно для заполнения");
      return;
    }

    onSave(localDepartment);
    toast.success("ПЦК успешно добавлена!");
    handleClose();
  };

  const handleClose = () => {
    setLocalDepartment(initialDepartmentState);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Добавить ПЦК</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Название ПЦК*</label>
          <input
            type="text"
            name="name"
            value={localDepartment.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Описание</label>
          <textarea
            name="description"
            value={localDepartment.description}
            onChange={handleChange}
          />
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

export default AddDepartmentModal;
