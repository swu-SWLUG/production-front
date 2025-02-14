import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../../styles/input.css";
import "../../styles/common.css";
import "../../styles/MyPageInfo.css";

function MyPageInfo() {
  const user = useSelector(state => state.auth.user);
  const [userInfo, setUserInfo] = useState({
    id: "",
    nickname: "",
    email: "",
    phone: ""
  });

  const navigate = useNavigate();

  const handlePasswordReset = () => {
    if (!userInfo.id || !userInfo.email) {
      console.error('사용자 정보가 없습니다.');
      return;
    }

    navigate("/users/update", {
      state: {
        fromMyPage: true,
        userInfo: {
          userId: userInfo.id,
          email: userInfo.email
        }
      }
    });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/mypage');
        if (response.status === 200) {
          setUserInfo({
            id: response.data.userId,
            nickname: response.data.nickname,
            email: response.data.email,
            phone: response.data.phone
          });
        }
      } catch (error) {
        console.error('회원 정보 불러오기 실패:', error);
        if (error.response?.status === 401) {
          navigate('/users/login');
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
      <div className="info-form">
        <h1 className="form_subtitle">회원 정보</h1>
        <h4 className="info-text">회원정보 수정 및 탈퇴는 운영진에게 문의해주세요</h4>
        <div className="info-form_field">
          <div className="input-wrapper">
            <label>아이디</label>
            <input value={userInfo.id} className="info-form_input" readOnly />
          </div>
        </div>
        <div className="info-form_field">
          <div className="input-wrapper">
            <label>닉네임</label>
            <input value={userInfo.nickname} className="info-form_input" readOnly />
          </div>
        </div>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label>비밀번호</label>
            <button
                onClick={handlePasswordReset}
                className="password-reset-button"
            >
              비밀번호 재설정
            </button>
          </div>
        </div>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label>이메일</label>
            <input value={userInfo.email} className="info-form_input" readOnly />
          </div>
        </div>
        <div className="info-form_field">
          <div className="input-wrapper">
            <label>전화 번호</label>
            <input value={userInfo.phone} className="info-form_input" readOnly />
          </div>
        </div>
      </div>
  );
}

export default MyPageInfo;