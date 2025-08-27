import { useNavigate } from "react-router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const userIdRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);

  // const [userId, setUserId] = useState("");
  // const [userPassword, setUserPassword] = useState("");

  const doLogin = () => {
    const userLoginInfo = {
      userId: userIdRef.current?.value ?? "",
      userPassword: userPasswordRef.current?.value ?? "",
    };
    const userMatchingInfo = {
      userId: "test",
      userPassword: "123123",
    };

    if (
      userLoginInfo.userId === userMatchingInfo.userId &&
      userLoginInfo.userPassword === userMatchingInfo.userPassword
    ) {
      navigate("/course");
    } else {
      console.log(userLoginInfo);
      alert("아이디 및 패스워드가 틀립니다.");
    }
  };

  return (
    <>
      <h1>Login id/pw</h1>
      {/*<div className="form-group input-box">*/}
      {/*    <label>*/}
      {/*        <input type="text"*/}
      {/*               className="form-control"*/}
      {/*               value={userId}*/}
      {/*               onChange={e => setUserId(e.target.value)}*/}
      {/*               onKeyDown={e => e.key === 'Enter' && doLogin()}*/}
      {/*               placeholder="아이디"/>*/}
      {/*    </label>*/}
      {/*</div>*/}
      {/*<div className="form-group input-box">*/}
      {/*    <label>*/}
      {/*        <input*/}
      {/*            type="password"*/}
      {/*            className="form-control"*/}
      {/*            value={userPassword}*/}
      {/*            onChange={e => setUserPassword(e.target.value)}*/}
      {/*            onKeyDown={e => e.key === 'Enter' && doLogin()}*/}
      {/*            placeholder="비밀번호"/>*/}
      {/*    </label>*/}
      {/*</div>     */}
      <div className="form-group input-box">
        <label>
          <input
            type="text"
            className="form-control"
            ref={userIdRef}
            onKeyDown={(e) => e.key === "Enter" && doLogin()}
            placeholder="아이디"
          />
        </label>
      </div>
      <div className="form-group input-box">
        <label>
          <input
            type="password"
            className="form-control"
            ref={userPasswordRef}
            onKeyDown={(e) => e.key === "Enter" && doLogin()}
            placeholder="비밀번호"
          />
        </label>
      </div>
      <div className="login-box">
        <button className="btn btn-default login-item" onClick={doLogin}>
          로그인
        </button>
      </div>
    </>
  );
};

export default LoginPage;
