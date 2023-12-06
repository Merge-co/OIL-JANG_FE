import { useNavigate, useParams } from "react-router-dom";
import{ callInquiryDeleteAPI, callInquiryListAPI, callInquiryStatusListAPI } from '../../apis/InquiryAPICalls'
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
    console.log("role 받아오는지 : " + role)

    const [inqList, setInqList] = useState();

    let pagingBtn = inqList && inqList[0].pagingBtn;
    console.log("2" , inqList && inqList[0].pagingBtn)
    let totalInq = inqList && inqList[0].totalInq;
    console.log("totalInq ==================" , inqList && inqList[0].totalInq)

    const onRegistHandler = () => {
        navigate(`/inquiryDetail`);
    }

    const onInqDetailHandler = (inqCode) => {
        navigate(`/inquiryDetail/${inqCode}`);
    }



    const onAdminHandler = (inqCode) => {
        navigate(`/inquiryAdmin/${inqCode}`);  
    }

    useEffect(
        () => {

            console.log("거치는지?")
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

                console.log("role!!!!!!!!!!!!!!!!!!!!!" , role)
            }).catch((error) => {
                console.log('[InquiryList] API call error:', error);
            })
        }, [PagingInfo, dispatch, page, keyword, inqCateCode]
    )




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
    }


    const onDeleteHandler = ({inqCode, userCode}) => {
        const checkedMessages = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));

        if(checkedMessages.length > 0) {
            const inqCodesDelete = checkedMessages
            .filter((checkbox) => checkbox.getAttribute('data-inq-status') === 'N')
            .map((checkbox) => checkbox.id);
   

         if(inqCodesDelete.length > 0){
            Promise.all(inqCodesDelete.map(inqCode => dispatch(callInquiryDeleteAPI({inqCode, userCode}))))
            .then((response) => {
                alert("문의한 게시글이 삭제되었습니다!");
                navigate(`/inquiry`, {replace: false});
                window.location.reload();
            })
            .catch((error) => {
                console.log("다중 삭제 중 오류 발생:", error);
            });
            } else{
                alert("답변 대기중인 게시글만 삭제가능합니다.")
            }
         }   
      else{
        alert("삭제할 게시글을 선택해주세요");
    }

};



    const onClickStatusHandler = (inqStatus) => {
        console.log("inqStatus" , inqStatus)

            dispatch(callInquiryListAPI({
                userCode: jwtDecode(getCookie("accessToken")).userCode,
                inqStatus: inqStatus,
                page: page,
                role: jwtDecode(getCookie("accessToken")).Role[0],
                keyword: keyword,
            })).then((result)=> {
                if(result && result.data){
                    setInqList([result.data.results]);
                    console.log("대체뭐야!!!!!!!!!!!!!!!!!" + JSON.stringify([result.data.results]))
                    if(!curURL.searchParams.get('page')){
                        dispatch({type: GET_PAGING, payload: 0});
                    }
                } else{
                    console.log('[InquiryList] API rsponse does not contain data', result);
                }
            })         
    };






    return (
        
        <>
            <div style={{width: '70%', margin: '0 auto'}}>
                <h1>1:1 문의하기</h1>
                <hr/>
            </div>
    
            <div style={{ width: '70%', margin: '5% auto 0'}}>
                     <div className={`${InquiryCSS.box2}`}>
                        <div className={`${InquiryCSS.contBox}`}>
                            <label>
                                <input 
                                    type="radio" 
                                    style={{marginRight: '8px', display:'inline-block'}} 
                                    name="inqStatus" 
                                    value="Y"
                                    onClick={() => {onClickStatusHandler("Y")}}
                                    defaultValue={inqStatus}
                                />
                                완료&nbsp;&nbsp;
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    style={{marginRight: '8px', display:'inline-block'}} 
                                    name="inqStatus" 
                                    value="N"
                                    onClick={() => {onClickStatusHandler("N")}}
                                    defaultValue={inqStatus}
                                />
                                대기
                            </label>
                        </div>
                        
                        <div style={{width: '30%'}}>
                            <form className={`${MessageListCSS.searchBox}`}  style={{width: '100%', marginBottom : '12px'}}>
                                <select className={`${MessageListCSS.search}`} defaultValue={inqCateCode} name='inqCateCode'>
                                    <option value={1}>전체</option>
                                    <option value={2}>제목</option>
                                    <option 
                                        value={3}
                                        style={{display: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_USER' ? 'none' : 'inline'}}
                                    >이름
                                    </option>
                                    {/* <option value={4}>분류</option> */}
                                </select>
                                <input 
                                    type="search" 
                                    placeholder="검색" 
                                    className={`${MessageListCSS.searchInput}`} 
                                    style={{width: '60%'}} 
                                    name="keyword" 
                                    defaultValue={keyword}
                                />
                                <input 
                                    type="submit" 
                                    value="검색" 
                                    className={`${MessageListCSS.searchBtn}`} 
                                    style={{cursor:'pointer'}}
                                />
                            </form>
                        </div>
                    </div>
                        <table className={`${InquiryCSS.table}`}>
                            <thead>
                                <tr className={`${MessageListCSS.tr}`}>
                                    <th className={`${MessageListCSS.text1}`}>
                                        <input 
                                            type="checkbox" 
                                            name="sort" 
                                            id="sort"
                                            checked={isCheckedAll} 
                                            onChange={isCheckedHandler}
                                        />
                                    </th>
                                    <th>분류</th>
                                    { jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_ADMIN' ? <th
                                       style={{width: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_ADMIN' ? '10%' : '0'}}
                                    >문의자</th>  : "" }
                                            <th>제목</th>
                                    <th>문의일시</th>
                                    <th>답변여부</th>
                                </tr>
                            </thead>
                            <tbody>
                            {inqList && inqList[0].inqSelectListDTOList.map(inquiry => (
                                <tr key={inquiry.inqCode}>
                                    <td>
                                        <input 
                                         type="checkbox"
                                         id={inquiry.inqCode}
                                         data-inq-status={inquiry.inqStatus}
                                         onChange={handleCheckedOne}
                                         />
                                    </td>
                                    <td>{`${inquiry.inqCateName}`}</td>
                                    { jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_ADMIN' ? <td
                                        style={{
                                            // display: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_USER' ? 'none' : 'inline-block' , 
                                            padding: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_ADMIN' ? '2%': 'inherit',
                                            width: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_ADMIN' ? '10%': '0'
                                        }}
                                    >
                                        {`${inquiry.name} (${inquiry.id})`}
                                    </td> : "" }
                                    
                                    <td
                                        style={{cursor:'pointer'}} className={`${MessageListCSS.msgListHover}`}
                                        onClick={() => {
                                            if( jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_ADMIN' ){
                                                onAdminHandler(inquiry.inqCode)
                                            }else{
                                                onInqDetailHandler(inquiry.inqCode)
                                                }
                                            }
                                           }
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
                            <input type="submit" 
                                   value="등록"
                                   className={`${ButtonCSS.middleBtn2}`}  
                                   onClick={() => onRegistHandler()}  
                                   style={{marginLeft: '10px', display: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_ADMIN' ? 'none' : 'inline'}}
                            />
                            <input type="submit" 
                                   value="삭제"
                                   className={`${ButtonCSS.middleBtn2}`} 
                                   style={{marginLeft: '10px', display: jwtDecode(getCookie("accessToken")).Role[0] === 'ROLE_ADMIN' ? 'none' : 'inline'}}  
                                   onClick={() => {onDeleteHandler({inqCode: inqList.inqCode, userCode: jwtDecode(getCookie("accessToken")).userCode})}

                                   } 
                            />
                        </div>
                       

                        {(totalInq && inqList.length === totalInq) ? "" : inqList ? <PagingBar pagingBtn={pagingBtn}/> : ""}
                        
            </div>
            
        </>
    
    );
                                
}


export default InquiryList;