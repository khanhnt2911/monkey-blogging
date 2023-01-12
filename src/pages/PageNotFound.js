import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyle = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: inline-block;
    margin-bottom: 40px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
  }
  .home-back {
    display: inline-block;
    background-color: ${(props) => props.theme.primary};
    padding: 15px 30px;
    border-radius: 12px;
    margin-top: 20px;
  }
`;

const PageNotFound = () => {
  return (
    <NotFoundPageStyle>
      <NavLink to={"/"}>
        <img srcSet="logo.png 2x" alt="monkey-blogging" className="logo" />
      </NavLink>
      <h1 className="heading">Ooops! Page not found</h1>
      <NavLink to={"/"} className="home-back">
        Back to home
      </NavLink>
    </NotFoundPageStyle>
  );
};

export default PageNotFound;
