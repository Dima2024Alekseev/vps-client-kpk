import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiSave, FiPlus } from "react-icons/fi";

const ManageDepartmentModal = ({ isOpen, onClose, departments, onEdit, onDelete, onSave }) => {
  const [localDepartments, setLocalDepartments] = useState(departments);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [newDepartment, setNewDepartment] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setLocalDepartments(departments);
  }, [departments]);

  const handleEdit = (department) => {
    setEditingDepartment({ ...department });
    setIsAdding(false);
  };

  const handleDelete = async (departmentId) => {
    if (window.confirm("Вы уверены, что хотите удалить этот ПЦК?")) {
      try {
        await onDelete(departmentId);
        toast.success("ПЦК успешно удалён!");
      } catch (err) {
        setError("Ошибка при удалении ПЦК");
      }
    }
  };

  const handleSave = async () => {
    if (!editingDepartment.name.trim()) {
      setError("Название ПЦК обязательно");
      return;
    }

    try {
      await onSave(editingDepartment);
      setEditingDepartment(null);
      toast.success("ПЦК успешно сохранён!");
      setError("");
    } catch (err) {
      setError("Ошибка при сохранении ПЦК");
    }
  };

  const handleAdd = async () => {
    if (!newDepartment.name.trim()) {
      setError("Название ПЦК обязательно");
      return;
    }

    try {
      await onSave(newDepartment);
      setNewDepartment({ name: "", description: "" });
      setIsAdding(false);
      toast.success("ПЦК успешно добавлен!");
      setError("");
    } catch (err) {
      setError("Ошибка при добавлении ПЦК");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingDepartment) {
      setEditingDepartment(prev => ({ ...prev, [name]: value }));
    } else {
      setNewDepartment(prev => ({ ...prev, [name]: value }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="department-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Управление ПЦК</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="department-actions">
          <button
            className={`add-btn ${isAdding ? 'cancel-btn' : ''}`}
            onClick={() => {
              setIsAdding(!isAdding);
              setEditingDepartment(null);
            }}
          >
            {isAdding ? "Отмена" : <><FiPlus size={18} /> Добавить ПЦК</>}
          </button>
        </div>

        {isAdding && (
          <div className="department-form">
            <div className="form-group">
              <label>Название ПЦК</label>
              <input
                type="text"
                name="name"
                value={newDepartment.name}
                onChange={handleChange}
                placeholder="Введите название"
              />
            </div>
            <div className="form-group">
              <label>Описание</label>
              <textarea
                name="description"
                value={newDepartment.description}
                onChange={handleChange}
                placeholder="Введите описание (необязательно)"
                rows={3}
              />
            </div>
            <button className="save-btn" onClick={handleAdd}>
              <FiSave size={18} /> Сохранить
            </button>
          </div>
        )}

        <div className="departments-list">
          {localDepartments.length === 0 ? (
            <div className="no-departments">Нет доступных ПЦК</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Название</th>
                  <th style={{ width: '60%' }}>Описание</th>
                  <th style={{ width: '15%' }}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {localDepartments.map(department => (
                  <tr key={department._id}>
                    <td>
                      {editingDepartment?._id === department._id ? (
                        <input
                          type="text"
                          name="name"
                          value={editingDepartment.name}
                          onChange={handleChange}
                        />
                      ) : (
                        <span className="department-name">{department.name}</span>
                      )}
                    </td>
                    <td className="description-cell">
                      {editingDepartment?._id === department._id ? (
                        <textarea
                          name="description"
                          value={editingDepartment.description}
                          onChange={handleChange}
                          rows={2}
                        />
                      ) : (
                        <span className="department-description">
                          {department.description || "—"}
                        </span>
                      )}
                    </td>
                    <td className="actions-cell">
                      {editingDepartment?._id === department._id ? (
                        <button className="save-btn" onClick={handleSave}>
                          <FiSave size={16} /> Сохранить
                        </button>
                      ) : (
                        <>
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(department)}
                            title="Редактировать"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(department._id)}
                            title="Удалить"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="modal-footer">
          <button className="close-button" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageDepartmentModal;