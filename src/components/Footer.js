import React from 'react';

const Footer = () => {
  const handlePrivacyClick = () => {
    // 히스토리 API를 사용하여 더 안전한 네비게이션
    window.history.pushState({}, '', '/privacy');
    window.location.reload();
  };

  // 외부 링크를 안전하게 열기 위한 핸들러
  const handleExternalLink = (url, e) => {
    e.preventDefault();

    // URL 유효성 검사
    const validUrls = {
      instagram: 'https://www.instagram.com/security_swlug?igsh=ZjJkOWs0eDd3YWJ3',
      kakao: 'https://open.kakao.com/o/sfB1uJdh',
      email: 'mailto:swu.swlug@gmail.com',
      naver: 'https://cafe.naver.com/swlug'
    };

    if (validUrls[url]) {
      window.open(validUrls[url], '_blank', 'noopener,noreferrer');
    }
  };

  return (
      <footer className="footer bg-black text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          {/* 왼쪽: Contact Us 및 소셜 아이콘 */}
          <div className="social-and-contact text-left">
            {/* Contact Section */}
            <div className="contact-info">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-sm">
                00기 학회장_김슈니: <a href="mailto:swny.swu.ac.kr" className="hover:underline">swny.swu.ac.kr</a>
              </p>
              <p className="text-sm">
                00기 부학회장_이슈니: <a href="mailto:swulee.swu.ac.kr" className="hover:underline">swulee.swu.ac.kr</a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="social-icons flex space-x-4 mt-4">
              {/* Instagram */}
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

              {/* Kakao */}
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

              {/* Email */}
              <button
                  onClick={(e) => handleExternalLink('email', e)}
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

              {/* Naver */}
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

          {/* 오른쪽: 개인정보처리방침, 로고, 저작권 */}
          <div className="logo-and-policy text-right flex flex-col items-end">
            <button
                className="privacy-policy text-sm mb-2 cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded px-2"
                onClick={handlePrivacyClick}
                aria-label="개인정보처리방침 보기"
            >
              개인정보처리방침
            </button>
            <button
                onClick={handlePrivacyClick}
                className="focus:outline-none focus:ring-2 focus:ring-white rounded"
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