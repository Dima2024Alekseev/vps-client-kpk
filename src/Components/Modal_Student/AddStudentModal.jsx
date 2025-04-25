import React, { useState, useEffect } from "react";

const AddStudentModal = ({
  isOpen,
  onClose,
  newStudent,
  onChange,
  onSave,
  groups,
  specialties,
  selectedSpecialty,
  directions,
}) => {
  const [error, setError] = useState("");
  const [localStudent, setLocalStudent] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    specialty: "",
    group: "",
    studentId: ""
  });

  // Синхронизируем локальное состояние с пропсами при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      setLocalStudent(newStudent || {
        lastName: "",
        firstName: "",
        middleName: "",
        specialty: "",
        group: "",
        studentId: ""
      });
    }
  }, [isOpen, newStudent]);

  // Находим выбранное направление
  const selectedDirection = directions.find((dir) => dir._id === selectedSpecialty);

  // Фильтруем группы, связанные с выбранным направлением
  const filteredGroups = selectedDirection
    ? groups.filter((group) => selectedDirection.groups.includes(group._id))
    : groups;

  // Сортируем группы по возрастанию (по имени)
  const sortedGroups = filteredGroups.sort((a, b) => a.name.localeCompare(b.name));

  // Функция для предотвращения ввода недопустимых символов
  const preventInvalidInput = (event) => {
    if (!/^[А-Яа-я\s]*$/.test(event.key)) {
      event.preventDefault();
    }
  };

  // Обработчик изменений
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Проверка на наличие недопустимых символов
    if (name === "lastName" || name === "firstName" || name === "middleName") {
      if (!/^[А-Яа-я\s]*$/.test(value)) {
        setError("Имя, фамилия и отчество могут содержать только русские буквы и пробелы");
        return;
      }
    }

    setLocalStudent(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSave = () => {
    // Валидация перед сохранением
    if (!localStudent.lastName || !localStudent.firstName || !localStudent.specialty ||
      !localStudent.group || !localStudent.studentId) {
      setError("Заполните все обязательные поля");
      return;
    }

    onSave(localStudent);
    handleClose();
  };

  const handleClose = () => {
    // Сбрасываем форму к начальным значениям
    setLocalStudent({
      lastName: "",
      firstName: "",
      middleName: "",
      specialty: "",
      group: "",
      studentId: ""
    });
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-student-modal-overlay" onClick={handleClose}>
      <div className="add-student-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Добавить студента</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="add-student-form">
          {/* Все поля формы используют localStudent */}
          <div className="add-student-form-group">
            <label>Фамилия*</label>
            <input
              type="text"
              name="lastName"
              value={localStudent.lastName}
              onChange={handleChange}
              onKeyPress={preventInvalidInput}
              required
            />
          </div>
          <div className="add-student-form-group">
            <label>Имя*</label>
            <input
              type="text"
              name="firstName"
              value={localStudent.firstName}
              onChange={handleChange}
              onKeyPress={preventInvalidInput}
              required
            />
          </div>
          <div className="add-student-form-group">
            <label>Отчество</label>
            <input
              type="text"
              name="middleName"
              value={localStudent.middleName}
              onChange={handleChange}
              onKeyPress={preventInvalidInput}
            />
          </div>
          <div className="add-student-form-group">
            <label>Специальность*</label>
            <select
              name="specialty"
              value={localStudent.specialty}
              onChange={handleChange}
              required
            >
              <option value="">Выберите специальность</option>
              {specialties.map((specialty) => (
                <option key={specialty._id} value={specialty._id}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-student-form-group">
            <label>Группа*</label>
            <select
              name="group"
              value={localStudent.group}
              onChange={handleChange}
              required
            >
              <option value="">Выберите группу</option>
              {sortedGroups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-student-form-group">
            <label>Номер студенческого билета*</label>
            <input
              type="text"
              name="studentId"
              value={localStudent.studentId}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="add-student-modal-buttons">
          <button className="save-btn" onClick={handleSave}>
            Сохранить
          </button>
          <button className="close-btn" onClick={handleClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;