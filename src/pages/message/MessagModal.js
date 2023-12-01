import ModalCSS from '../../styles/Modal.module.css';
import ButtonCSS from '../../styles/Button.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../../modules/CookieModule';
import { callMessageRegistAPI } from '../../apis/MessageAPICalls';




function MessageModal({setModalOpen}){

    const closeModal = () => {
        setModalOpen(false);
    }




    const productUserInfo = useSelector(state => state.productReducer.getProductDetail);
    console.log("productUserInfo: ", productUserInfo)
    const productCode = productUserInfo.productDetail[0].productCode;
    console.log("productCode : " + productCode)
    const senderCode = jwtDecode(getCookie("accessToken")).userCode;
    console.log("senderCode : " + senderCode)
    const receiverCode = productUserInfo.productDetail[0].refUserCode;
    console.log("receiverCode : " + receiverCode)

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("token :" + JSON.stringify(jwtDecode(getCookie("accessToken"))))



    const [form, setForm] = useState({
        msgCode: 0,
        msgContent:'',
        msgStatus:'',
        msgTime:'',
        refProductCode: productCode,
        senderCode: senderCode,
        receiverCode: receiverCode,
        msgDeleteCode: 0,
        msgDeleteStatus:'',
    });


    const [replyContent, setReplyContent] = useState('');
    const [inputCount, setInputCount] = useState(0);


    

    const onChangeHandler = (e) => {
        const inputValue = e.target.value;

        setReplyContent(inputValue);

        setForm({
            ...form,
            replyContent,
            [e.target.name]: e.target.value
        });

        setInputCount(e.target.value.length);

    }

    const handleSendClick = async () =>{

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
        console.log("formData : " + formData)
        if(!form.msgContent.trim()){
            return;
        }else{
            dispatch(callMessageRegistAPI({
                form: formData 
            })).then((response) => {
                alert('쪽지 발송을 성공했습니다!');
                navigate(`/messageList`, {replace: false});
            })
        }

    


    }


    return(

        <>
            <div className={`${ModalCSS.div}`}>
            
                <div className={`${ModalCSS.modalBg}`}></div>
                <div className={`${ModalCSS.modal}`}>
                 <button className={`${ModalCSS.modalClose}`} onClick={closeModal}><i className="xi-close-thin xi-2x"></i></button>
                    <div className={`${ModalCSS.modalBox}`}>
                   
                
                    <h4 className={`${ModalCSS.modalTitle}`}>쪽지보내기</h4>
                
                    <div className={`${ModalCSS.modalContent}`}>
                        <ul>
                            <li>보내는 사람 &nbsp;&nbsp;&nbsp;&nbsp;<span>{jwtDecode(getCookie("accessToken")).userName + "(" + jwtDecode(getCookie("accessToken")).sub + ")"}</span></li>
                            <li>받는 사람 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{productUserInfo.productDetail[0].name + "(" + productUserInfo.productDetail[0].id + ")"}</span></li>
                        </ul>
                


                        <div className={`${ModalCSS.textAreaBox}`}>
                        <div className={`${ModalCSS.titleMid}`} style={{fontWeight:'600'}}>내용</div>
                        <textarea 
                            className={`${ModalCSS.textArea}`}
                            placeholder="내용을 입력해주세요(최대 1000자)"
                            style={{width:'100%', padding:"2%", height:"180px"}}
                            maxLength={1000}
                            onChange={onChangeHandler}
                            name='msgContent'

                            >
                         </textarea>
                        </div>
                
                        <div className={`${ModalCSS.textCount}`}>
                            <span>{inputCount}</span>
                            <span> / 1000 자</span>

                        </div>
                    </div>
                
                    <input 
                        type="submit" 
                        value="전송" 
                        className={`${ButtonCSS.smallBtn2}`}
                        style={{float :'right',
                                backgroundColor: !form.msgContent.trim() ? '#d3d3d3' : '',
                                cursor: !form.msgContent.trim() ? 'default' : 'pointer',
                        }}
                        onClick={handleSendClick}
                        disabled={!form.msgContent.trim()} 
                        title={!form.msgContent.trim() ? '내용을 입력해주세요' : ''}
                    />
                
                    </div>
                </div>
            

            </div>
        </>
       
        )
        
}


export default MessageModal;