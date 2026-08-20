import React, { useEffect } from 'react';
import "../../styles/common.css";
import "../../styles/Privacy.css";

function Privacy() {
  useEffect(() => {
    // API 호출 함수
    const fetchPrivacyData = async () => {
      try {
        const response = await fetch('/api/privacy');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.text();
        console.log('Privacy API Response:', data); // 개발 중에만 사용
      } catch (error) {
        console.error('Error fetching privacy data:', error);
      }
    };

    // 컴포넌트가 마운트될 때 API 호출
    fetchPrivacyData();
  }, []);

  return (
      <div className="privacy-container text-left">
        <h1 className="privacy-title">개인정보처리방침</h1>

        <p className="privacy-intro">
          [SWLUG] (이하 '소학회')는 사용자의 개인정보를 중요시하며, 이를 보호하기 위해 최선을 다하고 있습니다.
          본 방침은 소학회 웹사이트를 통해 수집된 개인정보가 어떻게 사용되고 보호되는지를 명확히 설명하며, 사용자 권리와 선택 사항에 대해 안내합니다.
        </p>
        <hr style={{ border: "0", height: "1px", backgroundColor: "#202123" }}/>

        <section>
          <h2 className="privacy-heading">1. 개인정보 수집 항목 및 방법</h2>
          <p>(1) 수집 항목<br/>
            소학회는 개인정보를 <strong>동의 없이 처리하는 항목</strong>과 <strong>정보주체의 동의를 받아 처리하는 항목</strong>을
            법적 근거와 함께 아래와 같이 구분하여 수집합니다.<br/><br/>
          </p>
          <ul>
            <li>- 동의 없이 처리하는 개인정보 (계약의 체결·이행을 위해 불가피한 경우, 「개인정보 보호법」 제15조제1항제4호)
              <ul>
                <li>- 회원가입 시 필수항목: 이름, 이메일, 전화번호, 비밀번호, 학번(ID)</li>
              </ul>
            </li>
            <li>- 정보주체의 동의를 받아 처리하는 개인정보 (「개인정보 보호법」 제15조제1항제1호)
              <ul>
                <li>- 소학회 활동 지원 시 필수항목: 이름, 학과, 학번, 연락처</li>
                <li>- 소학회 활동 지원 시 선택정보: 활동 경력, 자격증, 수상 이력</li>
              </ul>
            </li>
            <li>- 자동 수집 항목
              <ul>
                <li>- 쿠키, 접속 IP 정보, 서비스 이용 기록 (자세한 사항은 "2. 쿠키의 설치·운영 및 거부에 관한 사항" 참고)</li><br/>
              </ul>
            </li>
          </ul>
          <p>(2) 수집 방법</p>
          <ul>
            <li>- 회원가입, 서비스 이용 시 사용자가 직접 입력</li>
            <li>- 소학회 활동 신청을 위해 구글폼을 통한 수집</li>
            <li>- 자동 수집 도구를 통한 정보 수집</li>
          </ul>
        </section>

        <section>
          <h2 className="privacy-heading">2. 쿠키의 설치·운영 및 거부에 관한 사항</h2>
          <p>(1) 쿠키란<br/>
            쿠키(cookie)란 웹사이트를 운영하는 서버가 사용자의 브라우저에 전송하는 소량의 정보로, 사용자의 PC 또는 모바일 기기에 저장됩니다.<br/><br/>
          </p>
          <p>(2) 쿠키의 사용 목적</p>
          <ul>
            <li>- 로그인 상태 유지 및 이용자 인증</li>
            <li>- 이용자의 접속 빈도, 방문 시간 등 이용 형태 분석을 통한 서비스 개선</li><br/>
          </ul>
          <p>(3) 쿠키 설치·운영 및 거부 방법<br/>
            사용자는 웹 브라우저의 설정을 통해 쿠키 저장을 허용하거나 거부할 수 있습니다.
            다만 쿠키 저장을 거부할 경우, 로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다.<br/><br/>
          </p>
          <ul>
            <li>- Chrome: 설정 &gt; 개인정보 및 보안 &gt; 쿠키 및 기타 사이트 데이터</li>
            <li>- Edge: 설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 저장된 데이터 관리 및 삭제</li>
            <li>- Safari: 환경설정 &gt; 개인정보 보호 &gt; 쿠키 및 웹 사이트 데이터 관리</li>
          </ul>
        </section>

        <section>
          <h2 className="privacy-heading">3. 개인정보의 수집 및 이용 목적</h2>
          <p>
            소학회는 수집한 개인정보를 다음과 같은 목적으로 사용합니다.<br/><br/>
          </p>
          <ul>
            <li>- 회원 관리: 회원 식별, 공지사항 전달, 문의사항 응대</li>
            <li>- 소학회 활동 지원: 소학회 지원자의 적합성 평가 및 연락</li>
          </ul>
        </section>

        <section>
          <h2 className="privacy-heading">4. 개인정보의 보유 및 이용 기간</h2>
          <ul>
            <li>- 회원 탈퇴 시 또는 동아리 활동 종료 후 6개월간 보관 후 삭제</li>
            <li>- 소학회 활동 신청 기간 후 즉시 파기</li>
            <li>- 관계 법령에 따른 보관이 필요한 경우 해당 법령에서 정한 기간 동안 보관
              <ul>
                <li>- 예: 통신비밀보호법에 따른 접속 기록 3개월 보관</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="privacy-heading">5. 개인정보의 제3자 제공</h2>
          <p>
            소학회는 사용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.<br/>
            단, 다음의 경우는 예외로 합니다.<br/><br/>
          </p>
          <ul>
            <li>- 법적 의무 준수를 위해 필요한 경우</li>
            <li>- 사용자의 사전 동의를 받은 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="privacy-heading">6. 개인정보의 파기</h2>
          <p>
            소학회는 개인정보 보유 기간이 경과하거나 처리 목적이 달성되면 해당 정보를 지체 없이 파기합니다.<br/><br/>
          </p>
          <ul>
            <li>- 전자 파일: 복구 불가능한 방법으로 삭제</li>
            <li>- 종이 문서: 분쇄 또는 소각</li>
          </ul>
        </section>

        <section>
          <h2 className="privacy-heading">7. 사용자 권리 및 행사 방법</h2>
          <ul>
            <li>사용자는 다음과 같은 권리를 행사할 수 있습니다.<br/><br/>
              <ul>
                <li>- 개인정보 조회, 수정, 삭제 요청</li>
                <li>- 회원 탈퇴 및 개인정보 처리 정지 요청</li><br/>
              </ul>
            </li>
            <p>
              권리 행사는 이메일 또는 문의하기 페이지를 통해 요청하실 수 있습니다.
            </p>
          </ul>
        </section>

        <section>
          <h2 className="privacy-heading">8. 개인정보 보호책임자</h2>
          <ul>
            <li>사용자의 개인정보를 보호하고 관련 불만을 처리하기 위해 다음과 같이 개인정보 보호책임자를 지정하고 있습니다.<br/><br/>
              <ul>
                <li>- 책임자: 구여빈(SWLUG 학회장)</li>
                <li>- 이메일: kyb040404@swu.ac.kr</li>
                <li>- 전화번호: 010-3264-7374</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
        <h2 className="privacy-heading">9. 기타 안내</h2>
          <ul>
            <li>개인정보 침해로 인한 신고나 상담이 필요할 경우 아래 기관에 문의할 수 있습니다.</li>
          </ul>

          <div className="table-container">
            <table className="privacy-table">
              <thead>
                <tr>
                  <th>기관</th>
                  <th>전화번호</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>개인정보침해신고센터</td>
                  <td>118</td>
                  <td><a href="http://privacy.kisa.or.kr/" target="_blank" rel="noopener noreferrer">privacy.kisa.or.kr</a></td>
                </tr>
                <tr>
                  <td>경찰청 사이버안전국</td>
                  <td>182</td>
                  <td><a href="http://cyberbureau.police.go.kr/" target="_blank" rel="noopener noreferrer">cyberbureau.police.go.kr</a></td>
                </tr>
                <tr>
                  <td>개인정보 분쟁조정위원회</td>
                  <td>1833-6972</td>
                  <td><a href="https://www.kopico.go.kr/main/main.do" target="_blank" rel="noopener noreferrer">www.kopico.go.kr</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="privacy-heading">10. 개인정보 처리방침의 변경</h2>
          <p>
            (1) 이 개인정보 처리방침은 <strong className="line1">2026년 8월 21일부터</strong> 적용됩니다.<br/>
            (2) 이전의 개인정보 처리방침은 아래에서 확인할 수 있습니다.<br/><br/>
          </p>
          <ul>
            <li>- <a href="/rules/privacy"><strong>이전 개인정보 처리방침 보기 (2025.02.24. ~ 2026.08.20.)</strong></a></li>
          </ul>
        </section>
      </div>
  );
}

export default Privacy;