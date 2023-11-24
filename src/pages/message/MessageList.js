

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



        const [isCheckedAll, setIsCheckedAll] = useState(false);

        const isCheckedHandler = () => {
          setIsCheckedAll((prevIsCheckedAll) => !prevIsCheckedAll);
      
          const checkboxes = document.querySelectorAll('input[type="checkbox"]');
          
          checkboxes.forEach((checkbox) => {
            checkbox.checked = !isCheckedAll;
          });
        };

        const handleCheckedOne = () => {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            const areAllChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);

            setIsCheckedAll(areAllChecked);
        };
      
        
        
        const onDeleteHandler = () => {
          const checkedMessages = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));

          console.log("checkedMessages========" , checkedMessages)

          console.log("msgCode::::::::::::: ", checkedMessages.map((checkbox) => checkbox.id))
          
          if (checkedMessages.length > 0 ) {
            const msgCode = checkedMessages.map((checkbox) => checkbox.id);

            console.log("================msgCodes:" + msgCode);

            dispatch(callMessageDeleteAPI({ msgCode })).then((response) => {
                console.log("msgCode 전송: " + msgCode)
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
                    
                 
                        <table className={`${MessageListCSS.table}`}>
                            <thead>
                            <tr className={`${MessageListCSS.tr}`}>
                                <th className={`${MessageListCSS.text1}`}>
                                <input type="checkbox" name="sort" id="sort" checked={isCheckedAll} onChange={isCheckedHandler}/>
                                </th>
                                <th>보낸사람</th>
                                <th>내용</th>
                                <th>수신일시</th>
                                <th>수신확인</th>
                            </tr>
                            
                            </thead>
                            <tbody>
                                {messageList && messageList.map(message => (
                                    <tr key={message.msgCode}>
                                        <td><input type="checkbox" name="sort" id={message.msgCode} onChange={handleCheckedOne}/></td>
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