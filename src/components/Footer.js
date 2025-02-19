import React, { useState } from 'react';

const Footer = () => {
  const [copyStatus, setCopyStatus] = useState({ message: '', copied: false });

  const handlePrivacyClick = () => {
    window.history.pushState({}, '', '/privacy');
    window.location.reload();
    window.scrollTo(0, 0);
  };

  const handleExternalLink = (url, e) => {
    e.preventDefault();
    const validUrls = {
      instagram: 'https://www.instagram.com/security_swlug?igsh=ZjJkOWs0eDd3YWJ3',
      kakao: 'https://open.kakao.com/o/sfB1uJdh',
      naver: 'https://cafe.naver.com/swlug'
    };

    if (validUrls[url]) {
      window.open(validUrls[url], '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email); // 이메일을 클립보드에 복사
      setCopyStatus({ message: '이메일이 복사되었습니다!', copied: true });
  
      // 2초 후 메시지를 자동으로 숨김
      setTimeout(() => {
        setCopyStatus({ message: '', copied: false });
      }, 2000);
    } catch (err) {
      console.error('이메일 복사 실패:', err);
      setCopyStatus({ message: '복사 실패. 다시 시도해주세요.', copied: false });
    }
  };
  

  return (
    <footer className="footer bg-black text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="social-and-contact text-left">
          <div className="contact-info relative">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">
              29기 학회장 김수민: {" "}
              <button
                onClick={() => handleCopyEmail('suming@swu.ac.kr')} 
                className="hover:underline focus:outline-none"
                aria-label="이메일 복사"
              >
                suming@swu.ac.kr
              </button>
            </p>
            <p className="text-sm">
              29기 부학회장 김도연: {" "}
              <button
                onClick={() => handleCopyEmail('yeando@swu.ac.kr')}
                className="hover:underline focus:outline-none"
              >
                yeando@swu.ac.kr
              </button>
            </p>
            {copyStatus.message && (
              <div className={`absolute -right-40 top-10 bg-gray-800 text-white px-3 py-1 rounded shadow-lg transition-opacity duration-200 ${copyStatus.copied ? 'opacity-100' : 'opacity-0'}`}>
                {copyStatus.message}
              </div>
            )}
          </div>

          <div className="social-icons flex space-x-4 mt-4">
            <button
              onClick={(e) => handleExternalLink('instagram', e)}
              className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
              aria-label="Visit our Instagram"
            >
              <img
                src="/instagram.png"
                alt="Instagram"
                className="w-6 h-6 cursor-pointer"
                loading="lazy"
              />
            </button>

            <button
              onClick={(e) => handleExternalLink('kakao', e)}
              className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
              aria-label="Join our Kakao chat"
            >
              <img
                src="/kakao.png"
                alt="Kakao"
                className="w-6 h-6 cursor-pointer"
                loading="lazy"
              />
            </button>

            <button
              onClick={(e) => handleCopyEmail('swu.swlug@gmail.com', e)}
              className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
              aria-label="Send us an email"
            >
              <img
                src="/mail.png"
                alt="Mail"
                className="w-6 h-6 cursor-pointer"
                loading="lazy"
              />
            </button>

            <button
              onClick={(e) => handleExternalLink('naver', e)}
              className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
              aria-label="Visit our Naver cafe"
            >
              <img
                src="/naver.png"
                alt="Naver"
                className="w-6 h-6 cursor-pointer"
                loading="lazy"
              />
            </button>
          </div>
        </div>

        <div className="logo-and-policy text-right flex flex-col items-end">
          <button
            className="privacy-policy text-sm mb-2 cursor-pointer hover:underline focus:outline-none rounded px-2"
            onClick={handlePrivacyClick}
            aria-label="개인정보처리방침 보기"
          >
            개인정보처리방침
          </button>
          <button
            onClick={handlePrivacyClick}
            className="focus:outline-none "
            aria-label="개인정보처리방침 보기"
          >
            <img
              src="/footer_logo.png"
              alt="SWLUG Footer Logo"
              className="w-16 h-auto mt-2 cursor-pointer"
              loading="lazy"
            />
          </button>
          <p className="text-sm mt-2">&copy; 2025 SWLUG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;