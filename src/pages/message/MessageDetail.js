import { useParams } from 'react-router-dom';
import{
    callMessageDetailAPI
} from '../../apis/MessageAPICalls'
import {useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ButtonCSS from '../../styles/Button.module.css';
import MessageMenu from '../../components/message/MessageMenu';




function MessageDetail(msgCode){
    const MessageInfos = useSelector(state => state.messageReducer);
    const PagingInfo = useSelector(state => state.pagingReducer);
    const dispatch = useDispatch();
    const params = useParams();

    const [messageList, setMessageList] = useState([]);

        useEffect(
        () => {
            dispatch(callMessageDetailAPI({
                msgCode: params.msgCode
            }));
        },[params.msgCode, dispatch, PagingInfo]
    );
return(
    <>
        <div className="msgDetail">
            <h3 className="pageTitle">1:1문의하기</h3>
            <div className="msgNav" style={{marginTop: '5%'}}>
                 {<MessageMenu />}
            </div>
         <div className="contBox">

            <div className="msgInfo">
                <ul>
                <li>보낸 사람 &nbsp;&nbsp;&nbsp;&nbsp;<span>김민번(bum12***)</span></li>
                <li>수신 일시 &nbsp;&nbsp;&nbsp;&nbsp;<span>2023-10-20 17:55</span></li>
                <li>게시글 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>[아이패드 팝니다]새로 산 지 얼마 안됐어요</span></li>
                </ul>
            </div>

            <hr/>


            <div className="textAreaBox">
                <div className="titleMid">내용</div>
                <textarea className="textArea" placeholder="내용을 입력해주세요(최대 1500자)"></textarea>
            </div>


            <input type="submit" value="등록" className={`${ButtonCSS.middleBtn2}`}/>
          </div>


        </div>
    </>

);


};

export default MessageDetail;