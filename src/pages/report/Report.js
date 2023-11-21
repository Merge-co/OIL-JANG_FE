import { useState } from "react";
import { useDispatch } from "react-redux";
import { callReportRegistAPI } from "../../apis/ReportAPICalls";
import { useNavigate } from "react-router-dom";
import ButtonCSS from '../../styles/Button.module.css'
import ReportCSS from '../../styles/report/ReportCSS.module.css';

function Report() {

    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스 패처 셀렉터 선언
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        reportUserNick: '',
        refReportCategoryNo: 0,
        productCode: 0,
        reportComment: '',
        sellStatusCode: 0,
        processDistinction: ''
    });

    // form Data Set
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }


    const onClickExitHandle = () => {
        // X 버튼 클릭시 상품페이지로 이동
        navigate("/", { replace: true })
    }

    const onClickRegisterHandler = () => {
        console.log('[ReportRegisteration] onClickReportRegisterationHandler')

        const formData = new FormData();

        formData.append("reportUserNick", form.reportUserNick);
        formData.append("refReportCategoryNo", form.refReportCategoryNo);
        formData.append("productCode", form.productCode);
        formData.append("reportComment", form.reportComment);
        formData.append("sellStatusCode", form.sellStatusCode);
        formData.append("processDistinction", form.processDistinction);

        // console.log("bbbbb", formData);
        // console.log('[ReportRegist] fromData reportUserNick : ', formData.get('reportUserNick'));
        // console.log('[ReportRegist] fromData refReportCategoryNo : ', formData.get('refReportCategoryNo'));
        // console.log('[ReportRegist] fromData productCode : ', formData.get('productCode'));
        // console.log('[ReportRegist] fromData reportComment : ', formData.get('reportComment'));
        // console.log('[ReportRegist] fromData sellStatusCode : ', formData.get('sellStatusCode'));
        // console.log("aaaa", formData);

        dispatch(callReportRegistAPI({
            form: formData
        }))
        alert('상품페이지로 이동합니다.')
        navigate('/report', { replace: true });
        window.location.reload();
    }

    return (
        <>
            <div onClick={onClickExitHandle}>X버튼</div>
            <div className={ReportCSS.modalBox}>
                
                <h2>신고하기</h2>
                <hr />
                <form>
                    <label>신고분류</label>
                    <select name="refReportCategoryNo" onChange={onChangeHandler}>
                        <option>선택해주세요</option>
                        <option value="1" >광고성 게시물</option>
                        <option value="2" >거래금지 품목이에요</option>
                        <option value="3" >가품, 이미테이션 제품이에요</option>
                        <option value="4" >사기가 의심돼요.</option>
                    </select><br />
                    <label>판매 게시글 : props 으로 받으면됩니다.</label> <br />
                    <label>신고 사유</label><br />
                    <textarea cols="50" rows="10"
                        placeholder="신고 내용을 직접 작성해주세요. &#13;자세하게 적어주시면 신고처리에 큰 도움이 됩니다."
                        name="reportComment"
                        onChange={onChangeHandler}
                    ></textarea><br />
                    <input type="text" name="reportUserNick" onChange={onChangeHandler} placeholder="유저닉네임" />
                    <input type="number" name="productCode" onChange={onChangeHandler} placeholder="상품코드" />
                    <input type="number" name="sellStatusCode" onChange={onChangeHandler} placeholder="상품상태코드" />
                    <input type="hidden" name="processDistinction" value="N" onChange={onChangeHandler} placeholder="처리분류" />
                    <input type="submit" value="보내기" className={ButtonCSS.smallBtn2} onClick={onClickRegisterHandler} />
                </form>
            </div>
        </>
    );
}
export default Report;