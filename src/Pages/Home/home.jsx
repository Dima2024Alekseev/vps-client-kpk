import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import "./index.css";
import Header from "../../Components/Header/Header";
import user from "../../img/user.svg";
import search from "../../img/search-icon.svg";
import reshot from "../../img/reshot-icon-student.svg";
import clock from "../../img/clock.svg";
import concert from "../../img/online_concert_interaction.svg";
import events from "../../img/calendar_event_star.svg";
import china from "../../img/china_flag_icon.svg";
import bell from "../../img/bell-icon.svg";
import user_icon from "../../img/user-icon.svg";
import chevron from "../../img/chevron-down.svg";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { EventsContext } from "../../Components/EventsContext";
import ViewModal from "../../Components/Calendar/ViewModal";

const Home = () => {
  const { eventsData } = useContext(EventsContext);
  const [viewModalOpen, setViewModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна
  const [selectedEvent, setSelectedEvent] = useState(null); // Состояние для хранения выбранного мероприятия

  const eventImages = {
    "reshot-icon-student.svg": reshot,
    "online_concert_interaction.svg": concert,
    "calendar_event_star.svg": events,
    "china_flag_icon.svg": china,
  };

  // Функция для открытия модального окна
  const handleViewClick = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      <div className="home-page">
        <Header />
        <div className="home-page-content">
          <div className="home-page-content-left-side">
            <div className="user-profile">
              <div className="user-profile-left-side">
                <div>
                  <h1 className="greeting-container">Привет, медвед!</h1>
                </div>
                <div>
                  <p className="quote-container">Цитата</p>
                </div>
              </div>
              <div className="user-profile-right-side">
                <img src={user} alt="user" />
              </div>
            </div>

            <div className="events-container">
              <div className="events-container-header">
                <div className="events-container-title">Мероприятия</div>
                <div className="events-tabs-container">
                  <div className="events-tab active">Все</div>
                  <div className="events-tab">Фильтры</div>
                </div>
              </div>
              <div className="events-items-container">
                {eventsData.map((event) => (
                  <div className="events-item" key={event._id}>
                    <div className="events-item-image-container">
                      <img src={eventImages[event.image]} alt="" />
                    </div>
                    <div className="events-item-title">{event.title}</div>
                    <div className="events-item-date-container">
                      <div>
                        <img src={clock} alt="" />
                      </div>
                      <div>{event.date}</div>
                    </div>
                    <div
                      className="events-item-button"
                      onClick={() => handleViewClick(event)} // Обработчик для открытия модального окна
                    >
                      Подробнее
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="home-page-content-right-side">
            <div className="home-page-content-right-side-header">
              <div className="search-container">
                <img src={search} alt="search" />
                <input type="text" className="search-input" />
              </div>
              <div className="home-page-content-right-side-header-item">
                <img src={bell} alt="bell" />
              </div>
              <div className="home-page-content-right-side-header-item">
                <img src={user_icon} alt="" />
                <img src={chevron} alt="" />
              </div>
            </div>
            <div className="home-page-cards-container">
              <div className="home-page-card">
                <div className="home-page-card-number">4</div>
                <div className="home-page-card-title">
                  мероприятия будет в этом месяце
                </div>
              </div>
              <div className="home-page-card">
                <div className="home-page-card-number">4</div>
                <div className="home-page-card-title">
                  мероприятия прошло в этом месяце
                </div>
              </div>
            </div>
            <div className="home-page-statistic-container">
              <div className="title">Статистика активности отделений</div>
              <select>
                <option value="option 1">Сорт</option>
                <option value="option 2">Сорт 2</option>
                <option value="option 3">Сорт 3</option>
              </select>
              <div className="chart-container">
                <BarChart
                  width={500}
                  height={400}
                  data={[
                    { name: "ИСиП", "Статистика активности": 8 },
                    { name: "Нач. кл.", "Статистика активности": 6 },
                    { name: "Дошкол.", "Статистика активности": 4 },
                    { name: "Физ. кул.", "Статистика активности": 2 },
                  ]}
                  margin={{
                    top: 10, right: -20, left: -20, bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="15 0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Статистика активности" fill="#1E3A8A" barSize={60} />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно для просмотра информации о мероприятии */}
      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        selectedEvent={selectedEvent}
        eventImages={eventImages}
      />
    </>
  );
};

export default Home;