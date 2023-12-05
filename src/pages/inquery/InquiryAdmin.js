import { useEffect } from 'react';
import ButtonCSS from '../../styles/Button.module.css';
import InquiryDetailCSS from '../../styles/inquiry/InquiryDetail.module.css';
import { useDispatch } from 'react-redux';
import { callInquiryDetailAPI, callInquiryModifyAPI } from '../../apis/InquiryAPICalls';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { navigate } from 'react-big-calendar/lib/utils/constants';


function InquiryAdmin({inqCode, userCode}) {


    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [inqAdminDetail, setInqAdminDetail] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    let [inputCount, setInputCount] = useState(0);


    useEffect (
        () => {
            dispatch(callInquiryDetailAPI({
                inqCode: params.inqCode
            })).then((result => {
                if(result && result.data){
                    setInqAdminDetail([result.data.results]);
                    const {refUserCode, inqTitle, inqContent, inqCateCode, inqCateName} = result.data.results.inqSelectDetailDTOList[0];
                    setForm({
                        ...form,
                        refUserCode,
                        inqTitle,
                        inqContent,
                        inqCateCode,
                        inqCateName
                    });
                }else{
                    console.log('[InquiryDetail] API response does not contain data: ', result)
                }
            }))
        },[dispatch, inqCode]
    )

        const [form, setForm] = useState({
            inqCode: params.inqCode,
            inqTitle: '',
            inqContent: '',
            inqAnswer: '',
            inqTime: '',
            refUserCode: '',
            inqCateCode: 0,
            inqCateName: '',
            inqStatus:'',
        })

        const onChangeHandler = (e) => {
            const inputValue = e.target.value;

            if(!isReadOnly){
                setReplyContent(inputValue)
            }

            setForm({
                ...form,
                replyContent,
                [e.target.name]: e.target.value
            });
        }

        const handleReplyClick = async () => {
            if(!isReadOnly && !form.inqAnswer.trim()){
                return;
            }

            const formData = new FormData();
            formData.append("inqCode", form.inqCode);
            formData.append("inqTitle", form.inqTitle);
            formData.append("inqContent", form.inqContent);
            formData.append("inqAnswer", form.inqAnswer);
            formData.append("inqTime", form.inqTime);
            formData.append("refUserCode", form.refUserCode);
            formData.append("inqCateCode", form.inqCateCode);
            formData.append("inqCateName", form.inqCateName);
            formData.append("inqStatus", form.inqStatus);


                dispatch(callInquiryModifyAPI({
                    userCode: form.refUserCode,
                    inqCode: params.inqCode,
                    form: formData
                })).then((response) => {
                    alert('답변을 등록했습니다');
                    navigate(`/inquiry`, {replace: false});
                })
                setIsReadOnly(!isReadOnly)
    
        }


    return(
        <>
            <div className={`${InquiryDetailCSS.inqContent}`}>
                 <div style={{width: '70%', margin: '0 auto'}}>
                    <h1>1:1 문의관리</h1>
                    <hr/>
                </div>


         
                {inqAdminDetail && inqAdminDetail.map(inquiry => (      
                    
                 <div className={`${InquiryDetailCSS.contBox}`}>


                     <div style={{width:'100%', margin: '10% 0'}}>

                            <ul style={{width: '100%'}} key={inquiry.inqCode}>
                                <li style={{marginBottom:'2%'}}><span style={{fontWeight: '600'}}>문의번호 : </span>{inquiry.inqSelectDetailDTOList[0].inqCode}</li>
                                <li style={{marginBottom:'2%'}}><span style={{fontWeight: '600'}}>분류 : </span>{inquiry.inqSelectDetailDTOList[0].inqCateName}</li>
                                <li style={{marginBottom:'2%'}}><span style={{fontWeight: '600'}}>문의자 : </span>{`${inquiry.inqSelectDetailDTOList[0].name} (${inquiry.inqSelectDetailDTOList[0].id})`}</li>
                                <li style={{marginBottom:'2%'}}><span style={{fontWeight: '600'}}>제목 : </span>{inquiry.inqSelectDetailDTOList[0].inqTitle}</li>
                                <li style={{marginBottom:'2%'}}><span style={{fontWeight: '600'}}>문의일시 : </span>{inquiry.inqSelectDetailDTOList[0].inqTime}</li>
                                <li><span style={{fontWeight: '600'}}>내용 : </span>{inquiry.inqSelectDetailDTOList[0].inqContent}</li>
                            </ul>
                 
                    </div>

                    <div>
                
                        <div style={{marginBottom: '2%', fontWeight:'600', paddingBottom:'1%',borderBottom : isReadOnly ? "1px solid #9d9d9d" : "none"}}>답변하기</div>


                            <textarea 
                                className={`${InquiryDetailCSS.textArea}`}  
                                placeholder="내용을 입력해주세요(최대 1000자)"
                                onChange={onChangeHandler}
                                name='inqAnswer'    
                                maxLength={1000}
                                key={inquiry.inqCode}
                                readOnly={isReadOnly || inquiry.inqSelectDetailDTOList[0].inqStatus === 'Y'}
                                style={{ border: !isReadOnly ? 'none' : '1px solid #ccc'}}
                            >
                                {inquiry.inqSelectDetailDTOList[0].inqAnswer}
                            </textarea>
           
                    
                            {console.log(isReadOnly)}
                        
                        <p style={{color: '#9D9D9D', fontSize:'0.95rem', display: !isReadOnly ? 'none' : 'block'}}>
                            <span>{inputCount}</span>
                            <span> / 1000 자</span>
                        </p>
                    </div>

                    <input 
                        type="submit" 
                        value="등록" 
                        className={`${ButtonCSS.middleBtn2}`} 
                        style={{float: 'right',
                            backgroundColor: !isReadOnly && !form.inqContent.trim() ? '#d3d3d3' : '',
                            cursor: isReadOnly && !form.inqContent.trim() ? 'default' : 'pointer',
                            display: inquiry.inqSelectDetailDTOList[0].inqStatus === 'Y' ? 'none' : 'block',
                        }}
                        title={!isReadOnly && !form.inqContent.trim() ? '내용을 입력해주세요' : ''}
                        disabled={!isReadOnly && !form.inqContent.trim()} 
                        onClick={handleReplyClick}             
                    />
                               {console.log(isReadOnly)}
                </div>

                ))}
            </div>
        </>
    )
}


export default InquiryAdmin;