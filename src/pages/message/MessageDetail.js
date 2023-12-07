import { useNavigate, useParams } from 'react-router-dom';
import{callMessageDetailAPI} from '../../apis/MessageAPICalls'
import { callMessageRegistAPI, callMessageListAPI } from '../../apis/MessageAPICalls';
import {useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import ButtonCSS from '../../styles/Button.module.css';
import MessageMenu from '../../components/message/MessageMenu';
import MessagDetailCSS from '../../styles/message/MessageDetail.module.css'
import { getCookie } from '../../modules/CookieModule';
import { jwtDecode } from 'jwt-decode';





function MessageDetail({msgCode}){
    const messageInfos = useSelector(state => state.messageReducer);
    const PagingInfo = useSelector(state => state.pagingReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [messageDetail, setMessageDetail] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(true);

    const [messageList, setMessageList] = useState([]);
    
    let [inputCount, setInputCount] = useState(0);




        useEffect(
        () => {
            dispatch(callMessageDetailAPI({
                msgCode: params.msgCode
            
            })).then((result) => {
                console.log("result============================" + result)
                if(result && result.data) {
                   // const iterableData = Array.isArray(result.data) ? result.data : [result.data];

                   setMessageDetail([...result.data]);       

                   const { refProductCode, senderCode, receiverCode } = result.data[0];
                   console.log("result.data:" + [...result.data])
                   console.log('===================refProductCode:' + refProductCode);
                   console.log('===================senderCode:' + senderCode);
                   console.log('===================senderCode:' + senderCode);
                   setForm({
                    ...form,
                    refProductCode,
                    senderCode,
                    receiverCode,
                   });

                }else{
                    console.log('[MessageDetail] API response does not contain data: ', result);

                }
            }).catch((error) => {
                console.error('[MessageDetail] API call error:', error);
            })
        },[PagingInfo, dispatch, msgCode]
    );


    

    //     const handleMenuClick = (isReceived) => {
    //         // 메뉴 클릭에 대한 동작 정의
    //         if (isReceived === 'true') {
    //           // 받은 쪽지함 처리
    //           dispatch(callMessageListAPI({
    //             userCode: jwtDecode(getCookie("accessToken")).userCode,
    //             isReceived: true,
    //           })).then((result) => {
    //             console.table("result : " + result);
    //             if(result && result.data){
    //                 setMessageList([result.data.results]);
    //                 navigate('/messageList');
    //             }else{
    //                 console.error('[MessageList] API response does not contain data:', result);
    //             }
        
    //         }).catch((error) => {
    //             console.error('[MessageList] API call error:', error);
    //         })
        
    //         } else if (isReceived === 'false') {
    //           // 보낸 쪽지함 처리
    //           dispatch(callMessageListAPI({
    //             userCode: jwtDecode(getCookie("accessToken")).userCode,
    //             isReceived: false,
    //           })).then((result) => {
    //             console.table("result : " + result);
    //             if(result && result.data){
    //                 setMessageList([result.data.results]);
    //                 navigate('/messageList')
    //             }else{
    //                 console.error('[MessageList] API response does not contain data:', result);
    //             }
        
    //         }).catch((error) => {
    //             console.error('[MessageList] API call error:', error);
    //         })
    //     };
    //         }


    // const memoizedMessageMenu = useMemo(() => <MessageMenu onMenuClick={handleMenuClick} />, [handleMenuClick]);

    const [form, setForm] = useState({
        msgCode: 0,
        msgContent:'',
        msgStatus:'',
        msgTime:'',
        refProductCode: 0,
        senderCode: 0,
        receiverCode: 0,
        msgDeleteCode: 0,
        msgDeleteStatus:'',
    });


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

        setInputCount(e.target.value.length);
    }
    

    const handleReplyClick = async () => {

        if(!isReadOnly && !form.msgContent.trim()){
            return;
        }

        console.log("=================form0 ================" + form);
        console.log("msgCode: " +  form.msgCode);
        console.log("msgContent: " +  form.msgContent);
        console.log("msgStatus: " +  form.msgStatus);
        console.log("msgTime: " +  form.msgTime);
        console.log("refProductCode: " +  form.refProductCode);
        console.log("senderCode: " +  form.senderCode);
        console.log("receiverCode: " +  form.receiverCode);
        console.log("msgDeleteCode: " +  form.msgDeleteCode);
        console.log("msgDeleteStatus: " +  form.msgDeleteStatus);

 

        const formData = new FormData();
        formData.append("msgCode", form.msgCode);
        formData.append("msgContent", form.msgContent);
        formData.append("msgStatus", form.msgStatus);
        formData.append("msgTime", form.msgTime);
        formData.append("refProductCode", form.refProductCode);
        formData.append("senderCode", form.senderCode);
        formData.append("receiverCode", form.receiverCode);
        formData.append("msgDeleteCode", form.msgDeleteCode);
        formData.append("msgDeleteStatus", form.msgDeleteStatus);


        if(isReadOnly){
            setReplyContent('');
            setIsReadOnly(!isReadOnly);
        } else{
            console.log(!isReadOnly)
            dispatch(callMessageRegistAPI({
                form: formData 
            })).then((response) => {
                alert('쪽지 발송을 성공했습니다!');
                navigate(`/messageList`, {replace: false});
            })
            setIsReadOnly(!isReadOnly);
        }


    }

    const formatDateFromArray = (dateArray) => {
        if (dateArray.length >= 3) {
            const year = dateArray[0];
            const month = String(dateArray[1]).padStart(2, '0');
            const day = String(dateArray[2]).padStart(2, '0');
            const minute = String(dateArray[3]).padStart(2, '0');
            const second = String(dateArray[4]).padStart(2, '0');
            return `${year}-${month}-${day}-${minute}:${second}`
        }
    }



return(
    <>
        <div className={`${MessagDetailCSS.msgDetail}`}>
            <h3 className={`${MessagDetailCSS.pageTitle}`} style={{textAlign:"left"}}>쪽지함</h3>
            {/* <div className={`${MessagDetailCSS.msgNav}`} style={{marginTop: '5%'}}>
                 {memoizedMessageMenu}
            </div> */}
         <div className={`${MessagDetailCSS.contBox}`}>

         <div className={`${MessagDetailCSS.msgInfo}`}>
            {messageDetail && messageDetail[0] && ( 
                <ul key={messageDetail[0].msgCode}>
                <li>보낸 사람 &nbsp;&nbsp;&nbsp;&nbsp;<span>{`${messageDetail[0].name} ${messageDetail[0].id}`}</span></li>
                <li>수신 일시 &nbsp;&nbsp;&nbsp;&nbsp;<span>{`${formatDateFromArray(messageDetail[0].msgTime)}`}</span></li>
                <li>게시글 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{`${messageDetail[0].productName || ''} ${messageDetail[0].productDesc || ''}`}</span></li>
                </ul>
            )}
        </div>
            <hr/>

            {messageDetail && messageDetail[0] && ( 
            <div className={`${MessagDetailCSS.textAreaBox}`}>
                <div key={messageDetail.msgCode} className={`${MessagDetailCSS.titleMid}`} style={{margin : '10px 0', fontWeight: '600'}}>내용</div>
                <textarea 
                    style={{color : '#9D9D9D', border: isReadOnly ? 'none' : '1px solid #ccc'}} 
                    className={`${MessagDetailCSS.textArea}`}
                    placeholder="내용을 입력해주세요(최대 1000자)"
                    value={isReadOnly ? messageDetail[0].msgContent : replyContent}
                    onChange={onChangeHandler}
                    readOnly={isReadOnly}
                    name='msgContent'
                    maxLength={1000}
                    >
                    {/* {messageDetail[0].msgContent} */}
                </textarea>
                <p style={{color: '#9D9D9D', fontSize:'0.95rem', display: isReadOnly ? 'none' : 'block'}}>
                    <span>{inputCount}</span>
                    <span> / 1000 자</span>
                </p>
            </div>
            )}

            <input 
                type="submit" 
                value={isReadOnly ? '답장' : '보내기'} 
                className={`${ButtonCSS.middleBtn2} ${MessagDetailCSS.clearfix}`} 
                style={{float : 'right',
                        marginTop : '50px', 
                        backgroundColor: !isReadOnly && !form.msgContent.trim() ? '#d3d3d3' : '',
                        cursor:!isReadOnly && !form.msgContent.trim() ? 'default' : 'pointer',
                    }}
                onClick={handleReplyClick}
                disabled={!isReadOnly && !form.msgContent.trim()} 
                title={!isReadOnly && !form.msgContent.trim() ? '내용을 입력해주세요' : ''}
                
            />
          </div>


        </div>
    </>

);


};

export default MessageDetail;