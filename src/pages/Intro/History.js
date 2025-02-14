import React from "react";
import "../../styles/History.css";

const History = () => {
    const historyData = [
        {
            year: "2024",
            events: [
                {
                    date: "12.20",
                    content: "2024 정보보호 인재양성 교육사업 성과교류회 우수상 수상",
                },
                {
                    date: "11.23",
                    content: "제2회 SWLUG 내부 CTF 개최",
                },
                {
                    date: "11.09",
                    content: "2024 KUCIS 서경강 세미나 참여 및 발표",
                },
                {
                    date: "09.14",
                    content: "제1회 SWLUG X S! 연합세미나 개최 및 발표",
                },
                {
                    date: "07.10",
                    content: "정보보안의 날 기념 롯데월드 정보보안팀 기업탐방",
                },
                {
                    date: "06.13",
                    content: "CCA(전국사이버보안동아리연합) 파트너쉽 체결",
                },
                {
                    date: "05.28",
                    content: "SWLUG 종강세미나 개최",
                },
                {
                    date: "05.08",
                    content: "KT 정보보안 부서 소속 SWLUG 졸업생 특강",
                },
                {
                    date: "04.30",
                    content: "한국정보보호산업협회(KISIA) - KUCIS(대학정보보호동아리연합회) 선정",
                },
                {
                    date: "03.24",
                    content: "INCOGNITO 2024 참여 및 발표",
                },
                {
                    date: "03.02",
                    content: "제4회 서울여대 정보보안 연합 세미나 'SWU With 세미나' 주최 및 발표",
                },
            ],
        },
        {
            year: "2023",
            events: [
                {
                    date: "12.18",
                    content: "2023 KUCIS 대학정보보호동아리 지원사업 장려상 수상",
                },
                {
                    date: "11.12",
                    content: "제1회 SWLUG 내부 CTF 개최",
                },
                {
                    date: "09.16",
                    content: "제3회 서울여대 정보보안 연합 세미나 'SWU With 세미나' 주최 및 발표",
                },
                {
                    date: "09.02",
                    content: "2023 KUCIS 서경강 세미나 참여",
                },
                {
                    date: "08.31",
                    content: "Hspace 파트너 리그 CTF 참여",
                },
                {
                    date: "05.30",
                    content: "SWLUG 종강세미나 개최",
                },
                {
                    date: "05.09",
                    content: "한국정보보호산업협회(KISIA) - KUCIS(대학정보보호동아리연합회) 선정",
                },
                {
                    date: "03.25",
                    content: "INCOGNITO 2022 참여 및 발표 (수상)",
                },
                {
                    date: "03.17",
                    content: "Hspace 진로 세미나 참여",
                },
                {
                    date: "03.04",
                    content: "제 2회 서울여대 정보보안 연합 세미나 주최 및 발표",
                },
                {
                    date: "01.13",
                    content: "Hspace 파트너쉽 체결",
                }
            ],
        },
        {
            year: "2022",
            events: [
                {
                    date: "10.15",
                    content: "2022 KUCIS 서경강 세미나 참여 및 발표",
                },
                {
                    date: "05.30",
                    content: "SWLUG 종강세미나 개최",
                },
                {
                    date: "05.09",
                    content: "한국정보보호산업협회(KISIA) - KUCIS(대학정보보호동아리연합회) 선정",
                },
            ],
        },
        {
            year: "2021",
            events: [
                {
                    date: "08.27",
                    content: "INCOGNITO 2021 컨퍼런스 참여 및 발표",
                },
                {
                    date: "05.23",
                    content: "SWLUG 종강세미나 개최",
                },
                {
                    date: "05.09",
                    content: "한국정보보호산업협회(KISIA) - KUCIS(대학정보보호동아리연합회) 선정",
                },
            ],
        },
        {
            year: "2020",
            events: [
                {
                    date: "11.20",
                    content: "SWLUG 종강세미나 개최",
                },
                {
                    date: "08.21",
                    content: "INCOGNITO 2021 컨퍼런스 참여 및 발표",
                },
            ],
        },
        {
            year: "1999",
            events: [
                {
                    date: "03.02",
                    content: "슈러그 설립",
                },
            ],
        },
    ];

    return (
        <div className="history-wrap">
            {historyData.map((yearSection, index) => (
                <div className="history-section" key={index}>
                    <div className="year">{yearSection.year}</div>
                    <div className="line"></div>
                    <div className="events">
                        {yearSection.events.map((event, eventIndex) => (
                            <div className="event-item" key={eventIndex}>
                                <div className="date">{event.date}</div>
                                <div className="content">{event.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default History;