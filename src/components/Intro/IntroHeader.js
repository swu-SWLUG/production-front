import React from "react";
import "../../styles/IntroHeader.css";

const IntroHeader = () => {
  return (
    <div className="introduction-header" style={{ position: "relative" }}>
      {/* 텍스트 로고 */}
      <img src="/textLogo1.png" alt="Text Logo" className="text-logo" />

      {/* SWLUG 로고 */}
      <img src="/swlug.png" alt="SWLUG Logo" className="swlug-logo" />

      {/* 텍스트 콘텐츠 */}
      <div className="text-content">
        <p className="description">
          서울여자대학교의 정보보호학과 소학회로, 1999년도에 개설된 이래<br/> 
          꾸준히 지속해서 학회원들과 함께 정보보호를 주제로 공부하고 프로젝트를 수행하고 있습니다.
        </p>
        <p className="description">
          소학회 창립 당시 리눅스에 대한 전반적인 지식 습득과 네트워크 형성,<br/>
          스터디 및 자격증 취득을 목표로 활동을 지속해왔으며,<br/>
          현재는 웹 해킹, 네트워크 보안, 디지털 포렌식, 리버싱, 시스템 보안,<br/> 
          최근에는 클라우드와 인공지능 보안까지도 공부하며 활동하고 있습니다.
        </p>
      </div>

      {/* 펭귄 로고 */}
      <img src="/faq_penguin.png" alt="penguin Logo" className="penguin-logo" />

    </div>
  );
};

export default IntroHeader;
