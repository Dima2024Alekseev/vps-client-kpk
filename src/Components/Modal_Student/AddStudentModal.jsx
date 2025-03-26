import React from "react";

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
  if (!isOpen) return null;

  // Находим выбранное направление
  const selectedDirection = directions.find((dir) => dir._id === selectedSpecialty);

  // Фильтруем группы, связанные с выбранным направлением
  const filteredGroups = selectedDirection
    ? groups.filter((group) => selectedDirection.groups.includes(group._id))
    : groups;

  // Сортируем группы по возрастанию (по имени)
  const sortedGroups = filteredGroups.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="add-student-modal-overlay">
      <div className="add-student-modal-content">
        <h2>Добавить студента</h2>
        <div className="add-student-form">
          <div className="add-student-form-group">
            <label>Фамилия</label>
            <input
              type="text"
              name="lastName"
              value={newStudent.lastName || ""}
              onChange={onChange}
              required
            />
          </div>
          <div className="add-student-form-group">
            <label>Имя</label>
            <input
              type="text"
              name="firstName"
              value={newStudent.firstName || ""}
              onChange={onChange}
              required
            />
          </div>
          <div className="add-student-form-group">
            <label>Отчество</label>
            <input
              type="text"
              name="middleName"
              value={newStudent.middleName || ""}
              onChange={onChange}
            />
          </div>
          <div className="add-student-form-group">
            <label>Специальность</label>
            <select
              name="specialty"
              value={newStudent.specialty}
              onChange={onChange}
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
            <label>Группа</label>
            <select
              name="group"
              value={newStudent.group}
              onChange={onChange}
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
            <label>Номер студенческого билета</label>
            <input
              type="text"
              name="studentId"
              value={newStudent.studentId}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="add-student-modal-buttons">
          <button className="save-btn" onClick={onSave}>
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

export default AddStudentModal;