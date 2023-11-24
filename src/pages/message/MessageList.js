

import { useNavigate, useParams } from 'react-router-dom';
import{
    callMessageDeleteAPI,
    callMessageListAPI
} from '../../apis/MessageAPICalls'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo, useCallback } from 'react';
import PagingBar from '../../components/common/PagingBar';
import ButtonCSS from '../../styles/Button.module.css';
import MessageMenu from '../../components/message/MessageMenu';
import MessageListCSS from '../../styles/message/MessageList.module.css'

function MessageList({isReceived}){


    const navigate = useNavigate();
    const PagingInfo = useSelector(state => state.pagingReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const messages = useSelector(state => state.messageReducer);
   // const messageList = messages.data;


    const [messageList, setMessageList] = useState([]);

    //let msgList = messages[0] ? messages[0].msgList : "";
    let pagingBtn = messages[0] ? messages[0].pagingBtn : "";

    const handleMessageClick = (msgCode) => {
        navigate(`/messageDetail/${msgCode}`);
    };
    
    


    useEffect(
        () => {
            dispatch(callMessageListAPI({
                userCode:1,
                isReceived: true,

            })).then((result) => {
                console.table("result : " + result);
                if(result && result.data){
                    setMessageList([...result.data]);
                }else{
                    console.error('[MessageList] API response does not contain data:', result);
                }
        
            }).catch((error) => {
                console.error('[MessageList] API call error:', error);
            })
        }
        ,[PagingInfo, dispatch, isReceived]
    );

    const handleMenuClick = useCallback((isReceived) => {
            // 메뉴 클릭에 대한 동작 정의
            if (isReceived === 'true') {
                // 받은 쪽지함 처리
                dispatch(callMessageListAPI({
                userCode: 1,
                isReceived: true,
                })).then((result) => {
                console.table("result : " + result);
                if(result && result.data){
                    setMessageList([...result.data]);
                }else{
                    console.error('[MessageList] API response does not contain data:', result);
                }

            }).catch((error) => {
                console.error('[MessageList] API call error:', error);
            })

            } else if (isReceived === 'false') {
                // 보낸 쪽지함 처리
                dispatch(callMessageListAPI({
                userCode: 1,
                isReceived: false,
                })).then((result) => {
                console.table("result : " + result);
                if(result && result.data){
                    setMessageList([...result.data]);
                }else{
                    console.error('[MessageList] API response does not contain data:', result);
                }

            }).catch((error) => {
                console.error('[MessageList] API call error:', error);
            })
            };
                }, [dispatch]); 
        
        

        const memoizedMessageMenu = useMemo(() => <MessageMenu onMenuClick={handleMenuClick} />, [handleMenuClick]);


        
        const [isChecked, setIsChecked] = useState(false);

        const isCheckedHandler = () => {
            setIsChecked(!isChecked)
            const updatedCheckedOnly = [];
            messageList.map((message) => {
              updatedCheckedOnly[message.msgCode] = !isChecked;
              console.log("msgCode: " + message.msgCode)
            });
            return updatedCheckedOnly;
        };
     //   console.log("isChecke : " + isChecked)
        
        const [isCheckedOnly, setIsCheckedOnly] = useState([]);
        
        const isCheckedOnlyHandler = (e) => {
            const messageId = isCheckedOnly.map(
                (todo) =>{
                    if(todo.id === parseInt(e.target.id)){
                        todo.isChecked = e.target.checked;
                    }
                    return todo;
                }
            )
            console.log("e.target.id" + e.target.id)
           
            setIsCheckedOnly(messageId);
            console.log("isCheckedOnly : " + setIsCheckedOnly)
          };
        
        const onDeleteHandler = () => {

            
          if (isChecked === true || isCheckedOnly.length > 0) {
            console.log(isChecked, isChecked)
            dispatch(callMessageDeleteAPI({ msgCode: params.msgCode })).then((response) => {
                console.log("msgCode 전송: " + params.msgCode)
              alert("쪽지 삭제에 성공했습니다!");
              navigate(`/messageList`, { replace: false });
            });
          } else {
            alert("삭제할 쪽지를 선택해주세요");

          }
        };





    return (
        <>
            
            <h1>쪽지함</h1>
            <hr/>
            <div className={`${MessageListCSS.box1} ${MessageListCSS.contBox}`}>

                <div className={`${MessageListCSS.msgNav}`}>
               {memoizedMessageMenu}
                </div>

                <div>
                    <div>
                        <form action='' method='get' className={`${MessageListCSS.searchBox}`}>
                            <select name='search' className={`${MessageListCSS.search}`}>
                                <option value="전체">전체</option>
                                <option value="제목">제목</option>
                                <option value="이름">이름</option>
                                <option value="분류">분류</option>
                            </select>
                            <input type="search" placeholder="검색" className={`${MessageListCSS.searchInput}`}/>
                            <input type="submit" value="검색" className={`${MessageListCSS.searchBtn}`}/>
                        </form>
                    
                 
                        <table>
                            <thead>
                            <tr>
                                <th className={`${MessageListCSS.text1}`}>
                                <input type="checkbox" name="sort" id="sort" checked={isChecked} onChange={(e) => isCheckedHandler(e)}/>
                                </th>
                                <th className={`${MessageListCSS.text1}`}>보낸사람</th>
                                <th className={`${MessageListCSS.text1}`}>내용</th>
                                <th className={`${MessageListCSS.text1}`}>수신일시</th>
                                <th className={`${MessageListCSS.text1}`}>수신확인</th>
                            </tr>
                            
                            </thead>
                            <tbody className={`${MessageListCSS.msgTbody}`}>
                                {messageList && messageList.map(message => (
                                    <tr key={message.msgCode}>
                                        <td><input type="checkbox" name="sort" checked={isCheckedOnly[message.msgCode]} onChange={(e) => isCheckedOnlyHandler(e)} id={message.msgCode}/></td>
                                        <td>{`${message.name} ${message.id}`}</td>
                                        <td onClick={() => handleMessageClick(message.msgCode)} style={{cursor:'pointer'}} className={`${MessageListCSS.msgListHover}`}>{message.msgContent}</td>
                                        <td>{message.msgTime}</td>
                                        <td>{message.msgStatus}</td>
                                    </tr>
                                ))}
                       
                            </tbody>
            
                        </table>

                        <input type="submit" value="삭제" className={`${ButtonCSS.middleBtn2}`} style={{float: 'right'}} onClick={() => onDeleteHandler(messageList.msgCode)}/>

                        {messageList ? <PagingBar pagingBtn={pagingBtn}/> : ""}
          
                    </div>
          
                </div>   
            </div>
           
        </>
    );

}

export default MessageList;