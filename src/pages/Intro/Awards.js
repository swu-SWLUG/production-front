import React from "react";
import "../../styles/Awards.css";

const Awards = () => {
    const awardsData = [
        {
            year: "2024",
            events: [
                "12월 - 국민안전발명챌린지 우수상, 서울여대 개인정보보호 경진대회 대상",
                "11월 - 생성형 AI의 개인정보 수집 국제 규제 비교 연구, 금융보안아카데미 2024 최우수상, 신한 AI 아이디어톤 최우수상, \nVDI와 다층보안체계의 해외 사례 분석 연구",
                "10월 - STRIDE 기반 '실내 자율 주행 로봇' 보안 요구사항 도출",
                "8월 - 트라우마 방지를 위한 사고 영상 탐지기 개발 연구",
                "7월 - 2024 한국컴퓨터종합학술대회 학부생/주니어 논문경진대회 최우수상, 개인정보 유출 가능성 판단 웹 취약점 분석 \n프로그램 개발",
                "6월 - 영상 필터링 이동 거리 분석 기반 교통사고 탐지 연구, SaaS 보안 위협과 MITRE ATT&CK 기반 자동화 매핑 연구",
                "5월 - APT Group Hash Unit Profiling Framework 개발",
                "3월 - 2024년 개인정보보호/보안 정책 아이디어 공모전 최우수상",
                "2월 - 인공지능윤리아이디어 경진대회 SKT대표이사상",
                "1월 - SW창의캠프 대학생 봉사단 CJ UNIT 9기 최우수봉사자, BEST 팀워크"
            ]
        },
        {
            year: "2023",
            events: [
                "12월 - 서울여대 종단형 PBL4 팀프로젝트 발표회 우수상/최우수상, 한국시뮬레이션학회 추계학술대회 학부생 논문 발표 \n경진대회 은상",
                "9월 - 생활 속 개인정보 침해요인 발굴 및 개선 한국디자인진흥원상, 2023 Girls Unicorn Contest 대상",
                "6월 - 메타버스 환경 프라이버시 침해 행위 자동 탐지 모델 연구, 웹 사이트 개인정보보호법 기반 프로그램 개발",
                "5월 - Girls in ICT 2023 Hackathon Best Award, 블록체인 기반 티켓 거래 시스템 개발",
                "4월 - 캐시 관리 시스템 취약점 분석 연구",
                "2월 - 삼성 청년 SW 아카데미 우수상",
                "1월 - 인공지능 활용 웹 취약점 자동화 진단 프레임워크 개발"
            ]
        },
        {
            year: "2022",
            events: [
                "12월 - 2022년 월드프렌즈코리아 ICT봉사단 우수상",
                "11월 - 2022년 추계학술대회 논문 발표 장려상",
                "10월 - 2022 코드몬럽 찾아가는 SW교육기부단 우수상",
                "8월 - Super Hackathon 최우수상",
                "6월 - 제1회 개인정보위험대응공모전 최우수상"
            ]
        },
        {
            year: "2021",
            events: [
                "7월 - SW 중심대학공동해커톤 특별상",
                "5월 - 2021년 춘계학술발표대회 논문경진대회 은상"
            ]
        },
        {
            year: "2019",
            events: [
                "11월 - 한국 IT 서비스학회 추계학술대회 대학생 논문, 졸업작품 공모전 최우수상, NET 챌린지 캠프 2019 챌린지리그 은상, 특별상,\n k-사이버 시큐리티 챌린지 AI 기반 네트워크 위협 탐지 트랙 1위",
                "1월 - 성균관대-서울과학기술대-한성대-서울여대 연합 융합기초프로젝트 성과발표회 서울시지역사회 공헌상"
            ]
        },
        {
            year: "2018",
            events: [
                "11월 - O-Prize 아이디어 공모전 골든티켓상, 여성공학인 공학드라마 공모전 대상"
            ]
        }
    ];

    return (
        <div className="security-awards-container">
            {awardsData.map((item, index) => (
                <div key={index} className="security-awards-section">
                    <h2 className="security-awards-year">{item.year}</h2>
                    <div className="security-awards-list">
                        {item.events.map((event, idx) => (
                            <div key={idx} className="security-awards-item">
                                {event}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Awards;