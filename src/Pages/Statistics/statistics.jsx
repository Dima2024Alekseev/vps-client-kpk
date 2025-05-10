import React from "react";
import "./statistic.css";
import { Helmet } from "react-helmet";
import Header from "../../Components/Header/Header";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const data = [
//     { name: 'ИСиП', 'Статистика активности': 8 },
//     { name: 'Нач. кл.', 'Статистика активности': 6 },
//     { name: 'Дошкол.', 'Статистика активности': 4 },
//     { name: 'Физ. кул.', 'Статистика активности': 2 },
// ];

const Statistics = () => {
    return (
        <>
            <Helmet>
                <title>Статистика</title>
            </Helmet>
            <div className="statistic-page">
                <Header />
                {/* <div className="statistic-page-content">
                    <div className="stat-left-side">
                        <div className="filter-stat">
                            <div className="filter-stat-title">Фильтр по активности:</div>
                            <select name="" id="">
                                <option value="1">Все мероприятия</option>
                            </select>
                        </div>

                        <div className="filter-stat">
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
                        <BarChart
                            width={1250}
                            height={500}
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
                            <Bar dataKey="Статистика активности" fill="#1E3A8A" barSize={80} />
                        </BarChart>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default Statistics;