import React, { useEffect, useState } from "react";
import UserJoinCSS from "../../styles/user/UserJoin.module.css";

function Certification({ userData, onCertificationSuccess }) {
  const [certificationSuccess, setCertificationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // 동적으로 스크립트 추가
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    script.crossorigin = "anonymous";
    script.defer = true;

    // 스크립트를 문서에 추가
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거 (선택사항)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function onClickCertification() {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;

    if (!userData.name || !userData.phone) {
      setErrorMessage("이름과 핸드폰 번호를 입력하세요.");
      return;
    } else {
      setErrorMessage("");
    }

    if (IMP) {
      IMP.init("imp28746505");

      /* 2. 본인인증 데이터 정의하기 */
      const data = {
        pg: `1111111111.A010002002`,
        merchant_uid: `mid_${new Date().getTime()}`,
        name: userData.name,
        phone: userData.phone,
      };

      console.log("data", data.name);
      console.log("data", data.phone);
      console.log("data", data);

      /* 4. 본인인증 창 호출하기 */
      IMP.certification(data, handleCertificationCallback);
    }

    /* 3. 콜백 함수 정의하기 */
    function handleCertificationCallback(response) {
      console.log("handleCertificationCallback called");
      console.log("IAMport Certification Response:", response);
      const { success, error_msg } = response;

      if (success) {
        setCertificationSuccess(true);
        onCertificationSuccess();
      } else {
        alert(`인증 실패: ${error_msg}`);
      }
    }
  }

  return (
    <>
      <div className={UserJoinCSS.input_certificate}>
        <button disabled={certificationSuccess} 
          onClick={onClickCertification}
          className={UserJoinCSS.certificate_btnn}
          >
          간편인증
        </button>
        {certificationSuccess ? (
          <p style={{ color:"#00CC00" }}>인증이 완료되었습니다.</p>
        ) : (<p className={UserJoinCSS.certificate_message} >{errorMessage}</p>)
        }
      </div>
    </>
  );
}

export default Certification;
