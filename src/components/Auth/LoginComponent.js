import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure, setLoading } from '../../slices/authSlice';
import "../../styles/LoginComponent.css";
import "../../styles/common.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 


function LoginComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  //로그인 수정
  useEffect(() => {
    // 폼 유효성 검사
    setIsFormValid(id.trim() !== '' && password.trim() !== '');
  }, [id, password]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const userId = localStorage.getItem('userId');
      if (userId || isAuthenticated) {
        try {
          const response = await axios.get('/api/mypage');
          if (response.data.userId) {

            dispatch(loginSuccess({
              user: {
                id: response.data.userId,
                nickname: response.data.nickname
              }
            }));
            navigate('/main', { replace: true }); // /api 제거
          }
        } catch (error) {
          localStorage.removeItem('userId');
        }
      }
    };

    checkAuthStatus();
  }, [dispatch, navigate, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    dispatch(setLoading());

    try {
      const response = await axios.post('/api/login', {
        userId: id,
        password: password
      });

      if (response.data.success) {
        //console.log(response.data.role)
        localStorage.setItem("userRole", response.data.role) //사용자 역할 localsotrage에 저장
        const userInfoResponse = await axios.get('/api/mypage');

        dispatch(loginSuccess({
          user: {
            id: userInfoResponse.data.userId,
            nickname: userInfoResponse.data.nickname
          }
        }));
        localStorage.setItem('userId', response.data.userId);
        navigate('/main', { replace: true }); // /api 제거
        window.scrollTo(0, 0); 
      } else {
        dispatch(loginFailure(response.data.message));
      }
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || '로그인에 실패했습니다.'));
    }
  };

  const handleLogoClick = () => {
    navigate('/main', { replace: true });
  };

  return (
      <div className="login-container">
        <img
            src="/img/Logo4.png"
            alt="SWLUG Logo"
            className="login_logo"
            onClick={handleLogoClick}
        />
        <form className="login-form" onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder=" 아이디(학번)를 입력해주세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="info-form_input"
          />
          <div className="password-input-container">
            <input
                type={showPassword ? "text" : "password"}
                placeholder=" 비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="info-form_input"
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
        </div>
          {error && <p className="error-message">{error}</p>}
          <div className="links">
            <a href="/users/update">비밀번호 재설정</a> | <a href="/users/join">회원가입</a>
          </div>
          <button
              type="submit"
              className={`btn_next ${isFormValid ? 'active' : ''}`}
              disabled={loading || !isFormValid}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
  );
}

export default LoginComponent;