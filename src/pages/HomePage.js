import Header from "components/layout/Header";
import Layout from "components/layout/Layout";
import { auth } from "firebase-app/firebase-app";
import { signOut } from "firebase/auth";
import HomeBanner from "module/home/HomeBanner";
import HomeFeature from "module/home/HomeFeature";
import HomeNewest from "module/home/HomeNewest";
import React from "react";

import styled from "styled-components";

const HomePageStyle = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyle>
      <Layout>
        <HomeBanner />
        <HomeFeature />
        <HomeNewest />
      </Layout>
    </HomePageStyle>
  );
};

export default HomePage;
