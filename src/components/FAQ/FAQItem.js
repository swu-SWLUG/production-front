import React, { useState } from 'react';
import '../../styles/FAQPage.css';

const FAQItem = ({ image = '/qna.png', question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatAnswer = (text) => {
        // 줄바꿈을 임시 마커로 변환
        const tempMarker = "LINEBREAK_MARKER";
        let formatted = text.replace(/\n/g, tempMarker);

        // Bold 처리: **text** 형식을 <strong>text</strong>로 변환
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // 임시 마커를 <br />로 변환
        formatted = formatted.replace(/LINEBREAK_MARKER/g, '<br />');

        return <span dangerouslySetInnerHTML={{ __html: formatted }} style={{ textAlign: 'left', display: 'block' }} />;
    };

    return (
        <div className="faq-item">
            <div
                className="faq-question"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <img src={image} alt="FAQ Icon" className="faq-icon" />
                <span>{question}</span>
                <img
                    src={isOpen ? '/faq_up.png' : '/faq_down.png'}
                    alt="Toggle"
                    className="faq-toggle-icon"
                />
            </div>
            {isOpen && (
                <div className="faq-answer">
                    <img
                        src="/faq_penguin.png"
                        alt="Penguin"
                        className="faq-penguin"
                    />
                    <div className="faq-speech-bubble">
                        <div className="speech-bubble-text" style={{ textAlign: 'left' }}>
                            {formatAnswer(answer)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FAQItem;