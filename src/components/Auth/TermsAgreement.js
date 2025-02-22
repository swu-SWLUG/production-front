import React, { useRef, useState, useEffect } from 'react';
import "../../styles/TermsAgreement.css";
import "../../styles/common.css";
import PrevNextButtons from "../../components/Auth/PrevNextButtons";

function TermsAgreement({ onNext, onPrev }) {
  const [allCheck, setAllCheck] = useState(false);
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);
  const alertShown = useRef(false);

  //약관
  const allBtnEvent = () => {
    const newCheckStatus = !allCheck;
    setAllCheck(newCheckStatus);
    setFirstCheck(newCheckStatus);
    setSecondCheck(newCheckStatus);
  };

  const firstBtnEvent = () => {
    setFirstCheck(!firstCheck);
  };

  const secondBtnEvent = () => {
    setSecondCheck(!secondCheck);
  };

  useEffect(() => {
    if (!alertShown.current) {
        alert('본 서비스는 학회원만 가입할 수 있습니다.\n학회원이 아닌 경우 가입이 제한될 수 있습니다.');
        alertShown.current = true;
    }
}, []);

  useEffect(() => {
    setAllCheck(firstCheck && secondCheck);
  }, [firstCheck, secondCheck]);

  return (
      <form method="post" className="form">
        <h1 className="form_title">회원가입</h1>

        <div className="form_steps">
          <span className="form_step current">1. 개인정보 수집 이용 약관 동의</span>
          <span className="form_step">2. 정보 입력</span>
          <span className="form_step">3. 회원 가입 신청 완료</span>
        </div>

        <div className="form_agreement">
          <div className="form_agreement_box">
            <div className="form_agreement_all">
              <input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent} />
              <label htmlFor="all-check">전체동의</label>
            </div>

            <div className="form_agreement_item">
              <div className="form_agreement_label">
                <input type="checkbox" id="check1" checked={firstCheck} onChange={firstBtnEvent} />
                <label htmlFor="check1">
                  <span className="required">[필수]</span> 이용약관 동의
                </label>
              </div>
              <div className="agreement_text">
                <div className="agreement_section">
                  <strong className="section_title">[제 1장 총칙]</strong>
                  <div className="section_content">
                    <strong>제 1조 (목적)</strong>
                    <p>- 본 약관은 본 웹사이트를 통해 제공되는 소학회의 정보 및 서비스 이용에 대한 소학회와 이용자의 권리, 의무, 책임을 규정하는 것을 목적으로 합니다.</p>

                    <strong>제 2조 (용어 정의)</strong>
                    <ol>
                      <li>- "서비스"란 소학회가 제공하는 모든 웹사이트 서비스를 말합니다.</li>
                      <li>- "웹사이트"란 소학회가 운영하는 가상의 온라인 공간으로, 서비스 제공을 위한 URL은 "슈러그 웹 사이트 주소" 입니다.</li>
                      <li>- "회원"이란 소학회에 가입하여 본 약관에 동의하고 이용자 계정을 생성한 자를 의미합니다.</li>
                      <li>- "아이디(ID)"란 회원 식별을 위해 회원이 설정하고 소학회가 승인한 고유한 코드를 말합니다.</li>
                      <li>- "비밀번호"란 회원이 설정하여 아이디와 함께 사용하는 인증 수단으로, 개인정보 보호를 위한 문자와 숫자의 조합입니다.</li>
                    </ol>

                    <strong>제 3조 (약관의 효력 및 변경)</strong>
                    <ol>
                      <li>- 본 약관은 회원이 웹사이트에 가입 시 동의함으로써 효력이 발생합니다.</li>
                      <li>- 소학회는 약관을 변경할 수 있으며, 변경 시에는 웹사이트에 공지하여 회원이 이를 쉽게 확인할 수 있도록 합니다.</li>
                      <li>- 변경된 약관에 동의하지 않는 회원은 서비스 이용을 중단하고 탈퇴할 수 있습니다. 개정된 약관 시행 이후에도 서비스를 계속 이용할 경우, 변경 사항에 동의한 것으로 간주됩니다.</li>
                    </ol>

                    <strong className="section_title">[제 2장 이용 계약 체결]</strong>
                    <strong>제 4조 (이용 계약의 성립)</strong>
                    <ol>
                      <li>- 이용 계약은 회원이 약관에 동의하고, 소학회가 이를 승인함으로써 성립됩니다.</li>
                      <li>- 회원 가입 신청 시 제공한 정보가 사실과 다를 경우, 서비스 이용에 제한을 받을 수 있습니다.</li>
                    </ol>

                    <strong>제 5조 (개인정보 보호)</strong>
                    <ol>
                      <li>- 소학회는 관련 법령에 따라 회원의 개인정보를 보호하기 위해 최선을 다합니다.</li>
                      <li>- 회원은 개인정보 제공 및 이용에 대해 언제든지 동의를 철회할 수 있으며, 이 경우 회원 탈퇴를 통해 철회가 완료됩니다.</li>
                    </ol>

                    <strong className="section_title">[제 3장 계약 당사자의 의무]</strong>
                    <strong>제 6조 (소학회의 의무)</strong>
                    <ol>
                      <li>- 소학회는 서비스의 안정적 제공을 위해 노력하며, 회원의 개인정보를 안전하게 보호합니다.</li>
                      <li>- 회원이 탈퇴를 신청할 경우, 신속히 처리합니다.</li>
                    </ol>

                    <strong>제 7조 (회원의 의무)</strong>
                    <ol>
                      <li>- 회원은 본 약관과 소학회의 공지사항을 준수해야 하며, 서비스 이용 시 타인의 권리를 침해하거나, 소학회에 피해를 주는 행위를 하지 않습니다.</li>
                      <li>- 회원은 자신의 아이디와 비밀번호를 관리할 책임이 있으며, 이를 제3자에게 제공해서는 안 됩니다.</li>
                      <li>- 자신의 계정이 부정 사용되고 있음을 인지한 경우, 즉시 소학회에 알려야 합니다.</li>
                    </ol>

                    <strong className="section_title">[제 4장 서비스 이용]</strong>
                    <strong>제 8조 (서비스 제공의 제한)</strong>
                    <p>- 소학회는 시스템 유지보수, 서버 점검 등 필요에 따라 서비스 제공을 일시적으로 제한할 수 있습니다.</p>

                    <strong className="section_title">[제 5장 기타]</strong>
                    <strong>제 9조 (면책 사항)</strong>
                    <ol>
                      <li>- 소학회는 회원이 본인의 아이디 및 비밀번호 관리를 소홀히 하여 발생하는 문제에 대해 책임을 지지 않습니다.</li>
                      <li>- 소학회는 불가항력으로 인한 서비스 중단이나 데이터 손실 등에 대해 책임지지 않습니다.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="form_agreement_item">
              <div className="form_agreement_label">
                <input type="checkbox" id="check2" checked={secondCheck} onChange={secondBtnEvent} />
                <label htmlFor="check2">
                  <span className="required">[필수]</span> 개인정보 수집 및 이용 동의
                </label>
              </div>
              <div className="agreement_text">
                <p><strong>SWLUG(이하 '소학회')</strong>는 회원가입 신청 시 아래와 같은 개인정보를 수집합니다.</p>
                <p>개인정보처리에 관한 자세한 사항은 홈페이지 하단의 [개인정보처리방침]을 참고하시기 바랍니다.</p>

                <strong>1. 수집하는 개인정보 항목 및 수집 방법</strong>
                <p>(1) 수집하는 개인정보 항목</p>
                <ul>
                  <li>• 필수: 이름, 이메일, 전화번호, 비밀번호, 학번(ID)</li>
                </ul>
                <p>(2) 개인정보 수집 방법</p>
                <ul>
                  <li>• 회원가입 시, 이용자가 직접 개인정보를 입력</li>
                </ul>

                <strong>2. 개인정보 수집 및 이용 목적</strong>
                <p>회원가입 시 제공한 개인정보는 다음의 목적을 위해 활용됩니다.</p>
                <ul>
                  <li>• 개인 식별, 소학회 활동 관련 공지사항 전달 및 운영 관련 설문조사</li>
                  <li>• 소학회 행사, 교육, 워크숍 정보 전송</li>
                </ul>

                <strong>3. 수집한 개인정보의 보유 및 이용 기간</strong>
                <ul>
                  <li>• 개인정보는 회원 탈퇴를 요청하거나 동의 철회를 요청한 경우 지체 없이 파기하며, 소학회 활동 종료 후 6개월 이내에 파기합니다.</li>
                  <li>• 법령에 따라 개인정보를 보관해야 하는 경우, 관련 법령에 따른 보관 기간 동안 이용자의 개인정보를 보관합니다.</li>
                </ul>

                <p className="notice">※ 이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 단, 동의를 거부할 경우 상기 정보 수집이 필수인 소학회의 서비스를 제공받을 수 없습니다.</p>
              </div>
            </div>
          </div>
        </div>

        <PrevNextButtons
            onPrev={onPrev}
            onNext={onNext}
            disableNext={!firstCheck || !secondCheck}
        />
      </form>
  );
}

export default TermsAgreement;