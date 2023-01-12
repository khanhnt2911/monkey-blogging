import React from "react";
import styled from "styled-components";
const FiledStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
  margin-bottom: 20px;
  &:last-child: {
    margin-bottom: 0px;
  }
`;

const Field = (props) => {
  const { children } = props;
  return <FiledStyled>{children}</FiledStyled>;
};

export default Field;
