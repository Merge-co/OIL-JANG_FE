

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
import { GET_PAGING } from '../../modules/PagingModule';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../../modules/CookieModule';

function MessageList({isReceived, keyword, page}){

    console.log("MessageList컴포넌트")

    const navigate = useNavigate();
    const PagingInfo = useSelector(state => state.pagingReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const curURL = new URL(window.location.href);


    const [messageList, setMessageList] = useState();

    let msgList = messageList && messageList[0].msgList;
    //console.log("1" + JSON.stringify(msgList))

    let pagingBtn = messageList && messageList[0].pagingBtn;
   // console.log("2" + JSON.stringify(pagingBtn))
    
    let totalMsg = messageList && messageList[0].totalMsg;
    console.log("pagingBtn ==================" + pagingBtn)
    console.log("messageList ==================" + messageList)




    const handleMessageClick = (msgCode) => {
        navigate(`messageDetail/${msgCode}`);
    };
    




    useEffect(

        () => {

            dispatch(callMessageListAPI({
                userCode: jwtDecode(getCookie("accessToken")).userCode,
                isReceived: isReceived,
                page: page,
                keyword: keyword,
            })).then((result) => {
                console.log("page============"+ page)

                console.table("result : " + result);
                if(result && result.data){
                    setMessageList([result.data.results]);
                    if(!curURL.searchParams.get('page')){
                        dispatch({type: GET_PAGING, payload: 0});
                    }
                }else{
                    console.error('[MessageList] API response does not contain data:', result);
                }
        
            }).catch((error) => {
                console.error('[MessageList] API call error:', error);
            })
        }
        ,[PagingInfo, dispatch, isReceived, page, keyword]
    );
    console.log('isReceived1!!!!!!!!!!!!!!!!!!!!!!!!!!!!:' , isReceived);
    console.log('messageList:==========================', messageList);





    // const handleMenuClick = useCallback((isReceived) => {
    //     // 메뉴 클릭에 대한 동작 정의
    //     if (isReceived === true) {

    //         // 받은 쪽지함 처리
    //         dispatch(callMessageListAPI({
    //         userCode: jwtDecode(getCookie("accessToken")).userCode,
    //         isReceived: true,
    //         page: page,
    //         keyword: keyword,
    //         })).then((result) => {
    //         console.table("result : " + result);
    //         if(result && result.data){
    //             setMessageList([result.data.results]);
    //             if(!curURL.searchParams.get('page')){
    //                 dispatch({type: GET_PAGING, payload: 0});
    //             }
    //         }else{
    //             console.error('[MessageList] API response does not contain data:', result);
    //         }

    //     }).catch((error) => {
    //         console.error('[MessageList] API call error:', error);
    //     })

    //     console.log('isReceived2!!!!!!!!!!!!!!!!!!!!!!!!!!!!:' , isReceived);

    //     } else if (isReceived === false) {
        
    //         // 보낸 쪽지함 처리
    //         dispatch(callMessageListAPI({
    //         userCode: jwtDecode(getCookie("accessToken")).userCode,
    //         isReceived: false,
    //         page: page,
    //         keyword: keyword,
    //         })).then((result) => {
    //         console.table("result : " + result);
    //         if(result && result.data){
    //             setMessageList([result.data.results]);
    //             if(!curURL.searchParams.get('page')){
    //                 dispatch({type: GET_PAGING, payload: 0});
    //             }
    //         }else{
    //             console.error('[MessageList] API response does not contain data:', result);
    //         }

    //         console.log('isReceived3!!!!!!!!!!!!!!!!!!!!!!!!!!!!:' , isReceived);

    //     }).catch((error) => {
    //         console.error('[MessageList] API call error:', error);
    //     })
    //     };
    //         }, [PagingInfo, dispatch, isReceived, page, keyword]); 
    
        

    //     const memoizedMessageMenu = useMemo(() => <MessageMenu onMenuClick={handleMenuClick} />, [handleMenuClick]);


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

        //     dispatch(callMessageDeleteAPI({ msgCode })).then((response) => {
        //         console.log("msgCode 전송: " + msgCode)
        //       alert("쪽지 삭제에 성공했습니다!");
        //       navigate(`/messageList`, { replace: false });
        //       window.location.reload();
        //     });
        //   } else {
        //     alert("삭제할 쪽지를 선택해주세요");
        //   }

        
        Promise.all(msgCode.map(msgCode => dispatch(callMessageDeleteAPI({ msgCode }))))
            .then((responses) => {
                alert("쪽지 삭제에 성공했습니다!");
                navigate(`/messageList`, { replace: false });
                window.location.reload();
            })
            .catch((error) => {
                console.error("다중 삭제 중 오류 발생:", error);
            });
    } else {
        alert("삭제할 쪽지를 선택해주세요");
    }
        };


    return (
        <>
            <div style={{width: '70%', margin: '0 auto'}}>
                <h1>쪽지함</h1>
                <hr />
            </div>
            <div className={`${MessageListCSS.box1} ${MessageListCSS.contBox}`}>

            {/* <div>
            {memoizedMessageMenu}
            </div> */}
            


                <div style={{width: '80%', margin: '0 auto'}}>
                    <div>
                        <form action='' method='get' className={`${MessageListCSS.searchBox}`}>
                            <select name='search' className={`${MessageListCSS.search}`}>
                                <option value="전체">전체</option>
                                <option value="제목">내용</option>
                                <option value="이름">이름</option>
                            </select>
                            <input type="search" placeholder="검색" className={`${MessageListCSS.searchInput}`} name="keyword" defaultValue={keyword}/>
                            <input type="submit" value="검색" className={`${MessageListCSS.searchBtn}`} style={{cursor:'pointer'}}/>
                        </form>
                    
                 
                        <table className={`${MessageListCSS.table}`}>
                            <thead>
                            <tr className={`${MessageListCSS.tr}`}>
                                <th className={`${MessageListCSS.text1}`}>
                                    <input type="checkbox" name="sort" id="sort" checked={isCheckedAll} onChange={isCheckedHandler}/>
                                </th>
                                {console.log("isReceived " + isReceived)}
                                <th>{isReceived !== undefined ? (isReceived ? '보낸사람' : '받은사람') : '사람 정보 없음'}</th>
                                <th>내용</th>
                                <th>수신일시</th>
                                <th>수신확인</th>
                            </tr>
                            
                            </thead>
                            <tbody>
                                {messageList && messageList[0].msgList.map(message => (
                                    <tr key={message.msgCode}>
                                        <td><input type="checkbox" name="sort" id={message.msgCode} onChange={handleCheckedOne}/></td>
                                        <td>{`${message.name} (${message.id})`}</td>
                                        <td onClick={() => handleMessageClick(message.msgCode)} style={{cursor:'pointer'}} className={`${MessageListCSS.msgListHover}`}>
                                            {message.msgContent.length > 10 ? `${message.msgContent.substring(0,10)}...` : message.msgContent}
                                        </td>
                                        <td>{message.msgTime}</td>
                                        <td>{message.msgStatus}</td>
                                    </tr>
                                ))}

                            {console.log("messageList3333 " + messageList)}
                       
                            </tbody>
            
                        </table>

                        <input type="submit" value="삭제" className={`${ButtonCSS.middleBtn2}`} style={{float: 'right'}} onClick={() => onDeleteHandler(messageList.msgCode)}/>
                   
                        

                        {(totalMsg && messageList.length === totalMsg) ? "" : messageList ? <PagingBar pagingBtn={pagingBtn}/> : ""}

                        {console.log("pagingBtn " + pagingBtn)}
                        {console.log("messageList " + messageList)}
                                  
                    </div>
          
                </div>   
            </div>
    
        </>
    );
    

}

export default MessageList;