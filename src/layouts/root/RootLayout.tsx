import {Outlet} from "react-router";
import styled from "styled-components";

export default function RootLayout() {
  return (
    <Wrapper>
      <Outlet></Outlet>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    padding: 10px 20px;
    overflow: auto;
    max-width: 1280px;
    max-height: calc(-72px + 100vh);
`;
