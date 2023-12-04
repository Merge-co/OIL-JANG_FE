import InquiryDetailCSS from '../../styles/inquiry/InquiryDetail.module.css';
import ButtonCSS from '../../styles/Button.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { callInquiryDetailAPI, callInquiryModifyAPI, callInquiryRegistAPI } from '../../apis/InquiryAPICalls';
import { useNavigate, useParams } from 'react-router-dom';



function InquiryDetail({inqCode, userCode}){

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [inqDetail, setInqDetail] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(true);
    let [inputCount, setInputCount] = useState(0);

    console.log("inqCode" + params.inqCode)

    useEffect(
        
        () => {
            dispatch(callInquiryDetailAPI({
                inqCode: params.inqCode
           
            })).then((result => {
                console.log("result ========" + result)
                if(result && result.data){
                    setInqDetail([result.data.results]);
                    const {refUserCode, inqCateCode} = result.data.results.inqSelectDetailDTOList[0];
                    setForm({
                        ...form,
                        refUserCode,
                        inqCateCode,
                    });
                }else{ 
                    console.log('[MessageDetail] API response does not contain data: ', result)
                }
            }))
        }, [dispatch, inqCode]
    );


    const [form, setForm] = useState({
        inqCode: 0,
        inqTitle: '',
        inqContent: '',
        inqAnswer: '',
        inqTime: '',
        refUserCode: 0,
        inqCateCode: 0,
        inqCateName: '',
        inqStatus:'',
    })


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState({
        inqCateCode : 0,
        inqCateName: '',
    })

    const onChangeHandler = (e) => {

        const inputValue = e.target.value;

        if(!isReadOnly){
            if(e.target.name === 'inqTitle'){
                setTitle(inputValue);
            }else if(e.target.name === 'inqContent'){
                setContent(inputValue);
            }else if(e.target.name === 'inqCateCode' || e.target.name === 'inqCateName'){
                setCategory({
                    ...category,
                    inqCateName : inputValue,
                })
            }
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setInputCount(e.target.value.length);
    }

    const handleReplyClick = async () => {

        if(!isReadOnly && !form.inqContent.trim()){
            return;
        }

        console.log("=================form0 ================" + form);
        console.log("inqCode: " +  form.inqCode);
        console.log("inqTitle: " +  title);
        console.log("inqContent: " +  content);
        console.log("inqAnswer: " +  form.inqAnswer);
        console.log("inqTime: " +  form.inqTime);
        console.log("refUserCode: " +  form.refUserCode);
        console.log("inqCateCode: " +  category.inqCateCode);
        console.log("inqCateName: " +  category.inqCateName);
        console.log("inqStatus: " +  form.inqStatus);

 

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


        if(isReadOnly){
            setTitle('');
            setContent('');
            setCategory({
                inqCateCode: 0,
                inqCateName:'',
            });
            setIsReadOnly(!isReadOnly);
        } else{
            console.log(!isReadOnly)
            dispatch(callInquiryModifyAPI({
                form: formData 
            })).then((response) => {
                alert('수정을 성공했습니다!');
                navigate(`/inquiry`, {replace: false});
            })
            setIsReadOnly(!isReadOnly);
        }


    }

    return(

        <>
            
            <div className={`${InquiryDetailCSS.inqContent}`}>
                <div style={{width: '70%', margin: '0 auto'}}>
                    <h1>1:1 문의하기</h1>
                    <hr/>
                </div>

                {inqDetail && inqDetail.map(inquiry => (
                    
              
                <div className={`${InquiryDetailCSS.contBox}`} key={inquiry.inqCode}>
                    <div 
                        className={`${InquiryDetailCSS.inqTitle}`}
                        id={inquiry.inqCode}       
                    >
                    <div 
                        className={`${InquiryDetailCSS.titleMid}`}
                        style={{borderBottom : isReadOnly ? "1px solid #9d9d9d" : "none", width: '100%'}}
                    >
                            제목
                        </div>
                    <input 
                        type="text" 
                        placeholder="제목을 입력해 주세요." 
                        className={`${InquiryDetailCSS.input}`} 
                        readOnly={isReadOnly}
                        value={isReadOnly ? inquiry.inqSelectDetailDTOList[0].inqTitle : title}
                        style={{border : isReadOnly ? "none" : "1px solid #9d9d9d"}}
                        onChange={onChangeHandler}
                        maxLength={15}
                        name='inqTitle'
                    />
      {console.log(isReadOnly)}
      
                    </div>
                
        
                    <div className={`${InquiryDetailCSS.inqSort}`}>
                    <div className={`${InquiryDetailCSS.titleMid}`} style={{marginRight:'5%'}}>분류</div>
                    <select 
                        className={`${InquiryDetailCSS.selectOption}`} 
                        readOnly={isReadOnly}
                        style={{border : isReadOnly ? "none" : "1px solid #9d9d9d"}}
                        onChange={onChangeHandler}
                        name='inqCateName'
                    >
                        <option value={0}>선택하세요</option>
                        <option value={1}>시스템문의</option>
                        <option value={2}>이의제기</option>
                        <option value={3}>기타</option>
                    </select>
                    {console.log(isReadOnly)}
                    </div>
        
                    <div 
                        className={`${InquiryDetailCSS.textAreaBox}`}
                    >
                    <div className={`${InquiryDetailCSS.titleMid}`} 
                         style={{borderBottom : isReadOnly ? "1px solid #9d9d9d" : "none", width: '100%'}}
                    >
                        문의 내용
                    </div>
                    <textarea 
                        className={`${InquiryDetailCSS.textArea}`} 
                        placeholder="내용을 입력해주세요(최대 1000자)"
                        onChange={onChangeHandler}
                        readOnly={isReadOnly}
                        value={isReadOnly ? inquiry.inqSelectDetailDTOList[0].inqContent : content}
                        style={{border : isReadOnly ? "none" : "1px solid #9d9d9d"}}
                        maxLength={1000}
                        name='inqContent'
                   >
                    </textarea>
                    {console.log(isReadOnly)}

                    <p style={{color: '#9D9D9D', fontSize:'0.95rem', display: isReadOnly ? 'none' : 'block'}}>
                        <span>{inputCount}</span>
                        <span> / 1000 자</span>
                     </p>
                    </div>
        
                    <input
                        type="submit" 
                        value={isReadOnly ? "수정" : "등록"} 
                        className={`${ButtonCSS.middleBtn2}`} 
                        style={{float: 'right',   
                                backgroundColor: !isReadOnly && !form.inqContent.trim() ? '#d3d3d3' : '',
                                cursor:!isReadOnly && !form.inqContent.trim() ? 'default' : 'pointer',}}
                        onClick={handleReplyClick}
                        title={!isReadOnly && !form.inqContent.trim() ? '내용을 입력해주세요' : ''}
                        disabled={!isReadOnly && !form.inqContent.trim()} 
                    />
                          {console.log(isReadOnly)}
                </div>
             ))}
    
            </div>
        </>
    );
}


export default InquiryDetail;
