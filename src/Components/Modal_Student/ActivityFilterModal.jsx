import React from "react";

const ActivityFilterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="activity-filter-modal-overlay">
      <h2>Фильтры</h2>
      <div className="activity-filter-item">
        <div className="container">Фильтр по активности:</div>
        <select>
          <option>Все мероприятия</option>
        </select>
      </div>
      <div className="activity-filter-item">
        <div className="container">Фильтр по интервалу:</div>
        <div>
          <input type="date" id="dateInput" name="date" />
          <input type="date" id="dateInput" name="date" />
        </div>
      </div>

      <button className="close-btn" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
};

export default ActivityFilterModal;