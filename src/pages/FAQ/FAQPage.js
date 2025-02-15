import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FAQItem from '../../components/FAQ/FAQItem';
import faqs from '../../data/faqs';
import axios from "axios";
import '../../styles/FAQPage.css';

const FAQPage = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const categories = ['전체', '지원', '활동', '기타'];

    useEffect(() => {
        const fetchFAQData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('/api/faq');
                setIndex(response.data);
                setError(null);
            } catch (err) {
                setError('FAQ 데이터를 불러오는데 실패했습니다.');
                console.error('FAQ 데이터 로딩 에러:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFAQData();

        // 히스토리 상태 설정
        window.history.replaceState(
            {
                page: 'faq',
                path: window.location.pathname
            },
            '',
            window.location.pathname
        );

        // 뒤로가기 이벤트 처리
        const handlePopState = (event) => {
            if (event.state?.page === 'faq') {
                navigate(event.state.path, { replace: true });
            } else {
                navigate(-1);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="faq-page container mx-auto px-4 py-8">
                <p className="text-center">로딩 중...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="faq-page container mx-auto px-4 py-8">
                <p className="text-center text-red-500">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-auto block"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    const filteredFaqs =
        index === 0
            ? faqs
            : faqs.filter((faq) => faq.category === categories[index]);

    return (
        <div className="faq-page container mx-auto px-4 py-8">
            <h1 className="apply-title text-3xl font-bold text-center mb-6" style={{ fontSize: '24px' }}>FAQ</h1>
            <p className="faq-text">SWLUG 관련하여 궁금한 부분을 확인해보세요</p>
            <div className="faq-filters">
                {categories.map((cat, idx) => (
                    <button
                        key={idx}
                        onClick={() => setIndex(idx)}
                        className={`faq-filter-button ${
                            index === idx ? 'selected' : ''
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            {filteredFaqs.map((faq) => (
                <FAQItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                />
            ))}
            <p className="faq-footer-text">
                ※ 이 밖의 문의사항은 Contact Us를 참고해 문의 바랍니다.
            </p>
        </div>
    );
};

export default FAQPage;