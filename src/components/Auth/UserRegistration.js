import React, { useState, useEffect } from "react";
import axios from 'axios';
import PrevNextButtons from "../../components/Auth/PrevNextButtons";
import "../../styles/UserRegistration.css";
import "../../styles/input.css"
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

//회원가입
const UserRegistration = ({ onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    name: "",
    email: "",
    emailAuth: "",
    phone: "",
  });

  const [error, setError] = useState({
    id: "",
    pw: "",
    email: "",
    auth: "",
    form: ""
  });

  const [success, setSuccess] = useState({
    email: "",
    auth: "",
    id: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [verifiedId, setVerifiedId] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    let countdown;
    if (timer > 0 && !isEmailVerified) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isEmailSent && !isEmailVerified) {
      setIsEmailSent(false);
      setError(prev => ({
        ...prev,
        auth: "인증 시간이 만료되었습니다. 다시 인증번호를 요청해주세요."
      }));
    }

    return () => {
      if (countdown) {
        clearInterval(countdown);
      }
    };
  }, [timer, isEmailSent, isEmailVerified]);

  useEffect(() => {
    if (isIdVerified && formData.id !== verifiedId) {
      setIsIdVerified(false);
      setSuccess(prev => ({ ...prev, id: "" }));
      setError(prev => ({ ...prev, id: "아이디가 변경되었습니다. 다시 중복확인을 해주세요." }));
    }
  }, [formData.id, verifiedId]);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    return regex.test(password);
  };

  const checkDuplicateId = async () => {
    if (!formData.id) {
      setError(prev => ({ ...prev, id: "아이디를 입력해주세요." }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('/api/signup/check-id', { userId: formData.id });
      if (response.data === "duplicate") {
        setError(prev => ({
          ...prev,
          id: "이미 사용중인 아이디입니다."
        }));
        setIsIdVerified(false);
        setVerifiedId("");
      } else {
        setError(prev => ({ ...prev, id: "" }));
        setSuccess(prev => ({
          ...prev,
          id: "사용 가능한 아이디입니다."
        }));
        setIsIdVerified(true);
        setVerifiedId(formData.id);
      }
    } catch (err) {
      setError(prev => ({
        ...prev,
        id: "아이디 중복 확인에 실패했습니다."
      }));
      setIsIdVerified(false);
      setVerifiedId("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "pw") {
      const isValid = validatePassword(value);
      const match = value === formData.pwCheck;
      setPasswordMatch(match);
      setError(prev => ({
        ...prev,
        pw: isValid ? "" : "비밀번호는 10자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.",
        confirmPw: formData.pwCheck ? (!match ? "비밀번호가 일치하지 않습니다." : "") : ""
      }));
    }

    if (name === "pwCheck") {
      const match = value === formData.pw;
      setPasswordMatch(match);
      setError(prev => ({
        ...prev,
        confirmPw: !match ? "비밀번호가 일치하지 않습니다." : ""
      }));
    }
  };

  const handleRequestAuth = async () => {
    if (!formData.email) {
      setError(prev => ({ ...prev, email: "이메일을 입력해주세요." }));
      return;
    }

    try {
      setIsLoading(true);
      await axios.post('/api/email/mailSend', { email: formData.email });
      setTimer(300);
      setIsEmailSent(true);
      setSuccess(prev => ({ ...prev, email: "인증번호가 발송되었습니다." }));
      setError(prev => ({ ...prev, email: "" }));
    } catch (err) {
      setError(prev => ({
        ...prev,
        email: err.response?.data || "인증번호 발송에 실패했습니다."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAuth = async () => {
    if (!timer) {
      setError(prev => ({
        ...prev,
        auth: "인증 시간이 만료되었습니다. 다시 인증번호를 요청해주세요."
      }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('/api/email/mailAuthCheck', {
        email: formData.email,
        authNum: parseInt(formData.emailAuth)
      });

      if (response.data === "ok") {
        setIsEmailVerified(true);
        setSuccess(prev => ({ ...prev, auth: "인증이 완료되었습니다." }));
        setError(prev => ({ ...prev, auth: "" }));
        setTimer(0);
      } else {
        setError(prev => ({ ...prev, auth: "인증번호가 일치하지 않습니다." }));
      }
    } catch (err) {
      setError(prev => ({
        ...prev,
        auth: err.response?.data || "인증에 실패했습니다."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!isEmailVerified) {
      setError(prev => ({ ...prev, form: "이메일 인증을 완료해주세요." }));
      return;
    }

    if (!isIdVerified) {
      setError(prev => ({ ...prev, form: "아이디 중복확인을 완료해주세요." }));
      return;
    }

    const requestBody = {
      userId: formData.id,
      pw: formData.pw,
      confirmPw: formData.pwCheck,
      nickname: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    try {
      setIsLoading(true);
      const response = await axios.post('/api/signup', requestBody);
      if (response.data === "success") {
        onNext({
          ...formData,
          roleType: 2
        });
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setError(prev => ({
          ...prev,
          form: err.response.data.message || "회원가입에 실패했습니다."
        }));
      } else {
        setError(prev => ({
          ...prev,
          form: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <form method="post" className="form">
        <h1 className="form_title">회원가입</h1>

        <div className="form_steps">
          <span className="form_step">1. 개인정보 수집 이용 약관 동의</span>
          <span className="form_step current">2. 정보 입력</span>
          <span className="form_step">3. 회원 가입 신청 완료</span>
        </div>

        <div className="info-form">
          <h1 className="info-text">입력한 정보를 기반으로 회원가입 요청이 되므로, 정확한 정보를 기입해주세요.</h1>

          {/* ID 입력 필드 */}
          <div className="form-field">
            <div className="input-wrapper">
              <label>아이디</label>
              <div className="input-container">
                <input
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요"
                    className="info-form_input"
                />
                <button
                    type="button"
                    onClick={checkDuplicateId}
                    disabled={isLoading || !formData.id}
                    className="auth-button"
                >
                  {isLoading ? "처리중..." : isIdVerified ? "확인완료" : "중복확인"}
                </button>
              </div>
            </div>
            {error.id && <div className="error-message">{error.id}</div>}
            {success.id && <div className="success-message">{success.id}</div>}
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="form-field">
              <div className="input-wrapper">
                  <label>비밀번호</label>
                  <div className="password-input-container">
                      <input
                          type={showPassword ? "text" : "password"}
                          name="pw"
                          value={formData.pw}
                          onChange={handleChange}
                          placeholder="비밀번호를 입력하세요"
                          className="info-form_input"
                      />
                      <span className="password-toggle" onClick={togglePasswordVisibility}>
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                  </div>
              </div>
              {error.pw && <div className="error-message">{error.pw}</div>}
              {!error.pw && formData.pw && <div className="success-message">사용 가능한 비밀번호입니다.</div>}
          </div>

          {/* 비밀번호 확인 필드 */}
          <div className="form-field">
              <div className="input-wrapper">
                  <label>비밀번호 확인</label>
                  <div className="password-input-container">
                      <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="pwCheck"
                          value={formData.pwCheck}
                          onChange={handleChange}
                          placeholder="비밀번호를 다시 입력하세요"
                          className="info-form_input"
                      />
                      <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                          {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                  </div>
              </div>
              {error.confirmPw && <div className="error-message">{error.confirmPw}</div>}
              {!error.confirmPw && formData.pwCheck && passwordMatch &&
                  <div className="success-message">비밀번호가 일치합니다.</div>}
          </div>

          {/* 이름 입력 필드 */}
          <div className="form-field">
            <div className="input-wrapper">
              <label>이름</label>
              <div className="input-container">
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                    className="info-form_input"
                />
              </div>
            </div>
          </div>

          {/* 이메일 인증 필드 */}
          <div className="form-field">
            <div className="input-wrapper">
              <label>이메일</label>
              <div className="input-container">
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isEmailVerified}
                    placeholder="swlug@example.com"
                    className="info-form_input"
                />
                <button
                    type="button"
                    onClick={handleRequestAuth}
                    disabled={isLoading || !formData.email || isEmailVerified}
                    className="auth-button"
                >
                  {isLoading ? "처리중..." : isEmailSent ? "재전송" : "인증번호 요청"}
                </button>
              </div>
            </div>
            {error.email && <div className="error-message">{error.email}</div>}
            {success.email && <div className="success-message">{success.email}</div>}
          </div>

          {isEmailSent && (
              <div className="form-field">
                <div className="input-wrapper">
                  <label>인증번호</label>
                  <div className="input-container">
                    <input
                        name="emailAuth"
                        value={formData.emailAuth}
                        onChange={handleChange}
                        disabled={isEmailVerified}
                        placeholder="인증번호 6자리 입력"
                        className="info-form_input"
                    />
                    {timer > 0 && <span className="timer">{Math.floor(timer/60)}:{String(timer%60).padStart(2, '0')}</span>}
                    <button
                        type="button"
                        onClick={handleVerifyAuth}
                        disabled={isLoading || !formData.emailAuth || isEmailVerified}
                        className="auth-button"
                    >
                      확인
                    </button>
                  </div>
                </div>
                {error.auth && <div className="error-message">{error.auth}</div>}
                {success.auth && <div className="success-message">{success.auth}</div>}
              </div>
          )}

          {/* 전화번호 입력 필드 */}
          <div className="form-field">
            <div className="input-wrapper">
              <label>전화번호</label>
              <div className="input-container">
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="전화번호를 입력하세요"
                    className="info-form_input"
                />
              </div>
            </div>
          </div>

          {error.form && <div className="error-message">{error.form}</div>}
        </div>

        <PrevNextButtons
            onPrev={onPrev}
            onNext={handleSubmit}
            disableNext={
                isLoading ||
                !isEmailVerified ||
                !isIdVerified ||
                !passwordMatch ||
                !formData.id ||
                !formData.pw ||
                !formData.name ||
                !formData.phone
            }
        />
      </form>
  );
};

export default UserRegistration;