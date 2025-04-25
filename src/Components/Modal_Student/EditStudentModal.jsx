import React, { useState, useEffect } from "react";
import "../../Pages/Students/student.css";

const EditStudentModal = ({ isOpen, onClose, student, onSave, groups, directions }) => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    group: "",
    studentId: "",
    specialty: ""
  });

  const [initialData, setInitialData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (student) {
      const nameParts = student.fullName ? student.fullName.split(" ") : [];
      const newFormData = {
        lastName: student.lastName || nameParts[0] || "",
        firstName: student.firstName || nameParts[1] || "",
        middleName: student.middleName || nameParts.slice(2).join(" ") || "",
        group: student.group?._id || "",
        studentId: student.studentId || "",
        specialty: student.specialty?._id || ""
      };

      setFormData(newFormData);
      setInitialData(newFormData);
    }
  }, [student]);

  const handleClose = () => {
    setFormData(initialData);
    setError("");
    onClose();
  };

  const preventInvalidInput = (event) => {
    if (!/^[А-Яа-я\s]*$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lastName" || name === "firstName" || name === "middleName") {
      if (!/^[А-Яа-я\s]*$/.test(value)) {
        setError("Имя, фамилия и отчество могут содержать только русские буквы и пробелы");
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.lastName || !formData.firstName || !formData.group || !formData.studentId || !formData.specialty) {
      setError("Обязательные поля: Фамилия, Имя, Группа, Номер билета, Специальность");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSave(formData);
      handleClose();
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
            <label>Фамилия*</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onKeyPress={preventInvalidInput}
              required
            />
          </div>
          <div className="form-group">
            <label>Имя*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onKeyPress={preventInvalidInput}
              required
            />
          </div>
          <div className="form-group">
            <label>Отчество</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              onKeyPress={preventInvalidInput}
            />
          </div>
          <div className="form-group">
            <label>Группа*</label>
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
            <label>Номер студенческого билета*</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Специальность*</label>
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
              onClick={handleClose}
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