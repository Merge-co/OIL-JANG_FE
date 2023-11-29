import React, {useEffect,useState } from 'react';

  function Certification({ userData, onCertificationSuccess }) {
    const [certificationSuccess, setCertificationSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        // 동적으로 스크립트 추가
        const script = document.createElement('script');
        script.src = 'https://cdn.iamport.kr/v1/iamport.js';
        script.async = true;
        script.crossorigin = 'anonymous';
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
        setErrorMessage('이름과 핸드폰 번호를 입력하세요.');
        return;
      }else{
        setErrorMessage('');
      }


      if (IMP) {
      IMP.init('imp28746505');

      /* 2. 본인인증 데이터 정의하기 */
      const data = {
        name: userData.name,
        phone: userData.phone                     
      };

      /* 4. 본인인증 창 호출하기 */
      IMP.certification(data, (response) => {
        handleCertificationCallback(response);
      });
      }

    /* 3. 콜백 함수 정의하기 */
    function handleCertificationCallback(response) {
      console.log('IAMport Certification Response:', response);
      const {
        success,
        error_msg,
      } = response;

      if (success) {

        alert('인증 성공');
        setCertificationSuccess(true);
        onCertificationSuccess();
       

      } else {
        alert(`인증 실패: ${error_msg}`);
      }
    }
}

    return (
     <>
      <button onClick={onClickCertification}>간편인증 하기</button><br/>
      {certificationSuccess && <p>인증이 완료되었습니다.</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </>
    );
  }

  export default Certification;