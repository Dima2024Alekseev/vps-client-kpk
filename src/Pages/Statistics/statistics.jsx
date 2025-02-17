import React from "react";
import "./statistic.css";
import { Helmet } from "react-helmet";
import Header from "../../Components/Header/Header";

const Statistics = () => {
    return (
        <>
            <Helmet>
                <title>Статистика</title>
            </Helmet>
            <div className="statistic-page">
                <Header />
                <div className="statistic-page-content">
                    <div className="stat-left-side">
                        <div className="filter-stat">
                            <div className="filter-stat-title">Фильтр по активности:</div>
                            <select name="" id="">
                                <option value="1">Все мероприятия</option>
                            </select>
                        </div>

                        <div
                            className="filter-stat"

                        >
                            <div className="filter-stat-title">Фильтр по интервалу:</div>
                            <div className="inputs-container">
                                <input type="date" />
                                <input type="date" />
                                <div className="stat-btn">Применить</div>
                            </div>
                        </div>

                        <div className="filter-stat">
                            <div className="filter-stat-title">Фильтр по отделениям:</div>
                            <select name="" id="">
                                <option value="1">Отделение</option>
                            </select>
                        </div>

                        <div className="filter-stat">
                            <div className="filter-stat-title">Фильтр по отделениям:</div>
                            <select name="" id="">
                                <option value="1">Группа</option>
                            </select>
                        </div>
                    </div>

                    <div className="chart-container">
                        <canvas id="activityChart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Statistics;