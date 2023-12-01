function InquiryDetail(){


    return(

        <>
            
            <div className="inqContent">
            <h3 className="pageTitle">1:1문의하기</h3>
            <div className="contBox">
                <div className="inqTitle">
                <div className="titleMid">제목</div>
                <input type="text" placeholder="제목을 입력해 주세요."/>
                </div>
    
                <div className="inqSort">
                <div className="titleMid">분류</div>
                <select className="selectOption">
                    <option>선택하세요</option>
                    <option>시스템문의</option>
                    <option>이의제기</option>
                    <option>기타</option>
                </select>
                </div>
    
                <div className="textAreaBox">
                <div className="titleMid">문의 내용</div>
                <textarea className="textArea" placeholder="내용을 입력해주세요(최대 1000자)"></textarea>
                </div>
    
                <input type="submit" value="등록" className="btnMidBlk"/>
            </div>
    
    
            </div>
        </>
    );
}


export default InquiryDetail;
