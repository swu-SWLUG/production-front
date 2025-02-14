import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, loginSuccess } from '../slices/authSlice';
import axios from 'axios';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBlogHover, setIsBlogHover] = useState(false);

  const getCurrentPath = () => {
    return window.location.pathname;
  };

  const getCurrentCategory = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
  };

  const isCurrentPath = (path) => {
    return getCurrentPath() === path;
  };

  const isCurrentCategory = (category) => {
    return getCurrentCategory() === category && getCurrentPath() === '/blog';
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem('userId');
      if (userId && !isAuthenticated) {
        try {
          const userInfoResponse = await axios.get('/api/mypage');
          if (userInfoResponse.status === 200) {
            dispatch(loginSuccess({
              user: {
                id: userInfoResponse.data.userId,
                nickname: userInfoResponse.data.nickname
              }
            }));
          }
        } catch (error) {
          console.error('사용자 정보를 가져오는데 실패했습니다:', error);
        }
      }
    };

    fetchUserInfo();
  }, [dispatch, isAuthenticated]);

  const handleLogout = async () => {
    try {
      const response = await axios.post('/login/logout');
      dispatch(logout());
      localStorage.clear();
      window.location.href = '/main';
    } catch (error) {
      console.error('로그아웃 실패:', error);
      dispatch(logout());
      localStorage.clear();
      window.location.href = '/main';
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
      <header className="bg-white relative z-10">
        <div className="container mx-auto flex items-center justify-between h-20">
          <div className="logo">
            <a href="/">
              <img src="/swlug.png" alt="SWLUG Logo" className="w-24 h-auto" />
            </a>
          </div>
          <nav className="flex-1">
            <ul className="flex justify-center items-center space-x-8 text-lg font-medium text-gray-700" style={{ marginLeft: "0px" }}>
              <li>
                <a href="/intro" className={`hover:text-blue-600 ${isCurrentPath('/intro') ? 'font-bold' : ''}`}>
                  소개
                </a>
              </li>
              <li
                  onMouseEnter={() => setIsBlogHover(true)}
                  onMouseLeave={() => setIsBlogHover(false)}
                  className="relative"
              >
                <a href="/blog" className={`hover:text-blue-600 ${isCurrentPath('/blog') ? 'font-bold' : ''}`}>
                  블로그
                </a>
                {isBlogHover && (
                    <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 rounded-lg px-8 py-2"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "40px",
                          whiteSpace: "nowrap",
                          height: "40px",
                          alignItems: "center",
                          background: "#f3f3f3",
                        }}
                    >
                      <a href="/blog?category=1" className={`hover:underline hover:font-bold ${isCurrentCategory('1') ? 'font-bold' : ''}`}>성과</a>
                      <a href="/blog?category=2" className={`hover:underline hover:font-bold ${isCurrentCategory('2') ? 'font-bold' : ''}`}>정보</a>
                      <a href="/blog?category=3" className={`hover:underline hover:font-bold ${isCurrentCategory('3') ? 'font-bold' : ''}`}>후기</a>
                      <a href="/blog?category=4" className={`hover:underline hover:font-bold ${isCurrentCategory('4') ? 'font-bold' : ''}`}>활동</a>
                    </div>
                )}
              </li>
              <li>
                <a href="/notice" className={`hover:text-blue-600 ${isCurrentPath('/notice') ? 'font-bold' : ''}`}>
                  공지
                </a>
              </li>
              <li>
                <a href="/apply" className={`hover:text-blue-600 ${isCurrentPath('/apply') ? 'font-bold' : ''}`}>
                  지원
                </a>
              </li>
              <li>
                <a href="/faq" className={`hover:text-blue-600 ${isCurrentPath('/faq') ? 'font-bold' : ''}`}>
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
          <div className="relative">
            {!isAuthenticated ? (
                <button
                    onClick={() => window.location.href = '/users/login'}
                    className="text-lg font-medium text-gray-700 hover:text-blue-600"
                    style={{ marginLeft: "50px" }}
                >
                  로그인 ▼
                </button>
            ) : (
                <div className="relative">
                  <button
                      onClick={toggleDropdown}
                      className="flex items-center text-gray-700 hover:text-blue-600 text-lg font-medium"
                  >
                    {user?.nickname || user?.id || '사용자'} <span className="ml-1">▼</span>
                  </button>
                  {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                        <div className="flex flex-col items-center">
                          <a
                              href="/users/mypage"
                              className="block w-full text-center px-4 py-2 hover:font-bold"
                          >
                            마이페이지
                          </a>
                          <hr className="w-4/5 border-gray-300 my-2" />
                          <button
                              onClick={handleLogout}
                              className="block w-full text-center px-4 py-2 hover:font-bold"
                          >
                            로그아웃
                          </button>
                        </div>
                      </div>
                  )}
                </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;