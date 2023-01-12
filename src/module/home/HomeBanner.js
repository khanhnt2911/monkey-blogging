import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyle = styled.div`
  margin-top: 44px;
  margin-bottom: 60px;
  min-height: 520px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 53px 46px 51px 36px;
  }
  .banner-content {
    max-width: 400px;
    color: white;
  }
  .banner-heading {
    font-size: 36px;
    font-weight: bold;
    padding-bottom: 28px;
  }
  .banner-desc {
    line-height: 2;
    margin-bottom: 40px;
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyle>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h2 className="banner-heading">Monkey blogging</h2>
            <p className="banner-desc">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
              saepe dolorem voluptas, minus similique adipisci, culpa hic
              exercitationem sunt quidem nostrum mollitia nobis eveniet vel
              voluptatem obcaecati aut facere placeat.
            </p>
            <Button
              to={"/sign-in"}
              kind="secondary"
              type="button"
              className="banner-button"
            >
              Get Started
            </Button>
          </div>
          <div className="banner-image">
            <img srcSet="Illustration.png" alt="" />
          </div>
        </div>
      </div>
    </HomeBannerStyle>
  );
};

export default HomeBanner;
