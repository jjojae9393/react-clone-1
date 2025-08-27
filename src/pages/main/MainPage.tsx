import { useCallback, useMemo, useState, memo, useEffect } from "react";
import { Button } from "antd";

type UserInfo = { name: string; email: string; password: string };
type CommentProps = { userInfo: UserInfo };

const Comment = memo((commentProps: CommentProps) => {
  if (!commentProps.userInfo.name) return null;

  console.log("rerender Comment");

  return (
    <>
      <div>{commentProps.userInfo.name}님 반갑습니다.</div>
    </>
  );
});

const MainPage = () => {
  console.log("It is rendering level.");

  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    console.log("It is mount level.");
    return { name: "", email: "", password: "" };
  });

  const [count, setCount] = useState(() => {
    console.log("It is mount level.");
    return 0;
  });

  const newUserInfo: UserInfo = useMemo(
    () => ({ name: "test", email: "test@gmail.com", password: "123123" }),
    [],
  );

  useEffect(() => {
    console.log("It is rerendering level: userInfo", JSON.stringify(userInfo));
    console.log("It is rerendering level: count", JSON.stringify(count));

    return () => {
      console.log(
        "It is rerendering after level: userInfo",
        JSON.stringify(userInfo),
      );
      console.log(
        "It is rerendering after level: count",
        JSON.stringify(count),
      );
    };
  }, [userInfo, count]);

  const addUserInfo = useCallback(() => {
    setUserInfo(newUserInfo);
    setCount((e) => e + 1);
  }, []);

  // 리렌더링 조건: useState에 소속된 setState 실행, 컴포넌트의 Props 변화, context 변화, 부모 컴포넌트의 리렌더링
  // 렌더링(R) -> 커밋(C) -> 레이아웃 이팩트(L) -> 페인트(P) -> 패시브 이펙트(= useEffect)(E)
  // 마운트는 첫 렌더링에서만 실행(초기값 설정하는 부분)

  return (
    <>
      <div>메인 페이지입니다.</div>
      <div>현재 카운팅은 {count}입니다.</div>
      <div>
        <Comment userInfo={userInfo} />
        <div>id: {userInfo.name}</div>
        <div>email: {userInfo.email}</div>
        <div>password: {userInfo.password}</div>
        <Button onClick={addUserInfo}>추가</Button>
      </div>
    </>
  );
};

export default MainPage;
