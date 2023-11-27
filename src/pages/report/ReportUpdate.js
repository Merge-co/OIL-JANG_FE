import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../styles/Button.module.css"
import { useEffect, useState } from "react";
import { callReportUpdateAPI, callReportDetailAPI } from "../../apis/ReportAPICalls";
import { callMessagesRegistAPI } from "../../apis/ProductAPICalls";
import ModalCSS from "../../styles/Modal.module.css"
import { getCookie } from "../../modules/CookieModule";

function ReportUpdate({ reportNo, setModalOpen }) {

    const dispatch = useDispatch();
    const processList = useSelector(state => state.processReducer);
    const process = processList.data;
    const navigate = useNavigate();

    console.log('[ReportUpdatePage] : ', reportNo);

    const closeModal = () => {
        setModalOpen(false);
    }
    useEffect(() => {
        dispatch(callReportDetailAPI({ reportNo }));
    }, [reportNo]);

    // 셋팅할 준비
    const [form, setForm] = useState({
        processDistinction: '',
        processComment: '',
        sellStatusCode: 0
    });

    // form setting
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickReportUpdateHandler = () => {
        console.log('[ReportUpdate] onClickReportUpdateHdandler');

        const formData = new FormData();
        formData.append("reportNo", reportNo);
        formData.append("processComment", form.processComment);
        formData.append("sellStatusCode", form.sellStatusCode);

        dispatch(callReportUpdateAPI({
            form: formData
        }));
        setModalOpen(false);
    }

    // 신고처리에 대한 쪽지 발송
    const onClickSendMessageHandler = () => {
        if (getCookie("accessToken")) {
            alert("신고처리에 대한 내용이 판매자에게 전송되었씁니다.");
        }
    }
    const sendMSG = {
        advertising : "광고성 컨테츠로 인해 삭제되었습니다.",
        prohibitedItem :"거래 금지 품목으로 인해 삭제되었습니다.",
        counterfeit:"가품, 이미테이션 제품으로 인해 삭제되었습니다.",
        fraud :"사기글 의심으로 인해 삭제되었습니다."
    }
    return (
        <>
            {process && (
                <div className={ModalCSS.container}>
                    <button className={ModalCSS.close} onClick={closeModal}>X</button>
                    <div>신고처리</div>
                    <div>No: {process.reportNo}</div>
                    <div>접수일시 : {process.reportDate}</div>
                    <hr />
                    <div>신고분류 : {process.refReportCategoryNo.reportCategoryCode}</div>
                    <div>신고된게시글 : {process.productCode.productName}</div>
                    <div>신고사유</div>
                    <hr />
                    <div>신고내용 : {process.reportComment}</div>
                    <div>신고처리 내용</div>
                    <select name="sellStatusCode" onChange={onChangeHandler}>
                        <option>선택하세요.</option>
                        <option value={4} >게시글삭제</option>
                        <option value={3}>반려</option>
                    </select>
                    <textarea cols="40" rows="2" name="processComment" onChange={onChangeHandler}></textarea>
                    <button className={Button.smallBtn2} onClick={() => {onClickReportUpdateHandler(); onClickSendMessageHandler(sendMSG[process.refReportCategoryNo.reportCategoryCode])}} >완료</button>
                </div>
            )}
        </>
    )
}

export default ReportUpdate;