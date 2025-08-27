import styled from "styled-components";

export interface FlexProps {
  inline?: boolean;
  row?: boolean;
  gap?: number | string;
  flexWrap?: boolean;
  spaceBetween?: boolean;
  spaceAround?: boolean;
  spaceEvenly?: boolean;
  verticalCenter?: boolean;
  verticalTop?: boolean;
  verticalBottom?: boolean;
  horizontalCenter?: boolean;
  center?: boolean;
  width?: number | string;
  height?: number | string;
  flex?: number;
  spaced?: boolean;
  flexStart?: boolean;
  flexEnd?: boolean;
  flexShrink?: number;
  reverse?: boolean;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;
`;

export default Flex;
