import { useNavigate, useParams } from "react-router-dom";
import{ callInquiryListAPI } from '../../apis/InquiryAPICalls'
import ButtonCSS from '../../styles/Button.module.css';
import InquiryCSS from '../../styles/inquiry/InquiryList.module.css';
import MessageListCSS from '../../styles/message/MessageList.module.css'
import PagingBar from '../../components/common/PagingBar';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../../modules/CookieModule";
import { GET_PAGING } from "../../modules/PagingModule";

function InquiryList({page, role, keyword}) {

    const navigate = useNavigate();
    const PagingInfo = useSelector(state => state.pagingReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const curURL = new URL(window.location.href);

    const [inqList, setInqList] = useState();



    useEffect(
        () => {
            dispatch(callInquiryListAPI({
                userCode: jwtDecode(getCookie("accessToken")).userCode,
                page: page,
                keyword: keyword,
            })).then((result) => {
                if(result && result.data){
                    setInqList([result.data.results]);
                    if(!curURL.searchParams.get('page')){
                        dispatch({type: GET_PAGING, payload: 0});
                    }
                } else{
                    console.log('[InquiryList] API rsponse does not contain data', result);
                }
            }).catch((error) => {
                console.log('[InquiryList] API call error:', error);
            })
        }, [PagingInfo, dispatch, page, keyword]
    )

    return (
        
        <>
            <div style={{width: '70%', margin: '0 auto'}}>
                <h1>1:1 문의하기</h1>
                <hr/>
            </div>
    
            <div style={{ width: '70%', margin: '5% auto 0'}}>
                     <div className={`${InquiryCSS.box2}`}>
                        <div className={`${InquiryCSS.contBox}`}>
                            <input type="checkbox" style={{marginRight: '8px'}}/>완료 &nbsp;&nbsp;
                            <input type="checkbox" style={{marginRight: '8px'}}/>대기
                        </div>
                        <div style={{width: '30%'}}>
                            <form className={`${MessageListCSS.searchBox}`}  style={{width: '100%', marginBottom : '12px'}}>
                                <select className={`${MessageListCSS.search}`}>
                                    <option value="전체">전체</option>
                                    <option value="제목">제목</option>
                                    <option value="이름">이름</option>
                                    <option value="이름">분류</option>
                                </select>
                                <input type="search" placeholder="검색" className={`${MessageListCSS.searchInput}`} style={{width: '60%'}}/>
                                <input type="submit" value="검색" className={`${MessageListCSS.searchBtn}`} style={{cursor:'pointer'}}/>
                            </form>
                        </div>
                    </div>
                        <table className={`${InquiryCSS.table}`}>
                            <thead>
                                <tr className={`${MessageListCSS.tr}`}>
                                    <th className={`${MessageListCSS.text1}`}>
                                        <input type="checkbox" name="sort" id="sort"/>
                                    </th>
                                    <th>분류</th>
                                    <th>보낸사람</th>
                                    <th>제목</th>
                                    <th>문의일시</th>
                                    <th>답변여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="checkbox" name="sort"/>
                                    </td>
                                    <td>시스템 문의</td>
                                    <td>이소망(dlthak***)</td>
                                    <td>이게 대체 어떻게 된...</td>
                                    <td>2023-10-19 17:22</td>
                                    <td>완료</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="checkbox" name="sort"/>
                                    </td>
                                    <td>이의제기</td>
                                    <td>이소망(dlthak***)</td>
                                    <td>저기요 대답하세요</td>
                                    <td>2023-10-19 17:22</td>
                                    <td>처리중</td>
                                </tr>
                            </tbody>
                        </table>
            
                        <input type="submit" value="등록" className={`${ButtonCSS.middleBtn2}`} style={{float: 'right'}}/>

                        
            </div>
            
        </>
    
    );
    
}


export default InquiryList;