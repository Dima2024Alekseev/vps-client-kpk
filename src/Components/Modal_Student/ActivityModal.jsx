import React from "react";
import filter from "../../img/studentPage/filter.svg";

const ActivityModal = ({ isOpen, onClose, onFilter }) => {
  if (!isOpen) return null;

  return (
    <div className="activity-modal-overlay">
      <h2>Активность студента</h2>
      <div className="activity-filters-container">
        <div className="name-event-container">
          <label>ФИО</label>
          <p>Алексеев Дмитрий Евгеньевич</p>
        </div>
        <div className="filter-icon-container" onClick={onFilter}>
          <img src={filter} alt="" />
        </div>
      </div>

      <div className="activity-chart-container">
        <canvas id="activityChart"></canvas>
      </div>
      <button className="close-btn" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
};

export default ActivityModal;