import React from "react";
import "./index.css";
import { Helmet } from 'react-helmet';
import { Link } from "react-router";
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'ИСиП', 'Статистика активности': 8 },
  { name: 'Нач. кл.', 'Статистика активности': 6 },
  { name: 'Дошкол.', 'Статистика активности': 4 },
  { name: 'Физ. кул.', 'Статистика активности': 2 },
];

const Home = () => {
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
                <div className="events-item">
                  <div className="events-item-image-container">
                    <img src={reshot} alt="" />
                  </div>
                  <div className="events-item-title">
                    Второй Этап конкурса Студент года 2024
                  </div>
                  <div className="events-item-date-container">
                    <div>
                      <img src={clock} alt="" />
                    </div>
                    <div>04.03.2024</div>
                  </div>
                  <Link to="/calendar" className="events-item-button">Подробнее</Link>
                </div>
                <div className="events-item">
                  <div className="events-item-image-container">
                    <img src={concert} alt="" />
                  </div>
                  <div className="events-item-title">
                    Концерт ко Дню Защитника Отечества
                  </div>
                  <div className="events-item-date-container">
                    <div>
                      <img src={clock} alt="" />
                    </div>
                    <div>22.02.2024</div>
                  </div>
                  <Link to="/calendar" className="events-item-button">Подробнее</Link>
                </div>
                <div className="events-item">
                  <div className="events-item-image-container">
                    <img src={events} alt="" />
                  </div>
                  <div className="events-item-title">Квиз в честь Дня студента</div>
                  <div className="events-item-date-container">
                    <div>
                      <img src={clock} alt="" />
                    </div>
                    <div>25.01.2024</div>
                  </div>
                  <Link to="/calendar" className="events-item-button">Подробнее</Link>
                </div>
                <div className="events-item">
                  <div className="events-item-image-container">
                    <img src={china} alt="" />
                  </div>
                  <div className="events-item-title">Дни китайской культуры</div>
                  <div className="events-item-date-container">
                    <div>
                      <img src={clock} alt="" />
                    </div>
                    <div>15.12.2023</div>
                  </div>
                  <Link to="/calendar" className="events-item-button">Подробнее</Link>
                </div>
                <div className="events-item">
                  <div className="events-item-image-container">
                    <img src={events} alt="" />
                  </div>
                  <div className="events-item-title">Открытие шахматного клуба</div>
                  <div className="events-item-date-container">
                    <div>
                      <img src={clock} alt="" />
                    </div>
                    <div>08.12.2023</div>
                  </div>
                  <Link to="/calendar" className="events-item-button">Подробнее</Link>
                </div>
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
                  data={data}
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
    </>
  );
}

export default Home;