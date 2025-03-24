import React, { useState, useEffect } from "react";
import "../../Pages/Students/student.css";

const EditStudentModal = ({ isOpen, onClose, student, onSave, groups, directions }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    group: "",
    studentId: "",
    specialty: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName || "",
        group: student.group?._id || "",
        studentId: student.studentId || "",
        specialty: student.specialty?._id || ""
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(""); // Сбрасываем ошибку при изменении поля
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация
    if (!formData.fullName || !formData.group || !formData.studentId || !formData.specialty) {
      setError("Все поля обязательны для заполнения");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
      setError(err.message || "Произошла ошибка при сохранении");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редактирование студента</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ФИО</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Группа</label>
            <select
              name="group"
              value={formData.group}
              onChange={handleChange}
              required
            >
              <option value="">Выберите группу</option>
              {groups.map(group => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Номер студенческого билета</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Специальность</label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
            >
              <option value="">Выберите специальность</option>
              {directions.map(direction => (
                <option key={direction._id} value={direction._id}>
                  {direction.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-buttons">
            <button
              type="button"
              className="close-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Закрыть
            </button>
            <button
              type="submit"
              className="save-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;