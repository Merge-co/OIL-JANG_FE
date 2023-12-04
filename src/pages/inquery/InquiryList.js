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

function InquiryList({inqCateCode, inqStatus, page, role, keyword}) {

    const navigate = useNavigate();
    const PagingInfo = useSelector(state => state.pagingReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const curURL = new URL(window.location.href);

    const [inqList, setInqList] = useState();

    let pagingBtn = inqList && inqList[0].pagingBtn;
       // console.log("2" + JSON.stringify(pagingBtn))
    let totalInq = inqList && inqList[0].totalInq;
    console.log("inqList ==================" + inqList)

    const onRegistHandler = () => {
        navigate(`/inquiryDetail`);
    }

    const onInqDetailHandler = (inqCode) => {
        navigate(`/inquiryDetail/${inqCode}`);
    }

    const onDeleteHandler = ({inqCode, userCode}) => {

    }

    useEffect(
        () => {
            dispatch(callInquiryListAPI({
                userCode: jwtDecode(getCookie("accessToken")).userCode,
                inqCateCode: params.inqCateCode,
                inqStatus: params.inqStatus,
                page: page,
                role: jwtDecode(getCookie("accessToken")).Role[0],
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


    console.log("inqList소망: " + JSON.stringify(inqList))


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
                                <input type="search" placeholder="검색" className={`${MessageListCSS.searchInput}`} style={{width: '60%'}} name="keyword" defaultValue={keyword}/>
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
                                    <th
                                       style={{display: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_USER' ? 'none' : 'inline', padding: '2%', width: '10%' }}
                                    >문의자</th>
                                    <th>제목</th>
                                    <th>문의일시</th>
                                    <th>답변여부</th>
                                </tr>
                            </thead>
                            <tbody>
                            {inqList && inqList[0].inqSelectListDTOList.map(inquiry => (
                                <tr key={inquiry.inqCode}>
                                    <td><input type="checkbox" id={inquiry.inqCode}/></td>
                                    <td>{`${inquiry.inqCateName}`}</td>
                                    <td
                                        style={{display: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_USER' ? 'none' : 'inline' , padding: '2%', width: '10%'}}
                                    >
                                        {`${inquiry.name} (${inquiry.id})`}
                                    </td>
                                    <td
                                        style={{cursor:'pointer'}} className={`${MessageListCSS.msgListHover}`}
                                        onClick={() => onInqDetailHandler(inquiry.inqCode)}
                                    >
                                         {inquiry.inqTitle.length > 10 ? `${inquiry.inqTitle.substring(0,10)}...` : inquiry.inqTitle}  
                                    </td>
                                    <td>{`${inquiry.inqTime}`}</td>
                                    <td>{`${inquiry.inqStatus}`}</td>
                                </tr>
                               
                            ))}
                               
                            </tbody>
                        </table>
            
                        <div  style={{float: 'right'}}>
                            <input type="submit" value="등록" className={`${ButtonCSS.middleBtn2}`}  onClick={() => onRegistHandler()}  style={{marginLeft: '10px', display: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_ADMIN' ? 'none' : 'inline'}}/>
                            <input type="submit" value="삭제" className={`${ButtonCSS.middleBtn2}`} style={{marginLeft: '10px', display: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_ADMIN' ? 'none' : 'inline'}}  onClick={() => onDeleteHandler()} />
                        </div>
                       

                        {(totalInq && inqList.length === totalInq) ? "" : inqList ? <PagingBar pagingBtn={pagingBtn}/> : ""}
                        
            </div>
            
        </>
    
    );
    
}


export default InquiryList;