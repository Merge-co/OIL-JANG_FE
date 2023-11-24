import { callJoinAPI } from "../../apis/UserAPICalls";
import userReducer, { POST_JOIN } from "../../modules/UserModule";
import Certification from"../../components/user/Certification";



function Join() {

  return(
    <>
        <div>
            <h1>회원가입</h1>
            <div>
                <div class="box">
                    <img class="profile" src=""/>
                    <label for="uploadFile"><img src=""/></label>
                    <input type="file" id="uploadFile" name="profile" accept="image/*"/>
                </div>
                <label>닉네임*</label>
                <div>
                    <input type="text" placeholder="닉네임을 입력해주세요." name="nickname"/>
                    <button>중복확인</button>
                    <br/>
                </div>
                <label>아이디*</label><br/>
                <div>
                <input type="text" placeholder="아이디를 입력해주세요." name="id"/>
                <button>중복확인</button>
                </div>
                <br/>
                <label>비밀번호*</label><br/>
                <input type="text" placeholder="영문,숫자,특수문자 포함 8-16자"/><br/>
                <label>비밀번호 확인*</label><br/>
                <input type="text" placeholder="작성한 비밀번호를 다시 입력해주세요."/><br/>
                <label>이름*</label><br/>
                <input type="text" placeholder="이름을 입력해주세요."/><br/>
                <label>생년월일*</label><br/>
                <div>
                    <input type="text" id="birthYear" placeholder="년(YYYY)"/>
                    <span>년</span>
                    <select id="birthMonth" placeholder="월(MM)">
                    <option selected disabled hidden="hidden">월(MM)</option>
                    <option value={"01"}>1월</option>
                    <option value={"02"}>2월</option>
                    <option value={"03"}>3월</option>
                    <option value={"04"}>4월</option>
                    <option value={"05"}>5월</option>
                    <option value={"06"}>6월</option>
                    <option value={"07"}>7월</option>
                    <option value={"08"}>8월</option>
                    <option value={"09"}>9월</option>
                    <option value={"10"}>10월</option>
                    <option value={"11"}>11월</option>
                    <option value={"12"}>12월</option>
                    </select>
                    <span class="date-separator">월</span>
                    <input type="text" id="birthDay" placeholder="일(DD)"/>
                    {/* <label for="calender"><img src="/static/img/calender.png"/></label> */}
                    {/* <input type="date" value="달력" id="calender"/> */}
                </div>
                <label>성별*</label><br/>
                <div>
                <select>
                    <option selected disabled hidden="hidden">성별</option>
                    <option value={"남"} >남</option>
                    <option value={"여"}>여</option>
                </select>
                </div>
                <br/>
                <label>이메일<small>(선택)</small></label><br/>
                <input type="text" placeholder="선택입력"/><br/>
                <label>인증하기*</label><br/>
                <div>
                <Certification/>
                </div>
                <div>
                </div>
                <div>
                <input type="checkbox"/><label>오일장에서 제공하는 서비스 약관에 동의합니다.</label>
                    <a href="">약관 보기</a>
                </div>
                <br/>
                <button>가입하기</button>
            </div>
        </div>  
    </>
  )

}

export default Join;