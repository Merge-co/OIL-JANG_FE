

function EditMyInfo() {

    return(
        <>
        <div class="login-wrapper">
    <h1>내정보 수정</h1>

    <div class="image-button-container">
        <div class="box">
            <img class="profile" src=""/>
            <label class="uploadFileBtn" for="uploadFile"><img src=""/></label>
            <input type="file" id="uploadFile" accept="image/*"/>
        </div>
    </div>
    <div class="login-item">
        <label>닉네임</label><br/>
        <input type="text" value="맥북 컬랙터"/>
        <label>아이디</label><br/>
        <input type="text" value="aaa1234" readonly/>
        <label>변경할 비밀번호</label><br/>
        <input type="text" placeholder="영문,숫자,특수문자 포함 8-16자"/>
        <label>변경할 비밀번호 확인</label><br/>
        <input type="text" placeholder="작성한 비밀번호를 다시 입력해주세요."/>
        <label>이름</label><br/>
        <input type="text" value="김민범" readonly/>
        <label>생년월일</label><br/>
        <input type="text" value="1998-10-12" readonly/>
        <label>이메일 주소</label><br/>
        <input type="text" value="jji12340@gmail.com" readonly/>
        <label>휴대폰 번호</label><br/>
        <input type="text" value="010-9242-6954" readonly/>
        <div class="button-container">
            <button type="submit">확인</button>
            <button>취소</button>
        </div>
    </div>
</div>
        </>
    )
    
}

export default EditMyInfo;