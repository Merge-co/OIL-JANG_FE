import InquiryDetailCSS from '../../styles/inquiry/InquiryDetail.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { callInquiryRegistAPI } from '../../apis/InquiryAPICalls';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../../modules/CookieModule';


function InquiryDetailForm(){

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        inqCode:0,
        inqTitle:'',
        inqContent:'',
        inqAnswer:'',
        inqTime:'',
        refUserCode: jwtDecode(getCookie("accessToken")).userCode,
        inqCateCode: 0,
        inqCateName: '',
        inqStatus:'',
    })

    const [inputCount, setInputCount] = useState(0);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setInputCount(e.target.value.length);
    }


    const handleRegistClick = async () => {

        if(!form.inqContent.trim()){
            return;
        }
        
        const formData = new FormData();
        formData.append("inqCode",form.inqCode);
        formData.append("inqTitle",form.inqTitle);
        formData.append("inqContent",form.inqContent);
        formData.append("inqAnswer",form.inqAnswer);
        formData.append("inqTime",form.inqTime);
        formData.append("refUserCode",form.refUserCode);
        formData.append("inqCateCode",form.inqCateCode);
        formData.append("inqCateName",form.inqCateName);
        formData.append("inqStatus",form.inqStatus);


        console.log('form' + JSON.stringify(form))

        dispatch(callInquiryRegistAPI({
            form:formData
        })).then((response)=>{
            alert('등록 성공! 문의 리스트로 이동합니다');
            navigate('/inquiry', {replace:true});
            window.location.reload();
        })

    }



    return(
        <>
            <div className={`${InquiryDetailCSS.inqContent}`}>
                 <div style={{width: '70%', margin: '0 auto'}}>
                    <h1>1:1 문의하기</h1>
                    <hr/>
                </div>
                <div className={`${InquiryDetailCSS.contBox}`}>
                    <div className={`${InquiryDetailCSS.inqTitle}`}>
                    <div className={`${InquiryDetailCSS.titleMid}`}>제목</div>
                    <input 
                        type="text"
                        placeholder="제목을 입력해 주세요."
                        className={`${InquiryDetailCSS.input}`} 
                        maxLength={30}
                        name='inqTitle'
                        onChange={ onChangeHandler }
                    />
                    </div>

                    <div className={`${InquiryDetailCSS.inqSort}`}>
                    <div className={`${InquiryDetailCSS.titleMid}`} style={{marginRight:'5%'}}>분류</div>
                    <select className={`${InquiryDetailCSS.selectOption}`} onChange={ onChangeHandler } name='inqCateCode'>
                        <option selected hidden="hidden" disabled value=''>선택하세요</option>
                        <option value={1}>시스템문의</option>
                        <option value={2}>이의제기</option>
                        <option value={3}>기타</option>
                    </select>
                    </div>

                    <div className={`${InquiryDetailCSS.textAreaBox}`}>
                    <div className={`${InquiryDetailCSS.titleMid}`}>문의 내용</div>
                    <textarea 
                        className={`${InquiryDetailCSS.textArea}`}  
                        placeholder="내용을 입력해주세요(최대 1000자)"
                        maxLength={1000}
                        onChange={ onChangeHandler }
                        name='inqContent'
                    >
                    </textarea>
                    <p style={{color: '#9D9D9D', fontSize:'0.95rem'}}>
                        <span>{inputCount}</span>
                        <span> / 1000 자</span>
                     </p>
                    </div>

                    <input 
                        type="submit" 
                        value="등록" 
                        className={`${ButtonCSS.middleBtn2}`} 
                        style={{float: 'right',  
                            backgroundColor: !form.inqContent.trim() ? '#d3d3d3' : '',
                            cursor: !form.inqContent.trim() ? 'default' : 'pointer'}}
                        onClick={handleRegistClick}
                        title={!form.inqContent.trim() ? '내용을 입력해주세요' : ''}
                        disabled={!form.inqContent.trim()} 
                    />
                </div>  
            </div>
        </>
    )
}

export default InquiryDetailForm;