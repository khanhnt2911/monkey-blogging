import React from "react";
import styled from "styled-components";

const LoadingStyled = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderSize} solid white;
  border-top: ${(props) => props.borderSize} solid transparent;
  border-bottom: ${(props) => props.borderSize} solid transparent;
  border-radius: 100rem;
  display: inline-block;
  animation: spinner 1s infinite linear;

  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = (props) => {
  const { size = "40px", borderSize = "4px" } = props;
  return <LoadingStyled size={size} borderSize={borderSize}></LoadingStyled>;
};

export default Loading;
