import React from "react";
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
function Home() {
  return (
    <>

      <div class="home-page">
        <Header />
        <div class="home-page-content">
          <div class="home-page-content-left-side">
            <div class="user-profile">
              <div class="user-profile-left-side">
                <p class="greeting-container">Привет, медвед!</p>
                <p class="quote-container">Цитата</p>
              </div>
              <div class="user-profile-right-side">
                <img src={user} alt="user" />
              </div>
            </div>

            <div class="events-container">
              <div class="events-container-header">
                <div class="events-container-title">Мероприятия</div>

                <div class="events-tabs-container">
                  <div class="events-tab active">Все</div>
                  <div class="events-tab">Фильтры</div>
                </div>
              </div>
              <div class="events-items-container">
                <div class="events-item">
                  <div class="events-item-image-container">
                    <img src={reshot} alt="" />
                  </div>
                  <div class="events-item-title">
                    Второй Этап конкурса Студент года 2024
                  </div>
                  <div class="events-item-date-container">
                    <div>
                      <img src={clock} alt="" />
                    </div>
                    <div>04.03.2024</div>
                  </div>
                  <div class="events-item-button">Подробнее</div>
                </div>

                <div class="events-item">
                  <div class="events-item-image-container">
                    <img src={concert} alt="" />
                  </div>
                  <div class="events-item-title">
                    Концерт ко Дню Защитника Отечества
                  </div>
                  <div class="events-item-date-container">
                    <div>
                      <img src={clock} alt="" />
                    </div>
                    <div>22.02.2024</div>
                  </div>
                  <div class="events-item-button">Подробнее</div>
                </div>

                <div class="events-item">
                  <div class="events-item-image-container">
                    <img src={events} alt="" />
                  </div>
                  <div class="events-item-title">Квиз в честь Дня студента</div>
                  <div class="events-item-date-container">
                    <div>
                      <img src={clock} alt="" />
                    </div>
                    <div>25.01.2024</div>
                  </div>
                  <div class="events-item-button">Подробнее</div>
                </div>

                <div class="events-item">
                  <div class="events-item-image-container">
                    <img src={china} alt="" />
                  </div>
                  <div class="events-item-title">Дни китайской культуры</div>
                  <div class="events-item-date-container">
                    <div>
                      <img src={clock} alt="" />
                    </div>
                    <div>15.12.2023</div>
                  </div>
                  <div class="events-item-button">Подробнее</div>
                </div>

                <div class="events-item">
                  <div class="events-item-image-container">
                    <img src={events} alt="" />
                  </div>
                  <div class="events-item-title">Открытие шахматного клуба</div>
                  <div class="events-item-date-container">
                    <div>
                      <img src={clock} alt="" />
                    </div>
                    <div>08.12.2023</div>
                  </div>
                  <div class="events-item-button">Подробнее</div>
                </div>
              </div>
            </div>
          </div>

          <div class="home-page-content-right-side">
            <div class="home-page-content-right-side-header">
              <div class="search-container">
                <img src={search} alt="search" />
                <input type="text" class="search-input" />
              </div>
              <div class="home-page-content-right-side-header-item">
                <img src={bell} alt="bell" />
              </div>
              <div class="home-page-content-right-side-header-item">
                <img src={user_icon} alt="" />
                <img src={chevron} alt="" />
              </div>
            </div>

            <div class="home-page-cards-container">
              <div class="home-page-card">
                <div class="home-page-card-number">4</div>
                <div class="home-page-card-title">
                  меропрития будет в этом месяце
                </div>
              </div>
              <div class="home-page-card">
                <div class="home-page-card-number">4</div>
                <div class="home-page-card-title">
                  мероприятия прошло в этом месяце
                </div>
              </div>
            </div>

            <div class="home-page-statistic-container">
              <div class="title">Статистика активности отделений</div>
              <select>
                <option value="option 1">Сорт</option>
                <option value="option 1">Сорт 2</option>
                <option value="option 1">Сорт 3</option>
              </select>
              <div class="chart-container">
                <canvas id="activityChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home