import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../../styles/ApplyPage.css';

const ApplyPage = () => {
    const [isApplyPeriod, setIsApplyPeriod] = useState('');
    const [activeTab, setActiveTab] = useState('first');

    useEffect(() => {
        axios.get('/api/apply')
            .then(res => setIsApplyPeriod(res.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <div
            className="apply-page container mx-auto min-h-screen"
            style={{
                backgroundImage: 'url(/apply_back.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <h1 className="apply-title text-3xl font-bold text-center mb-6" style={{ fontSize: '24px' }}>지원</h1>
            <div className="apply-content">
                <img src="/img/Logo4.png" alt="SWLUG" className="apply-logo mx-auto" />
                {isApplyPeriod ? (
                    <>
                        <p className="apply-description text-center">
                            서울여자대학교 정보보호학과 소학회 SWLUG에서 29기 신입학회를 모집합니다.
                        </p>
                        <p className="apply-period text-center text-lg">모집 기간: ~ 2025.03.07 (금)</p>
                        <div className="apply-buttons">
                            <a href="/intro" className="apply-button learn-more">
                                SWLUG에 대해 자세히 알아보기
                            </a>
                            <a
                                href="https://forms.gle/7nUrRZkW2zkym3a5A"
                                className="apply-button apply-now"
                                target="_blank" rel="noopener"
                            >
                                [1학년] SWLUG 신입 학회원 지원하러 가기
                            </a>
                            <a
                                href="https://forms.gle/uWbcV9BrHdS7JzSs9"
                                className="apply-button apply-now"
                                target="_blank" rel="noopener"
                            >
                                [2학년] SWLUG 신입 학회원 지원하러 가기
                            </a>
                        </div>
                        <section className="additional-info">
                            <h2 className="info-title font-semibold text-center mt-8">지원 대상</h2>
                            <p className="info-text text-center">
                                - 서울여자대학교 정보보호학부 소속 1학년, 2학년 학우
                                <br/>
                                - 정보보호학과(사이버보안/개인정보보호)가 본/부전공인 학우
                                <br/>
                                - 정보보호학부 전공 선택 예정인 자율전공 학부생 지원 가능
                            </p>
                            <div className="divider mx-auto"></div>
                            <h2 className="info-title text-2xl font-semibold text-center mt-8">지원 일정</h2>
                            <ul className="info-list text-center">
                                <li>(1차) 서류 모집 기간: 2025년 2월 24일 (월) - 3월 7일 (금)</li>
                                <li>서류 합격자 발표: 2025년 3월 9일 (일)</li><br/>
                                <li>(2차) 면접: 2025년 3월 13일 (목) - 3월 14일 (금)</li>
                                <li>최종 합격자 발표: 2024년 3월 15일 (토)</li>
                            </ul>
                            <div className="divider"></div>
                            <div className="curriculum-box">
                                <h2 className="info-title text-2xl font-semibold text-center">2025학년도 교육 커리큘럼</h2>
                                <div className="tab-container">
                                    <div className="tab-nav">
                                        <div className="tab-list">
                                            <div
                                                onClick={() => setActiveTab('first')}
                                                className={`tab-item ${activeTab === 'first' ? 'active' : ''}`}
                                            >
                                                1학년 커리큘럼
                                            </div>
                                            <div
                                                onClick={() => setActiveTab('second')}
                                                className={`tab-item ${activeTab === 'second' ? 'active' : ''}`}
                                            >
                                                2학년 커리큘럼
                                            </div>
                                            <div
                                                onClick={() => setActiveTab('etc')}
                                                className={`tab-item ${activeTab === 'etc' ? 'active' : ''}`}
                                            >
                                                기타 활동
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-content">
                                        {activeTab === 'first' && (
                                            <div className="tab-panel">
                                                <div className="curriculum-card">
                                                    <h3 className="card-title">1학기 활동</h3>
                                                    <p className="card-description">• 파이썬 교육</p>
                                                    <p className="card-description">• 리눅스 스터디</p>
                                                    <p className="card-description">• 카드뉴스 제작 & 뉴스 스터디</p>
                                                    <p className="card-description">• 알고리즘 문제풀이</p>
                                                    <p className="card-description">• 1학기 중간 세미나</p>
                                                </div>
                                                <div className="curriculum-card">
                                                    <h3 className="card-title">2학기 활동</h3>
                                                    <p className="card-description">• 웹해킹 기초 교육</p>
                                                    <p className="card-description">• 주제별 스터디</p>
                                                    <p className="card-description">• 카드뉴스 제작 & 뉴스 스터디</p>
                                                    <p className="card-description">• 알고리즘 문제풀이</p>
                                                </div>
                                            </div>
                                        )}
                                        {activeTab === 'second' && (
                                            <div className="tab-panel">
                                                <div className="curriculum-card">
                                                    <h3 className="card-title">1학기 활동</h3>
                                                    <p className="card-description">• 웹해킹/CTF 문제풀이</p>
                                                    <p className="card-description">• 리눅스 활용 프로젝트</p>
                                                    <p className="card-description">• 논문 분석 스터디</p>
                                                </div>
                                                <div className="curriculum-card">
                                                    <h3 className="card-title">2학기 활동</h3>
                                                    <p className="card-description">• 웹해킹 심화 교육</p>
                                                    <p className="card-description">• 주제별 스터디</p>
                                                    <p className="card-description">• 논문 분석 스터디</p>
                                                </div>
                                            </div>
                                        )}
                                        {activeTab === 'etc' && (
                                            <div className="tab-panel">
                                                <div className="curriculum-card">
                                                    <h3 className="card-title">기타 활동</h3>
                                                    <p className="card-description">• 선후배간 활발한 교류, MT</p>
                                                    <p className="card-description">• 1학기 소학회 중간 세미나 (1학년 및 2학년 신입 기수
                                                        대상)</p>
                                                    <p className="card-description">• 소학회 내부 CTF</p>
                                                    <p className="card-description">• 교내외 연합세미나 진행 및 프로젝트 발표</p>
                                                    <p className="card-description">• 졸업생 특강을 통한 진로 탐색 기회 제공</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className="curriculum-notice">*본 커리큘럼은 변동 가능성이 있습니다.</p>
                        </section>
                        <div className="divider"></div>

                        <section className="notice-section">
                            <h2 className="info-title text-2xl font-semibold text-center mt-8">지원 시 유의사항</h2>
                            <div className="notice-box">
                                <div className="notice-item">
                                    <p>• 타 소학회와 중복 지원은 가능하나, 중복 합격은 불가능합니다.</p>
                                </div>
                                <div className="notice-item">
                                    <p>• SWLUG 정기활동은 매주 수요일 18시부터 20시까지 진행되며, 정기활동에 성실히 참여 가능하신 분만 지원 바랍니다.</p>
                                </div>
                                <div className="notice-item">
                                    <p>• 지원서는 제출 후, 수정이 불가능하신 신중하게 작성 부탁드립니다.</p>
                                </div>
                                <div className="notice-item">
                                    <p>• 학년별 지원시간이 다르니, 이 점 유의하셔서 작성 바랍니다.</p>
                                </div>
                            </div>
                        </section>
                        <footer className="contact-info text-center mt-8">
                            <div className="divider"></div>
                            <br/>
                            <p>지원과 관련된 질문은 <b>Contact Us</b>를 통해 문의 바랍니다.</p>
                            <br/><br/>
                        </footer>
                    </>
                ) : (
                    <>
                    <p className="apply-description text-center">지원 기간이 아닙니다.</p>
                        <p className="apply-period text-center">
                            지원과 관련된 자세한 질문은 Contact Us를 통해 문의 바랍니다.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ApplyPage;