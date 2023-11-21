

import { useNavigate } from 'react-router-dom'
import{
    callMessageListAPI
} from '../../apis/MessageAPICalls'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


function MessageList(){

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const messages = useSelector(state => state.messageReducer);
    // const messageList = messages.data;

    const pageInfo = messages.pageInfo

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [messageList, setMessageList] = useState([]);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            setStart((currentPage - 1) * 5);
            dispatch(callMessageListAPI({
                userCode: 1,
                isReceived: true,

            })).then((result) => {
                console.table("result : " + result);
                if(result && result.data){
                    setMessageList([...result.data]);
                    console.table("result : " + [...result.data]);
                    console.table("messageList : " + messageList);
                    console.table("messages : " + messages);
                }else{
                    console.error('[MessageList] API response does not contain data:', result);
                }
        
            }).catch((error) => {
                console.error('[MessageList] API call error:', error);
            })
        }
        ,[currentPage, start, dispatch]
    );




    return (
        <>
            
            <h1>쪽지함</h1>
            <hr/>
            <div className="box1 contBox">

                <div className="msgNav">
                    <button>받은 쪽지함</button>
                    <span> &nbsp;|&nbsp; </span>
                    <button>보낸 쪽지함</button>
                </div>

                <div style={{float:'right'}}>
                    <div>
                        <form action='' method='get'>
                            <select className="search">
                                <option value="전체">전체</option>
                                <option value="제목">제목</option>
                                <option value="이름">이름</option>
                                <option value="분류">분류</option>
                            </select>
                            <input type="search" placeholder="검색"/>
                            <input type="submit" value="검색"/>
                        </form>
                    
                 
                        <table>
                            <thead>
                            <tr>
                                <th className="text1">
                                <input type="checkbox" name="sort" id="sort"/>
                                </th>
                                <th className="text1">보낸사람</th>
                                <th className="text1">내용</th>
                                <th className="text1">수신일시</th>
                                <th className="text1">수신확인</th>


                            </tr>
                            </thead>
                            <tbody>
                                {messageList && messageList.map(message => (
                                    <tr key={message.id}>
                                        <td>
                                        <input type="checkbox" name="sort"/>
                                        </td>
                                        <td>{`${message.name} ${message.id}`}</td>
                                        <td>{message.msgContnet}</td>
                                        <td>{message.msgTime}</td>
                                        <td>{message.msgStatus}</td>
                                    </tr>
                                ))}
                       
                            </tbody>
            
                        </table>

                        <input type="submit" value="등록" className="btnMidBlk"/>

                        <div className="paging clearfix">
                             <button><i className="xi-backward"></i></button><button><i className="xi-angle-left"></i></button><button>1</button><button>2</button><button>3</button><button>4</button><button>5</button><button><i className="xi-angle-right"></i></button><button><i className="xi-forward"></i></button>
                        </div>
          
                    </div>
          
                </div>   
            </div>
           
        </>
    );

}

export default MessageList;