import { Loading } from "components/loading";
import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const ButtonStyled = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
  height: ${(props) => props.height || "66px"};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Button = (props) => {
  const {
    type = "button",
    className = "",
    onClick = () => {},
    children,
    isLoading,
    kind = "primary",
    to,
    ...rest
  } = props;
  const child = !!isLoading ? <Loading /> : children; //Convert string to boolean

  if (to !== "" && typeof to === "string") {
    return (
      <NavLink
        to={to}
        style={{
          display: "inline-block",
        }}
      >
        <ButtonStyled
          type={type}
          className={className}
          onClick={onClick}
          kind={kind}
          {...rest}
        >
          {child}
        </ButtonStyled>
      </NavLink>
    );
  }

  return (
    <ButtonStyled
      type={type}
      kind={kind}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {child}
    </ButtonStyled>
  );
};

export default Button;
