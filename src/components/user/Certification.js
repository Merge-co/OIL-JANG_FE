import React, {useEffect} from 'react';

  function Certification() {

    useEffect(() => {
        // 동적으로 스크립트 추가
        const script = document.createElement('script');
        script.src = 'https://cdn.iamport.kr/v1/iamport.js';
        script.async = true;
    
        // 스크립트 로드가 완료된 후의 콜백
        script.onload = () => {
          // 이제 IMP 객체를 사용할 수 있음
          const { IMP } = window;
          if (IMP) {
            IMP.init('imp28746505');
          }
        };
    
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
      if (IMP) {
      IMP.init('imp28746505');

      /* 2. 본인인증 데이터 정의하기 */
      const data = {
        company: 'localhost:3000',                   // 회사명 또는 URL
        carrier: 'SKT',                              // 통신사
        name: '홍길동',                                // 이름
        phone: '01012341234'                        // 전화번호
      };

      /* 4. 본인인증 창 호출하기 */
      IMP.certification(data, callback);
    }

    /* 3. 콜백 함수 정의하기 */
    function callback(response) {
      const {
        success,
        error_msg
       
      } = response;

      if (success) {
        alert('본인인증 성공');
      } else {
        alert(`본인인증 실패: ${error_msg}`);
      }
    }
}

    return (
     
      <button onClick={onClickCertification}>본인인증 하기</button>
      
    );
  }

  export default Certification;