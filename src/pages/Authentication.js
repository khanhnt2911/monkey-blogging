import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationStyled = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .form {
    width: 600px;
    margin: 0 auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .label {
    display: inline-block;
    color: ${(props) => props.theme.grayDark};
    font-weight: 600;
    cursor: pointer;
  }
  .have-account {
    margin-bottom: 20px;
    &: {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;

const Authentication = ({ children }) => {
  return (
    <AuthenticationStyled>
      <NavLink to={"/"}>
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
      </NavLink>
      <h1 className="heading">Monkey Blogging</h1>
      {children}
    </AuthenticationStyled>
  );
};

export default Authentication;
